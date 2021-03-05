import moment from 'moment'
import { mapState } from 'vuex'

export default {
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/user/SET_URL', '/users/inactive?')
    store.commit('admin/user/SET_QUERY', query)
    store.commit('admin/user/SET_LIST', [])
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      profile: {},
      visible: false,
      columns: [
        {
          title: 'Name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          key: 'role',
          scopedSlots: { customRender: 'role' },
        },
        {
          title: 'Profile',
          key: 'profile',
          scopedSlots: { customRender: 'profile' },
          align: 'center'
        },
        {
          title: 'Deleted At',
          dataIndex: 'deletedat',
          key: 'deletedat',
          scopedSlots: { customRender: 'deletedat' },
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        },
      ],
    };
  }, 

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      params: (state) => state.admin.user.query, 
      data: (state) => state.admin.user.list, 
      loading: (state) => state.admin.user.loading,
      pagination: (state) => state.admin.user.pagination, 
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "Deleted List"]);
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
        await this.$store.dispatch('admin/user/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },


    async handleTableChange(pagination, filters, sorter) {
      try {
        await this.$store.dispatch('admin/user/handleTableChange', { pagination, filters, sorter })
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
    },

    async confirmRestore(id) {
      try {
        await this.$store.dispatch('admin/user/restore', id)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Restored successfully!`
        });
      } catch (error) {
        this.handleError(error)
      }
    }, 

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },

    viewProfile(record) {
      this.profile = record.profile
      this.visible = true;
    }, 

    handleCancel(e) {
      this.visible = false;
    },
  }
}