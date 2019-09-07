<template>
  <div class="timer">
    <div class="process"></div>
    <p class="time">10:10</p>
    <span class="close">×</span>
  </div>
</template>

<script>
export default {
  name: 'Timer'
}
</script>

<style scoped>
.timer {
  font-weight: 700;
  color: #666;
  cursor: default;
  z-index: 1;
  border: 1px solid #CCC;
  border-radius: 4px;
  background: #F8F8F8;
  width: 100%;
  height: 2.5em;
  line-height: 2.4em;
  padding: 0;
  position: relative;
  font-size: 1em;
}
.process {
  width: 80%;
  background-image: linear-gradient(to bottom,#F8F8F8 0,#EEE 100%);
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  height: 100%;
  border-right: 1px solid rgba(212,212,212,.5);
  z-index: -1;
  border-radius: 3px 0 0 3px;
}
.time {
  text-align: center;
}
.close {
  color: #9C9C97;
  font-family: Tahoma,sans;
  right: -.5em;
  cursor: pointer;
  line-height: 1rem;
  top: 0;
  margin-top: -.7em;
  background: #fff;
  border-radius: 2em;
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  position: absolute;
  text-align: center;
}
</style>