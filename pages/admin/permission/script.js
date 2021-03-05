import { mapState } from 'vuex'

export default {
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/permission/REMOVE_LIST')
    store.commit('admin/permission/SET_QUERY', {})
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
        {
          title: 'MODULE',
          dataIndex: 'module',
          key: 'module',
        },
      ], 
    }
  }, 
  computed: {
    ...mapState({
      data: (state) => state.admin.permission.list,
      loading: (state) => state.admin.permission.loading,
      params: (state) => state.admin.permission.query
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Permission", "List"]);
    this.$router.push({name: this.$route.name, query: {...this.params} })
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
        await this.$store.dispatch('admin/permission/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },
  }
}