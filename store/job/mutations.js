export default {
    SET_LIST(state, data) {
      state.list = data
    },
  
    SET_LOADING(state, data) {
      state.loading = data
    },

    SET_QUERY(state, query) {
      state.query = { ...state.query, ...query }
    },
  
    RESET_QUERY(state, query) {
      state.query = { ...query }
    },

    SET_ONE_JOB(state, data) {
      state.oneJob = data
    },
  }