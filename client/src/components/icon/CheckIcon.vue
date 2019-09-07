<template>
  <object class="icon-check">
    <svg viewBox="0 0 38 32" id="icon-check" v-show="!checked">
    </svg>
    <svg viewBox="0 0 38 32" id="icon-check" v-show="checked">
      <path d="M37.728 2.272q-8 7.104-19.2 24L14.848 32Q10.24 26.24 0 16l3.424-3.424 9.152 8q4.8-4.8 8.928-8.704t6.592-5.984 4.192-3.552T34.752.448L35.424 0q.128 0 .352.064t.832.608 1.12 1.6z"></path>
    </svg>
  </object>
</template>

<script>
export default {
  name: 'CheckIcon',
  props: {
    checked: Boolean
  }
}
</script>

<style scoped>
.icon-check {
  display: inline-block;
  text-decoration: inherit;
  width: 16px;
  height: 16px;
  text-align: center;
  fill: #999;
}
</style>