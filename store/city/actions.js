export default {
  async getCity({ commit}) {
    try {
      const response = await this.$axios.get('https://vapi.vnappmob.com/api/province');
      commit('SET_LIST_CITY', response.data.results)
    }
    catch(err) {
      throw err;
    }
  },
}