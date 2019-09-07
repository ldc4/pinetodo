<template>
  <footer class="footer">
    <div>
      powered by weedust
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.footer {
  width: auto;
  max-width: 960px;
  border-top: 1px solid #EEE;
  margin: 2em auto 1em;
  padding: 1em 0;
  font-size: small;
  color: #9A9EA8;
}
</style>
