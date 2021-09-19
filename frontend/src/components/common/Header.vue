<template>
  <n-layout-header bordered>
    <n-space :size="20" align="center" style="line-height: 1">
      <router-link to="/"><n-button>Home</n-button></router-link>
      <router-link to="/temperature"
        ><n-button>Temperature</n-button></router-link
      >
    </n-space>
  </n-layout-header>
</template>

<script lang="ts"></script>

<style scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
