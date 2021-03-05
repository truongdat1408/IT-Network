<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <!-- Table -->
      <a-table class="pt-4 admin-table" 
        @change="handleTableChange" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :pagination="pagination" bordered
        :row-key="record => record.id">
      <!-- Slot action -->
        <span slot="action" slot-scope="text, record">
          <div class="d-flex">
            <!-- Restore button -->
            <a-button @click="confirmRestore(record.id)"  type="primary">
              <a-icon type="rollback" />
            </a-button>
          </div>
        </span>

        <!-- slot createAt is here -->
        <span slot="deletedat" slot-scope="text, record">
          {{ changeStringToTime(record.deletedat) }}
        </span>

      </a-table>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");

</style>