import { mapState } from 'vuex'
import moment from 'moment'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },

  async fetch() {
    this.fetchData()
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      currentUser: (state) => state.auth.currentUser,
      data: (state) => state.category.list, 
      listCity: (state) => state.city.listCity,
      job: (state) => state.job.oneJob
    }),
  },

  data() {
    let validateHighestWage = (rule, value, callback) => {
      if (!parseInt(value)) {
        callback(new Error('Please input highest wage'));
      } else if (parseInt(value) < parseInt(this.form.lowestWage)) {
        callback(new Error("Highest wage must greater than lowest wage"));
      } else {
        callback();
      }
    };

    let validateLowestWage = (rule, value, callback) => {
      if (!parseInt(value)) {
        callback(new Error('Please input lowest wage'));
      } else if (parseInt(value) > parseInt(this.form.highestWage)) {
        callback(new Error("Lowest wage must less than highest wage"));
      } else {
        callback();
      }
    };

    return {
      listCate: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      upload: true,
      isLoading: false,
      isDisabled: false,
      form: {
        name: null,
        lowestWage: '',
        highestWage: '',
        type: undefined,
        experience: '',
        cateIds: undefined,
        deadline: undefined,
        city: undefined,
        street: null,
        introImg: null,
        content: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input name job', trigger: 'blur' },
        ],
        highestWage: [
          { 
            required: true,
            validator: validateHighestWage, 
          },
        ],

        lowestWage: [
          { 
            required: true,
            validator: validateLowestWage, 
          },
        ],
        type: [{ required: true, message: 'Please select type job', trigger: 'blur' }],
        cateIds: [{ required: true, message: 'Please select category job', trigger: 'blur' }],
        deadline: [{ required: true, message: 'Please pick a date', trigger: 'blur' }],
        city: [{ required: true, message: 'Please select city', trigger: 'blur' }],
        street: [{ required: true, message: 'Please input street', trigger: 'blur' }],
        introImg: [{ required: true, message: 'Please select image', trigger: 'blur' }],
        content: [{ required: true, message: 'Please input content job', trigger: 'blur' }],
        description: [{ required: true, message: 'Please input description job', trigger: 'blur' }],
      },

      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ font: [] }],
            [{ align: [] }]
          ]
        }
      },
    }
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
        await this.$store.dispatch('job/getOne', {id : this.$route.params.id})
        await this.$store.dispatch('category/fetchListData')
        await this.$store.dispatch('city/getCity')
        this.mappingData()
      }
      catch(error) {
        this.handleError(error)
      }
    },

    mappingData() {
      this.form = {
        name: this.job.name,
        lowestWage: this.job.lowestWage,
        highestWage: this.job.highestWage,
        type: this.job.type,
        experience: this.job.experience != null ? this.job.experience : '',
        cateIds: this.getCateJob(this.job.categories),
        deadline: moment(this.job.deadline, 'YYYY-MM-DD'),
        city: this.job.address.city,
        street: this.job.address.description,
        introImg: this.job.introImg,
        content: this.job.content,
        description: this.job.description,
      }
    },

    getCateJob(data) {
      let arr = []
      data.forEach(e => {
        arr.push(e.id)
      });
      return arr;
    },

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('YYYY-MM-DD')
    },

    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            this.isDisabled = true;
            await this.$store.dispatch('job/update', {data: {...this.form, deadline: this.changeStringToTime(this.form.deadline)}, id: this.$route.params.id})
            this.isDisabled = false;
            this.$router.push("/home/job")
          } catch (error) {
            this.isDisabled = false;
            this.handleError(error)
          }
        } else {
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    removeImage() {
      this.form.introImg = null
    },

    async previewFiles(event) {
      this.isDisabled = true
      this.upload = false
      const data = new FormData()
      try {
        data.append('file', event.target.files[0]);
        const response = await this.$axios.post(`/upload`, data)
        this.form.introImg = response.data.data.url
        this.isDisabled = false
        this.upload = true
      } catch (error) {
        this.isDisabled = false
        this.upload = true
        this.handleError(error)
      }
    },
  }
}