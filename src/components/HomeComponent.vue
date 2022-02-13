<template>
  <div class="h-screen flex-r-center">
    <div class="grid grid-cols-12 gap-5 chat-content h-screen">
      <div 
      class="rounded-lg col-span-12 md:col-span-4 block-important overflow-hidden"
      >
      <!-- v-show="!dataUserActive" -->
        <keep-alive>
          <component 
          :is="componentActiveSidebar" 
          @chat-emit-user="chatEmitUser"
          @emit-cmponent-perfil="emittedComponent" 
          class="h-full"
          ></component>
        </keep-alive>
      </div>

      <div 
      class="bg-white-opacity h-full md:h-auto absolute md:relative col-span-8 block-important message-content rounded-xl overflow-hidden"
      >
      <!-- v-show="dataUserActive" -->
        <chat-message :userData="chatDataActive"></chat-message>
      </div>
    </div>
  </div>
</template>

<script>
// --- Components
import Sidebar from '../components/Sidebar.vue'
import PerfilUser from './PerfilUser.vue'
import ChatMessage from './ChatMessage.vue';

// --- Services
import { showUser } from '../services/UserServices';

// --- Vue
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';

// import { showMessageUserByUser, storeMessages } from '../services/MessageServices';
// import { indexMessageGroup } from '../services/MessageGroupServices';

export default {
  name: 'HomeChat',

  components: { Sidebar, PerfilUser, ChatMessage },

  props: {
    userData: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  setup() {
    const store = useStore()
    const componentActiveSidebar = ref('Sidebar')
    const chatDataActive = ref({})

    const shippingInformation = ref({
      sentBy: '',
      receivedBy: '',
      message: '',
    })

    const chatOfUser = ref({
      contacts: {},
      groups: {}
    });
    /**
     * @return 
     * Contacts, Groups and Contacts of User
     */
    const asyncPromise = async () => {
      Promise.all([{
        user: await showUser(store.state.id)
      }]) 
      .then(result => result[0])
      .then(res => {
        store.state.user = res.user.data
      })
      .catch(err => {
        console.error(err)
      })
    }

    /**
     * @param {id} User
     * @return {data}
     * Data of contact
     * 
     */
    // const getUserAndMessage = async (data) => {
    //   const res = await showMessageUserByUser({ sentBy: store.state.id, receivedBy: data._id })
    //   chatDataActive.value = { message: res.data, data }
    // }

    /**
     * @param {id} User
     * @return {data}
     * Data of group
     * 
     */
    // const getGroupAndMessage = async (data) => {
    //   const res = await indexMessageGroup(data._id)
    //   chatDataActive.value = { message: res.data, data }
    // }

    /**
     * @param {id} Object
     * Function emitido from sidebar
     * type true => contacts
     * type false => group
     */
    const chatEmitUser = (info) => {
      const { data, type } = info
      
      const datos = store.state.contacts.find(el => {
        if (el._id === data._id) {
          return true
        }
      })

      if (datos) {
        data.add = true
      } else {
        data.add = false
      }

      if (type) {
        chatDataActive.value = data
        console.log(chatDataActive.value)
        console.log(data.add ? "Este agregado" : "No esta agregado")
        // getUserAndMessage(data) // Function Async
      } else {
        chatDataActive.value = data
        // getGroupAndMessage(data) // Function Async
      }
    }

    /**
     * @return {info}
     * Active the component Sidebar
     */
    const emittedComponent = (info) => {
      componentActiveSidebar.value = info
    }


    // LIfe Cycles 
    watchEffect(() => {
      if (store.state.id !== '') asyncPromise()

      if (chatDataActive.value) {
        shippingInformation.value = {
          sentBy: store.state.id,
          receivedBy: chatDataActive.value.data ? chatDataActive.value.data._id : null,
        }
      }
    })


    return { 
      // Variables
      componentActiveSidebar,
      chatDataActive,
      chatOfUser,
      shippingInformation,
    
      // Functions
      emittedComponent,
      chatEmitUser,

      // Functions Async 
      // sendMessage,
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