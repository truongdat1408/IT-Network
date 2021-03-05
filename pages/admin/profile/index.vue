<template>
  <a-layout
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
  >

    <!-- Sider layout -->
    <a-layout-sider width="200" style="background: #fff">
      <div class="al-sidebar">
        <div class="logo d-flex align-items-center al-border-bottom al-border-right">
          <a-avatar :size="50" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <div class="d-flex flex-column pl-2 justify-content-between">
            <h4>Username is here</h4>
          </div>
        </div>

        <a-menu
          style="width: 200px; min-height: 100vh;"
          :default-selected-keys="['1']"
          mode="inline"
          theme="light"
        >
          <a-sub-menu key="account">
            <span slot="title"><a-icon type="user" /><span>My profile</span></span>
            <a-menu-item key="1">
              <nuxt-link to="/admin/profile"> Resume</nuxt-link>
            </a-menu-item>
            <a-menu-item key="2">
              Change password
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="3">
            <nuxt-link to="/admin/profile"> <a-icon type="logout" /> Logout</nuxt-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>

      <!-- Profile information's mapped to Sider layout  -->
      <a-layout style="padding: 12px 12px 12px" class="profile">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <div class="al-border-bottom">
            <h3>My Profile</h3>
          </div>
          <a-form-model
            class="pt-3"
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <div class="d-flex mb-5">
              <div class="profile-author-thumb m-auto">
                <img alt="author" style="width: 150px; height: 150px;" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                <div class="edit-dp">
                  <label class="fileContainer">
                    <i v-if="upload" class="fa fa-camera"></i>
                    <a-spin v-else>
                      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                    </a-spin>

                    <!-- @change="previewFiles" -->
                    <input type="file">
                  </label>
                </div>
              </div>
            </div>
            
            <a-form-model-item label="Email" prop="email">
              <a-input disabled v-model="form.email"/>
            </a-form-model-item>

            <a-form-model-item label="Name" prop="name">
              <a-input v-model="form.name"/>
            </a-form-model-item>

            <a-form-model-item label="Created at" prop="createdat">
              <a-input disabled v-model="form.createdat"/>
            </a-form-model-item>

            <a-form-model-item label="Updated at" prop="updatedat">
              <a-input disabled v-model="form.updatedat"/>
            </a-form-model-item>

            <a-form-model-item >
              <!-- @click="onSubmit" -->
              <a-button :loading="isLoading" :disabled="isDisabled" type="primary">
                Save
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");

</style>