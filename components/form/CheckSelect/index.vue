<template>
  <div class="row ml-2 d-flex align-items-center">
    <div class="col-4">
      <a-checkbox v-model="checked" @change="onChange">
        {{ permission.action }}
      </a-checkbox>
    </div>

    <div class="col-6">
      <a-select v-model="form.possession" v-if="checked" style="width: 200px" @change="handleChange">
        <a-select-option value="ANY">
          ANY
        </a-select-option>
        <a-select-option value="OWN">
          OWN
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckSelect",
  props: ["permission", "module"],
  data() {
    return {
      checked: this.permission.posession != undefined ? true : false,
      form: {
        permissionId: this.permission.id,
        possession: this.permission.posession != undefined ? this.permission.posession : "ANY"
      }
    }
  },

  methods: {
    onChange(e) {
      if(this.checked) {
        this.$store.commit("admin/permission/PUSH_PERMISSION_ROLE", { ...this.form })
      }
      else {
        this.$store.commit("admin/permission/REMOVE_PERMISSION_ROLE", { ...this.form })
      }
    },

    handleChange(value) {
      this.$store.commit("admin/permission/SET_PERMISSION_ROLE", { ...this.form })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>