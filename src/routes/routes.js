import { createRouter, createWebHistory } from 'vue-router';

// -- Components
import HomeComponent from '../components/HomeComponent.vue'
import ChatMessage from '../components/ChatMessage.vue'

// --- Login 
import SignIn from '../components/login/SignIn.vue';
import SignUp from '../components/login/SignUp.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: SignIn,
    
  },
  {
    path: "/login",
    name: "Login",
    component: SignIn 
  },
  {
    path: "/register",
    name: 'Register',
    component: SignUp
  },
  {
    path: "/chat",
    name: "HomeComponent",
    component: HomeComponent,
    children: [
      {
        path: "/:id",
        name: "Chat",
        component: ChatMessage,
      }
    ]
  },
];

const history = createWebHistory();

const router = new createRouter({
  history,
  routes
})


export default router
