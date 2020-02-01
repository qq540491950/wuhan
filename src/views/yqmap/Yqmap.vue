<template>
  <div id="main"></div>
</template>

<script>
import '../../../node_modules/echarts/map/js/china.js'
import '../../../node_modules/echarts/map/js/province/shanxi1.js'
import '../../../node_modules/echarts/map/js/province/beijing.js'

export default {
  name: 'Yqmap',
  data () {
    return {
      myCharts: null,
      dataList: [],
      cityDataList: [],
      map: 'china'
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.myCharts = this.$echarts.init(document.getElementById('main'))
      this.$http.get(
        // http://api.tianapi.com/txapi/ncovcity/index
        'http://api.tianapi.com/txapi/ncovcity/index',
        {
          params: {
            key: this.api.APP_KEY
          }
        }
      ).then(res => {
        this.dataList = res.data.newslist
        this.dataList.forEach(item => {
          item.name = item.provinceShortName
          item.value = item.confirmedCount
        })
        let option = {
          title: {
            text: '疫情实况'
          },
          tooltip: {
            triggerOn: 'mousemove',
            formatter: (e, t, n) => {
              return e.name + '<br>' + '确诊人数：' + e.data.confirmedCount + '<br>' + '疑似病例：' + e.data.suspectedCount + '<br>' +
                '治愈病例：' + e.data.curedCount + '<br>' + '死亡病例：' + e.data.deadCount
            }
          },
          visualMap: {
            min: 0,
            max: 1000,
            left: 26,
            bottom: 40,
            showLabel: !0,
            text: ['高', '低'],
            pieces: [{
              gt: 100,
              label: '> 100 人',
              color: '#7f1100'
            }, {
              gte: 10,
              lte: 100,
              label: '10 - 100 人',
              color: '#ff5428'
            }, {
              gte: 1,
              lt: 10,
              label: '1 - 9 人',
              color: '#ff8c71'
            }, {
              gt: 0,
              lt: 1,
              label: '疑似',
              color: '#ffd768'
            }, {
              value: 0,
              color: '#ffffff'
            }],
            show: !0
          },
          geo: {
            map: 'china',
            roam: !0,
            scaleLimit: {
              min: 1,
              max: 2
            },
            zoom: 1.2,
            label: {
              normal: {
                show: true,
                fontSize: '12',
                color: 'rgba(0,0,0,0.7)'
              }
            },
            itemStyle: {
              normal: {
                // shadowBlur: 50,
                // shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: '#f2d5ad',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
              }
            }
          },
          series: [
            {
              name: '确诊病例',
              type: 'map',
              geoIndex: 0,
              data: this.dataList
            }
          ]
        }
        this.myCharts.setOption(option)
        // 点击陕西省
        this.myCharts.on('click', (item) => {
          if (item.data.name === '陕西' || item.data.name === '北京') {
            this.myCharts.clear()
            this.map = item.name
            this.dataList = item.data.cities
            this.dataList.forEach(m => {
              m.name = m.cityName
              m.value = m.confirmedCount
            })
            let option1 = {
              title: {
                text: '疫情实况'
              },
              tooltip: {
                triggerOn: 'mousemove',
                formatter: (e, t, n) => {
                  return e.name + '<br>' + '确诊人数：' + e.data.confirmedCount + '<br>' + '疑似病例：' + e.data.suspectedCount + '<br>' +
                    '治愈病例：' + e.data.curedCount + '<br>' + '死亡病例：' + e.data.deadCount
                }
              },
              visualMap: {
                min: 0,
                max: 1000,
                left: 26,
                bottom: 40,
                showLabel: !0,
                text: ['高', '低'],
                pieces: [{
                  gt: 100,
                  label: '> 100 人',
                  color: '#7f1100'
                }, {
                  gte: 10,
                  lte: 100,
                  label: '10 - 100 人',
                  color: '#ff5428'
                }, {
                  gte: 1,
                  lt: 10,
                  label: '1 - 9 人',
                  color: '#ff8c71'
                }, {
                  gt: 0,
                  lt: 1,
                  label: '疑似',
                  color: '#ffd768'
                }, {
                  value: 0,
                  color: '#ffffff'
                }],
                show: !0
              },
              geo: {
                map: this.map,
                roam: !0,
                scaleLimit: {
                  min: 1,
                  max: 2
                },
                zoom: 1.2,
                label: {
                  normal: {
                    show: true,
                    fontSize: '12',
                    color: 'rgba(0,0,0,0.7)'
                  }
                },
                itemStyle: {
                  normal: {
                    // shadowBlur: 50,
                    // shadowColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis: {
                    areaColor: '#f2d5ad',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                  }
                }
              },
              series: [
                {
                  name: '确诊病例',
                  type: 'map',
                  geoIndex: 0,
                  data: this.dataList
                }
              ]
            }
            this.myCharts.setOption(option1)
          }
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>
