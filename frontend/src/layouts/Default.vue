<template>
  <n-layout position="absolute" has-sider>
    <n-layout>
      <Header />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Footer from "../components/common/Footer.vue";
import Content from "../components/common/Content.vue";
import Header from "../components/common/Header.vue";

export default defineComponent({
  components: {
    Footer,
    Content,
    Header,
  }
});
</script>
