import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const queryString = qs.stringify(state.query, {arrayFormat: 'repeat', encode: false})
      const response = await this.$axios.get(state.url + queryString, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_PAGINATION', {
        total: response.data.data.total, 
        current: parseInt(state.query.page), 
        pageSize: parseInt(state.query.limit)
      })
      commit('SET_LIST', response.data.data.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  },
  handleTableChange({ state, commit, dispatch }, { pagination, filters, sorter }) {
      var sortString = '';
      if(sorter.field){
          sortString = sorter.field + ',';
          if (sorter.order == 'ascend'){
              sortString += 'ASC'
          }else{
              sortString += 'DESC'
          }
      }else{
          sortString = 'updatedat,DESC';
      }
      
      try {
        commit('SET_QUERY', {page: pagination.current, sort: [sortString]})
        dispatch('fetchListData');
      } catch (err) {
        throw err
      }
  },
  async delete({ rootState, dispatch }, id) {
      try {
        await this.$axios.delete(`/jobs/${id}`, {
          headers: {
            Authorization: 'Bearer ' + rootState.auth.currentUser.token,
          }
        })
        dispatch('fetchListData');
      } catch (err) {
        throw err
      }
  },
  async restore({ rootState, dispatch }, id){
    try {
      await this.$axios.patch(`/jobs/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },
  async acceptAJob({ rootState, dispatch },id) {
    try {
      await this.$axios.put(`/jobs/active/${id}`, {id}, 
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  }, 
}