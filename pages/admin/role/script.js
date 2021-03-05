import { mapState } from 'vuex'
import moment from 'moment'
import _ from 'lodash';

export default {
  layout: "admin",

  middleware({store}) {
    store.commit('admin/role/REMOVE_LIST')
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
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
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
          title: 'Permission',
          key: 'permission',
          scopedSlots: { customRender: 'permission' },
          className: 'text-center',
        }
      ],
      modalVisible: false,
      permissionRole: [],
      treeData: [],
      activeRecord: {}
    };
  }, 

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      data: (state) => state.admin.role.list, 
      loading: (state) => state.admin.role.loading, 
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Role", "List"]);
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
        await this.$store.dispatch('admin/role/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    }, 

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },

    createRole() {
      this.$router.push({path: "/admin/role/create"})
    },

    confirmDelete(id) { 
    }, 

    async getPermission(record) {
      try {
        this.activeRecord = record
        const response = await this.$axios.get(`/permission/${record.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.mappingData(response.data.data)
        this.modalVisible = true;
      } catch (error) {
        this.handleError(error)
      }
    },

    editUser() {
      this.$router.push(`/admin/role/edit/${this.activeRecord.id}`)
    },

    handleCancelModal() {
      this.modalVisible = false;
    },

    mappingData(data) {
      let grouped = _.mapValues(_.groupBy(data, 'module'),
                                    list => list.map(e => _.omit(e, 'module')))
      this.treeData = Object.keys(grouped);
      let i = 0;
      this.treeData = this.treeData.map(e => {
        let rObj = {};
        rObj["title"] = e 
        rObj["key"] = i;
        rObj["slot"] = { icon: 'key' }
        if(grouped[e]) {
          rObj["children"] = grouped[e].map(p => {
            let Obj = {};
            Obj["title"] = p.scope
            Obj["key"] = `${i}-${p.id}`;
            Obj["scopedSlots"] = { icon: 'permission' } 
            return Obj;
          })
        }
        i++;
        return rObj;
      });
    },
  }
}