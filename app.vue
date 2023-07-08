<script setup>
  import { lightTheme } from 'naive-ui'
  const layout = 'default'
</script>

<template>
  <NConfigProvider :theme="lightTheme">
    <n-message-provider>
      <NuxtLayout :name="layout"> </NuxtLayout>
    </n-message-provider>
  </NConfigProvider>
</template>
