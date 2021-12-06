<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件的委派+编程式导航 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TtpeNav",
  data() {
    return {
      // 鼠标经过哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕：可以向服务器发送请求
  mounted() {
    // 通知vuex发请求，获取数据，存储到仓库
    
    // 当组件挂载完毕，show变为false
    // 如果不是Home路由，将TypeNav隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法右侧是一个函数，当使用计算属性的时候，右侧的属性会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle不要使用箭头函数
    changeIndex: throttle(function (index) {
      // 正常情况（用户慢慢操作）：鼠标进入，每一个分类h3都会触发鼠标进入事件
      // 非正常情况（用户操作过快）：本身全部的一级分类都应该被触发，经过测试，只有部分被触发
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数有大量业务，就会出现卡顿
      this.currentIndex = index;
    }, 50),
    // 鼠标移除事件的回调
    leaveIndex() {
      // 鼠标移除currenIndex = -1
      this.currentIndex = -1;
    },
    // 进行路由跳转
    goSearch(event) {
      // 最好的解决方法：编程式导航+事件委派
      // 利用事件委派存在一些问题：1点击的一定是a标签  2：如何获取参数
      // 点击a标签才会进行跳转

      // 第一个问题：把子节点中的a标签加上自定义属性data-categoryName
      let element = event.target;
      // 获取到的当前触发事件的节点【h3,a,dt】,带有data-categoryNmae的一定是a标签
      // 节点有一个属性dataset，获取节点的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断路由跳转的时候，带有params参数
        if(this.$route.params){
          location.params = this.$route.params;
          location.query = query;
        }
        this.$router.push(location)
      }
    },
    // 鼠标移入的时候，商品分类属性为true
    enterShow() {
      this.show = true;
    },
    // 鼠标离开，商品分类列表隐藏
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: pink;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter{
      height: 0px;
    }
    // 过渡动画结束
    .sort-enter-to{
      height: 461px;
    }
    // 定义动画时间
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>