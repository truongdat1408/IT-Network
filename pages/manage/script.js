import { mapState } from 'vuex'

export default {
  layout: 'manage',

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      jobType: "all"
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
      data: (state) => state.application.list,
      listJob: (state) => state.job.list,
      application: (state) => state.application.list
    }),
  },

  methods: {
    handleError(err) {
      if(err.response) {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.response.data.message
        });
      }
      else {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.message
        });
      }
    },
    
    async fetchData() {
      try {
        await this.$store.dispatch('auth/getFullInfo')
        await this.$store.dispatch('application/fetchListData')
        this.$store.commit('job/SET_QUERY', { filter: `user.id||$eq||${this.user.id}`})
        await this.$store.dispatch('job/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async accept(item) {
      try {
        let jobID = ''
        if(item.job != undefined) {
          jobID = item.job.id
        }
        else {
          jobID = this.jobType
        }
        await this.$store.dispatch('application/accept', {userId: item.id, id: jobID})
        await this.$store.dispatch('application/fetchListData')
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Accepted successfully!`
        });
      } catch (error) {
        this.handleError(error)
      }
    },

    async changeJob(value) {
      try {
        if(value == "all") await this.$store.dispatch('application/fetchListData')
        else await this.$store.dispatch('application/fetchByJob', { id: value})
      } catch (error) {
        this.handleError(error)
      }
    }, 
  }
}