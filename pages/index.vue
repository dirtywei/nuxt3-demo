<template>
  <div class="project-list">
    <div @click="test">点击</div>
    <div v-for="item in data" :key="item.project_id">{{ item.title }}</div>
    <div v-for="res in response?.data" :key="res.project_id">{{ res.title }}</div>
  </div>
</template>

<script setup>
  const { data: project } = await getCommunity()
  const { data, message, code } = project.value

  const response = ref()

  async function test() {
    const { data } = await getCommunity()
    response.value = data.value
  }
</script>

<style lang="scss" scoped></style>
