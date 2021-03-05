<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <div class="text-center font--bold mb-3">
        CREATE NEW ROLE
      </div>

      <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="Name">
          <a-input v-model="name" allow-clear/>
        </a-form-item>
        <a-form-item label="Permission">
          <a-collapse>
            <a-collapse-panel  v-for="(e, index) in module" :key="index" :header="e">
              <template v-for="(p, index) in permission[e]"> 
                <check-select class="mb-4" :key="index" :permission="p" :module="e"/>
              </template>
            </a-collapse-panel>
          </a-collapse>
        </a-form-item>
      </a-form>

      <div class="w-100 text-center">
        <a-button class="create-button mt-3" type="primary" @click="createRole"> CREATE</a-button>
      </div>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
@import url("./style.scss");
</style>