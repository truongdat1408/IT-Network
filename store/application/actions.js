import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.get(`/jobs/applied`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      let arr = []
      console.log(response);
      response.data.data.forEach(e => {
        let job = {
          name: e.name, 
          id: e.id
        }
        if(e.appliedBy.length > 0) {
          e.appliedBy.forEach(p => {
            arr.push({...p.user, job, status: p.status})
          })
        }
      });
      console.log(arr);
      commit('SET_LIST', arr)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async fetchByJob({state, commit, rootState}, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.get(`/jobs/applied/${data.id}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      let arr = []
      response.data.data.forEach(e => {
        arr.push({...e, status: e.applied.status})
      })
      console.log(arr)
      commit('SET_LIST', arr)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async accept({state, commit, rootState}, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.put(`/jobs/accept/${data.id}`, {userId: data.userId}, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      console.log(response);
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  },  
}