import CheckSelect from '@/components/form/CheckSelect'
import { mapState } from 'vuex'
import _ from 'lodash';

export default {
  layout: "admin",

  components: {
    CheckSelect,
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      name: this.$route.params.role,
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
      activePermissionRole: []
    };
  }, 

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Role", "Edit"]);
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
        this.permission = this.mappingData(this.data, "module")
        this.module = this.getListKeys(this.permission)
        //permission role
        const response = await this.$axios.get(`/permission/${this.$route.params.role}`, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.activePermissionRole = this.mappingData(response.data.data, "id")
        this.joinData();
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async updateRole() {
      try {
        let arr = this.permissionPosession.map(p => {
          p = {
            permissionId: p.permissionId,
            posession: p.possession
          }
          return p
        })
        let params = { ...this.$route.params}
        const response = await this.$axios.put(`permission/${params.role}`, arr, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.$router.push("/admin/role")
        
      } catch (error) {
        this.handleError(error)
      }
    },

    mappingData(data, key) {
      return _.mapValues(_.groupBy(data, key), list => list.map(e => _.omit(e, key)))
    },
    
    getListKeys(data) {
      return Object.keys(data)
    },

    joinData() {
      let array = []
      this.module.forEach(e => {
        this.permission[e] = this.permission[e].map(p => {
          if(this.activePermissionRole[`${p.id}`]) {
            p = { 
              id: p.id, 
              action: this.activePermissionRole[`${p.id}`][0].action,
              posession: this.activePermissionRole[`${p.id}`][0].posession
            }

            array.push({
              permissionId: p.id,
              possession: this.activePermissionRole[`${p.id}`][0].posession
            })
          }
          return p;
        })
      });
      this.$store.commit("admin/permission/SET_PERMISSION", array)
    }, 
  }
}