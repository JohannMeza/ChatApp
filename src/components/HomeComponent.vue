<template>
  <div class="h-screen flex-r-center">
    <div class="grid grid-cols-12 gap-5 chat-content h-screen">
      <div 
      class="w-full rounded-lg col-span-12 md:col-span-4 block-important overflow-hidden"
      v-show="!switchComponentsMobile"
      >
      <!-- v-show="!dataUserActive" -->
        <keep-alive>
          <component 
          :is="componentActiveSidebar" 
          @chat-emit-user="chatEmitUser"
          @emit-cmponent-perfil="emittedComponent" 
          ></component>
        </keep-alive>
      </div>

      <div 
      class="w-full bg-white-opacity h-full md:h-auto absolute md:relative col-span-8 block-important message-content rounded-xl overflow-hidden"
      v-show="switchComponentsMobile"
      >
      <!-- v-show="dataUserActive" -->
        <chat-message 
        :userData="chatDataActive"
        :contactsID="onlyContacts"
        @mobile-chat="switchComponentsMobile = false"
        ></chat-message>
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
import { showOnlyContacts } from '../services/ContactsServices'

// --- Vue
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';

// --- Socket.io
import { socket } from '../socket.client'

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
    },
    contactsID: Object
  },

  setup() {
    const store = useStore()
    const componentActiveSidebar = ref('Sidebar')
    const chatDataActive = ref({})
    const onlyContacts = ref();
    const switchComponentsMobile = ref(false)
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
        user: await showUser(store.state.id),
        contacts: await showOnlyContacts(store.state.id)
      }]) 
      .then(result => result[0])
      .then(res => {
        store.state.user = res.user.data
        onlyContacts.value = res.contacts.data.idContacts
        socket.emit('client:active', { id: res.contacts.data._id, contacts: onlyContacts.value })
      })
      .catch(err => {
        console.error(err)
      })
    }

    /**
     * activate active chat component
     */

    const perfilMessage = () => {
      const $perfilElement = document.getElementById('sidebar');
      $perfilElement.classList.toggle('perfil-message-active')
    }

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
      } else {
        chatDataActive.value = data
      }

      switchComponentsMobile.value = true
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
    })

    return { 
      // Variables
      switchComponentsMobile,
      componentActiveSidebar,
      chatDataActive,
      chatOfUser,
      onlyContacts,
    
      // Functions
      emittedComponent,
      chatEmitUser,
      perfilMessage,

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

.perfil-message-active {
  transform: translateX(100%);
}


@media screen and (min-width: 800px) {
  .message-content {
    display: block ;
  }
  .block-important {
    display: block !important;
  }

  .btnPrevius {
    display: none;
  }
  .chat-content {
    max-width: 97%;
    max-height: 95%;
  }

  .perfil-message-active {
    transform: translateX(0%);
  }
}
</style>