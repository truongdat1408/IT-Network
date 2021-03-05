import { mapState, mapActions } from 'vuex'

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
      return {
        loginForm: {
          email: '',
          password: '',
        },
        rules: {
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
        }
      }
    },

    computed: {
      ...mapState ({
        isDisabled: (state) => state.auth.isDisabled,
      }),
    },
    
    methods: {
      ...mapActions('auth', ['login']),

      async loginSubmit(event) {
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            try {
              await this.login(this.loginForm)
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
      }
    },
  }