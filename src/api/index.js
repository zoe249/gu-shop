// 当前模块：API接口统一管理
import requests from "./request";
import mockRequest from './mockServe';
// 三级联动的接口
// /api/product/getBaseCategoryList   get  无参数

export const reqCategoryList = () => {
    // 发请求:axios发送请求返回的结果是Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner轮播图
export const reqGetBannerList = () => mockRequest.get('/banner');

// 获取Floor数据
export const reqFloorList = () => mockRequest.get('/floor');

// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认的参数，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

// 获取产品详情信息的接口  /api/item/{ skuId }  请求方式 get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品调价到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表接口 /api/cart/cartList
export const reqCarList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpdateCheckedBuId = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })