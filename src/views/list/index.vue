<template>
  <div class="list-page">
  </div>
</template>

<script>
export default {
  data () {
    return {
      end: false,
      status: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.$autoPlay('/static/music.mp3', this.ending)
    }, 500)
  },
  methods: {
    toDetail (id) {
      // this.$router.push(`/detail?id=${id}`)
    }
  },
  async created () {
    await this.initBScroll()
  }
}
</script>

<style lang="scss" scoped>
.list{
  @include border(bottom);
  .item{
    padding: 10px 0;
    @include border(top);
    text-align: center;
  }
}
</style>
