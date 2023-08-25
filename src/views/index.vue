<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
router.push({ path: '/home', query: route.query})
</script>

<template>
  <RouterView />
</template>
