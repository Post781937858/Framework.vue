import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { path: '/HomeMain' },
    meta: {
      title: 'Home',
      NoNeedHome: false,
      NoNeedmain: true,
      requireAuth: true
    }
  },
  {
    path: '/HomeMain',
    name: 'HomeMain',
    component: resolve => require(['@/views/Home/index'], resolve),
    meta: {
      title: 'HomeMain',
      NoNeedHome: false,
      NoNeedmain: true,
      requireAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      NoNeedHome: true,
      NoNeedmain: false,
      requireAuth: false
    }
  },
  {
    path: '/404',
    component: () => resolve => require(['@/views/404'], resolve),
    name: '404',
    meta: {
      title: '404',
      NoNeedHome: false,
      NoNeedmain: true,
      requireAuth: true
    },
    hidden: true
  }
]
const createRouter = () => new VueRouter({
  mode: 'history',
  routes
})

const router = createRouter()

router.onReady(() => {
  let UserMenus = localStorage.getItem('Usermenus')
  if (UserMenus != null) { router.addRoutes(filterAsyncRouter(JSON.parse(UserMenus))) }
})

export function filterAsyncRouter (asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    try {
      route.component = resolve => require(['@/views' + route.path + '.vue'], resolve)
    } catch (error) {
      console.info('%c 当前路由 ' + route.url + '.vue 不存在，因此如法导入组件，请检查接口数据和组件是否匹配，并重新登录，清空缓存!', 'color:red')
    }
    return true
  })
  accessedRouters.push(
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  )
  return accessedRouters
}

router.resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}
router.$addRoutes = (params) => {
  router.addRoutes(params)
}

// 路由拦截器
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('Authorization') != null) {
    next()
  } else {
    if (to.meta.requireAuth != null && !to.meta.requireAuth) {
      next()
    } else { next({ path: '/Login' }) }
  }
})

export default router
