import moment from 'moment'
import { mapState } from 'vuex'

export default {
  layout: "admin", 
  middleware({store, query}) {
    store.commit('admin/jobs/SET_URL', '/jobs/softdelete/all?')
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
          title: 'Deleted At',
          dataIndex: 'deletedat',
          key: 'deletedat',
          scopedSlots: { customRender: 'deletedat' },
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
  }, 
  created(){
      this.$store.commit("admin/SET_BREADCRUMB", ["Jobs", "Deleted List"]);
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
          await this.$store.dispatch('admin/jobs/fetchListData')
        }
        catch(error) {
          this.handleError(error)
        }
    }, 
    changeStringToTime(valueToChange){
        return moment(String(valueToChange)).format('MM/DD/YYYY HH:mm')
    }, 
    async handleTableChange(pagination, filters, sorter) {
      try {
        await this.$store.dispatch('admin/jobs/handleTableChange', { pagination, filters, sorter })
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
    },
    async confirmRestore(id){
      try {
        await this.$store.dispatch('admin/jobs/restore', id)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Restored successfully!`
        });
      } catch (error) {
          this.handleError(error)
      }
    },
  }
}