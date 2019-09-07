<template>
  <div class="result">
    <textarea class="result-textarea" style="resize: vertical;"></textarea>
    <div class="result-submit">
      <EnterIcon />
    </div>
    <span class="close">×</span>
  </div>
</template>

<script>
import EnterIcon from '../icon/EnterIcon.vue'

export default {
  name: 'EnterTextarea',
  components: {
    EnterIcon
  }
}
</script>

<style scoped>
.result {
  position: relative;
}
textarea {
  border: 1px solid #ccc;
  outline: 0;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  color: #777;
  margin: 0;
  max-width: 100%;
  display: block;
  background: #fff;
}
textarea:focus + .result-submit {
  opacity: 1;
}
.result-textarea {
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 33px;
  padding-right: 1.8em;
  min-height: 2.5em;
  line-height: 1.4em;
  padding: .5em 1.5em .5em .5em;
  position: relative;
  font-size: 1em;
  max-height: 100px;
}
.result-submit {
  position: absolute;
  right: 0;
  bottom: 1em;
  z-index: 2;
  height: 1em;
  padding: .5em;
  border: 1px solid transparent;
  opacity: 1;
  line-height: 1em;
  fill: #999;
  transition: all .1s linear;
  cursor: pointer;
  opacity: 0;
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