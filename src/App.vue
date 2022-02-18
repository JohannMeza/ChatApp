<template>
  <div class="h-100vh bg-pattern-body">
    <router-view></router-view>
  </div>
</template>

<script>
// --- Sokcet.io
import { socket } from './socket.client'

// --- Vue
import { useRouter } from "vue-router"
import { ref } from 'vue';
import { useStore } from 'vuex'

// --- Services
import { access } from "./services/SignServices"

// --- Sources
import './assets/tailwind.css'

export default {
  name: 'App',

  setup () {
    const router = useRouter();
    const token = ref(localStorage.getItem('token'))
    const store = useStore()
    
    const validLogin = async () => {
      if (token.value) {
        try {
          const res = await access()
          store.state.id = res.data.id
          router.push('/chat')
          socket.emit('client:newconnection', res.data.id)
        } catch (err) {
          localStorage.removeItem('token')
          router.push('/')
        }
      } else {
        localStorage.removeItem('token')
        router.push('/')
      }
    }

    validLogin()

    return { token }
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Baloo Chettan 2', cursive;
  color: #343A40;
}

.btn-max-scale:active { transform: scale(1.05) }
.btn-min-scale:active { transform: scale(0.95) }

.btnchat {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.btnchat:active {
  background: #ADB5BD;
}
</style>
