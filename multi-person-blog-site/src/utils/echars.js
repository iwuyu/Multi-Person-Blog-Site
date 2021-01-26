import echarts from 'echarts'
// 饼状图1
export function cake1(dataValue) {
  let myChart = echarts.init(document.querySelector(".user-cake"));
  let option = {
    title: {
        text: '用户监视图',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['原始数量', '新增数量', '总数量']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
        }
    },
    series: [
      {
        name: '用户分类',
        type: 'pie',
        radius: [20,60],//20, 110
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          show: false
        },
        emphasis: {
          label: {
              show: true
          }
        },
        data: [
          {value: 10, name: '原始数量'},
          {value: 5, name: '新增数量'},
          {value: 15, name: '总数量'},
        ]
      },
    ]
  }
  // 把配置给实例对象
  myChart.setOption(option);
}

// 饼状图2
export function cake2() {
  let myChart = echarts.init(document.querySelector(".article-cake"));
  let option = {
    title: {
      text: '文章监视图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['原始数量', '新增数量', '总数量']
    },
    series: [
      {
        name: '文章模块',
        type: 'pie',
        radius: ['30%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'ce原始数量nter'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 126, name: '原始数量'},
          {value: 12, name: '新增数量'},
          {value: 138, name: '总数量'}
        ]
      }
    ]
  }
  // 把配置给实例对象
  myChart.setOption(option);
}
// 饼状图3
export function cake3() {
  let myChart = echarts.init(document.querySelector(".question-cake"));
  let option = {
    title: {
      text: '问答监视图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: ['原始数量', '新增数量', '总数量']
    },
    series: [
      {
        name: '问答模块',
        type: 'pie',
        radius: '50%',
        // center: ['50%', '60%'],
        data: [
          {value: 56, name: '原始数量'},
          {value: 8, name: '新增数量'},
          {value: 64, name: '总数量'}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  // 把配置给实例对象
  myChart.setOption(option);
}

// 折线图
export function line() {
  let myChart = echarts.init(document.querySelector(".center-panel"));
  let option = {
    // title: {
    //   left:'150px',
    //   text: '近一周数据折线图'
    // },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['用户', '文章', '问答', '评论', '留言']
    },
    grid: {
      top:'10%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {}
      // }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '用户',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 490, 230, 210]
      },
      {
        name: '文章',
        type: 'line',
        stack: '总量',
         data: [220, 182, 591, 234, 290, 330, 310]
      },
      {
        name: '问答',
        type: 'line',
        stack: '总量',
        data: [150, 932, 201, 154, 190, 330, 410]
      },
      {
        name: '评论',
        type: 'line',
        stack: '总量',
        data: [920, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '留言',
        type: 'line',
        stack: '总量',
        data: [220, 232, 201, 234, 290, 330, 320]
      }
    ]
  }
  // 把配置给实例对象
  myChart.setOption(option);
}

// 柱状图
export function columnar() {
  let myChart = echarts.init(document.querySelector(".article-cake"));
  var data = [70, 34, 60, 78, 69];
  var titlename = ["HTML5", "CSS3", "javascript", "VUE", "NODE"];
  var valdata = [702, 350, 610, 793, 664];
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  let option = {
    title: {
      text: '文章监视图',
      subtext: '',
      left: 'center'
    },
    //图标位置
    grid: {
      top: "20%",
      left: "22%",
      bottom: "10%"
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#333",

          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#333",
              borderRadius: 15,
              // padding: 5,
              align: "center",
              width: 15,
              height: 15
            }
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#333"
          }
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function(params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}%"
          }
        }
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 50,
        data: [100, 100, 100, 100, 100],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  }
  // 把配置给实例对象
  myChart.setOption(option);
}

// 柱状图2
export function columnar2() {
  let myChart = echarts.init(document.querySelector(".question-cake"));
  // 指定配置和数据
  var option = {
    color: ["#2f89cf"],
    title: {
      text: '问答监视图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "10%",
      top: "20%",
      right: "10%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: [
          "旅游行业",
          "教育培训",
          "游戏行业",
          "医疗行业",
          "电商行业",
          "社交行业",
          "金融行业"
        ],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "#333",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#333",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#333"
            // width: 1,
            // type: "solid"
          }
        },
        splitLine: {
          lineStyle: {
            color: "#333"
          }
        }
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "35%",
        center: ['50%', '60%'],
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          barBorderRadius: 5
        }
      }
    ]
  };
  // 把配置给实例对象
  myChart.setOption(option);
}
