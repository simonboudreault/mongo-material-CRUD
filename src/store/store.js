import Vue from 'vue'
import Vuex from 'vuex'
import dbService from '@/services/dbService'
import * as notifications from '@/store/modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notifications
  },
  state: {
    user: {},
    token: null,
    isUserLoggedIn: false,
    isDbOn: true,
    sections: [],
    editObject: {},
    editDialog: false,
    insertDialog: false,
    deleteItemDialog: false,
    loading: false,
    renderCount: 0,
    error: ''
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections
    },
    SET_EDIT_OBJECT(state, object) {
      state.editObject = object
    },
    RESET_EDIT_OBJECT(state) {
      state.editObject = {}
    },
    SET_EDIT_DIALOG(state, value) {
      state.editDialog = value
    },
    SET_INSERT_DIALOG(state, value) {
      state.insertDialog = value
    },
    SET_DELETE_ITEM_DIALOG(state, value) {
      state.deleteItemDialog = value
    },
    SET_LOADING_STATUS(state, value) {
      state.loading = value
    },
    SET_ERROR(state, errorMessage) {
      state.error = errorMessage
    },
    TOGGLE_DB(state) {
      state.isDbOn = !state.isDbOn
    },
    SET_LOGIN_STATE(state, value) {
      state.isUserLoggedIn = value
    }
  },
  actions: {
    fetchSections({ commit, state }) {
      return dbService
        .getSections(state.user.collName, state.isDbOn)
        .then(response => {
          commit('SET_SECTIONS', response.data.documents)
          console.log('fetched documents')
          return response.data.db
        })
        .catch(err => {
          commit('SET_LOADING_STATUS', false)
          commit('SET_SECTIONS', [])
          // console.log(err.response.data.error)
          return err.response.data
        })
    },
    login({ commit }, payload) {
      commit('SET_USER', payload.user)
      commit('SET_TOKEN', payload.token)
      commit('SET_LOGIN_STATE', true)
    },
    logout({ commit }) {
      commit('SET_USER', {})
      commit('SET_TOKEN', null)
      commit('SET_LOGIN_STATE', false)
      commit('SET_SECTIONS', [])
    },
    setEditObject({ commit }, object) {
      commit('SET_EDIT_OBJECT', object)
      // console.log(object)
    },
    resetEditObject({ commit }) {
      commit('RESET_EDIT_OBJECT')
    },
    setEditDialog({ commit }, value) {
      commit('SET_EDIT_DIALOG', value)
    },
    setInsertDialog({ commit }, value) {
      commit('SET_INSERT_DIALOG', value)
    },
    setDeleteItemDialog({ commit }, value) {
      commit('SET_DELETE_ITEM_DIALOG', value)
    },
    setLoadingStatus({ commit }, value) {
      commit('SET_LOADING_STATUS', value)
    },
    // eslint-disable-next-line no-unused-vars
    insertDocument({ state }, payload) {
      let object = {
        payload: payload,
        coll: state.user.collName,
        isDbOn: state.isDbOn
      }
      return dbService.postSection(object)
    },
    deleteDocument({ state }, id) {
      let object = {
        _id: id,
        coll: state.user.collName,
        isDbOn: state.isDbOn
      }
      return dbService.deleteSection(object)
    },
    editDocument({ state }, params) {
      let object = {
        _id: state.editObject.id,
        payload: {
          [state.editObject.arrayPath
            ? state.editObject.arrayPath
            : state.editObject.field]: params.value
        },
        modifyer: params.modifyer,
        coll: state.user.collName,
        isDbOn: state.isDbOn
      }
      return dbService.putSection(object)
    },
    deleteItem({ state }) {
      let object = {
        _id: state.editObject.id,
        payload: {
          [state.editObject.field]: ''
        },
        modifyer: '$unset',
        coll: state.user.collName,
        isDbOn: state.isDbOn
      }
      return dbService.putSection(object).catch(err => {
        return err.response.data.error
      })
    },
    toggleDatabaseConnexion({ commit }) {
      commit('TOGGLE_DB')
    }
  }
})
