<template>
  <div>
    抗击疫情
  </div>
</template>

<script>
export default {
  name: 'Kjyq',
  data () {
    return {}
  },
  mounted () {
    this.getKjyqData()
  },
  methods: {
    getKjyqData () {
      this.$http.get(
        'http://api.tianapi.com/txapi/ncov/index',
        {
          params: {
            key: this.api.APP_KEY
          }
        }
      ).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
