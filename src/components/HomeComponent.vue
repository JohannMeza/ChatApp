<template>
  <div class="h-screen flex-r-center">
    <div class="grid grid-cols-12 gap-5 chat-content h-screen">
      <div 
      class="rounded-lg col-span-12 md:col-span-4 block-important overflow-hidden"
      v-show="!dataUserActive"
      >
        <keep-alive>
          <component 
          :is="componentActiveSidebar" 
          @emit-cmponent-perfil="emittedComponent" 
          @chat-active="chatActive"
          class="h-full"
          ></component>
        </keep-alive>
      </div>

      <div 
      class="bg-white-opacity h-full md:h-auto absolute md:relative col-span-8 block-important message-content rounded-xl overflow-hidden"
      v-show="dataUserActive"
      >
        <chat-message>
          <template #message>
            <div 
            class="relative panel-message block-important"
            v-show="dataUserActive"
            >
              <div class="flex justify-between items-center p-5">
                <div class="flex items-center gap-3">
                  <span class="btnchat btnPrevius" @click="dataUserActive = ''"><i class="fas fa-chevron-left"></i></span>
                  <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
                  <div class="pt-2">
                    <span class="font-bold name-chat text-lg block text leading-3">{{ dataUserActive.name }}</span>
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
                <div class="mt-5">
                  <!-- Message receiver -->
                  <div class="my-3 w-5/6 md:w-2/5">
                    <div class="text-right">
                      <span>Enviado a las 5:50 pm</span>
                    </div>
                    <div class="relative message-to shadow-xl">
                      <div class="bg-gray-100 p-3 rounded-md z-20 relative">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi incidunt exercitationem ipsam aliquid, iusto perspiciatis facilis debitis numquam? Dolores porro beatae quasi nulla natus vel aspernatur modi incidunt itaque molestias.</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Messages send -->
                  <div class="my-3 ml-auto w-5/6 md:w-2/5">
                    <div class="text-right">
                      <span>Enviado a las 5:50 pm</span>
                    </div>
                    <div class="relative message-from shadow-xl">
                      <div class="bg-gray-100 p-3 rounded-md z-20 relative">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi incidunt exercitationem ipsam aliquid, iusto perspiciatis facilis debitis numquam? Dolores porro beatae quasi nulla natus vel aspernatur modi incidunt itaque molestias.</p>
                      </div>
                    </div>
                    <div class="text-right relative z-30 mt-3">
                      <span class="font-bold mr-1">Enviado</span>
                      <span class="text-blue text-md"><i class="fas fa-check-double"></i></span>
                    </div>
                  </div>

                  <div class="my-3 ml-auto w-5/6 md:w-2/5">
                    <div class="text-right">
                      <span>Enviado a las 5:50 pm</span>
                    </div>
                    <div class="relative message-from shadow-xl">
                      <div class="bg-gray-100 p-3 rounded-md z-20 relative">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi incidunt exercitationem ipsam aliquid, iusto perspiciatis facilis debitis numquam? Dolores porro beatae quasi nulla natus vel aspernatur modi incidunt itaque molestias.</p>
                      </div>
                    </div>
                    <div class="text-right relative z-30 mt-3">
                      <span class="font-bold mr-1">Enviado</span>
                      <span class="text-blue text-md"><i class="fas fa-check-double"></i></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex-grow px-5 pb-4 relative bottom-0 z-40">
                <div class="flex flex-r-center rounded-md px-3 py-0 w-full bg-white-light relative">
                  <span class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 left-2"><i class="fas fa-folder"></i></span>
                  <textarea 
                  type="text" 
                  @keyup="calculateHeight" 
                  v-model="message"
                  id="inputSend"
                  class="input-send border-none outline-none h-6 max-h-28 rounded-xl font-chettan text-base md:text-xl w-full input-send py-2 z-20" 
                  style="min-height: 45px; resize: none;" 
                  >
                  </textarea>
                  <span class="input-btn flex-r-center cursor-pointer self-end text-blue text-xl md:text-2xl bottom-2 z-40 right-2"><i class="fas fa-paper-plane"></i></span>
                </div>
              </div>
            </div>

            <div 
            class="absolute top-0 right-0 z-40 h-full w-96 rounded-xl perfil-message block-important perfil-message-active bg-white-opacity"
            id="perfilMessage"
            v-show="dataUserActive"
            >
              <div class="p-3">
                <span class="btnchat" @click="perfilMessage"><i class="fas fa-chevron-left"></i></span>

                <div class="flex-c-center">
                  <img src="../assets/user-default.png" alt="Avatar" class="w-2/5 border-2 border-white-light rounded-full object-cover">

                  <div>
                    <span class="font-bold text-xl">Esther Howard</span>
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
          </template>
        </chat-message>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import PerfilUser from './PerfilUser.vue'
import ChatMessage from './ChatMessage.vue';
import { show } from '../services/UserServices';

export default {
  name: 'HomeChat',

  components: { Sidebar, PerfilUser, ChatMessage },

  setup() {
    const message = ref('');
    const componentActiveSidebar = ref('Sidebar')
    const dataUserActive = ref('')

    const getUserAndMessage = async (data) => {
      const res = await show(data)
      dataUserActive.value = res.data
    }

    const calculateHeight = () => {
      const $input = event.target
      $input.style.height = "45px";
      let scHeight = $input.scrollHeight;
      $input.style.height = `${scHeight}px`;
    }

    const emittedComponent = (info) => {
      componentActiveSidebar.value = info
    }

    const perfilMessage = () => {
      const $perfilElement = document.getElementById('perfilMessage');
      $perfilElement.classList.toggle('perfil-message-active')
    }

    const chatActive = (id) => {
      dataUserActive.value = id
      console.log(id)
      getUserAndMessage(id) // Function Async
    }

    return { 
      // Variables
      message,
      componentActiveSidebar,
      dataUserActive,
    
      // Functions
      calculateHeight,
      emittedComponent,
      perfilMessage,
      chatActive
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  max-height: 100%;
}

.panel-message {
  height: 100vh;
  max-height: 95vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.input-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.input-btn:active {
  background: #DEE2E6;
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

.messages::-webkit-scrollbar {
  width: 0px;
}

// Mensaje enviado
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

.perfil-message {
  background: rgba(248, 249, 250, .6);
  backdrop-filter: blur(4px);
  transition: transform .5s ease;
}

.perfil-message-active {
  transform: translateX(100%);
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