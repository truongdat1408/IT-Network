import EditableCell from '@/components/table/EditableCell';
import { mapState } from 'vuex'

export default {
  components: {
    EditableCell,
  },
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/user/SET_URL', '/users?')
    store.commit('admin/user/SET_QUERY', query)
    store.commit('admin/user/SET_LIST', [])
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please input password'));
      } else {
        callback();
      }
    };

    let validatePassConfirm = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please confirm password'));
      } else if (value !== (this.formCreate.password)) {
        callback(new Error("Invalid confirm password"));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          sorter: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: true,
        },
        {
          title: 'Role',
          key: 'role',
          scopedSlots: { customRender: 'role' },
        },
        {
          title: 'Active',
          dataIndex: 'active',
          key: 'active',
          scopedSlots: { customRender: 'active' },
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
      visibleDrawerCreate: false,
      formCreate: {
        email: '',
        password: '',
        confirmPassword: '',
        roleId: undefined,
      },
      rules: {
        roleId: [{ required: true, message: 'Please select role', trigger: 'change'}],
        email:  [
          {
            type: 'email',
            message: 'Invalid email',
          },
          {
            required: true,
            message: 'Please input email',
          },
        ],
        password: [
          { 
            required: true,
            validator: validatePass, 
          }
        ],

        confirmPassword: [
          {
            required: true,
            validator: validatePassConfirm
          }
        ], 
      },
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      params: (state) => state.admin.user.query, 
      listRole: (state) => state.admin.role.list, 
      data: (state) => state.admin.user.list, 
      loading: (state) => state.admin.user.loading, 
      pagination: (state) => state.admin.user.pagination, 
      loadingCreate: (state) => state.admin.user.loadingCreate
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "List"]);
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

    async fetchRole() {
      try {
        await this.$store.dispatch('admin/role/fetchListData')
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

    handleCancel(e) {
      this.visible = false;
    },

    async confirmDelete(id) {
      try {
        await this.$store.dispatch('admin/user/delete', id)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Deleted successfully!`
        });
      } catch (error) {
        this.handleError(error)
      }
    }, 

    async showDrawerCreate() {
      this.visibleDrawerCreate = true;
      this.fetchRole()
    }, 

    onCloseCreate() {
      this.visibleDrawerCreate = false;
      this.$refs.formCreate.resetFields();
    },

    async confirmContributor(id) {
      try {
        await this.$store.dispatch('admin/user/identify', id)
      } catch (error) {
        this.handleError(error)
      }
    }, 

    async createUser() {
      this.$refs.formCreate.validate(async valid => {
        if(valid) {
          try {
            if(this.formCreate.confirmPassword != undefined) {
              delete this.formCreate.confirmPassword
              await this.$store.dispatch('admin/user/create', this.formCreate)
              this.visibleDrawerCreate = false;
              this.$refs.formCreate.resetFields();
            }
            else {
              throw {
                message: "You must confirm password!"
              }
            }
          }
          catch(error) {
            this.loadingCreate = false
            this.handleError(error)
          }
        }
        else {
          return false
        }
      });
    }, 

    async changeRole(object, value) {
      try {
        if(object.roleId != value) {
          await this.$store.dispatch('admin/user/editRole', {id: object.id, value})
          this.$router.push({name: this.$route.name, query: {...this.params} })
        }
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async onSearch(value) {
      try {
        let query = {...this.params}
        if(value != '') {
          query.filter = `profile.name||$contL||${value}`
          query.or = `email||$contL||${value}`
        }
        else {
          query.filter = undefined
          query.or = undefined
        }
        query.page = 1
        this.$store.commit('admin/user/SET_QUERY', query)
        this.$router.push({name: this.$route.name, query: {...this.params} })
        await this.$store.dispatch('admin/user/fetchListData')
      } catch (error) {
        this.handleError(error)
      }
    }, 
  }
};