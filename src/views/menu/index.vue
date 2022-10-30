<!--
 * @FileDescription: 菜单管理
 * @Author: chen
 * @Date: 2022/10/30 16:41
 * @LastEditors: chen
-->
<script setup>
import {Edit, Search, Plus, QuestionFilled,} from '@element-plus/icons-vue'
</script>
<template>
  <div class="menuManager">
    <div class="searchBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="菜单名称">
          <el-input v-model="formInline.user" placeholder="请输入菜单名称"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="菜单状态">
            <el-option label="正常" value="0"/>
            <el-option label="停用" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :icon="Search">Search</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="searchBox">
      <el-button type="primary" plain :icon="Plus" @click="addMenuDialog = true">新增</el-button>
    </div>

    <!-- 添加菜单start -->
    <el-dialog v-model="addMenuDialog" title="添加菜单">
      <div class="addMenuDialog">
        <div class="parentMenu">
          <div class="label">上级菜单</div>
          <div class="inputDiv">
            <el-tree-select
                v-model="parentMenu"
                :data="menuData"
                check-strictly
                :render-after-expand="false"
            />
          </div>
        </div>

        <div class="parentMenu">
          <div class="label">菜单类型</div>
          <div class="inputDiv">
            <el-radio-group v-model="menuType">
              <el-radio :label="'M'">目录</el-radio>
              <el-radio :label="'C'">菜单</el-radio>
              <el-radio :label="'F'">按钮</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="twoBox">
          <div class="parentMenu">
            <span style="color: red;">*</span>
            <div class="label">菜单名称</div>
            <div class="inputDiv">
              <el-input v-model="menuName" placeholder="请输入菜单名称"/>
            </div>
          </div>
          <div class="parentMenu">
            <span style="color: red;">*</span>
            <div class="label">显示排序</div>
            <div class="inputDiv">
              <el-input-number
                  v-model="menuOrder"
                  class="mx-4"
                  :min="1"
                  :max="10"
                  controls-position="right"
                  @change="handleChange"
              />
            </div>
          </div>
        </div>

        <div class="twoBox" v-show="menuType === 'M' || menuType === 'C'">
          <div class="parentMenu">

            <el-tooltip
                class="box-item"
                effect="dark"
                content="选择是外链则路由地址需要以`http(s)://`开头"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">是否外链</div>
            <div class="inputDiv">
              <el-radio-group v-model="isFrame">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="parentMenu">
            <span style="color: red;">*</span>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">路由地址</div>
            <div class="inputDiv">
              <el-input v-model="routerPath" placeholder="请输入路由地址"/>
            </div>
          </div>
        </div>

        <div class="twoBox" v-show="menuType === 'M' || menuType === 'C'">
          <div class="parentMenu">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">显示状态</div>
            <div class="inputDiv">
              <el-radio-group v-model="visible">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">隐藏</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="parentMenu">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="选择停用则路由将不会出现在侧边栏，也不能被访问"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">菜单状态</div>
            <div class="inputDiv">
              <el-radio-group v-model="menuStatus">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <!-- 菜单 -->
        <div class="twoBox" v-show="menuType === 'C' || menuType === 'F'">
          <div class="parentMenu" v-show="menuType === 'C'">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">组件路径</div>
            <div class="inputDiv">
              <el-input v-model="component" placeholder="请输入组件路径"/>
            </div>
          </div>
          <div class="parentMenu" v-show="menuType === 'F'">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">权限字符</div>
            <div class="inputDiv">
              <el-input v-model="perms" placeholder="请输入权限字符"/>
            </div>
          </div>
        </div>

        <div class="twoBox" v-show="menuType === 'C'">
          <div class="parentMenu">
            <el-tooltip
                class="box-item"
                effect="dark"
                content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">路由参数</div>
            <div class="inputDiv">
              <el-input v-model="query" placeholder="请输入路由参数"/>
            </div>
          </div>
          <div class="parentMenu">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
                placement="top"
            >
              <el-icon>
                <QuestionFilled/>
              </el-icon>
            </el-tooltip>
            <div class="label">是否缓存</div>
            <div class="inputDiv">
              <el-radio-group v-model="isCache">
                <el-radio :label="0">缓存</el-radio>
                <el-radio :label="1">不缓存</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="buttonGroup">
          <el-button type="primary" @click="addMenu">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加菜单end -->
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      addMenuDialog: false,
      menuData: [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
        {
          value: '3',
          label: 'Level one 3',
          children: [
            {
              value: '3-1',
              label: 'Level two 3-1',
              children: [
                {
                  value: '3-1-1',
                  label: 'Level three 3-1-1',
                },
              ],
            },
            {
              value: '3-2',
              label: 'Level two 3-2',
              children: [
                {
                  value: '3-2-1',
                  label: 'Level three 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      // 上级菜单
      parentMenu: '',
      // 菜单类型（M目录 C菜单 F按钮）
      menuType: 'M',
      menuName: '',
      menuOrder: '',
      isFrame: 1,
      routerPath: '',
      visible: 0,
      // 菜单状态（0正常 1停用）
      menuStatus: 0,
      // 组件路径
      component: '',
      // 权限字符
      perms: '',
      // 路由参数
      query: '',
      isCache: '',
    }
  }
  ,
  methods: {
    resetForm(formEl) {
      this.formInline.user = ''
      this.formInline.region = ''
    }
    ,
    onSubmit() {
      console.debug("onSubmit")
    },
    addMenu() {
      console.debug("addMenu")
      const dataBody = {
        // 菜单名
        menuName: this.menuName,
        // 上级菜单id
        parentId: this.parentMenu,
        // 显示顺序
        orderNum: this.menuOrder,
        // 路由地址
        path: this.routerPath,
        // 组件路径
        component: this.component,
        // 路由参数
        query: this.query,
        // 外链
        isFrame: this.isFrame,
        // 缓存
        isCache: this.isCache,
        // 菜单类型
        menuType: this.menuType,
        // 菜单状态（0显示 1隐藏）
        visible: this.visible,
        // 菜单状态（0正常 1停用）
        status: this.menuStatus,
        // 权限标识
        perms: this.perms,
        icon: '',
        remark: '',
      }
      console.debug("menu = ", dataBody)
    },
    closeDialog() {
      this.addMenuDialog = false
    }
  }
  ,
}
</script>

<style lang="less" scoped>
.menuManager {
  .searchBox {
    margin: 14px 0 0 14px;
  }

  .addMenuDialog {

    .parentMenu {
      margin: 8px 0;
      display: flex;
      align-items: center;

      .label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      .inputDiv {
        flex-grow: 1;

        :deep(.el-select) {
          width: 100%;
        }
      }
    }

    .twoBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;

      .parentMenu {
        display: flex;
        align-items: center;

        .label {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 14px;
          color: #606266;
          line-height: 40px;
          padding: 0 12px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }

        .inputDiv {
          flex-grow: 1;

          :deep(.el-select) {
            width: 100%;
          }
        }
      }
    }

    .buttonGroup {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
