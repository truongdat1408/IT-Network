export default {
  SET_LIST(state, data) {
    state.list = data
  },

  SET_LIST_ALL(state, data) {
    state.listAll = data
  },

  SET_LOADING(state, status) {
    state.loading = status
  },

  SET_PAGINATION(state, data) {
    state.pagination = { ...state.pagination, ...data }
  },

  SET_QUERY(state, query) {
    state.query = { ...state.query, ...query }
  },

  SET_ONE_CATEGORY(state, data) {
    state.category = data
  },
}