<template>
  <div>
    <Sidebar/>

    <div>
      <router-view></router-view>
    </div>

    <h1>Pagina de inicio</h1>
    <router-link to="/JohannMeza">Ir a mensaje</router-link>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'HomeChat',
  components: { Sidebar }  
}
</script>