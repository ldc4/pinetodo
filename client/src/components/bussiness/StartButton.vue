<template>
  <div class="start">
    <button class="start-btn btn" @click="start">轻松开始</button>
    <button class="restore-btn btn" @click="restore">补单</button>
  </div>
</template>

<script>
export default {
  name: 'StartButton',
  methods: {
    start() {
      this.$emit('start')
    },
    restore() {
      this.$emit('restore')
    }
  }
}
</script>

<style scoped>
.start {
  display: flex;
  justify-content: space-around;
}
.btn {
  width: 100%;
  height: 2.5em;
  line-height: 2.4em;
  padding: 0;
  position: relative;
  font-size: 1em;

  display: inline-block;
  vertical-align: middle;
  text-shadow: 0 1px 0 rgba(255,255,255,.9);
  color: #666;
  background-color: #f8f8f9;
  background: -webkit-gradient(linear,left top,left bottom,from(#f8f8f9),to(#e6e6e8));
  background: -webkit-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -moz-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -ms-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -o-linear-gradient(top,#f8f8f9,#e6e6e8);
  box-shadow: 0 1px 0 #fff inset, 0 1px 0 rgba(0,0,0,.1);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  cursor: pointer;
  border: 1px solid #BBB;

  font-weight: 700;
  white-space: nowrap;
}
.start-btn {
  width: calc(100% - 75px);
}
.start-btn:hover {
  box-shadow: none;
  background: #f4f4f4;
}
.restore-btn {
  width: 50px;
}
.restore-btn:hover {
  box-shadow: none;
  background: #f4f4f4;
}
</style>