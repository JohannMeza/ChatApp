<template>
  <div>
    <input 
    type="search" 
    placeholder="Buscar contactos ..." 
    autocomplete="off" 
    class="border-none outline-none rounded font-chettan text-lg px-3 w-full h-10"
    @keyup="getUsers"
    >
    
    <div 
    class="flex justify-between rounded-lg md:mt-3 chat"
    v-for="user in users"
    :key="user._id"
    @click="$emit('chatUser', { data: user, type: 'Contact' })"
    >
      <div class="flex gap-3">
        <img :src="`./storage/${user.image}`" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
        <div>
          <span class="font-bold name-chat text-lg">{{ user.name }}</span>
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
import { indexUser } from '../../services/UserServices';

// --- Vue
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SearchUsers',

  emits: ['chatUser'],

  setup() {
    const users = ref();
    const store = useStore()

    const getUsers = async () => {
      const res = await indexUser({ search :event.target.value })
      users.value = res.data.filter(el => el._id !== store.state.id)
    }

    return {
      users,


      getUsers,
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