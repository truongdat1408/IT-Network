export default {
  layout: "admin",
  data() {
    return {
      form: {
        name: '', 
        email: '',
        createdat: '', 
        updatedat: '',
      },
      upload: true, 
    };
  }, 
  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Profile"])
    //getProfile()
  },
  methods: {
    // getProfile(){
      
    // }
  },
}