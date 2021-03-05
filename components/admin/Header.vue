<template>
  <a-layout>
    <a-layout-header id="admin-header">
      <a-row type="flex" class="justify-content-between">

        <!-- Icon trigger sidebar -->
        <a-col class="d-flex justify-content-center align-items-center">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleSidebar"
          />

          <a-breadcrumb>
            <a-breadcrumb-item class="font--18" v-for="(item, index) in breadcrumb" :key="index">
              {{ item }}
            </a-breadcrumb-item>  
          </a-breadcrumb>
        </a-col>

        <!-- User dropdown -->

        <a-col>
          <template>
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="2" @click="showUser"> <a-icon type="user" />Profile</a-menu-item>
                <a-menu-item key="1" @click="logOut"> <a-icon type="logout" />Log out </a-menu-item>
              </a-menu>
               <div>
                 <a-avatar style="border: 1.5px solid purple;" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                 <a-icon type="down" />
               </div>
            </a-dropdown>
          </template>
        </a-col>

      </a-row>
    </a-layout-header>
    <nuxt/>
  </a-layout>
</template>

<script>

export default {
  props: ["collapsed", "breadcrumb"],
  data() {
    return {
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },

    showUser() {
      this.$router.push('/admin/profile')
    }, 
    logOut() {
      localStorage.removeItem("currentUser")
      this.$store.commit('auth/SET_CURRENT_USER', null )
      this.$router.push("/admin/login")
    }
  },
}
</script>

<style lang="scss" scoped>
.sub-dropdown {
  width: 100px;
}

#admin-header .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#admin-header .trigger:hover {
  color: #1890ff;
}

#admin-header {
  background: #fff;
  padding: 0
}
</style>