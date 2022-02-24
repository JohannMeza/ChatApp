<template>
  <div class="w-full h-full flex-r-center">
    <div class="w-full md:w-2/3 h-full md:py-20 md:h-auto rounded-md md:container bg-white-opacity flex-c-center">
      <div class="flex justify-center">
        <img src="../../assets/logo.svg" alt="Logotipo" width="180">
      </div>

      <form 
      class="w-3/4 container flex flex-col gap-4"
      @submit.prevent="loginUser"
      >
        <span v-if="messageError" class="bg-white text-red p-2 rounded font-semibold my-2">* {{ messageError }}</span>

        <div>
          <label for="email" class="font-bold block mb-2">Email</label>
          <input type="email" required autocomplete="off" id="email" class="block bg-white-light w-full reset-input" v-model="dataUser.email">
        </div>

        <div>
          <label for="pass" autocomplete="off" class="font-bold block mb-2">Contraseña</label>
          <div class="relative flex items-center">
            <input 
            type="password" 
            required 
            id="pass" 
            class="block bg-white-light w-full reset-input" 
            v-model="dataUser.password"
            v-if="!visiblePassword"
            >
            <input 
            type="text" 
            required 
            id="pass" 
            class="block bg-white-light w-full reset-input" 
            v-model="dataUser.password"
            v-else
            >

            <span class="btnchat absolute top-0 bottom-0 my-auto right-2">
              <input type="checkbox" id="show" class="hidden" v-model="visiblePassword">
              <label for="show" class="cursor-pointer">
                <i class="far fa-eye" v-if="visiblePassword"></i>
                <i class="fas fa-eye-slash" v-else></i>
              </label>
            </span>
          </div>
        </div>

        <div class="flex-c-center gap-5">
          <button type="submit" class="btn-login btn-min-scale">Iniciar sesión</button>
          <span>
            Si no tienes una cuenta, haz click aqui 
            <router-link to="/register" class="underline text-blue">Registrase</router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { signIn  } from "../../services/SignServices"
import { useStore } from 'vuex'
export default {
  name: "Login",

  setup() {
    const store = useStore();
    const router = useRouter();
    const dataUser = ref({
      email: '',
      password: ''
    });

    // const router = useRouter()
    const messageError = ref('');
    const visiblePassword = ref(false)

    const loginUser = async () => {
      try {
        const res = await signIn(dataUser.value)
        if (res.data.message) throw ({ message: res.data.message })
        localStorage.setItem('token', res.data.token)
        store.state.id = res.data.id
        router.push('/chat')
      } catch (err) {
        messageError.value = err.message
        console.error(err)
      }
    }

    return { 
      // Variables
      dataUser,
      messageError,
      visiblePassword,

      // Funciones async
      loginUser
    }
  }
}
</script>