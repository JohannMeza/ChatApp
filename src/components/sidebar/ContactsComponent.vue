<template>
  <!-- <h2>Contactos</h2>
  <div
  class="flex justify-between rounded-lg chat"
  v-for="contact in chatsDuplicate.contacts"
  :key="contact._id"
  @click="$emit('chat-active', { data: contact, type: true })"
  >
    <div class="flex gap-3">
      <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">

      <div>
        <span class="font-bold name-chat text-lg">{{ contact.name }}</span>
        <div class="flex gap-2 items-center">
          <span class="text-blue text-xs self-start pt-1"><i class="fas fa-check"></i></span>
          <span class="font-medium">{{ trimWord(user.message, 35) }}</span>
        </div>
      </div>
    </div>

    <span class="btnchat">
      <i class="fas fa-ellipsis-h"></i>
    </span>
  </div>

  <h2>Grupos</h2>
  <div
  class="flex justify-between rounded-lg chat"
  v-for="group in chatsDuplicate.groups"
  :key="group._id"
  @click="$emit('chat-active', { data: group, type: false,  })"
  >
    <div class="flex gap-3">
      <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">

      <div>
        <span class="font-bold name-chat text-lg">{{ group.name }}</span>
        <div class="flex gap-2 items-center">
          <span class="text-blue text-xs self-start pt-1"><i class="fas fa-check"></i></span>
          <span class="font-medium">{{ trimWord(group.message, 35) }}</span>
        </div>
      </div>
    </div>

    <span class="btnchat">
      <i class="fas fa-ellipsis-h"></i>
    </span>
  </div> -->
  
  <div>
    <input 
    type="search" 
    placeholder="Buscar contactos ..." 
    autocomplete="off"
    class="border-none outline-none rounded font-chettan text-lg px-3 w-full h-10"
    @change="searchContacts"
    >
    
    <div 
    class="flex justify-between rounded-lg md:mt-3 chat"
    v-for="contact in contactsSearch"
    :key="contact._id"
    @click="$emit('chatUser', { data: contact, type: 'Contact' })"
    >

      <div class="flex gap-3">
        <img :src="`./storage/${contact.image}`" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
        <div>
          <span class="font-bold name-chat text-lg">{{ contact.name }}</span>
          <div class="flex gap-2 items-center">
            <span class="text-blue text-xs self-start pt-1"><i class="fas fa-check"></i></span>
            <span class="font-medium">Mensaje del contacto</span>
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
// import { showGroupsUser } from '@/src/services/GroupsUserServices';
import { showContacts } from '../../services/ContactsServices';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue';

// --- Vue

export default {
  name: 'UserContacts',

  setup() {
    const store = useStore();
    const contacts = ref(null);
    const contactsSearch = ref();
    
    const getUser = async () => {
      const res = await showContacts(store.state.id)
      contacts.value = res.data.idContacts ? res.data.idContacts : []
      store.state.contacts = contacts.value
      contactsSearch.value = store.state.contacts
    }

    const searchContacts = () => {
      const regExp = new RegExp(`${event.target.value}`, 'gi')
      contactsSearch.value = contacts.value.filter(el => el.name.match(regExp))
    }

    getUser()

    watchEffect(() => {
      contactsSearch.value = store.state.contacts
    })

    return {
      contactsSearch,


      searchContacts
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