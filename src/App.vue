<template>
  <div id="app">
    <header-s></header-s>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，login、register隐藏 -->
    <footer-s v-show="$route.meta.show"></footer-s>
  </div>
</template>

<script>
import HeaderS from './components/Header'
import FooterS from './components/Footer'
export default {
  name: '',
  components: {
    HeaderS,
    FooterS
  },
  mounted () {
    // 派发一个action||获取商品分类的三节列表数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
