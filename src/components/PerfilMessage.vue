<template>
  <div 
  class="absolute top-0 right-0 z-40 h-full w-96 rounded-xl perfil-message block-important perfil-message-active bg-white-opacity"
  id="perfilMessage"
  v-show="userData._id"
  >
    <div class="p-3">
      <span class="btnchat" @click="perfilMessage"><i class="fas fa-chevron-left"></i></span>

      <div class="flex-c-center">
        <img src="../assets/user-default.png" alt="Avatar" class="w-2/5 border-2 border-white-light rounded-full object-cover">

        <div>
          <span class="font-bold text-xl">{{ userData.name }}</span>
          <p class="text-center">Description</p>
        </div>

      </div>

      <hr class="border-gray-500 my-5">

      <div 
      @click="deleteChat(userData._id)"
      class="flex gap-2 rounded bg-red-light text-red py-3 px-4 cursor-pointer"
      v-if="userData.add"
      >
        <span><i class="fas fa-trash"></i></span>
        <span>Eliminar chat</span>
      </div>

      <div class="flex flex-col gap-3" v-else-if="!userData.add">
        <button 
        class="flex gap-2 rounded bg-blue text-white-light py-3 px-4 cursor-pointer"
        @click="sentRequest(userData._id)"
        >
          <span><i class="fas fa-trash"></i></span>
          <span>Enviar solicitud</span>
        </button>
        <button class="flex gap-2 rounded bg-red text-white-light py-3 px-4 cursor-pointer">
          <span><i class="fas fa-trash"></i></span>
          <span>Bloquear</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// --- Services
import { showContacts, updateContacts } from '../services/ContactsServices'

// --- Vue
import { useStore } from 'vuex'
import { storeRequest } from '../services/RequestServices'

export default {
  name: 'PerfilMessage',

  props: {  
    userData: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  emits: ['chat-delete'],

  setup(props, { emit }) {
    const store = useStore()
    /**
     * @return {toggle}
     * Toggle the component perfil
     */
    
    const perfilMessage = () => {
      const $perfilElement = document.getElementById('perfilMessage');
      $perfilElement.classList.toggle('perfil-message-active')
    }

    const deleteChat = async (id) => {
      try {
        await updateContacts(store.state.id, { idContacts: id })
        const resContacts = await showContacts(store.state.id)
        store.state.contacts = resContacts.data.idContacts
        emit('chat-delete', true)
      } catch (err) {
        console.error(err)
      }
    }

    const sentRequest = async (id) => {
      const res = await storeRequest({ idUser: id, idRequest: store.state.id })
      console.log(res.data)
    }

    return {
      perfilMessage,
      deleteChat,
      sentRequest
    }

  }
}
</script>