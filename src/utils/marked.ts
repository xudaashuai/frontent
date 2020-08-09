import marked from 'marked';
import hljs from 'highlight.js';
import { escape } from './helpers';
import 'highlight.js/styles/monokai-sublime.css';

marked.use({
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
  renderer: {
    code(code, infostring, escaped) {
      const lang = (infostring || '').match(/\S*/)?.[0] || '';
      const rawCode = code;
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          // eslint-disable-next-line no-param-reassign
          escaped = true;
          // eslint-disable-next-line no-param-reassign
          code = out;
        }
      }

      if (!lang) {
        return `<pre><code>${
          escaped ? code : escape(code, true)
        }</code></pre>\n`;
      }
      if (lang === 'javascript') {
        return `!!!!!!????${JSON.stringify({
          code: escaped ? code : escape(code, true),
          raw: rawCode,
        })}!!!!!!`;
      }

      return `<pre><code class="${this.options.langPrefix}${escape(
        lang,
        true,
      )}">${escaped ? code : escape(code, true)}</code></pre>\n`;
    },
  } as marked.Renderer,
});
export default marked;
