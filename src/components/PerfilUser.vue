<template>
  <div class="flex flex-col bg-white-opacity min-h-full py-4">
    <div class="px-3">
      <span class="btnchat" @click="$emit('emit-cmponent-perfil', 'Sidebar')"><i class="fas fa-chevron-left"></i></span>

      <form class="flex-c-center" enctype="multipart/form-data" @submit.prevent="sendFile">
        <label for="file" class="inline-block rounded-full overflow-hidden relative border-2 border-white-light edit-content">
          <img :src="userImage ? `./storage/${userImage}` : './storage/user-default.png'" id="image-avatar" alt="Avatar" class="w-40 h-40 object-cover">
          
          <div class="absolute top-0 select-none flex flex-c-center w-full h-full edit-image text-white-light">
            <span class="text-6xl"><i class="far fa-image"></i></span>
            <span>Cambiar Imagen</span>
          </div>
        </label>

        <button type="submit" class="bg-blue text-white-light px-3 py-2 rounded-md mt-2">Actualizar imagen</button>

        <input type="file" name="file" id="file" class="hidden" @change="uploadImage">
      </form>

      <div class="mt-5">
        <div>
          <span class="font-bold text-lg">Nombre de usuario</span>
          <div 
          class="px-3 rounded-md mt-2 flex justify-between items-center h-12 bg-white-opacity"
          v-show="!switchData.name"
          >
            <span>{{ userName }}</span>
            <label for="name"><span class="btnchat cursor-pointer" @click="switchData.name = true"><i class="fas fa-edit"></i></span></label>
          </div>

          <div 
          class="mt-2 flex justify-between relative items-center bg-white-opacity h-12"
          v-show="switchData.name">
            <input 
            type="text" 
            id="name" 
            class="w-full h-full rounded-md bg-transparent border-0 outline-none pl-3" 
            v-model="userName"
            >
            <span 
            class="btnchat mr-3" 
            @click="switchData.name = false, updateAccount({ name: userName })"
            >
            <i class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <div class="mt-6">
          <span class="font-bold text-lg">Descripción de usuario</span>
          <div 
          class="px-3 rounded-md mt-2 flex justify-between items-center h-12 bg-white-opacity"
          v-show="!switchData.description"
          >
            <span>{{ userDescription || 'Welcome to pipedrive' }}</span>
            <label for="description"><span class="btnchat cursor-pointer" @click="switchData.description = true"><i class="fas fa-edit"></i></span></label>
          </div>

          <div 
          class="mt-2 flex justify-between relative items-center bg-white-opacity h-12"
          v-show="switchData.description">
            <input 
            type="text" 
            id="description" 
            class="w-full h-full rounded-md bg-transparent border-0 outline-none pl-3" 
            v-model="userDescription"
            >
            <span 
            class="btnchat mr-3" 
            @click="switchData.description = false, updateAccount({ description: userDescription })"
            >
            <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <button 
      class="bg-blue text-white-light py-2 px-3 mx-auto block rounded-md"
      @click="logout"
      >
      Desconectar</button>

      <button 
      class="bg-red text-white-light py-2 px-3 mx-auto block rounded-md"
      @click="deleteAccount"
      >
      Borrar cuenta</button>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { deletedUser, updatedUser, uploadUser } from '../services/UserServices';

export default {
  name: 'PerfilUser',

  setup() {
    const router = useRouter()
    const store = useStore()
    const activeComponentEdit = ref('EditedData');
    const file = ref(null);

    const userName = ref('');
    const userDescription = ref('');
    const userImage = ref()

    const switchData = ref({
      name: false,
      description: false
    })

    const logout = () => {
      localStorage.removeItem('token');
      store.state.id = ''
      store.state.user = {}
      router.push('/')
    }

    const emitDataEmission = (info) => {
      activeComponentEdit.value = info
    }

    const deleteAccount = async () => {
      if(confirm('¿Estás seguro de eliminar tu cuenta?')) {
        await deletedUser(store.state.user._id)
        localStorage.removeItem('token');
        router.push('/')
      }
    }

    const uploadImage = () => {
      file.value = event.target.files[0]
      const $imageAvatar = document.getElementById('image-avatar');
      $imageAvatar.src = URL.createObjectURL(event.target.files[0])
    }

    const sendFile = async () => {
      if (!file.value) return
      const formData = new FormData();
      formData.append('file', file.value)

      try {
        await uploadUser(store.state.id, formData);
        
      } catch (err) {
        console.error(err)
      }
    }

    const updateAccount = async (data) => {
      try {
        const res = await updatedUser(store.state.id, data)
        store.state.user = res.data
      } catch (err) {
        console.error(err)
      }
    }

    watchEffect(() => {
      userName.value = store.state.user.name
      userDescription.value = store.state.user.description
      userImage.value = store.state.user.image
    })

    return { 
      // Variables
      switchData, 
      activeComponentEdit, 
      userName,
      userDescription,
      userImage,
      
      // Functions
      emitDataEmission, 
      logout, 
      uploadImage,
      sendFile,

        // Async
      deleteAccount,
      updateAccount
    }
  }
}
  
</script>


<style scoped lang="scss">
.edit-image {
  opacity: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.781);
  transition: opacity .7s ease;

}
.edit-content:hover .edit-image {
  opacity: 1;
}


</style>