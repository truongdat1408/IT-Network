<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo d-flex align-items-center">
        <img src="/images/logo.svg" :width="getWidthLogo" alt="" height="100%">
        <div v-if="showNameCompany" class="pl-3 font--bold color-white font---text text-spacing">CAREER NETWORK</div>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys= [getSelectedKey] @click="handleClick" >
        
        
        <a-sub-menu key="user">
          <span slot="title"><a-icon type="user" /> <span>User</span></span>
          <a-menu-item key="/admin/user">
            <span>List User</span>
          </a-menu-item>

          <a-menu-item key="/admin/user/request">
            <span>Company Request</span>
          </a-menu-item>

          <a-menu-item key="/admin/user/deleted">
            <span>Deleted User</span>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/admin/category">
          <a-icon type="appstore" />
          <span>Category</span>
        </a-menu-item>

        <a-menu-item key="/admin/role">
          <a-icon type="apartment" />
          <span>Role</span>
        </a-menu-item>

        <a-menu-item key="/admin/permission">
          <a-icon type="key" />
          <span>Permisson</span>
        </a-menu-item>

        <a-sub-menu key="jobs">
          <span slot="title"><a-icon type="profile" /> <span>Jobs</span></span>
          <a-menu-item key="/admin/jobs">
            <span>List Jobs</span>
          </a-menu-item>

          <a-menu-item key="/admin/jobs/request">
            <span>Job Request</span>
          </a-menu-item>

          <a-menu-item key="/admin/jobs/deleted">
            <span>Deleted Jobs</span>
          </a-menu-item>
        </a-sub-menu>

        <!-- <a-sub-menu key="articles">
          <span slot="title"><a-icon type="file-text" /> <span>Articles</span></span>
          <a-menu-item key="/admin/articles">
            <span>List Articles</span>
          </a-menu-item>

          <a-menu-item key="/admin/articles/deleted">
            <span>Deleted Articles</span>
          </a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
  props: ["collapsed"],
  data() {
    return {
      query: {
        page: "1", 
        limit: "10", 
        sort: [
          'updatedat,DESC'
        ], 
        or: undefined, 
        filter: undefined
      }, 
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    }
  },
  computed: {
    getSelectedKey() {
      return this.$route.path
    },

    showNameCompany() {
      if(this.collapsed) {
        return false;
      }
      else{
        return true;
      }
    }, 
    getWidthLogo() {
      if(this.collapsed) {
        return "100%";
      }
      else{
        return "";
      }
    }
  },
  methods: {
    handleClick(e) {
      if(e.key.startsWith('/admin/user')) {
        this.$store.commit('admin/user/RESET_PAGINATION', this.pagination)
        this.$store.commit('admin/user/RESET_QUERY', this.query)
      }
      this.$router.push({path: e.key, query: { ...this.query } })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 64.25px;
  padding: 16px;
}
</style>