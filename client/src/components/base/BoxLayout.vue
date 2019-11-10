<template>
  <div class="box-wrap">
    <div class="box">
      <div class="box-header">
        <slot name="header"></slot>
      </div>
      <div class="box-main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxLayout'
}
</script>

<style scoped>
.box-wrap {
  zoom: 1;
  margin: 0;
  padding-left: 1em;
  width: 100%;
}
.box {
  background-color: #FFF;
  padding: 1em;
  border-radius: 5px;
  position: relative;
  border: 1px solid #DDD;
  box-shadow: 0 2px 0 rgba(225,225,225,.2);
}
.box-header {
  box-shadow: #FFF 0 1px 0;
  padding: 0 0 1em;
  position: relative;
  border-bottom: 1px solid #DDD;
}
</style>
