<template>
  <div>
    <input 
    type="search" 
    placeholder="Buscar contactos ..." 
    autocomplete="off"
    class="border-none outline-none rounded font-chettan text-lg px-3 w-full h-10"
    @change="searchGroups"
    >

    <div 
    class="flex justify-between md:mt-3 rounded-lg chat"
    v-for="group in groupsSearch"
    :key="group._id"
    >
      <div class="flex gap-3">
        <img alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
        <div>
          <span class="font-bold name-chat text-lg">{{ group.name }}</span>
          <div class="flex gap-2 items-center">
            <span class="text-blue text-xs self-start pt-1"><i class="fas fa-check"></i></span>
            <span class="font-medium">Mensaje del grupo</span>
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
import { showGroupsUser } from '../../services/GroupsUserServices';
import { useStore } from 'vuex';
import { ref } from 'vue';

// --- Vue
export default {
  name: 'GroupsUser',

  setup() {
    const store = useStore()
    const groups = ref(null)
    const groupsSearch = ref();

    const getGroups = async () => {
      const res = await showGroupsUser(store.state.id)
      groups.value = res.data.idGroups
      groupsSearch.value = groups.value
    }

    const searchGroups = () => {
      const regExp = new RegExp(`${event.target.value}`, 'gi')
      groupsSearch.value = groups.value.filter(el => el.name.match(regExp))
    }

    getGroups() 

    return {
      groupsSearch,

      searchGroups
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

