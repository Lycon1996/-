<template>
  <div class="detail-page">
    <div class="content-wrap" ref="contentBScrollWrap">
      <div class="detail">
        <span>detail</span>
        <span v-html="id"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.query.id
    }
  },
  async created () {
    await this.initBScroll()
  }
}
</script>

<style lang="scss" scoped>
.detail{
  padding-top: 100px;
  font-size: 24px;
  text-align: center;
}
</style>
