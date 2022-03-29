<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="content">
        <Workspace />
        <Todospace />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Workspace from '../components/Workspace.vue'
import Todospace from '../components/Todospace.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Footer,
    Workspace,
    Todospace,
  },
  created() {
    // 登录态探活，在十二小时后，每一小时访问一次
    this.timeout = setTimeout(this.live, 12 * 3600 * 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions([
      'getUserInfo',
    ]),
    async live() {
      await this.getUserInfo();
      await new Promise(resolve => setTimeout(resolve, 3600 * 1000));
      await this.live();
    }
  }
}
</script>

<style>
a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote,
body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl,
dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4,
h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li,
mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small,
span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead,
time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
}
html {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
caption, td, th {
    text-align: left;
    font-weight: 400;
    vertical-align: middle;
}
blockquote, q {
    quotes: none;
}
blockquote:after, blockquote:before, q:after, q:before {
    content: "";
    content: none;
}
a img {
    border: none;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: auto;
  max-width: 960px;
  margin: 20px auto;
  min-height: 640px;
}
.content {
  zoom: 1;
  padding: 0;
  margin: 0 0 0 -1em;
}
.content::after {
  display:block; 
  content:"clear"; 
  clear:both; 
  line-height:0;
  visibility:hidden;
}
</style>
