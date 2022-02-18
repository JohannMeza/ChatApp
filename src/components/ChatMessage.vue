<template>
  <div class="h-full">
    <div v-if="chatData._id" style="max-height: 100%;">
      <div 
      class="relative panel-message"
      >
      <!-- v-show="dataUserActive" -->
        <div class="flex justify-between relative bottom-0 items-center p-5">
          <div class="flex items-center gap-3">
            <span class="btnchat btnPrevius" @click="chatData = {}, $emit('mobile-chat', true)"><i class="fas fa-chevron-left"></i></span>
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
          <div class="mt-5" v-if="messages && messages.length !== 0">
            <div v-for="message in messages" :key="message._id">
              <!-- Messages send -->
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

              <!-- Message receiver -->
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
          </div>

          <div v-else>
            Sin Mensajes
          </div>
        </div>
        
        <div class="relative bottom-0 z-40 flex flex-col-reverse">
          <form 
          @submit.prevent="sendMessage" 
          class="w-11/12 mx-auto flex flex-r-center rounded-md px-3 py-0 bg-white-light relative right-0 left-0 bottom-0"
          v-if="chatData.add"
          >
            <span class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 left-2"><i class="fas fa-folder"></i></span>
            <textarea 
            type="text" 
            @keyup="calculateHeight" 
            @keydown="calculateHeight" 
            id="inputSend"
            class="input-send border-none outline-none h-6 max-h-28 rounded-xl font-chettan text-base md:text-xl w-full py-2 z-20" 
            style="min-height: 45px; resize: none;" 
            v-model="shippingInformation.message"
            required
            >
            </textarea>
            <button type="submit" class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 right-2"><i class="fas fa-paper-plane"></i></button>
          </form>
          
          <div 
          class="flex-c-center"
          v-else
          >
            <span>No tienes agregado a este usuario, ¿Quieres enviar una solicitud de amistad?</span>
            <div>
              <button 
              class="bg-blue text-white-light px-3 py-2 rounded-md mt-2"
              @click="sentRequest(chatData._id)"
              >Enviar solicitud</button>
            </div>
          </div>
        </div>
      </div>

      <perfil-message 
      :userData="chatData"
      @chat-delete="(info) => (info) ? chatData = {} : false"
      ></perfil-message>
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
// --- Socket.io
import { socket } from '../socket.client'

// --- Vue
import { ref, watchEffect } from "vue"
import { useStore } from "vuex";

// --- Services
import { storeRequest } from "../services/RequestServices"
import { showMessageUserByUser, storeMessages } from "../services/MessageServices";

// --- Components
import PerfilMessage from './PerfilMessage.vue'

export default {
  name: 'Chat',

  components: { PerfilMessage },

  props: {  
    userData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
  setup(props) {
    const chatData = ref();
    const store = useStore()
    const messages = ref();
    const shippingInformation = ref({
      sentBy: '',
      receivedBy: '',
      message: '',
    })
    
    /**
     * @param {id} User
     * @return {data}
     * Data of contact
     * 
     */
    const getUserAndMessage = async () => {
      if (chatData.value._id) {
        const res = await showMessageUserByUser({ sentBy: store.state.id, receivedBy: props.userData._id })
        messages.value = res.data
        chatIteration()
      }
    }

    /**
    * @param {message} String
    * Function for sent message
    */
    const sendMessage = async () => {
      try {
        await storeMessages(shippingInformation.value)
        client_Message(shippingInformation.value)
        chatIteration()

        shippingInformation.value.message = ""
      } catch (err) {
        console.error(err)
      }
    }

    /**
     * @return {toggle}
     * Toggle the component perfil
     */
    
    const perfilMessage = () => {
      const $perfilElement = document.getElementById('perfilMessage');
      $perfilElement.classList.toggle('perfil-message-active')
    }

    const sentRequest = async (id) => {
      const res = await storeRequest({ idUser: id, idRequest: store.state.id })
      console.log(res.data)
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

    const chatIteration = () => {
      const $messagesContent = ref(document.querySelector('.messages'));
      if ($messagesContent.value) {
        setTimeout(() => {
          let height = $messagesContent.value.scrollHeight
          $messagesContent.value.scrollTo(0,height)
        }, 0);
      }
    }

    // Function Socket.io
    const client_Message = (messageData) => {
      const listener = () => {
        getUserAndMessage()
        // messages.value.push(data)
        // setTimeout(() => socket.removeListener('server:messagereturn', listener), 3000)
        // socket.removeListener('server:messagereturn', listener)
      }
      socket.on('server:messagereturn', listener)
      socket.emit('client:messagesend', messageData)
      // setTimeout(() => socket.removeListener('server:messagereturn', listener), 1000)
    }

    watchEffect(() => {
      chatData.value = props.userData
      if (chatData.value._id) {
        getUserAndMessage()

        shippingInformation.value = {
          sentBy: store.state.id,
          receivedBy: chatData.value._id,
        }

      } 
    })

    return {
      shippingInformation,
      chatData,
      messages,

      perfilMessage,
      sendMessage,
      calculateHeight,
      sentRequest,


      // Socket.io
      client_Message,
    }
  }
}
</script>

<style scoped lang="scss">
.panel-message {
  height: 100%;
  max-height: 95vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto 1fr;
}
.perfil-message-active {
  transform: translateX(100%);
}

.input-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.message-to::after {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/triangule.svg) no-repeat 100% / cover;
  position: absolute;
  bottom: 0;
  left: -1px;
  z-index: 10;
  transform: translateY(45%);
}

// Mensaje recibido
.message-from::after {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/triangule.svg) no-repeat 100% / cover;
  position: absolute;
  bottom: 0;
  right: -1px;
  z-index: 10;
  transform: translateY(45%) rotate(180deg);
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
  max-height: 88px;
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

  .btnPrevius {
    display: none;
  }

  .block-important {
    display: block !important;
  }

  // .chat-content {
  //   max-width: 97%;
  //   max-height: 95%;
  // }

  .messages {
    height: auto;
    max-height: 65vh;
    // max-height: 68%;
    &::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #7C99AC;
      border-radius: 5px;
    }
  }
}
</style>