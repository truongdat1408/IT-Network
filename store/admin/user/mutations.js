export default {
  SET_URL(state, url) {
    state.url = url
  },

  SET_LIST(state, data) {
    state.list = data
  },

  SET_LOADING(state, status) {
    state.loading = status
  },

  SET_LOADING_CREATE(state, status) {
    state.loadingCreate = status
  },

  SET_PAGINATION(state, data) {
    state.pagination = { ...state.pagination, ...data }
  },

  RESET_PAGINATION(state, data) {
    state.pagination = { ...data }
  },

  SET_QUERY(state, query) {
    state.query = { ...state.query, ...query }
  },

  RESET_QUERY(state, query) {
    state.query = { ...query }
  },
}