import { mapState } from 'vuex'

export default {
  layout: 'profile',
  
  async fetch() {
    this.fetchData()
  },

  data() {
    let validatePassConfirm = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please confirm password'));
      } else if (value !== (this.form.password)) {
        callback(new Error("Invalid confirm password"));
      } else {
        callback();
      }
    };
    return {
      editPhone: false,
      phone: '',
      isEditPass: false, 
      form: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      }, 
      rules: {
        oldPassword: [
          { required: true, message: 'Please input old password', trigger: 'blur' },
        ],

        password: [
          { required: true, message: 'Please input new password', trigger: 'blur' },
        ],

        confirmPassword: [
          {
            required: true,
            validator: validatePassConfirm
          }
        ],
      },
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
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
        await this.$store.dispatch('auth/getFullInfo')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    editPhoneClick() {
      this.phone = this.user.profile.phone
      this.editPhone = true
    },

    addPhone() {
      this.editPhone = true
    },

    cancelPhone() {
      this.editPhone = false
      this.phone = ''
    }, 

    async submitPhone() {
      try {
        if(this.validatePhone(this.phone)) {
          const response = await this.$axios.patch('/auth/me/phone', {  phone: this.phone }, {
            headers: {
              Authorization: 'Bearer ' + this.currentUser.token,
            }
          })
          this.fetchData()
          this.editPhone = false
          this.$notification["success"]({
            message: 'SUCCESS',
            description:
            `Successful!`
          });
        }
        else {
          throw {
            message: "Phone number is invalid"
          }
        }
      } catch (error) {
        this.handleError(error)
      }
    }, 

    editPass() {
      this.isEditPass = true
    },

    cancelPass() {
      this.isEditPass = false
      this.form = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      }
    },

    submitPass() {
      this.$refs.ruleForm.validate(async valid => {
        if(valid) {
          try {
            await this.$store.dispatch('auth/changePass', this.form)
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
              `Successful!`
            });
            this.isEditPass = false
          } catch (error) {
            this.handleError(error)
          }
        }
        else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    validatePhone(value) {
      let regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      if(regexPhone.test(value)) return true
      else return false
    }
  }
}