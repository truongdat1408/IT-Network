import { mapActions, mapState } from 'vuex'

export default {
    layout: 'fullpage',
    middleware: 'notAuth',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('Please input password'));
        } else {
          callback();
        }
      };
  
      let validateName = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('Please input name'));
        } else {
          callback();
        }
      };
  
      let validatePassConfirm = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('Please confirm password'));
        } else if (value !== (this.registerForm.password)) {
          callback(new Error("Invalid confirm password"));
        } else {
          callback();
        }
      };
  
      return {
        type: 'employee',
        registerForm: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        rules: {
          name:  [{ required: true, validator: validateName }],
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
        }
      }
    },

    computed: {
      ...mapState ({
        isDisabled: (state) => state.auth.isDisabled,
      }),
    },

    methods: {
      ...mapActions('auth', ['register']),

      async registerSubmit(event) {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            try {
              await this.register(this.registerForm)
              this.$router.push('/')
            }
            catch(e) {
              if(e.response) {
                this.$notification["error"]({
                  message: 'ERROR',
                  description:
                    e.response.data.message
                });
              }
              else {
                this.$notification["error"]({
                  message: 'ERROR',
                  description:
                    e.message
                });
              }
            }
          } else {
            return false;
          }
        });
      },
  
      changeType(e) {
        if(e.target.value == "company") {
          this.$router.push("/register/company");
        }
        if(e.target.value == "employee") {
          this.$router.push("/register");
        }
      }
    },
  }