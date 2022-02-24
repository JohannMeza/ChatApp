<template>
  <div class="h-full">
    <div v-if="chatData._id" class="h-full" style="max-height: 100%;">
      <div 
      class="relative panel-message"
      >
      <!-- v-show="dataUserActive" -->
        <div class="flex justify-between relative bottom-0 items-center p-5">
          <div class="flex items-center gap-3">
            <span 
            class="btnchat btnPrevius" 
            @click="$emit('mobile-chat', true)"
            
            >
            <i class="fas fa-chevron-left"></i>
            </span>
            <img :src="chatData.image ? `./storage/${chatData.image}` : './storage/user-default.png'" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
            <div class="pt-2">
              <span class="font-bold name-chat text-lg block text leading-3">{{ chatData.name }}</span>
              <span>Activo</span>
            </div>
          </div>

          <span class="btnchat" @click="perfilMessage"><i class="fas fa-ellipsis-h"></i></span>
        </div>

        <div class="overflow-auto messages px-5">
          <div class="bg-third px-3 py-4 rounded-lg text-center leading-5">
            Los mensajes y archivos no estan cifrados, por su seguridad no envien cuentas personales u otros datos sensibles, pipedrive no se hara responsable de robo de información u otras cosas, gracias por su comprensión.
          </div>

          <!-- <div class="flex-r-center my-2">
            <span class="inline-block text-gray-100 bg-primary mx-auto p-2 rounded-md">Se union Johann Meza</span>
          </div> -->

          <!-- Mensajes -->
          <div class="mt-5" v-if="messages && messages.length !== 0">
            <div v-for="message in messages" :key="message._id">
              <!-- Messages send -->
              <div class="flex flex-col items-end my-3 ml-auto w-5/6 md:w-3/5"  v-if="$store.state.id === message.sentBy">
                <div class="text-right">
                  <span>Enviado a las {{ horaHumana(new Date(message.createdAt).toLocaleTimeString()) }}</span>
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

                  <span class="text-blue text-xs" v-if="message.viewed">
                    <i class="fas fa-check-double"></i>
                  </span>
                  <span class="text-blue text-xs" v-if="!message.viewed">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              </div>

              <!-- Message receiver -->
              <div class="flex flex-col items-start my-3 w-5/6 md:w-3/5" v-else>
                <div class="text-right">
                  <span>Enviado a las {{ horaHumana(new Date(message.createdAt).toLocaleTimeString()) }}</span>
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
        </div>
        
        <div class="relative bottom-0 pb-3 z-40 flex flex-col-reverse">
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
            required
            ></textarea>
            <!-- v-model="shippingInformation.message" -->
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
import { onUpdated, ref, watchEffect } from "vue"
import { useStore } from "vuex";

// --- Services
import { storeRequest } from "../services/RequestServices"
import { showMessageUserByUser, storeMessages, updateViewed } from "../services/MessageServices";

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
    }, 
    contactsID: Object
  },
  
  setup(props) {
    const chatData = ref();
    const store = useStore()
    const messages = ref();
    const shippingInformation = ref({
      sentBy: '',
      receivedBy: '',
      message: '',
      createdAt: '',
    })
    
    /**
     * @param {id} User
     * @return {data}
     * Data of contact
     * 
     */
    const getUserAndMessage = async () => {
      // if (chatData.value._id) {
        const res = await showMessageUserByUser({ sentBy: store.state.id, receivedBy: props.userData._id })
        messages.value = res.data
        chatIteration()
      // }
    }

    /**
    * @param {message} String
    * Function for sent message
    */
    const sendMessage = async () => {
      try {
        const $textarea = document.getElementById('inputSend')
        shippingInformation.value.message = $textarea.value
        shippingInformation.value.createdAt = new Date().toString()

        await storeMessages(shippingInformation.value)
        chatIteration()

        client_Message(shippingInformation.value)
        getUserAndMessage()

        $textarea.value = ''
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

    /**
     * @return {message viewed}
     * The create the component, be will update the state to viewed
     */

    const visualized = async () => {
      if (chatData.value && messages.value) {
        const lastMessage = messages.value[messages.value.length - 1]
        if (lastMessage) {
          if (lastMessage.viewed === false && lastMessage.receivedBy !== props.userData._id) {
            const data = { sentBy: store.state.id, receivedBy: props.userData._id }
            await updateViewed(data)
            socket.emit("client:view", data)
          }
        }
      }
    }

    const sentRequest = async (id) => {
      await storeRequest({ idUser: id, idRequest: store.state.id })
    }

    /**
     * @return {event}
     * executed by emitting a browser event
     * emited writing event 
     */

    const calculateHeight = () => {
      const $input = event.target
      $input.style.height = "45px";
      let scHeight = $input.scrollHeight;
      $input.style.height = `${scHeight}px`;

      // socket.emit('client:writing', props.contactsID)
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

    const horaHumana = (hora) => {
      let minutos = parseInt(hora.substring(3,5))
      hora = parseInt(hora.substring(0,2))
      if (hora > 12) {
        return `${hora - 12}:${minutos.toString().length === 1 ? '0' + minutos : minutos} p.m.`
      } else {
        if (hora === 12 && minutos >= 0) {
          return `${hora}:${minutos.toString().length === 1 ? '0' + minutos : minutos} p.m.`
        }

        if (hora === 0) {
          return `12:${minutos.toString().length === 1 ? '0' + minutos : minutos} a.m.`
        }

        return `${hora}:${minutos.toString().length === 1 ? '0' + minutos : minutos} a.m.`
      }
    }

    // Function Socket.io
    const client_Message = (messageData) => {
      socket.emit('client:messagesend', messageData);
    }

    socket.on('server:messagereturn', data => {
      if (data.sentBy === chatData.value._id) {
        if (messages.value) {
          messages.value.push(data)
        }
        chatIteration()
      }
    })

    socket.on('server:view', () => {
      getUserAndMessage()
      visualized()
    })

    socket.on('server:active', userActive => {
      console.log("Un nuevo usuario conectado")
      console.log(userActive)
    })

    // Life Cycle
  
    onUpdated(() => {
      visualized()
    })

    watchEffect(() => {
      chatData.value = props.userData

      if (props.userData) {
        getUserAndMessage()

        shippingInformation.value = {
          sentBy: store.state.id,
          receivedBy: chatData.value._id,
          viewed: false,
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
      horaHumana,


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
  grid-gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
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