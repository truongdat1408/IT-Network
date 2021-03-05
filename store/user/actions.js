import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/auth/me`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_USER', response.data.data.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  }, 
}