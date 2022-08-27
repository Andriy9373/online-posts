import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'posts',
    component: () => import('@/views/PostsView')
  },
  {
    path: '/:id',
    name: 'post',
    component: () => import('@/views/PostView') 
  },
  {
    path: '/create',
    name: 'create-post',
    component: () => import('@/views/CreatePostView') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
