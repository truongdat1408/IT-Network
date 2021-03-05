export default {
  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  },

  SET_DISABLED(state, disabled) {
    state.isDisabled = disabled
  },

  SET_USER(state, data) {
    state.user = data
  },

  SET_LOADING(state, data) {
    state.loading = data
  },
}