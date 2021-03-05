<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span v-if="record.profile && record.profile.name" slot="name" slot-scope="text, record">
          <span >{{ record.profile.name }}</span>
        </span>

        <span slot="role" slot-scope="text, record">
          <span >{{ record.role.role}}</span>
        </span>

        <span slot="profile" slot-scope="text, record">
          <a-button v-if="record.profile != null" @click="viewProfile(record)"  type="primary">
            View Profile
          </a-button>
          <span v-else></span>
        </span>

        <span slot="deletedat" slot-scope="text, record">
          <span v-if="record.deletedat != null"> {{ changeStringToTime(record.deletedat) }} </span>
        </span>

        <span slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure restore this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmRestore(record.id)"
          >
            <a-button type="danger">
              Restore
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

            <div v-if="profile.quantity" class="row">
              <p class="col-4 font--bold">Quantity:</p>
              <p class="col-8"> {{ profile.quantity }}</p>
            </div>

            <div v-if="profile.introduction" class="row">
              <p class="col-4 font--bold">Introduction:</p>
              <p class="col-8"> {{ profile.introduction }}</p>
            </div>
          </div>
        </a-modal>
      </div>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>