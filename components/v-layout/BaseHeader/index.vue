<template>
  <a-layout-header class="d-flex justify-content-between align-items-center py-1 px-4 edit-header">
    <div class="d-flex align-items-center">
      <img src="/images/logo.svg" alt="">
    </div>

    <div class="d-flex align-items-center">
      <a-menu
        theme="dark"
        mode="horizontal"
        @click="handleClick"
        :defaultSelectedKeys= [getSelectedKey]
      >
        <a-menu-item key="/home">
          <a-icon type="user" />
        </a-menu-item>
        <a-menu-item key="/manage">
          <a-icon type="appstore" />
        </a-menu-item>
        <a-menu-item @click="logOut" key="3">
          <a-icon type="logout" />
        </a-menu-item>
      </a-menu>

      <div class="d-flex justify-content-between align-items-center mr-3">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="2"> <a-icon type="user" /> Profile</a-menu-item>
            <a-menu-item key="1" @click="logOut"> <a-icon type="logout" />Log out </a-menu-item>
          </a-menu>
            <div>
              <a-avatar style="border: 1.5px solid white;" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <a-icon type="down" />
            </div>
        </a-dropdown>    
      </div>
    </div>
  </a-layout-header>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseHeader',

  data() {
    return {
      
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    getSelectedKey() {
      return this.$route.path
    },
  },

  methods: {
    logOut () {
      localStorage.removeItem("currentUser")
      this.$store.commit('auth/SET_CURRENT_USER', null )
      this.$router.push("/login")
    },

    handleClick(e) {
      this.$router.push({ path: e.key })
    }
  }
}
</script>
