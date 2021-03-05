import moment from 'moment'
import { mapState } from 'vuex'

export default {
    layout: "admin", 
    middleware({store, query}) {
      store.commit('admin/jobs/SET_URL', '/jobs?')
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
                sorter: true,
              },
              {
                title: 'User\'s email',
                dataIndex: 'user.email',
                key: 'usersEmail',
                sorter: true,
              },
              {
                title: 'Created At',
                dataIndex: 'createdat',
                key: 'createdat',
                scopedSlots: { customRender: 'createdat' },
                sorter: true,
              }, 
              {
                title: 'Updated At',
                dataIndex: 'updatedat',
                key: 'updatedat',
                scopedSlots: { customRender: 'updatedat' },
                sorter: true,
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
        this.$store.commit("admin/SET_BREADCRUMB", ["Jobs", "List"]);
        this.$router.push({name: this.$route.name, query: {...this.params} })
    }, //ok
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
        }, //ok
        async fetchData() {
            try {
              await this.$store.dispatch('admin/jobs/fetchListData')
            }
            catch(error) {
              this.handleError(error)
            }
        }, //ok
        changeStringToTime(valueToChange){
            return moment(String(valueToChange)).format('MM/DD/YYYY HH:mm')
        }, //ok
        async handleTableChange(pagination, filters, sorter) {
            try {
                await this.$store.dispatch('admin/jobs/handleTableChange', { pagination, filters, sorter })
                this.$router.push({name: this.$route.name, query: {...this.params} })
            } catch (error) {
                this.handleError(error)
            }
        }, //ok
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
          
        }, //ok
        viewDetail(record){
            this.detailInfo = {}
            this.visible = true
            this.detailInfo = record
        }, //ok
        handleCancel(){
            this.visible = false;
        }, //ok
        async onSearch(value) {
          try{
            let query = {...this.params}
            if(value != '') {
              query.filter = `name||$contL||${value}`
              query.or = `user.email||$contL||${value}`
            }
            else {
              query.filter = undefined
              query.or = undefined
            }
            query.page = 1
            this.$store.commit('admin/jobs/SET_QUERY', query)
            this.$router.push({name: this.$route.name, query: {...this.params} })
            await this.$store.dispatch('admin/jobs/fetchListData')
          }
          catch (error) {
            this.handleError(error)
          }
        }, //ok 
    }
}