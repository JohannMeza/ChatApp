<template>
  <div class="flex flex-col bg-white-opacity min-h-full py-4">
    <div class="px-3">
      <span class="btnchat" @click="$emit('emit-cmponent-perfil', 'Sidebar')"><i class="fas fa-chevron-left"></i></span>

      <div class="flex justify-center">
        <div class="inline-block rounded-full overflow-hidden relative border-2 border-white-light edit-content">
          <img src="../assets/user-default.png" alt="Avatar" class="w-40 object-cover">

          <div class="absolute top-0 select-none flex flex-c-center w-full h-full edit-image text-white-light">
            <span class="text-6xl"><i class="far fa-image"></i></span>
            <span>Cambiar Imagen</span>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div>
          <span class="font-bold text-lg">Nombre de usuario</span>
          <div 
          class="px-3 rounded-md mt-2 flex justify-between items-center h-12 bg-white-opacity"
          v-if="!switchData.name"
          >
            <span>Esther Howard</span>
            <span class="btnchat cursor-pointer" @click="switchData.name = true"><i class="fas fa-edit"></i></span>
          </div>

          <div 
          class="mt-2 flex justify-between relative items-center bg-white-opacity h-12"
          v-else>
            <input type="text" class="w-full h-full rounded-md bg-transparent border-0 outline-none pl-3">
            <span class="btnchat mr-3" @click="switchData.name = false"><i class="fas fa-check"></i></span>
          </div>
        </div>

        <div class="mt-6">
          <span class="font-bold text-lg">Descripción de usuario</span>
          <div 
          class="px-3 rounded-md mt-2 flex justify-between items-center h-12 bg-white-opacity"
          v-if="!switchData.description"
          >
            <span>Esther Howard</span>
            <span class="btnchat cursor-pointer" @click="switchData.description = true"><i class="fas fa-edit"></i></span>
          </div>

          <div 
          class="mt-2 flex justify-between relative items-center bg-white-opacity h-12"
          v-else>
            <input type="text" class="w-full h-full rounded-md bg-transparent border-0 outline-none pl-3">
            <span class="btnchat mr-3" @click="switchData.description = false"><i class="fas fa-check"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PerfilUser',

  setup() {
    const activeComponentEdit = ref('EditedData');
    const switchData = ref({
      name: false,
      description: false
    })

    const emitDataEmission = (info) => {
      activeComponentEdit.value = info
    }

    return { switchData, activeComponentEdit, emitDataEmission }
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