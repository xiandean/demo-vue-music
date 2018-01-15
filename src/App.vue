<template>
  <div id="app" @touchstart.once="audioInit">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player ref="player"></player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    },
    methods: {
      audioInit () {
        let audio = this.$refs.player.$refs.audio
        audio.play()
        // audio.pause()
      }
    }
  }
</script>
