<script setup lang="ts">
import { ref } from 'vue'
import type { Account } from '../types/account'

const accounts = ref<Account[]>([])

fetch('http://localhost:8080/v1/accounts')
  .then((response) => response.json())
  .then((result) => (accounts.value = result))
</script>

<template>
  <ul>
    <li v-for="account in accounts" :key="account.id">
      {{ account.code }},
      {{ account.name }}
    </li>
  </ul>
</template>
