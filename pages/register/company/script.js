import {mapActions, mapState} from 'vuex'

export default {
  layout: 'fullpage',
  middleware: 'notAuth',

  async fetch() {
    this.fetchData()
  },

  data() {
    let validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please input name of company'));
      } else {
        callback();
      }
    };

    return {
        type: 'company',
        registerForm: {
          name: '',
          email: '',
          phone: '',
          city: [],
          website: undefined,
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
              message: 'Please input email company',
            },
          ],
          phone: [{
            required: true, message: 'Please input phone of company'
          }],
          city: [{
            required: true, message: 'Please select company headquarters'
          }]
        }
    }
  },

  computed: {
    ...mapState ({
      listCity: (state) => state.city.listCity,
      isDisabled: (state) => state.auth.isDisabled,
    }),
  },

  methods: {
    ...mapActions('auth', ['registerCompany']),

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
          await this.$store.dispatch('city/getCity')
        }
        catch(error) {
          this.handleError(error)
        }
    },

    registerSubmit(event) {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          try {
            if(this.registerForm.city == undefined) {
              delete this.registerForm.city
            }
            await this.registerCompany(this.registerForm)
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
                "The account will be confirmed and responded to the company soon"
            });
            this.$router.push("/login")
          }
          catch(error) {
            this.handleError(error)
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