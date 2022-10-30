<!--
 * @FileDescription:
 * @Author: chen
 * @Date: 2022/10/5 8:20
 * @LastEditors: chen
-->
<template>
  <div class="indexApp">
    <div class="left" :class="{leftOpen: !isCollapse}">
      <sidle-menu></sidle-menu>
    </div>
    <div class="right">
      <div class="topBar">
        <div class="leftTop">
          <div class="icon" @click="changeMenu">
            <svg data-v-4e6f274c="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"
                 class="hamburger" :class="{'is-active': isCollapse}">
              <path data-v-4e6f274c=""
                    d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path>
            </svg>
          </div>
          <div class="title">首页</div>
        </div>
        <div class="rightTop">
          <div> {{ name }}</div>
          <el-link type="primary" :underline="false" v-if="name" @click="logout">退出登录</el-link>
        </div>
      </div>
      <div class="mainContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SidleMenu from '@/components/sidleMenu.vue'
import {mapState} from "vuex";
import {getUserBaseInfoApi, logoutApi} from "@/api/system.js";

export default {
  name: "index",
  components: {
    SidleMenu,
  }, data() {
    return {}
  },
  methods: {
    changeMenu() {
      this.$store.commit('common/changeMenuStatus')
    },
    async getBaseInfo() {
      const res = await getUserBaseInfoApi()
      const {code, data} = res
      if (code === 200) {
        this.$store.commit('common/setUserBaseInfo', data)
      }
    },
    logout() {
      logoutApi()
      this.$router.push('/login')
      this.$store.dispatch('common/logout')
    },
  },
  mounted() {
    console.debug('mounted')
    this.getBaseInfo()
  },
  computed: {
    ...mapState('common', {
      isCollapse: (state) => state.isCollapse,
      name: (state) => state.name,
    }),
    openStatus() {
      return this.isCollapse ? '打开' : '关闭'
    }
  }
}
</script>

<style lang="less" scoped>

@barHeight: 50px;
.indexApp {
  display: flex;
  height: 100vh;
  //overflow: scroll;

  .left {
    //width: 62px;
    height: 100vh;
    //transition: width 0.28s;
  }

  .leftOpen {
    //width: 200px;
    //transition: width 0.28s;
  }

  .right {
    width: 100%;
    -webkit-transition: margin-left 0.3s;
    transition: margin-left 0.3s;

    .topBar {
      width: 100%;
      height: @barHeight;
      //border-bottom: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

      .leftTop {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-content: center;

        .icon {
          width: @barHeight;
          height: @barHeight;
          display: flex;
          justify-content: center;
          align-items: center;

          .hamburger {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
          }

          .hamburger.is-active {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
          }
        }
      }

      .rightTop {
        margin-right: 10px;
        display: flex;

        .el-link {
          margin-left: 2px;
          font-size: 16px;
        }
      }
    }

    .mainContainer {
      //border: 1px solid red;
      width: 100%;
      //background: antiquewhite;
      height: calc(100vh - @barHeight);
      overflow: auto;
    }
  }
}

</style>
