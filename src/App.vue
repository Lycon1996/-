<template>
  <div id="app">
    <transition
      :name="pageTransitionName"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter">
      <keep-alive>
        <router-view
          :key="$route.fullPath"
          v-if="$route.meta.keepAlive"
          class="app-view">
        </router-view>
      </keep-alive>
    </transition>
    <transition
      :name="pageTransitionName"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter">
      <router-view
        :key="$route.fullPath"
        v-if="!$route.meta.keepAlive"
        class="app-view">
      </router-view>
    </transition>
    <audio src="/static/music.mp3" id="music" controls></audio>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import './assets/css/index.scss'
export default {
  computed: {
    ...mapState('appShell', [
      'pageTransitionName'
    ])
  },
  mounted () {
    document.addEventListener('WeixinJSBridgeReady', this.play(), false)
  },
  methods: {
    ...mapActions('appShell', [
      'setPageSwitching'
    ]),
    handleBeforeEnter (el) {
      this.setPageSwitching(true)
    },
    handleAfterEnter (el) {
      this.setPageSwitching(false)
    },
    autoPlay (src, cb) {
      let audio = document.getElementById('music')
      audio.addEventListener('ended', cb, false)
      audio.src = src
      audio.load()
      audio.play()
    },
    play () {
      let audio = document.getElementById('music')
      audio.load()
    }
  }
}
</script>

<style lang="scss" scoped>
#app{
  .app-view{
    transition: opacity .4s cubic-bezier(.55, 0, .1, 1);
    background-color: $pageBgColor;
    &.slide-left-enter-active{
      opacity: 0;
    }
    &.slide-right-enter-active{
      opacity: 0;
    }
  }
}
</style>

<style lang="scss">
// resetMint 要放在这里
@import './assets/css/resetMint.scss';
#music{
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
