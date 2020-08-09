<template>
  <div id="app">
    <Markdown :content="Blog1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Markdown from './components/Markdown.vue';
import Blog1 from './docs/5.md';

export default defineComponent({
  name: 'App',
  components: {
    Markdown,
  },
  data() {
    return {
      Blog1,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
pre > code {
  display: block;
}
</style>
