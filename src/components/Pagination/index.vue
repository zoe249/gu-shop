<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

    <button 
    v-for="(page,index) in startNumAndEndNum.end" 
    :key="index" 
    v-show="page>=startNumAndEndNum.start"
    @click="$emit('getPageNo',page)"
    :class="{active:pageNo==page}"
    >
    {{page}}
    </button>
    
    <button v-if="startNumAndEndNum.end < totalPage-1">···</button>
    <button 
    v-if="startNumAndEndNum.end< totalPage" 
    @click="$emit('getPageNo',totalPage)"
    :class="{active:pageNo==totalPage}"
    >
    {{totalPage}}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo','pageSize','total','continues'],
    data () {
      return {
        // pageNo1:this.pageNo,  
      }
    },
    computed: {
      // 总共多少页
      totalPage(){
        // 向上取证
        return Math.ceil(this.total / this.pageSize);
      },
      // 计算出连续页码的起始数字与结束数字[连续的页码数组至少是5]
      startNumAndEndNum(){
        const {pageNo,pageSize,total,continues,totalPage} = this;
        // 先定义两个变量存储初始与结束数字
        let start  = 0 , end = 0;
        // 连续的页码数字5，如果出现页码数不足5页
        if(continues>this.totalPage){
          // 不正常现象，总页数不足5页;
          start = 1;
          end = totalPage;
        }else{
          // 连续页码是5，总页码大于5
          // 起始
          start = pageNo - parseInt(continues/2);
          // 结束
          end = pageNo + parseInt(continues/2);
          // 把出现不正常的现象【start数组出现0|负数】纠正
          if(start<1){
            start =1;
            end = continues;
          }
          // 把出现不正常的现象【end大于总页数】纠正
          if(end>totalPage){
            end = totalPage;
            start = totalPage - continues+1;
          };
          return {start,end}
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>

