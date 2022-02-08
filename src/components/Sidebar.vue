<template>
  <div class="flex flex-col bg-white-opacity min-h-full py-4">
    <div class="px-3">
      <div class="flex justify-between items-center relative">
        <h1 class="font-bold text-2xl">Contactos</h1>
        <div class="flex gap-4">
          <span class="btnchat relative" @click="$emit('emit-cmponent-perfil', 'PerfilUser')"><i class="fas fa-ellipsis-v"></i></span>
          <span class="btnchat relative" id="btnSearch" @click="searchInput"><i class="fas fa-search"></i></span>
          <input type="text" id="inputSearch" placeholder="Buscar usuario ..." class="reset-input w-0 absolute opacity-0 invisible right-0 z-10">
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-4 overflow-auto chat-content">
      <div class="w-full flex flex-col gap-1">
        <div class="flex justify-between rounded-lg chat">
          <div class="flex gap-3">
            <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">

            <div>
              <span class="font-bold name-chat text-lg">Esther Howard</span>
              <div class="flex gap-2 items-center">
                <span class="text-blue text-xs"><i class="fas fa-check"></i></span>
                <span class="font-medium">{{ trimWord('Hola como estas estoy bien muchas gracias', 35) }}</span>
              </div>
            </div>
          </div>

          <span class="btnchat">
            <i class="fas fa-ellipsis-h"></i>
          </span>
        </div>
        <div class="flex justify-between rounded-lg chat">
          <div class="flex gap-3">
            <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">

            <div>
              <span class="font-bold name-chat text-lg">Esther Howard</span>
              <div class="flex gap-2 items-center">
                <span class="text-blue text-xs"><i class="fas fa-check"></i></span>
                <span class="font-medium">{{ trimWord('Hola como estas estoy bien muchas gracias', 35) }}</span>
              </div>
            </div>
          </div>

          <span class="btnchat">
            <i class="fas fa-ellipsis-h"></i>
          </span>
        </div>
        <div class="flex justify-between rounded-lg chat">
          <div class="flex gap-3">
            <img src="../assets/user-default.png" alt="Avatar" class="w-12 h-12 border-2 border-white-light rounded-full object-cover">

            <div>
              <span class="font-bold name-chat text-lg">Esther Howard</span>
              <div class="flex gap-2 items-center">
                <span class="text-blue text-xs"><i class="fas fa-check"></i></span>
                <span class="font-medium">{{ trimWord('Hola como estas estoy bien muchas gracias', 35) }}</span>
              </div>
            </div>
          </div>

          <span class="btnchat">
            <i class="fas fa-ellipsis-h"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { characterTrim } from '../libs/RecortarPalabras.js'

export default {
  name: 'Sidebar',

  emit: [ 'emitComponentPerfil' ],

  setup () {
    const trimWord = (words, cant) => {
      return characterTrim(words, cant)
    }

    const searchInput = () => {
      let $biblingNext = event.target.closest('.btnchat').nextElementSibling;
      $biblingNext.classList.toggle('opacity-0')
      $biblingNext.classList.toggle('invisible')
      $biblingNext.classList.toggle('w-full')
    }
 
    onMounted(() => {
      const $inputSearch = document.getElementById('inputSearch');

      document.addEventListener("click", event => {
        if (event.target.matches("#btnSearch, #btnSearch *")) {
          setTimeout(() => $inputSearch.focus(), 500)
        }

        if (!$inputSearch.matches('.invisible')) {
          if (event.target !== $inputSearch && !event.target.matches("#btnSearch, #btnSearch *")) {
            $inputSearch.classList.toggle('opacity-0')
            $inputSearch.classList.toggle('invisible')
            $inputSearch.classList.toggle('w-full')
          }
        }
      })
    })

    return { 
      trimWord,
      searchInput,

      // Functions 
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
}
.chat:hover {
  background: rgba(248, 249, 250, .5);
}

#inputSearch {
  transition: width .5s ease,
  opacity .5s ease,
  visibility .5s ease;
}
</style>