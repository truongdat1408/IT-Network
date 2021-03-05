import moment from 'moment'
import { mapState } from 'vuex'

export default {
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/category/SET_QUERY', query)
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
          },
          {
            title: 'Parent ID',
            dataIndex: 'parentId',
            key: 'parentId',
            scopedSlots: { customRender: 'parentId' },
          },
          {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
            sorter: true,
            scopedSlots: { customRender: 'createdat' },
          }, 
          {
            title: 'Updated At',
            dataIndex: 'updatedat',
            key: 'updatedat',
            sorter: true,
            scopedSlots: { customRender: 'updatedat' },
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },

      ],
      visible: false, 
      visibleCreate: false,
      formE: {
        name: '',
        parentId:'',
      },
      rules: {
        parentId: [{ required: true, message: 'Please select parentId', trigger: 'change'}],
        name:  [
          {
            required: true,
            message: 'Please input name',
          },
        ],
      },
      slug: '',
    };
  }, 

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      params: (state) => state.admin.category.query, 
      data: (state) => state.admin.category.list, 
      loading: (state) => state.admin.category.loading, 
      pagination: (state) => state.admin.category.pagination, 
      parentOptions: (state) => state.admin.category.listAll, 
      category: (state) => state.admin.category.category,
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
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
        await this.$store.dispatch('admin/category/fetchListData')
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
        await this.$store.dispatch('admin/category/handleTableChange', { pagination, filters, sorter })
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
    },

    async confirmDelete(slug) {
      try {
        await this.$store.dispatch('admin/category/delete', slug)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Deleted successfully!`
        });
      } catch (error) {
          this.handleError(error)
      }
    },

    async showModalEdit(record) {
      this.formE.parentId = []
      this.formE.name = ''
      this.visible = true;
      await this.$store.dispatch('admin/category/getOneCategory', record.id)
      this.formE.parentId[0] = this.category.parentId
      this.formE.name = this.category.name
      this.slug = this.category.slug
    },

    onChooseParentInEdit(id) {
      this.formE.parentId = id[id.length-1]
    },

    async handleOkEdit() {
      let slug = this.slug
      let obj = {
        name: this.formE.name, 
        parentId: ''
      }
      let parentId = this.formE.parentId[this.formE.parentId.length -1]
      try{
        if(parentId != '') {
          obj.parentId = parentId
        }else{
          obj.parentId = null
        }
        await this.$store.dispatch(('admin/category/edit'), {data: obj, slug})
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          'Edited Successfully!'
        });    
      }catch(error){
        this.handleError(error)
      }finally{
        this.visible = false
      }
    },

    async showCreateModal() {
      this.visibleCreate = true;
      this.formE.parentId = []
      this.formE.name = ''  
      await this.$store.dispatch('admin/category/fetchListAll')
      let listAll = this.mappingData(this.parentOptions)
      listAll.unshift({
        value: '', 
        label: "NULL", 
        children: []
      });
      this.$store.commit('admin/category/SET_LIST_ALL', listAll)
    },

    async handleOkCreate(e) {
      this.$refs.formE.validate(async valid => {
        if(valid) {
          try {
            if(this.formE.name != "") {
              let obj = {name: this.formE.name}
              let parentId = this.formE.parentId[this.formE.parentId.length -1]
              if(parentId != '') {
                obj.parentId = parentId
              }
              await this.$store.dispatch('admin/category/createOne',obj)
              this.visibleCreate = false;

              //Nếu create thành công
              this.$notification["success"]({
                message: 'Notification',
                description:
                  'Created Successfully!',
              }); 
            }
            else {
              throw {
                message: "You must type name!"
              }
            }
          }
          catch(error) {
            this.handleError(error)
          }
        }
        else {
          return false
        }
      });
    },

    async onSearch(value) {
      let query = {...this.params}
      if(value != '') {
        query.filter = `name||$contL||${value}`
      }
      else {
        query.filter = undefined
      }
      query.page = 1
      this.$store.commit('admin/category/SET_QUERY', query)
      await this.$store.dispatch('admin/category/fetchListData')
      this.$router.push({name: this.$route.name, query: {...this.params} })
    }, 

    mappingData(data, name) {
      var reformattedArray = data.map(obj =>{ 
        var rObj = {};
        rObj["value"] = obj.id
        rObj["label"] = obj.name
        if(rObj["label"] == name){
          rObj["disabled"] = true
        }
        if(obj.children) {
          rObj["children"] = this.mappingData(obj.children, name)
        }
        return rObj;
      });
      return reformattedArray
    },
  },
}