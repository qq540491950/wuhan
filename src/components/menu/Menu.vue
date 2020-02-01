<template>
  <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect"
           router
           background-color="gray"
           text-color="black"
           active-text-color="red">
    <template v-for="item in menuItem">
      <el-menu-item :key="item.id" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      activeIndex: '1',
      menuItem: []
    }
  },
  mounted () {
    this.getMenu()
  },
  methods: {
    getMenu () {
      this.$http.get('http://' + window.location.host + '/menu.json').then(res => {
        this.menuItem = res.data
      })
    },
    handleSelect (index, indexPath) {
      console.log(index, indexPath)
    }
  }
}
</script>

<style scoped lang="less">
  .el-menu-item {
    font-size: 20px;
  }
</style>
