<template>
  <pre class="pre">
    <div class="btn" >
      <button @click="onClick">run</button>
      <button @click="info.info= []">clear</button>
    </div>
    <code class="code" v-html="text"/>
    <code class="code" v-if="info.info.length !== 0" v-html="info.info.map(i => `> ${i}`).join('\n')"/>
  </pre>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
  props: {
    content: { type: String, required: true },
    raw: { type: String, required: true },
  },
  setup(props) {
    const info = reactive({ info: [] });
    return {
      text: props.content,
      code: props.raw,
      onClick: computed(() => {
        return () => {
          info.info = [];
          // eslint-disable-next-line no-new-func
          const exec = new Function(
            'info',
            `
            const console = {};
            console.log = (...p) => info.info.push(p.map((item => {
                if (item) {
                  if (item.toString() === '[object Object]') {
                    return JSON.stringify(item);
                  }
                } else {
                  if (item === undefined) {
                    return 'undefined';
                  }
                  if (item === null) {
                    return null;
                  }
                }
                return item;
              })))
            ${props.raw}
          `,
          );
          exec.call({}, info);
        };
      }),
      info,
    };
  },
});
</script>
<style scoped>
.pre {
  position: relative;
  margin: -42px 0;
}
.btn {
  position: absolute;
  top: 50px;
  right: 0;
  display: flex;
}
.code {
}
</style>
