<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <div class="d-flex justify-content-between">
        <a-button class="create-button" @click="showDrawerCreate" type="primary"><a-icon type="plus" /> CREATE</a-button>
        <a-input-search placeholder="Search name, email" style="width: 300px" allow-clear @search="onSearch" />
      </div>

      <a-table 
        class="pt-4 admin-table" 
        @change="handleTableChange" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :pagination="pagination" 
        :row-key="record => record.id"
        bordered
      >
        <span v-if="record.profile && record.profile.name" slot="name" slot-scope="text, record">
          <span >{{ record.profile.name }}</span>
        </span>

        <span slot="role" slot-scope="text, record">
           <editable-cell :text="record.role" @change="changeRole(record, $event)" @getRole="fetchRole"></editable-cell>
        </span>

        <span slot="active" slot-scope="text, record">
          <span v-if="record.roleId == 4 && record.active != true">
            <a-popconfirm
              class="mr-2"
              title="Are you sure accept this company?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmContributor(record.id)"
            >
              <a-button class="cn-btn-success" type="success">
                Accept
              </a-button>
            </a-popconfirm>
          </span>

          <span v-else> Active</span>
        </span>

        <span slot="profile" slot-scope="text, record">
          <a-button v-if="record.profile != null" @click="viewProfile(record)"  type="primary">
            View Profile
          </a-button>
          <span v-else></span>
        </span>

        <span slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure delete this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmDelete(record.id)"
          >
            <a-button type="danger">
              <a-icon type="delete" />
            </a-button>
          </a-popconfirm>
        </span>
      </a-table>

      <div>
        <a-modal width="450px" v-model="visible" title="Profile Detail">
          <template slot="header" style="background-color: black;">

          </template>
          <template slot="footer">
            <a-button key="back" @click="handleCancel">
              Back
            </a-button>
            <a-button key="submit" type="primary" style="display: none;">
              Submit
            </a-button>
          </template>

          <div class="d-flex align-items-center justify-content-center avatar-modal">
            <a-avatar style="border: 2px solid purple;" shape="square" :size="128" :src="profile.profileUrl" />
          </div>

          <div class="d-flex flex-column mt-3 px-4">
            <div class="row">
              <p class="col-4 font--bold">Name:</p>
              <p class="col-8"> {{ profile.name }}</p>
            </div>

            <div v-if="profile.phone" class="row">
              <p class="col-4 font--bold">Phone:</p>
              <p class="col-8"> {{ profile.phone }}</p>
            </div>
            
            <div v-if="profile.pageURL" class="row">
              <p class="col-4 font--bold">Website:</p>
              <p class="col-8"> <a :href="profile.pageURL" target="_blank">{{ profile.pageURL }}</a></p>
            </div>

            <div v-if="profile.cvURL" class="row">
              <p class="col-4 font--bold">CV:</p>
              <p class="col-8"> <a :href="profile.cvURL" target="_blank">{{ profile.cvURL }}</a></p>
            </div>

            <div v-if="profile.experience" class="row">
              <p class="col-4 font--bold">Experience:</p>
              <p class="col-8"> {{ profile.experience }}</p>
            </div>

            <div v-if="profile.salaryRange" class="row">
              <p class="col-4 font--bold">Salary Range:</p>
              <p class="col-8"> {{ profile.salaryRange }}</p>
            </div>

            <div v-if="profile.introduction" class="row">
              <p class="col-4 font--bold">Introduction:</p>
              <p class="col-8"> {{ profile.introduction }}</p>
            </div>
          </div>
        </a-modal>
      </div>

      <a-drawer
        title="Create new user"
        placement="right"
        :width="360"
        :visible="visibleDrawerCreate"
        @close="onCloseCreate"
      >
        <a-form-model
          ref="formCreate"
          :model="formCreate"
          :rules="rules"
        >
          <a-form-model-item has-feedback prop="email" class="mb-2 form-validate">
            <a-input placeholder="Email" v-model="formCreate.email"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="roleId" class="mb-2  form-validate">
            <a-select v-model="formCreate.roleId" placeholder="Role">
              <template v-for="(role, index) in listRole">
                <a-select-option v-if="(user.roleId == 1 && role.id != 1) || (user.roleId != 1 && role.id != 1 && role.id != 2)" :key="index" :value="`${role.id}`">
                  {{role.role}}
                </a-select-option> 
              </template> 
            </a-select>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="password" class="mb-2  form-validate" >
            <a-input type="password" v-model="formCreate.password" autocomplete="off" placeholder="Password"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="confirmPassword" class="mb-2  form-validate" >
            <a-input type="password" v-model="formCreate.confirmPassword" autocomplete="off" placeholder="Confirm password"/>
          </a-form-model-item>
        </a-form-model>

        <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onCloseCreate">
            Cancel
          </a-button>
          <a-button :loading="loadingCreate"  type="primary" @click="createUser">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>