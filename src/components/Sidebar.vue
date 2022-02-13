<template>
  <div class="flex flex-col bg-white-opacity min-h-full md:py-4 px-3">
    <div class="py-3 md:py-0">
      <div class="flex justify-between items-center relative">
        <div class="flex items-center gap-2">
          <img alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">
          <h1 class="font-bold text-2xl">{{ $store.state.user.name }}</h1>
        </div>
        <span class="btnchat relative" @click="$emit('emit-cmponent-perfil', 'PerfilUser')"><i class="fas fa-ellipsis-v"></i></span>
      </div>
    </div>

    <ul class="flex justify-between mt-3">
      <li class="cursor-pointer px-2 sidebar-active border-b-4 border-blue" @click="switchComponentSidebar('ContactComponent')">Contactos</li>
      <li class="cursor-pointer px-2 border-blue" @click="switchComponentSidebar('GroupComponent')">Grupos</li>
      <li class="cursor-pointer px-2 border-blue" @click="switchComponentSidebar('RequestsComponent')">Solicitudes</li>
      <li class="cursor-pointer px-2 border-blue" @click="switchComponentSidebar('SearchComponent')">Buscar</li>
    </ul>

    <!-- Cuatro componentes -->
    <div class="h-full flex flex-col md:mt-2 overflow-auto chat-content rounded-xl md:rounded-none">
      <div class="w-full flex flex-col gap-1" v-if="$store.state.id">
        <keep-alive>
          <component 
          :is="menuAliveSidebar"
          @chatUser="chatEmitUser"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
// --- Components
import ContactComponent from './sidebar/ContactsComponent.vue';
import GroupComponent from './sidebar/GroupComponent.vue';
import RequestsComponent from './sidebar/RequestsComponent.vue';
import SearchComponent from './sidebar/SearchComponent.vue';

// --- Requests 
import { onMounted, ref, watchEffect } from 'vue'
// import { showGroupsUser } from '../services/GroupsUserServices';
// import { showContacts } from '../services/ContactsServices';
// import { indexUser } from '../services/UserServices.js'

// --- Vue
import { useStore } from 'vuex';

// --- Functions 
import { characterTrim } from '../libs/RecortarPalabras.js'

export default {
  name: 'Sidebar',

  components: { ContactComponent, GroupComponent, RequestsComponent, SearchComponent },

  emit: [ 'chatEmitUser' ],

  setup(props, { emit }) {
    const store = useStore()
    const chatsAll = ref()
    const menuAliveSidebar = ref('ContactComponent');
    const propsDataUser = ref([]);
    const chatsDuplicate = ref({
      contacts: {},
      groups: {}
    })

    // const getChatsUser = async () => {
    //   await Promise.all([{
    //     contacts: await showContacts(store.state.id),
    //     groups: await showGroupsUser(store.state.id)
    //   }])
    //   .then(result => result[0])
    //   .then(res => {
    //     chatsAll.value = res
    //     chatsDuplicate.value.contacts = chatsAll.value.contacts.data.idContacts
    //     chatsDuplicate.value.groups = chatsAll.value.groups.data.idGroups
    //     propsDataUser.value = chatsDuplicate.value.contacts
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // }

    const trimWord = (words, cant) => {
      return characterTrim(words, cant)
    }

    const switchComponentSidebar = (component) => {
      if (!event.target.matches('.border-b-4')) {
        const listSidebar = document.querySelector('.sidebar-active');
        listSidebar.classList.remove('border-b-4', 'sidebar-active');
        event.target.classList.add('border-b-4', 'sidebar-active')
      }

      menuAliveSidebar.value = component
    }

    const searchInputAnimate = () => {
      let $biblingNext = event.target.closest('.btnchat').nextElementSibling;
      $biblingNext.classList.toggle('opacity-0')
      $biblingNext.classList.toggle('invisible')
      $biblingNext.classList.toggle('w-full')
    }

    const searchChats = () => {
      const regExp = new RegExp(`${event.target.value}`, 'gi')
      chatsDuplicate.value.contacts = chatsAll.value.contacts.data.idContacts.filter(el => el.name.match(regExp))
      chatsDuplicate.value.groups = chatsAll.value.groups.data.idGroups.filter(el => el.name.match(regExp))
    }
 
    const chatEmitUser = (info) => {
      emit('chatEmitUser', info)
    }

    // const getUsers = async () => {
    //   try {
    //     const res = await indexUser({ id: "6202c028b6c5df362b54d72d" });
    //     console.log(res.data)
    //     usersAll.value = res.data
    //     usersDuplicate.value = usersAll.value
    //   } catch (err) {
    //     console.error(err)
    //   }
    //   // usersAll.value = res.data.filter(el => el.from !== store.state.id)
    // }

    // Life Cycle
    // getUsers()

    watchEffect(() => {
      if (store.state.id) {
        // getChatsUser()
      }
    })
    
    onMounted(() => {
      // const $inputSearch = document.getElementById('inputSearch');

      // document.addEventListener("click", event => {
      //   if (event.target.matches("#btnSearch, #btnSearch *")) {
      //     setTimeout(() => $inputSearch.focus(), 500)
      //   }

      //   if (!$inputSearch.matches('.invisible')) {
      //     if (event.target !== $inputSearch && !event.target.matches("#btnSearch, #btnSearch *")) {
      //       $inputSearch.classList.toggle('opacity-0')
      //       $inputSearch.classList.toggle('invisible')
      //       $inputSearch.classList.toggle('w-full')
      //     }
      //   }
      // })
    })

    return { 
      trimWord,
      searchInputAnimate,
      menuAliveSidebar,
      chatsDuplicate,
      propsDataUser,

      // Functions 
      searchChats,
      switchComponentSidebar,
      chatEmitUser,

      // Data async
    }
  }
}
</script>

<style lang="scss" scoped>
.name-chat {
  position: relative;
  padding-left: 8px;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50px;
    left: 0;
    width: 3px;
    height: 70%;
    background: #495057;
  }
}


#inputSearch {
  transition: width .5s ease,
  opacity .5s ease,
  visibility .5s ease;
}
</style>