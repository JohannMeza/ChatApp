<template>
  <div class="h-100vh bg-pattern-body">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/tailwind.css'
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  height: 100vh;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Baloo Chettan 2', cursive;
  color: #343A40;
}

.btn-max-scale:active { transform: scale(1.05) }
.btn-min-scale:active { transform: scale(0.95) }

.btnchat {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.btnchat:active {
  background: #ADB5BD;
}
</style>
