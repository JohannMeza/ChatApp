<template>
  <div>
    <input 
    type="search" 
    placeholder="Buscar contactos ..." 
    autocomplete="off"
    class="border-none outline-none rounded font-chettan text-lg px-3 w-full h-10"
    @change="searchRequest"
    >
    
    <div 
    class="flex justify-between rounded-lg md:mt-3 chat"
    v-for="request in requestSearch"
    :key="request._id"
    >
      <div class="flex gap-3">
        <img :src="`./storage/${request.image}`" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
        <div>
          <span class="font-bold name-chat text-lg">{{ request.name }}</span>
          <div class="flex gap-2 items-center">
            <button class="bg-blue text-white-light px-3 py-2 rounded-md mt-2" @click="acceptRequest(request._id)">Aceptar</button>
            <button class="bg-red text-white-light px-3 py-2 rounded-md mt-2">Rechazar</button>
          </div>
        </div>
      </div>

      <span class="btnchat">
        <i class="fas fa-ellipsis-h"></i>
      </span>
    </div>
  </div>
</template>

<script>
// --- Services
import { showRequest } from '../../services/RequestServices'
import { showContacts } from '../../services/ContactsServices';


// --- Vue
import { useStore } from 'vuex'
import { ref } from 'vue'
import { storeContacts } from '../../services/ContactsServices'
import { updateRequest } from '../../services/RequestServices'

export default {
  name: 'RequestComponent',

  setup() {
    const store = useStore()
    const requests = ref()
    const requestSearch = ref();
    
    const getRequest = async () => {
      try {
        const res = await showRequest(store.state.id)
        requests.value = res.data.idRequest
        requestSearch.value = requests.value

        const resContacts = await showContacts(store.state.id)
        store.state.contacts = resContacts.data.idContacts
      } catch (err) {
        console.error(err)
      }
    }

    const searchRequest = () => {
      const regExp = new RegExp(`${event.target.value}`, 'gi')
      requestSearch.value = requests.value.filter(el => el.name.match(regExp))
    }

    const acceptRequest = async (id) => {
      Promise.all([
        await showRequest(store.state.id),
        await storeContacts({ idUser: store.state.id, idContacts: id }),
        await storeContacts({ idUser: id, idContacts: store.state.id }),
        await updateRequest(store.state.id, { idRequest: id }),
      ])
      .then(() => {
        getRequest()
      })
      .catch(err => {
        console.error(err)
      })
    }

    getRequest()

    return {
      requestSearch,


      searchRequest,
      acceptRequest
    }
  }
}
</script>

<style scoped lang="scss">

.chat-content::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

.chat-content::-webkit-scrollbar-thumb {
  background: #7C99AC;
  border-radius: 10px;
}

.chat {
  padding: 10px;
  opacity: 1;
  animation-name: chatAnima;
  animation-duration: 1s;
  animation-timing-function: ease;
  transition: opacity .5s ease,
    background .2s ease;
}

@keyframes chatAnima {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.chat:hover {
  background: rgba(248, 249, 250, .5);
}
</style>
