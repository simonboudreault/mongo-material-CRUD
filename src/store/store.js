import Vue from 'vue'
import Vuex from 'vuex'
import dbService from '@/services/dbService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
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
    }
  },
  actions: {
    fetchSections({ commit, state }) {
      return dbService
        .getSections(state.user.collName)
        .then(response => {
          commit('SET_SECTIONS', response.data.documents)
          console.log('fetched documents')
          return response.data.db
        })
        .catch(err => {
          commit('SET_LOADING_STATUS', false)
          // console.log(err.response.data.error)
          return err.response.data.error
        })
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
        coll: state.user.collName
      }
      return dbService.postSection(object)
    },
    deleteDocument({ state }, id) {
      let object = {
        _id: id,
        coll: state.user.collName
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
        coll: state.user.collName
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
        coll: state.user.collName
      }
      return dbService.putSection(object).catch(err => {
        return err.response.data.error
      })
    },
    toggleDatabaseConnexion() {
      return dbService.toggleDB().then(response => {
        return response.data.DB
      })
    }
  }
})
