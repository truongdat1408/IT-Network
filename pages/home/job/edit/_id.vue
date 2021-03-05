<template>
  <div>
    <div class="jp_tittle_main_wrapper">
      <div class="jp_tittle_img_overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="d-flex flex-column">
                <div class="jp_tittle_heading">
                    <h2>Update Post</h2>
                </div>

                <div class="d-flex align-items-center text-white mt-2">
                  <div><nuxt-link to="/home" class="text-white mr-1">Home</nuxt-link></div>
                  <div class="mr-1">></div>
                  <div><nuxt-link to="/home/job/edit" class="text-white">Update Post</nuxt-link></div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>

    <h3 class="text-center my-5">Job Detail</h3>

    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="m-auto"
      style="width: 80%"
    >
      <a-form-model-item has-feedback ref="name" label="Name" prop="name">
        <a-input v-model="form.name"/>
      </a-form-model-item>

      <a-form-model-item has-feedback ref="lowestWage" label="Lowest Wage($)" prop="lowestWage">
        <a-input-number :min="1" class="w-100" v-model="form.lowestWage"/>
      </a-form-model-item>

      <a-form-model-item has-feedback ref="highestWage" label="Highest Wage($)" prop="highestWage">
        <a-input-number :min="1" class="w-100" v-model="form.highestWage"/>
      </a-form-model-item>

      <a-form-model-item has-feedback label="Type" prop="type">
        <a-select v-model="form.type" placeholder="Please select type job">
          <a-select-option value="FULLTIME">
            FULLTIME
          </a-select-option>
          <a-select-option value="PARTTIME">
            PARTTIME
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item has-feedback label="Category" prop="cateIds">
        <a-select v-model="form.cateIds" mode="multiple" placeholder="Please select category job">
          <a-select-option v-for="(item, index) in data" :key="index" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item ref="experience" label="Experience" prop="experience">
        <a-input-number :min="1" class="w-100" v-model="form.experience"/>
      </a-form-model-item>

      <a-form-model-item has-feedback label="Deadline" required prop="deadline">
        <a-date-picker
          v-model="form.deadline"
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="City" prop="city">
        <a-select v-model="form.city" placeholder="Please select city">
          <a-select-option v-for="(item, index) in listCity" :key="index" :value="item.province_id">
            {{ item.province_name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item has-feedback ref="street" label="Street" prop="street">
        <a-input v-model="form.street"/>
      </a-form-model-item>

      <a-form-model-item label="Image" prop="introImg">
        <div class="row pl-3">
          <div v-if="form.introImg != null" class="p-0 previewImg mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" :style="{backgroundImage: 'url(' + form.introImg + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}">
            <div class="iconTrash d-flex align-items-center justify-content-center">
              <a-icon class="icon d-flex align-items-center justify-content-center" @click="removeImage" type="delete" />
            </div>
          </div>

          <div v-if="form.introImg == null" class="uploadImg d-flex align-items-center justify-content-center mb-3 col-5 col-md-2 col-sm-3 col-xs-6 mr-2" @click="$refs.image.click()">
            <a-icon v-if="upload" type="plus" />
            <a-spin v-else>
              <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            </a-spin>
            <input
              ref="image" name="image" type="file" class="mt-3 d-none" @change="previewFiles"
            >
          </div>
        </div>
      </a-form-model-item>
      
      <a-form-model-item class="editor" label="Requirement" prop="content">
        <quill-editor
          ref="content"
          v-model="form.content"
          :options="editorOption"
        />
      </a-form-model-item>

      <a-form-model-item class="editor" label="Description" prop="description">
        <quill-editor
          ref="description"
          v-model="form.description"
          :options="editorOption"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button :loading="isLoading" :disabled="isDisabled" type="primary" @click="onSubmit">
          Update
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url('./style.scss');
</style>