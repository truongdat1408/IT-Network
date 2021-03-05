import { mapState } from 'vuex'
import moment from 'moment'

export default {
  layout: 'profile',
  
  async fetch() {
    this.fetchData()
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
      job: (state) => state.job.oneJob
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
        await this.$store.dispatch('job/getOne', {id : this.$route.params.id})
      }
      catch(error) {
        this.handleError(error)
      }
    },

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY')
    },

    clickApply() {
      this.$notification["warning"]({
        message: 'WARNING',
        description:
          "This feature spend for employee!"
      });
    }
  }
}