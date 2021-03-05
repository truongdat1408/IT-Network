import CheckSelect from '@/components/form/CheckSelect'
import { mapState } from 'vuex'
import _ from 'lodash';

export default {
  layout: "admin",

  components: {
    CheckSelect,
  },

  middleware({store}) {
    store.commit('admin/permission/RESET_PERMISSION_ROLE')
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      name: '',
      permission: [],
      module: [],
      query: {
        page: "1", 
        limit: "10", 
        sort: [
          'updatedat,DESC'
        ], 
        or: undefined, 
        filter: undefined
      },
    };
  }, 

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Role", "Create"]);
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      data: (state) => state.admin.permission.list, 
      loading: (state) => state.admin.permission.loading, 
      permissionPosession: (state) => state.admin.permission.permissionPosession
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
        await this.$store.dispatch('admin/permission/fetchListData')
        this.mappingData()
        
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async createRole() {
      try {
        await this.$store.dispatch('admin/role/createRole', {
          role: this.name,
          permissionPosession: this.permissionPosession
        })
        this.$router.push({path: "/admin/role", query: { ...this.query } })
      } catch (error) {
        this.handleError(error)
      }
    },

    mappingData() {
      this.permission = _.mapValues(_.groupBy(this.data, 'module'),
                          list => list.map(e => _.omit(e, 'module')))
      this.module = Object.keys(this.permission)
    }
  }
}