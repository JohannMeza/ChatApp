<template>
    <div class="w-full h-full flex-r-center">
      <div class="w-full md:w-2/3 h-full md:py-12 md:h-auto rounded-md md:container bg-white-opacity flex-c-center">
        <div class="flex justify-center">
          <img src="../../assets/logo.svg" alt="Logotipo" width="180">
        </div>

        <span v-if="messageError" class="bg-white text-red p-2 rounded font-semibold my-2">* {{ messageError }}</span>

        <form @submit.prevent="registerUser" class="w-3/4 container flex flex-col gap-4">
          <div class="flex flex-col md:flex md:flex-row gap-3">
            <div class="flex-grow">
              <label for="name" class="font-bold block mb-2">Nombre</label>
              <input type="text" autocomplete="off" required id="name" class="block w-full reset-input" v-model="userData.name">
            </div>
            
            <div class="flex-grow">
              <label for="email" class="font-bold block mb-2">Email</label>
              <input type="email" autocomplete="off" required id="email" class="block w-full reset-input" v-model="userData.email">
            </div>
          </div>

          <div>
            <div class="flex flex-col md:flex md:flex-row gap-3">
              <div class="flex-grow">
                <label for="pass" autocomplete="off" class="font-bold block mb-2">Contraseña</label>

                <div class="relative flex items-center">
                  <input type="password" id="pass" required class="block pr-10 w-full border-none outline-none rounded-full font-chettan text-xl pl-3 h-10" v-if="!visiblePassword" v-model="userData.password">
                  <input type="text" id="pass" required class="block pr-10 w-full border-none outline-none rounded-full font-chettan text-xl pl-3 h-10" v-else v-model="userData.password">
                
                  <span class="btnchat absolute top-0 bottom-0 my-auto right-3">
                    <input type="checkbox" id="showPass" class="hidden" v-model="visiblePassword">
                    <label for="showPass" class="cursor-pointer">
                      <i class="far fa-eye" v-if="visiblePassword"></i>
                      <i class="fas fa-eye-slash" v-else></i>
                    </label>
                  </span>
                </div>
              </div>

              <div class="flex-grow">
                <label for="passRepeat" autocomplete="off" class="font-bold block mb-2">Repetir contraseña</label>
                
                <div class="relative flex items-center">
                  <input type="password" id="passRepeat" required class="block pr-10 w-full border-none outline-none rounded-full font-chettan text-xl pl-3 h-10" v-if="!visiblePasswordRepeat" v-model="userData.repeatPassword">
                  <input type="text" id="passRepeat" required class="block pr-10 w-full border-none outline-none rounded-full font-chettan text-xl pl-3 h-10" v-else v-model="userData.repeatPassword">
                
                  <span class="btnchat absolute top-0 bottom-0 my-auto right-3">
                    <input type="checkbox" id="showPassRepeat" class="hidden" v-model="visiblePasswordRepeat">
                    <label for="showPassRepeat" class="cursor-pointer">
                      <i class="far fa-eye" v-if="visiblePasswordRepeat"></i>
                      <i class="fas fa-eye-slash" v-else></i>
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-c-center gap-5">
            <button type="submit" class="btn-login btn-min-scale">Registrarse</button>
            <span>
              Si ya tienes una cuenta, haz click aqui 
              <router-link to="/login" class="underline text-blue">Iniciar sesión</router-link>
            </span>
          </div>
        </form>
      </div>
    </div>
</template>


<script>
import { ref } from "vue"
import { signUp } from "../../services/SignServices"
import { useRouter } from 'vue-router';

export default {
  name: 'Register',

  setup() {
    const visiblePassword = ref(false)
    const visiblePasswordRepeat = ref(false)
    const messageError = ref('')
    const router = useRouter()
    const userData = ref({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    })

    const registerUser = async () => {
      try {
        if (userData.value.password !== userData.value.repeatPassword) throw({ message: "Contraseñas no coinciden" })
        messageError.value = '';

        const res = await signUp(userData.value)
        if (res.data.message) throw ({ message: res.data.message })
        console.log(res)
        router.push('login')
      } catch (err) {
        console.error(err)
        messageError.value = err.message
      }
    }

    return { 
      // Varibles
      visiblePassword, 
      visiblePasswordRepeat,
      userData,
      messageError,

      // Function async
      registerUser
    }
  }
}
</script>