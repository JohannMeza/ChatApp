<template>
  <div class="w-full h-full flex-r-center">
    <div class="w-full md:w-2/3 h-full md:py-20 md:h-auto rounded-md md:container bg-white-opacity flex-c-center">
      <div class="flex justify-center">
        <img src="../../assets/logo.svg" alt="Logotipo" width="180">
      </div>

      <div class="w-3/4 container flex flex-col gap-6">
        <div>
          <label for="email" class="font-bold block mb-2">Email</label>
          <input type="email" id="email" class="block w-full reset-input">
        </div>

        <div>
          <label for="pass" class="font-bold block mb-2">Contraseña</label>
          <input type="password" id="pass" class="block w-full reset-input">

          <div class="mt-3">
            <input type="checkbox" id="show">
            <label for="show">Mostrar contraseña</label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>