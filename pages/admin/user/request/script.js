import { mapState } from 'vuex'
import moment from 'moment'

export default {
    layout: "admin",

    middleware({store, query}) {
      store.commit('admin/user/SET_URL', '/users/unauthorized?')
      store.commit('admin/user/SET_QUERY', query)
    },

    async fetch() {
      this.fetchData()
    },

    data() {
      return {
        columns: [
            {
              title: 'Name',
              scopedSlots: { customRender: 'name' },
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Phone',
              scopedSlots: { customRender: 'phone' },
            },
            {
              title: 'Created At',
              dataIndex: 'createdat',
              key: 'createdat',
              scopedSlots: { customRender: 'createdat' },
            },
            {
              title: 'Profile',
              key: 'profile',
              scopedSlots: { customRender: 'profile' },
              align: 'center'
            },
            {
              title: 'Action',
              key: 'action',
              scopedSlots: { customRender: 'action' },
              align: 'center'
            },
        ],
        profile: {},
        visible: false, 
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
      this.$store.commit("admin/SET_BREADCRUMB", ["User", "Request List"]);
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
  
      viewProfile(record) {
        this.profile = record.profile
        this.visible = true;
      }, 
  
      async confirm(id) {
        try {
          await this.$store.dispatch('admin/user/identify', id)
        } catch (error) {
          this.handleError(error)
        }
      }, 
  
      changeStringToTime(valueToChange){
        return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
      },
  
      handleCancel(e) {
        this.visible = false;
      },
    }
  }