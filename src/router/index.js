import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartQuiz from '../views/StartQuizView.vue'
import QuizRound from '../views/QuizRoundView.vue'
import Lobby from '@/views/LobbyView.vue'
import JoinGame from '../views/JoinGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/startquiz',
      name: 'StartQuiz',
      component: StartQuiz
    },
    {
      path: '/quizround/:id',
      name: 'QuizRound',
      component: QuizRound
    },
    {
      path: '/lobby/:id',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/joingame',
      name: 'JoinGame',
      component: JoinGame
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
