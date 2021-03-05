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

  handleTableChange({ commit, dispatch }, { pagination, filters, sorter }) {
    try {
      var sortString = ''
      if(sorter.columnKey != undefined) {
        if(sorter.columnKey == "name") {
          sortString += 'profile.';
        }
        sortString  += sorter.columnKey + ',';
        if (sorter.order == 'ascend'){
          sortString += 'ASC'
        }else{
          sortString += 'DESC'
        }
      } else {
        sortString = 'updatedat,DESC'
      }
      commit('SET_QUERY', {page: pagination.current, sort: [sortString]})
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },

  async editRole({commit, rootState, dispatch }, {id, value}) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.put(`/users/${id}`,{ 
        roleId: value
        }, 
        {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_QUERY', {page: 1})
      dispatch('fetchListData');
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  },

  async create({commit, rootState, dispatch }, data) {
    try {
      commit('SET_LOADING_CREATE', true)
      const response = await this.$axios.post('/users', {
        roleId: parseInt(data.roleId),
        email: data.email, 
        password: data.password,
      }, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_QUERY', {page: 1})
      dispatch('fetchListData');
      commit('SET_LOADING_CREATE', false)
    } catch (err) {
      commit('SET_LOADING_CREATE', false)
      throw err
    }
  },

  async delete({ rootState, dispatch }, id) {
    try {
      const response = await this.$axios.delete(`/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },

  async identify({rootState, dispatch }, id) {
    try {
      const response = await this.$axios.put(`/users/identify/${id}`, {id}, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },

  async restore({rootState, dispatch }, id) {
    try {
      const response = await this.$axios.put(`/users/restore/${id}`, { id: id,} ,{
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