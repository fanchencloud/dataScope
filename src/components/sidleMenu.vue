<!--
 * @FileDescription: 侧边导航
 * @Author: chen
 * @Date: 2022/10/5 6:56
 * @LastEditors: chen
-->
<template>
  <el-menu
      default-active="1"
      active-text-color="#1890ff"
      background-color="#304156"
      text-color="#ffffff"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon>
        <HomeFilled/>
      </el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Setting/>
        </el-icon>
        <span>系统管理</span>
      </template>

      <el-menu-item index="1-1">
        <el-icon>
          <UserFilled/>
        </el-icon>
        <template #title>用户管理</template>
      </el-menu-item>

      <el-menu-item index="1-2">
        <el-icon>
          <Avatar/>
        </el-icon>
        <template #title>角色管理</template>
      </el-menu-item>
      <el-menu-item index="1-3" @click="$router.push('menu')">
        <el-icon>
          <Avatar/>
        </el-icon>
        <template #title>菜单管理</template>
      </el-menu-item>

      <el-menu-item index="1-4">
        <el-icon>
          <OfficeBuilding/>
        </el-icon>
        <template #title>部门管理</template>
      </el-menu-item>

    </el-sub-menu>

  </el-menu>
</template>

<script>
import {mapState} from "vuex";
import {
  HomeFilled, Setting, UserFilled, Avatar, OfficeBuilding,
} from '@element-plus/icons-vue'

export default {
  components: {
    HomeFilled, Setting, UserFilled, Avatar, OfficeBuilding,
  },
  name: "sidleMenu",
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  computed: {
    ...mapState('common', {
      isCollapse: 'isCollapse',
    })
  }
}
</script>

<style lang="less" scoped>
.el-menu--collapse {
  //width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
