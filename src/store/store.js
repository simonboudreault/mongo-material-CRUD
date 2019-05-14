import Vue from 'vue'
import Vuex from 'vuex'
import dbService from '@/services/dbService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sections: [],
    editObject: {},
    editDialog: false,
    insertDialog: false,
    deleteItemDialog: false
  },
  mutations: {
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
    }
  },
  actions: {
    fetchSections({ commit }) {
      return dbService.getSections().then(response => {
        commit('SET_SECTIONS', response.data)
        console.log('fetched sections')
      })
    },
    setEditObject({ commit }, object) {
      commit('SET_EDIT_OBJECT', object)
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
    // eslint-disable-next-line no-unused-vars
    insertDocument({ dispatch }, payload) {
      let object = {
        payload: payload
      }
      return dbService.postSection(object)
    },
    editDocument({ state }, value) {
      let object = {
        _id: state.editObject.id,
        payload: {
          [state.editObject.field]: value
        },
        modifyer: '$set'
      }
      return dbService.putSection(object)
    },
    deleteItem({ state }) {
      let object = {
        _id: state.editObject.id,
        payload: {
          [state.editObject.field]: ''
        },
        modifyer: '$unset'
      }
      return dbService.putSection(object)
    }
  }
})
