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
              <h3>Sign in with Career Network</h3>
              <p>Looking for job opportunities</p>

              <div class="page-links">
                  <nuxt-link to="/login" class="active">Sign in</nuxt-link>
                  <nuxt-link to="/register">Sign up</nuxt-link>
              </div>

              <a-form-model ref="loginForm" :model="loginForm" :rules="rules">
                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="loginForm.email" autocomplete="off" placeholder="Email" @pressEnter="loginSubmit"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="loginForm.password" autocomplete="off" placeholder="Password" @pressEnter="loginSubmit"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="loginSubmit">
                   Sign in
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

</style>
