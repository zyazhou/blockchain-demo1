import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Index from '../views/index'

import User from '../views/sys/User.vue'
import Project from '../views/sys/Project.vue'
import latestproject from '../views/sys/latestproject.vue'
import axios from "axios";
import store from "../store";
import PublicHome from "@/views/PublicHome";
import ProjectInfo from "@/views/ProjectInfo";
import releaseproject from "@/views/releaseproject";
import register from "@/views/register";
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        meta: {
           title: "所有项目"
        },
        component: Index
      }, //两种写法
      {
      	path: '/sys/users',
      	name: '/users',
      	component: User
      },
      {
      	path: '/sys/project',
      	name: 'projectInfo',
      	component: Project
      },
      {
      	path: '/sys/latestproject',
      	name: 'SysMenu',
      	component: latestproject
      },

        {
            path: '/userCenter',
            name: 'UserCenter',
            meta: {
                title: "个人中心"
            },
            component: () => import('@/views/UserCenter.vue')
        },

    ]

  }, //两种写法

  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login')
  },

    {
        path: '/PublicHome',
        name: 'PublicHome',
        component: PublicHome
    },
    {
        path: '/',
        name: 'PublicHome',
        component: PublicHome
    },
    {
        path: '/releaseproject',
        name: 'releaseproject',
        component: releaseproject
    },
    {
        path: '/ProjectInfo/:id',
        name: 'ProjectInfo',
        meta: {
            title: "项目信息"
        },
        component: ProjectInfo
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//
//     let hasRoute = store.state.menus.hasRoutes
//
//     // let token = localStorage.getItem("token")
//     //
//     // if (to.path === '/login') {
//     //     next()
//     //
//     // } else if (!token) {
//     //     next({path: '/login'})
//     //
//     //
//     // } else if(token && !hasRoute) {
//     if( !hasRoute) {
//         axios.get("/sys/menu/nav", {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         }).then(res => {
//
//             console.log(res.data.data)
//
//             // 拿到menuList
//             store.commit("setMenuList", res.data.data.nav)
//
//             // 拿到用户权限
//             store.commit("setPermList", res.data.data.authoritys)
//
//             console.log(store.state.menus.menuList)
//
//             // 动态绑定路由
//             let newRoutes = router.options.routes
//
//             res.data.data.nav.forEach(menu => {
//                 if (menu.children) {
//                     menu.children.forEach(e => {
//
//                         // 转成路由
//                         let route = menuToRoute(e)
//
//                         // 吧路由添加到路由管理中
//                         if (route) {
//                             newRoutes[0].children.push(route)
//                         }
//
//                     })
//                 }
//             })
//
//             console.log("newRoutes")
//             console.log(newRoutes)
//             router.addRoutes(newRoutes)
//
//             hasRoute = true
//             store.commit("changeRouteStatus", hasRoute)
//         })
//     }
//
//
//
//     next()
// })


// 导航转成路由
const menuToRoute = (menu) => {

    if (!menu.component) {
        return null
    }

    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + menu.component +'.vue')

    return route
}

export default router
