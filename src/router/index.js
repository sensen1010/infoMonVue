import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/main/main.vue')
const Enter = () => import('../views/enterprise/enterprise.vue')
const Login = () => import('../views/login/login.vue')
const Update = () => import('../views/update/softwareUpdate.vue')
//解决路由重复报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
  const routes = [
    {
      path:'',
      redirect:"login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta:{
        title: "登录"
      }
    },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    meta:{
      title:"主页"
    },
    children:[
    {
      path:"Enter",
      name:'Enter',
      meta:{
        title:"企业管理"
      },
      components:{
        default:Enter,
        'mianView':Enter
      }
    },
    {
      path:"Update",
      name:'Update',
      meta:{
        title:"软件更新"
      },
      components:{
        default:Update,
        'mianView':Update
      }
    }
  ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: "dist",
  routes
})
const whiteList = ['/login']
router.beforeEach((to,from,next) => {
  //设置标题
 // document.title=to.matched[0].meta.title;无效
  document.title=to.meta.title;
  const token= localStorage.getItem("token");
  if (token!==null&&token!="") {
    if (to.path === '/login') {
      next()
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') //否则全部重定向到登录页
    }
  }
  next()
})

export default router
