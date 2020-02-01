<template>
  <el-container>
    <el-header><Menu></Menu></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Menu from '../components/menu/Menu'
export default {
  name: 'home',
  components: {
    Menu
  }
}
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: gray;
    display: flex;
    justify-content: center;
    height: 10rem;
  }
  .el-main {
    /*background-color: dodgerblue;*/
    margin: 0;
    padding: 0;
  }
</style>
