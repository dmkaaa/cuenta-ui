<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="border-b border-slate-700">
    <div class="md:container md:mx-auto px-5 py-3">
      <div class="flex items-baseline">
        <h1 class="text-xl font-semibold">Cuenta App</h1>
        <div class="ml-7">
          <RouterLink class="mx-3 text-slate-400 hover:text-slate-200" to="/"> Home </RouterLink>
          <RouterLink class="mx-3 text-slate-400 hover:text-slate-200" to="/accounts">
            Accounts
          </RouterLink>
          <RouterLink class="mx-3 text-slate-400 hover:text-slate-200" to="/entries">
            Entries
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="md:container md:mx-auto p-5">
    <RouterView />
  </div>
</template>

<style scoped></style>
