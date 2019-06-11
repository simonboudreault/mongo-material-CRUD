export const state = {
  snackbarColor: '',
  snackbarText: '',
  snackbar: false,
  timeout: 1200
}

export const mutations = {
  UPDATE_SNACKBAR(state, payload) {
    state.snackbarColor = payload.color
    state.snackbarText = payload.text
    state.snackbar = payload.value
  },
  RESET_SNACKBAR(state) {
    state.snackbarColor = ''
    state.snackbarText = ''
    state.snackbar = false
  }
}

export const actions = {
  resetSnackbar({ state, commit }) {
    setTimeout(() => {
      commit('RESET_SNACKBAR')
    }, state.timeout + 500)
  },
  createSnackbar({ commit, dispatch }, payload) {
    commit('UPDATE_SNACKBAR', payload)
    dispatch('resetSnackbar')
  },
  snackbarError(text) {
    this.snackbarText = text
    this.snackbarColor = 'error'
    this.snackbar = true
    this.resetSnackbar()
  }
}
