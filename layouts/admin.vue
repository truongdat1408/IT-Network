<template>
  <a-layout>
    <SidebarAdmin :collapsed="collapsed"/>
    <AdminHeader :collapsed="collapsed" @toggleSidebar="collapsed = !collapsed" :breadcrumb="getBreadcrumb">
      <nuxt keep-alive />
    </AdminHeader>
  </a-layout>
</template>

<script>
import SidebarAdmin from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';
export default {
  components: {
    SidebarAdmin,
    AdminHeader,
  },
  middleware: "adminAuth",
  data() {
    return {
      collapsed: false,
    }
  },
  computed:{
    getBreadcrumb() {
      return this.$store.state.admin.breadcrumb
    }, 
  }
}
</script>

<style>

</style>