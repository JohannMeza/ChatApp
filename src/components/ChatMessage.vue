<template>
  <div class="h-full">
    <div v-if="chatData._id">
      <div 
      class="relative panel-message block-important"
      >
      <!-- v-show="dataUserActive" -->
        <div class="flex justify-between items-center p-5">
          <div class="flex items-center gap-3">
            <span class="btnchat btnPrevius" @click="chatData = {}"><i class="fas fa-chevron-left"></i></span>
            <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
            <div class="pt-2">
              <span class="font-bold name-chat text-lg block text leading-3">{{ chatData.name }}</span>
              <span>Activo</span>
            </div>
          </div>

          <span class="btnchat" @click="perfilMessage"><i class="fas fa-ellipsis-h"></i></span>
        </div>

        <div class="overflow-auto messages px-5">
          <div class="bg-third px-3 py-4 rounded-lg text-center leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolores aperiam esse, magni velit veniam ut eos. Consectetur veniam repellat doloremque porro dignissimos, dolore cumque ipsum quaerat veritatis sit labore.
          </div>

          <div class="flex-r-center my-2">
            <span class="inline-block text-gray-100 bg-primary mx-auto p-2 rounded-md">Se union Johann Meza</span>
          </div>

          <!-- Mensajes -->
          <!-- <div class="mt-5" v-if="dataUserActive.message && dataUserActive.message.length !== 0">
            <div v-for="message in dataUserActive.message" :key="message._id">
              Messages send
              <div class="my-3 ml-auto w-5/6 md:w-2/5"  v-if="$store.state.id === message.sentBy">
                <div class="text-right">
                  <span>Enviado a las 5:50 pm</span>
                </div>
                <div class="relative message-from shadow-xl">
                  <div class="bg-gray-100 p-3 rounded-md z-20 relative">
                    <p>
                      {{ message.message }}
                    </p>
                  </div>
                </div>
                <div class="text-right relative z-30 mt-3">
                  <span class="font-bold mr-1">Enviado</span>
                  <span class="text-blue text-md"><i class="fas fa-check-double"></i></span>
                </div>
              </div>

              Message receiver
              <div class="my-3 w-5/6 md:w-2/5" v-else>
                <div class="text-right">
                  <span>Enviado a las 5:50 pm</span>
                </div>
                <div class="relative message-to shadow-xl">
                  <div class="bg-gray-100 p-3 rounded-md z-20 relative">
                    <p>
                      {{ message.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- <div v-else>
            Sin Mensajes
          </div> -->
        </div>
        
        <div class="flex-grow px-5 pb-4 relative bottom-0 z-40">
          <form 
          @submit.prevent="sendMessage" 
          class="flex flex-r-center rounded-md px-3 py-0 w-full bg-white-light relative"
          v-if="chatData.add"
          >
            <span class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 left-2"><i class="fas fa-folder"></i></span>
            <textarea 
            type="text" 
            @keyup="calculateHeight" 
            id="inputSend"
            class="input-send border-none outline-none h-6 max-h-28 rounded-xl font-chettan text-base md:text-xl w-full py-2 z-20" 
            style="min-height: 45px; resize: none;" 
            required
            >
            </textarea>
            <button type="submit" class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 right-2"><i class="fas fa-paper-plane"></i></button>
          </form>
          
            <!-- v-model="shippingInformation.message" -->
          <div 
          class="flex-c-center"
          v-else
          >
            <span>No tienes agregado a este usuario, ¿Quieres enviar una solicitud de amistad?</span>
            <div>
              <button class="bg-blue text-white-light px-3 py-2 rounded-md mt-2">Enviar solicitud</button>
            </div>
          </div>
        </div>
      </div>

      <div 
      class="absolute top-0 right-0 z-40 h-full w-96 rounded-xl perfil-message block-important perfil-message-active bg-white-opacity"
      id="perfilMessage"
      v-show="chatData._id"
      >
        <div class="p-3">
          <span class="btnchat" @click="perfilMessage"><i class="fas fa-chevron-left"></i></span>

          <div class="flex-c-center">
            <img src="../assets/user-default.png" alt="Avatar" class="w-2/5 border-2 border-white-light rounded-full object-cover">

            <div>
              <span class="font-bold text-xl">{{ chatData.name }}</span>
              <p class="text-center">Description</p>
            </div>

          </div>

          <hr class="border-gray-500 my-5">

          <div class="flex gap-2 bg-red-light text-red py-3 px-4 cursor-pointer">
            <span><i class="fas fa-trash"></i></span>
            <span>Eliminar chat</span>
          </div>
        </div>
      </div>
    </div>

    <div 
    class="h-full flex-c-center"
    v-else
    >
      <span class="text-9xl text-gray-500"><i class="fas fa-comment-slash"></i></span>
      <span>Selecciona un chat para empezar a chatear</span>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue"

export default {
  name: 'Chat',

  props: {  
    userData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
  setup(props) {
    const chatData = ref()

    watchEffect(() => {
      chatData.value = props.userData
    })

    /**
     * @return {toggle}
     * Toggle the component perfil
     */
    const perfilMessage = () => {
      const $perfilElement = document.getElementById('perfilMessage');
      $perfilElement.classList.toggle('perfil-message-active')
    }

    /**
    * @param {message} String
    * Function for sent message
    */
    const sendMessage = async () => {
      // console.log(shippingInformation.value)
      // await storeMessages(shippingInformation.value)
      // event.target.inputSend = ''
    }

      /**
     * @return {event}
     * executed by emitting a browser event
     */
    const calculateHeight = () => {
      const $input = event.target
      $input.style.height = "45px";
      let scHeight = $input.scrollHeight;
      $input.style.height = `${scHeight}px`;
    }

    return {
      chatData,

      perfilMessage,
      sendMessage,
      calculateHeight
    }
  }
}
</script>

<style scoped lang="scss">
.perfil-message-active {
  transform: translateX(100%);
}


.input-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.input-btn:active {
  background: #DEE2E6;
}

.perfil-message {
  background: rgba(248, 249, 250, .6);
  backdrop-filter: blur(4px);
  transition: transform .5s ease;
}

.input-send {
  background: transparent;
}

.input-send::-webkit-scrollbar {
  width: 5px;
}
.input-send::-webkit-scrollbar-thumb {
  background: #7C99AC;
  border-radius: 10px;
}

@media screen and (min-width: 800px) {
  .message-content {
    display: block ;
  }

  .btnPrevius {
    display: none;
  }

  .block-important {
    display: block !important;
  }

  .chat-content {
    max-width: 97%;
    max-height: 95%;
  }

  .messages {
    max-height: 68vh;
    &::-webkit-scrollbar {
      width: 20px;
    }
  }
}
</style>