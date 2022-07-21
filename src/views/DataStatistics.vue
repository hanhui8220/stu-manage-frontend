<template>
  <el-row>
    <el-col :span="24">
      <span><h3>数据统计</h3></span>
      <el-divider></el-divider>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <div id="main" :style="divStyle"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "DataStatistics",
  data() {
    return {
      divStyle: {
        width: '800px',
        height: '500px',
        margin: 'auto',
      },
      option: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['grade', '2018级', '2019级', '2020级', '2021级'],
            ['信息工程系',86, 92, 85, 83],
            ['经济与管理系', 86, 92, 85, 83],
            ['应用工程系', 24, 67, 79, 86]
          ]
        },
        xAxis: [
          {type: 'category', gridIndex: 0},
        ],
        yAxis: [
          {gridIndex: 0},
        ],
        grid: [
          {bottom: '25%'},
          {top: '35%'}
        ],
        series: [
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
        ]
      }
    }
  },
  mounted(){
      this.axios.get('/student/dataStatistics').then((response) => {
          this.option.dataset.source = response.data[0];
        myChart.setOption({  // 展示数据
          dataset: {
            source: [
              ['grade', '2018级', '2019级', '2020级', '2021级'],
              ['信息工程系',response.data[0], response.data[3], response.data[6], response.data[9]],
              ['经济与管理系', response.data[1], response.data[4], response.data[7], response.data[10]],
              ['应用工程系', response.data[2], response.data[5], response.data[8], response.data[11]]
            ]
          }
        })
      }).catch((error) => {
        console.log(error);
      })
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'))
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  },
}
</script>

<style scoped>

</style>