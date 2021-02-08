import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Product from '@/components/Product'
import Blog from '@/components/Blog'
import Post from '@/components/Post'
import Cart from '@/components/Cart'
import Layout from '@/components/Layout'
import Category from '../components/Category.vue'
import Login from '../components/login.vue';
import Search from '../components/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'/',
          component:Home,
          name:'Home'
        },
        {
          path:'/shop',
          component:Shop,
          name:'Shop'
        },
        {
          path:'/product/:id',
          component:Category,
          name:'Category'
        },
        {
          path:'/product/details/:id',
          component:Product,
          name:'Product'
        },
        {
          path:'/blog',
          component:Blog,
          name:'Blog'
        },
        {
          path:'/post',
          component:Post,
          name:'Post'
        },
        {
          path:'/cart',
          component:Cart,
          name:'Cart',
          beforeEnter(to, form, next){
            if(localStorage.user){
              next()
            }else{
              next('/login')
            }
          }
        },
        {
          path : '/search',
          component : Search,
          name : 'search'
        }
      ]
    },
    {
      path:'/login',
      component:Login
    }
  ],
    mode:'history'
},

  )
