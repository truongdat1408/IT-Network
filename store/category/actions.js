import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/categories/all`)
      commit('SET_LIST', response.data.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  }, 
}