<template>
  <div>
    <div id="write">
      <div v-for="(item, index) in contentHtml" :key="index">
        <div v-if="item.type === 'html'" v-html="item.content" />
        <template v-else>
          <CodeRun :content="item.code" :raw="item.raw" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CodeRun from './CodeRun.vue';
import marked from '../utils/marked';

export default defineComponent({
  props: { content: { type: String, required: true } },
  components: { CodeRun },
  setup(props) {
    console.log(props);
    return {
      contentHtml: computed(() => {
        const elements = marked(props.content).split('!!!!!!');
        return elements.map(item => {
          if (item.startsWith('????')) {
            const res = JSON.parse(item.substring(4));
            console.log(res);
            return res;
          }
          return {
            type: 'html',
            content: item,
          };
        });
      }),
    };
  },
});
</script>
<style scoped>
@import url('../assets/themes/github.css');
</style>
