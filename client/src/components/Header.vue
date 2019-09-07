<template>
  <header class="header">
    <div class="name">
      <h1>青松土豆</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.header {
  height: 48px;
  font-size: 14px;
  box-shadow: #FFF 0 1px 0;
  width: auto;
  max-width: 960px;
  margin: 0 auto 20px;
  border-bottom: 1px solid #DDD;
}
.name {
  font-size: 22px;
  line-height: 48px;
  font-weight: 700;
  float: left;
  margin: 0;
}
</style>
