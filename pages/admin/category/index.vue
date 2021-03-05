<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <!-- Buttons -->
    <div class="d-flex justify-content-between">
      <!-- Button Create -->
      <a-button class="create-button" @click="showCreateModal" type="primary">
        <a-icon type="plus" /> CREATE</a-button>
      <!-- Search infomation   -->
      <a-input-search placeholder="Search name" 
      style="width: 300px" 
      allow-clear 
      :loading="loading"
      @search="onSearch" />
    </div>

    <!-- Create form -->
    <a-modal v-model="visibleCreate" title="CREATE ONE CATEGORY" @ok="handleOkCreate">
      <template>
        <a-form-model
        :model="formE"
        :rules="rules"
        ref="formE"
        >
          <a-form-model-item has-feedback label="Parent ID" prop="parentId" class="form-validate">
            <template>
              <a-cascader 
              :options="parentOptions" 
              change-on-select 
              v-model="formE.parentId" />
            </template>
          </a-form-model-item>

          <a-form-model-item label="Name" prop="name" class="form-validate">
            <a-input v-model="formE.name"/>
          </a-form-model-item>
        </a-form-model>
      </template>
    </a-modal>
    
    <!-- Table -->
      <a-table class="pt-4 admin-table" 
        @change="handleTableChange" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :pagination="pagination" bordered
        :row-key="record => record.id"
        >
        <!-- Slot action -->
        <span slot="action" slot-scope="text, record">
          <!-- Delete button  -->
          <div class="d-flex">
            <a-popconfirm class="mr-2" 
              placement="top" 
              ok-text="Yes" 
              cancel-text="No" 
              @confirm="confirmDelete(record.slug)">
              <template slot="title">
                <p><b>Are you sure to DELETE this?</b></p>
              </template>
              <a-button type="danger"><a-icon type="delete" /></a-button>
            </a-popconfirm>

            <!-- Edit button -->
            <a-button @click="showModalEdit(record)" type="primary"><a-icon type="edit" /></a-button>
          </div>
        </span><!-- slot action here -->

        <span slot="createdat" slot-scope="text, record">
          {{ changeStringToTime(record.createdat) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedat" slot-scope="text, record">
          {{ changeStringToTime(record.updatedat) }}
        </span><!-- slot createAt is here -->
      </a-table>
      
      <!-- modal edit  -->
          <a-modal v-model="visible" title="Edit Infomation" @ok="handleOkEdit()">
            <template>
              <a-form-model 
                :model="formE"
                ref="formE">      
                <a-form-model-item label="Name">
                  <a-input v-model="formE.name"/>
                </a-form-model-item>

                <a-form-model-item label="ParentID">
                  <a-input disabled=true v-model="formE.parentId[0]"/>
                </a-form-model-item>
              </a-form-model>
            </template>
          </a-modal>
      
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");

.create-button {
  background-color: #6B5B95;
  border-color: #6B5B95;
  width: 200px;
  height: 40px;
}
</style>