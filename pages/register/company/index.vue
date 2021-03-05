<template>
  <div class="form-body height-bg-auth">
      <div class="website-logo">
        <nuxt-link to="/">
          <div class="logo">
            <img class="logo-size" src="/images/logo_career_network.png" alt="">
          </div>
        </nuxt-link>
      </div>

      <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
        </div>

        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Sign up with Career Network</h3>
              <p>Looking for job opportunities</p>

              <div class="page-links">
                  <nuxt-link to="/login">Sign in</nuxt-link>
                  <nuxt-link to="/register" class="active">Sign up</nuxt-link>
              </div>

              <a-form-model ref="registerForm" :model="registerForm" :rules="rules">
                <a-form-model-item class="form-validate">
                  <a-radio-group v-model="type" @change="changeType">
                    <a-radio value="employee">
                      Employee
                    </a-radio>
                    <a-radio value="company">
                      Company
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>

                <a-form-model-item  has-feedback prop="name" class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.name" autocomplete="off" placeholder="Name" @pressEnter="registerSubmit"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.email" autocomplete="off" placeholder="Email" @pressEnter="registerSubmit"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="phone"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.phone" autocomplete="off" placeholder="Phone" @pressEnter="registerSubmit"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="city" class="m-0 form-validate">
                  <a-select mode="multiple" size="large" class="city-select" :disabled="isDisabled" v-model="registerForm.city" placeholder="City">
                    <a-select-option v-for="(el, index) in listCity" :key="index" :value="`${el.province_id}`">
                      {{ el.province_name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="website"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.website" autocomplete="off" placeholder="Website" @pressEnter="registerSubmit"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="registerSubmit">
                   Sign up
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang='scss' scoped>
@import url("./style.scss");
.ant-radio-wrapper {
  color: white;
  font-size: 15px;
}
</style>