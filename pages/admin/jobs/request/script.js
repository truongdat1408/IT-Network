import moment from 'moment'
import { mapState } from 'vuex'

export default {
    layout: "admin", 
    middleware({store, query}) {
      store.commit('admin/jobs/SET_URL', '/jobs/inactive/all?')
      store.commit('admin/jobs/SET_QUERY', query)
      store.commit('admin/jobs/SET_LIST', [])
    }, //ok
    async fetch(){
        this.fetchData()
    }, // ok
    data(){
        return {
            columns: [
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'User\'s email',
                dataIndex: 'user.email',
                key: 'usersEmail',
              },
              {
                title: 'Created At',
                dataIndex: 'createdat',
                key: 'createdat',
                scopedSlots: { customRender: 'createdat' },
              }, 
              {
                title: 'Updated At',
                dataIndex: 'updatedat',
                key: 'updatedat',
                scopedSlots: { customRender: 'updatedat' },
              },
              {
                title: 'Action',
                key: 'action',
                scopedSlots: { customRender: 'action' },
              }
            ],
            visible: false,
            detailInfo: {},
        }
    }, //ok
    computed: {
      ...mapState({
        user: (state) => state.auth.currentUser,
        params: (state) => state.admin.jobs.query, 
        data: (state) => state.admin.jobs.list, 
        loading: (state) => state.admin.jobs.loading, 
        pagination: (state) => state.admin.jobs.pagination, 
      })
    }, //ok
    created(){
        this.$store.commit("admin/SET_BREADCRUMB", ["Jobs", "Request List"]);
        this.$router.push({name: this.$route.name, query: {...this.params} })
    }, //ok
    methods: {
      async handleTableChange(pagination, filters, sorter) {
        try {
            await this.$store.dispatch('admin/jobs/handleTableChange', { pagination, filters, sorter })
            this.$router.push({name: this.$route.name, query: {...this.params} })
        } catch (error) {
            this.handleError(error)
        }
      }, //ok
      handleCancel(){
        this.visible = false;
      }, //ok
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
      }, //ok
      async fetchData() {
          try {
            await this.$store.dispatch('admin/jobs/fetchListData')
            console.log(this.data);
          }
          catch(error) {
            this.handleError(error)
          }
      }, //ok
      changeStringToTime(valueToChange){
          return moment(String(valueToChange)).format('MM/DD/YYYY HH:mm')
      }, //ok
      viewDetail(record){
        this.detailInfo = {}
        this.visible = true
        this.detailInfo = record
      },
      async confirmDelete(id) {
          try {
            await this.$store.dispatch('admin/jobs/delete', id)
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
              `Deleted successfully!`
            });
          } catch (error) {
              this.handleError(error)
          }
        
      },
      async acceptAJob(id){
        try {
          await this.$store.dispatch('admin/jobs/acceptAJob', id)
        } catch (error) {
          this.handleError(error)
        }
      }
    }
}