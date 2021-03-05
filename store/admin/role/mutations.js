export default {
  SET_LIST(state, data) {
    state.list = data
  },

  REMOVE_LIST(state) {
    state.list = []
  },

  SET_LOADING(state, data) {
    state.loading = data
  },
}