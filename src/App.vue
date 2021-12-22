<template>
  <div class="relative min-h-screen bg-white overflow-hidden p-5 md:px-14 md:py-10 lg:p-5 xl:px-44 xl:py-12">
    <div class="absolute w-56 h-28 md:w-99
    md:h-70 top-0 right-0 md:left-1/2 border border-solid
    border-gray-200 rounded-b-full">
    </div>
    <div class="absolute w-40 h-40 border border-solid border-gray-200 transform rotate-45
    -bottom-20 left-20 md:left-56">
    </div>
    <div class="absolute min-h-screen min-w-full flex mt-40 ml-14 z-10">
    <div class="w-48 h-40 lg:w-96 lg:h-80 lg:ml-12 lg:mt-16">
      <img src="../src/assets/small_bg_logo.svg" class="object-cover w-full h-full" alt="bg logo" />
    </div>
    </div>
    <HomePage />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style src="./assets/tailwind.css">
</style>
