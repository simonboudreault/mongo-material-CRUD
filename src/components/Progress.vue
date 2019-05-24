<template>
  <v-fade-transition mode="out-in">
    <div v-show="loading" class="progressBar">
      <div class="spinner">
        <div class="rect1 accent"></div>
        <div class="rect2 accent"></div>
        <div class="rect3 accent"></div>
        <div class="rect4 accent"></div>
        <div class="rect5 accent"></div>
      </div>
    </div>
  </v-fade-transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {},
  data() {
    return {}
  },
  watch: {
    // loading(newValue) {
    //   console.log('watching')
    //   this.isLoading = newValue
    // }
  },
  computed: {
    ...mapState(['loading']),
    isLoading() {
      // return true
      return this.loading
    }
  }
}
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}

.progressBar {
  position: absolute;
  width: 100%;
  height: 0;
  z-index: 999;
  top: 0;
  left: 0;
  transition: opacity 1s;
}

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.spinner {
  margin: 44px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  height: 100%;
  width: 6px;
  display: inline-block;
  margin: 2px;

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
