<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table 
        class="pt-4 admin-table" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :row-key="record => record.id"
        bordered
      >
      </a-table>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>