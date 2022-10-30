<!--
 * @FileDescription:
 * @Author: chen
 * @Date: 2022/10/5 8:26
 * @LastEditors: chen
-->
<template>
  <div class="login">
    <div class="loginBox">
      <el-form>
        <el-form-item>
          <el-input
              v-model="username"
              class="w-50 m-2"
              :clearable="true"
              placeholder="账号"
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <UserFilled/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
              v-model="password"
              class="w-50 m-2"
              type="password"
              :clearable="true"
              show-password
              placeholder="密码"
          >
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login" class="loginButton">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import {UserFilled, Lock,} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import {loginApi} from "@/api/system.js";

export default {
  name: "login",
  components: {
    UserFilled, Lock,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      if (!this.username) {
        ElMessage('请输入用户名')
        return false
      }
      if (!this.password) {
        ElMessage('请输入密码')
        return false
      }

      const res = await loginApi(this.username, this.password)
      const {code, data, msg} = res
      if (code === 200) {
        ElMessage('登录成功')
        this.$router.push("/")
      } else {
        ElMessage.error(msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('https://api.sunweihu.com/api/bing1/api.php') no-repeat left bottom;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginBox {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    min-height: 60px;
    padding: 25px 25px 5px 25px;

    .loginButton {
      width: 100%;
    }
  }
}

</style>
