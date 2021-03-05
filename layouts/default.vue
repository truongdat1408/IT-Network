<template>
  <div class="theme-layout">
    <BaseHeader />
    <nuxt />
    <BaseFooter />
  </div>
</template>

<script>
import BaseHeader from '~/components/v-layout/BaseHeader'
import BaseFooter from '~/components/v-layout/BaseFooter'

export default {
  name: 'DefaultLayout',
  middleware: 'updateState',
  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>
<style lang="scss" scoped>
.theme-layout::before {
    background: rgba(52,70,93,.7);
    background-repeat: repeat;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
    transition: all 0.5s linear 0s;
    visibility: hidden;
    opacity: 0;
}

.theme-layout.active::before {
    opacity: 1;
    visibility: visible;
}
.theme-layout {
    float: left;
    position: relative;
    width: 100%;
}

.theme-layout.boxed {
    background: none repeat scroll 0 0 #FFFFFF;
    float: none;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 1230px;
    -webkit-box-shadow: 0 0 6px #747474;
    -moz-box-shadow: 0 0 6px #747474;
    -ms-box-shadow: 0 0 6px #747474;
    -o-box-shadow: 0 0 6px #747474;
    box-shadow: 0 0 6px #747474;
}
</style>
