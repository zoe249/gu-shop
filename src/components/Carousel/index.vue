<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "carousel",
  props: ['list'],
    watch: {
    // 监听bannerList数据的变化：因为这条数据发生过变化---又空数据变为4个元素
    list: {
      // 立即监听
      immediate: true,
      handler(newValue, oldValue) {
        // 如果执行了handler方法，代表组件实例身上这个属性的属性已经有了【数组：4个元素】
        // 当前这个函数执行：只能保证bannerList数据已经有了，单数没办法保证v-for已经执行完毕
        // v-for执行完毕，才会有结构
        // nextTick:在下次 DOM 更新 循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>