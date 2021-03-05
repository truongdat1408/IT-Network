<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <a-input-search placeholder="Search name, user's email" 
      style="width: 300px" 
      allow-clear 
      @search="onSearch" 
      :loading="loading" />
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
            <!-- Delete button  -->
            <a-popconfirm class="mr-2" placement="top" 
              ok-text="Yes" 
              cancel-text="No" 
              @confirm="confirmDelete(record.id)">
              <template slot="title">
                <p><b>Are you sure to DELETE this?</b></p>
              </template>
              <a-button type="danger"><a-icon type="delete" /></a-button>
            </a-popconfirm>
            <!-- detail button -->
            <a-button @click="viewDetail(record)"  type="primary">
              View Detail
            </a-button>
          </div>
        </span>

        <span slot="createdat" slot-scope="text, record">
          {{ changeStringToTime(record.createdat) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedat" slot-scope="text, record">
          {{ changeStringToTime(record.updatedat) }}
        </span><!-- slot createAt is here -->
      </a-table>
      
      <!-- modal detail information-->
      <!-- Button of detail form -->
      <div>
        <a-modal width="1000px" v-model="visible" title="Detail information">
          <template slot="header" style="background-color: black;">

          </template>
          <template slot="footer">
            <a-button key="close" @click="handleCancel">
              Close
            </a-button>
            <a-button key="submit" type="primary" style="display: none;">
              Submit
            </a-button>
          </template>

          <!-- Entire detail information of a record -->
          <div class="d-flex align-items-center justify-content-center avatar-modal">
            <a-avatar style="border: 2px solid purple;" shape="square" :size="128" :src="detailInfo.introImg" />
          </div>

          <div class="d-flex flex-column mt-3 px-4">
            <div class="row">
              <p class="col-4 font--bold">Name:</p>
              <p class="col-8"> {{ detailInfo.name }}</p>
            </div>

            <div v-if="detailInfo.slug" class="row">
              <p class="col-4 font--bold">Slug:</p>
              <p class="col-8"> {{ detailInfo.slug }}</p>
            </div>

            
            <div v-if="detailInfo.content" class="row">
              <p class="col-4 font--bold">Content:</p>
              <div class="col-8" v-html='detailInfo.content'></div>
            </div>           

            <div v-if="detailInfo.description" class="row">
              <p class="col-4 font--bold">Description:</p>
              <div class="col-8" v-html='detailInfo.description'></div>
            </div>

            <div v-if="detailInfo.experience" class="row">
              <p class="col-4 font--bold">Experience:</p>
              <p class="col-8"> {{ detailInfo.experience }}</p>
            </div>

            <div v-if="detailInfo.type" class="row">
              <p class="col-4 font--bold">Type:</p>
              <p class="col-8"> {{ detailInfo.type }}</p>
            </div>

            <div v-if="detailInfo.lowestWage" class="row">
              <p class="col-4 font--bold">Lowest Wage:</p>
              <p class="col-8"> {{ detailInfo.lowestWage }}</p>
            </div>

            <div v-if="detailInfo.highestWage" class="row">
              <p class="col-4 font--bold">Highest Wage:</p>
              <p class="col-8"> {{ detailInfo.highestWage }}</p>
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