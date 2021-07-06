<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li class="item">
          <div class="itemContent color1">{{info.increment_users}}</div>
          <p>今日新增用户</p>
        </li>
        <li class="item">
          <div class="itemContent color1">{{info.total_users}}</div>
          <p>总用户量</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{info.increment_questions}}</div>
          <p>新增试题</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{info.total_questions}}</div>
          <p>总试题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{info.total_done_questions}}</div>
          <p>总刷题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{info.personal_questions}}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div class="echarts" ref="echarts"></div>
    </el-card>
  </div>
</template>
<script>
import { getChartData, getStatistics } from "@/api/chart.js";
/*
echarts基本使用
1：安装  npm i echarts
2:导入 import echarts from 'echarts'
3:实例化 var myecharts= echarts.init("dom地址")
4：加入配制option，应该用  myecharts.setOption(配制对象)
*/
import echarts from "echarts";
export default {
  data() {
    return {
      info: ""
    };
  },
  created() {
    getChartData().then(res => {
      this.info = res.data;
      window.console.log("chart数据:", res);
    });
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echarts);
    getStatistics().then(res => {
      window.console.log("屏状图数据：", res);
      /*数组的map
      
      返回值=数组.map((item,index)=>{
        特点  return什么，它的返回值每一项就是什么
      })
      */

      let legendData = res.data.map(item => {
        return item.name;
      });
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 60,
          data: legendData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>
<style lang="less">
.chart {
  .list {
    //弹性例子布局
    display: flex;
    //主轴分布
    justify-content: space-around;
    //侧轴分布
    align-items: center;
    //文本居中
    text-align: center;
    //颜色处理
    .color1 {
      border: 3px solid #0086fa;
      color: #0086fa;
    }
    .color2 {
      border: 3px solid #f76137;
      color: #f76137;
    }
    .color3 {
      border: 3px solid #55cd78;
      color: #55cd78;
    }
    //画圈圈
    .itemContent {
      border-radius: 50%;
      width: 99px;
      height: 99px;
      line-height: 99px;
    }
  }
  .echarts {
    height: 500px;
  }
}
</style>