<template>
  <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({name: 'Index',title: '所有项目'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">所有项目</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu :index="menu.name" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>

      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name" @click="selectMenu(item)">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
        </el-menu-item>
      </router-link>

    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data(){
    return{

      menuList: [
        {
          name: 'SysManga',
          title: '数据查询',
          icon: 'el-icon-s-operation',
          component: '',
          path: '',
          children: [
            {
              name: '/sys/users',
              title: '用户捐款记录查询',
              icon: 'el-icon-s-custom',
              path: '/sys/users',
              component: 'sys/User',
              children: []
            },
            {
              name: '/sys/project',
              title: '项目使用记录查询',
              icon: 'el-icon-rank',
              path: '/sys/project',
              component: 'sys/Project',
              children: []
            },
            {
              name: '/sys/latestproject',
              title: '查询最新项目信息',
              icon: 'el-icon-menu',
              path: '/sys/latestproject',
              component: 'sys/latestproject',
              children: []
            }
            ,
            // {
            //   name: 'SysUser',
            //   title: '发起的项目（还没开发）',
            //   icon: 'el-icon-s-custom',
            //   path: '/sys/users',
            //   component: 'sys/User',
            //   children: []
            // },
          ]
        },
      ],
    }
  },
  computed: { //动态监测值的变化
  },
  methods:{
    selectMenu(item){
      this.$store.commit("addTab",item)
    }
  }
}
</script>

<style scoped>

.el-menu-vertical-demo {
  height:100%;
}
</style>