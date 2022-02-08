<template>
  <div class="w-full h-full flex-r-center">
    <div class="w-full md:w-2/3 h-full md:py-20 md:h-auto rounded-md md:container bg-white-opacity flex-c-center">
      <div class="flex justify-center">
        <img src="../../assets/logo.svg" alt="Logotipo" width="180">
      </div>

      <div class="w-3/4 container flex flex-col gap-4">
        <div>
          <label for="email" class="font-bold block mb-2">Email</label>
          <input type="email" autocomplete="off" id="email" class="block w-full reset-input">
        </div>

        <div>
          <label for="pass" autocomplete="off" class="font-bold block mb-2">Contraseña</label>
          <input type="password" id="pass" class="block w-full reset-input">

          <div class="mt-3 flex items-center gap-3 select-none">
            <input type="checkbox" id="show" class="w-4 h-4">
            <label for="show">Mostrar contraseña</label>
          </div>
        </div>

        <div class="flex-c-center gap-5">
          <button class="btn-login btn-min-scale">Iniciar sesión</button>
          <span>
            Si no tienes una cuenta, haz click aqui 
            <router-link to="/register" class="underline text-blue">Registrase</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>