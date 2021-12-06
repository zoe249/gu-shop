<template>
  <div>
      <!-- 三级联动全局组件，已经注册为全局组件，因此不需要引入 -->
      <TypeNav/>
      <list-container/>
      <Recommend/>
      <Rnak/>
      <Like/>
      <!-- 组件内部是没有发请求的 -->
      <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
      <Brand/>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rnak from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';

export default {
  components: {
    ListContainer,
    Recommend,
    Rnak,
    Like,
    Floor,
    Brand,
  },
  mounted () {
    // 派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList:(state)=>{
        return state.home.floorList
      }
    })
  },
  methods: {
  
  }
}
</script>

<style>

</style>