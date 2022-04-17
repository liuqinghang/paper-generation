import Vue from 'vue'

import Router from 'vue-router'
import save from '../components/Question/SaveQuestion'
import view from '../components/Question/ViewQuestion'
import login from '../components/Login'
import user from '../components/user/index'
import UserProfile from '../components/user/profile'
import UserPost from '../components/user/post'
import AutoGenerate from '../components/Question/AutoGenerate'
import wordGenerate from '../components/Paper/FinalPaper'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/questionView',
      name: 'view',
      component: view
    },
    {
      path: '/questionSave',
      name: 'save',
      component: save
    },
    {
      path: '/smartGenerate',
      name: 'autogenerate',
      component: AutoGenerate
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/paper2word',
      name: 'wordGenerate',
      component: wordGenerate
    },
    {
      path: '/user/:userId(\\d+)',
      name: 'user',
      component: user,
      children: [{
        path: '/profile',
        component: UserProfile
      },
      {
        path: '/post',
        component: UserPost
      }
      ]
    }
  ]
})
