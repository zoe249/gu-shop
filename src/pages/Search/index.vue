<template>
  <div>
    <!-- 商品分类三级导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParmas.categoryName">
              {{ searchParmas.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParmas.keyword">
              {{ searchParmas.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParmas.trademark">
              {{ searchParmas.trademark.split(":")[1]
              }}<i @click="removeTradmark">x</i>
            </li>
            <!-- 平台的售卖属性 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParmas.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAcs, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#"
                    >销量
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAcs, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品销售列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候携带Id -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>  
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination 
          :pageNo="searchParmas.pageNo" 
          :pageSize="searchParmas.pageSize" 
          :total="total" 
          :continues="5"
          @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  data() {
    return {
      num:5,
      searchParmas: {
        // 一级分类Id
        category1Id: "",
        // 二级分类Id
        category2Id: "",
        // 三级分类Id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序,初始值
        order: "1:asc",
        // 分页器，第几页
        pageNo: 1,
        // 每一页展示的数据
        pageSize: 1,
        // 平台售卖属性带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 页面挂载之前
  beforeMount() {
    // 复杂写法
    // this.searchParmas.category1Id = this.$route.query.category1Id;
    Object.assign(this.searchParmas, this.$route.query, this.$route.params);
  },
  mounted() {
    // 发请求之前带给服务器的参数
    this.getData();
  },
  computed: {
    // mapGetters里面的写法：传递的是数组，因为Getters是没有划分模块的【home，search】
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParmas.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParmas.order.indexOf("2") != -1;
    },
    isAcs() {
      return this.searchParmas.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParmas.order.indexOf("desc") != -1;
    },
    // 获取search模块展示产品一共多少数据
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    // 向服务器发送search模块数据（根据参数不同返回不同的数据进行展示）
    // 把请求封装成一个函数，当需要的时候直接调动
    getData() {
      this.$store.dispatch("getSearchList", this.searchParmas);
    },
    // 删除分类
    removeCategoryName() {
      // 只是删除了请求服务器的参数，需要再次发送请求
      this.searchParmas.categoryName = undefined;
      this.searchParmas.category1Id = undefined;
      this.searchParmas.category2Id = undefined;
      this.searchParmas.category3Id = undefined;
      this.getData();
      // 地址栏也需要修改，进行路由的跳转
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removeKeyword() {
      this.searchParmas.keyword = undefined;
      // 再次发请求
      this.getData();
      // 通知兄弟组件清除关键字
      this.$bus.$emit("clear");
      // 进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 删除品牌信息
    removeTradmark() {
      this.searchParmas.trademark = undefined;
      this.getData();
    },
    // 删除售卖属性
    removeAttr(index) {
      // 删除售卖属性
      this.searchParmas.props.splice(index, 1);
      this.getData();
    },
    // 自定义事件的回调
    trademarkInfo(trademark) {
      this.searchParmas.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 手机平台属性的回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // 整理参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParmas.props.indexOf(props) == -1) {
        this.searchParmas.props.push(props);
      }
      // 再次发送请求
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      // falg,形参：是一个标记，代表用户点击的是综合1还是价格2
      let originOrder = this.searchParmas.order;
      // 这里获取到的是起始的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      // 准备一个新的order属性值
      let newOrder = "";
      // 点击的是综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      // 修改新的order赋予searchParams
      this.searchParmas.order = newOrder;
      this.getData();
    },
    // 自定义事件的回调函数--获取当前第几页
    getPageNo(pageNo){
      this.searchParmas.pageNo = pageNo;
      // console.log(this.searchParmas.pageNo);
      this.getData()
    }
  },
  watch: {
    // 监听路由信息是否发生变化，如果发生变化，再次发送请求
    $route(newValue, oldValue) {
      // 再次发送请求之前整理带给服务器的参数
      Object.assign(this.searchParmas, this.$route.query, this.$route.params);
      this.getData();
      // 每一次请求完毕，应该把1、2、3级分类的Id置空，让他接受下一次的新Id
      this.searchParmas.category1Id = "";
      this.searchParmas.category2Id = "";
      this.searchParmas.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>