<template>
  <div class="timer">
    <div class="process" :style="{ width: (process/total)*100 + '%' }"></div>
    <p class="time">{{showTime}}</p>
    <span class="close" @click="$emit('close')">×</span>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  created() {
    this.timer = setInterval(this.clock, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  props: {
    total: {
      type: Number,
      default: 3600,
    },
    initProcess: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      process: this.initProcess
    }
  },
  computed: {
    showTime: function() {
      const time = this.total - this.process;
      const days = Math.floor(time / (60 * 60 * 24));
      let mod = time % (60 * 60 * 24);
      let hours = Math.floor(mod / (60 * 60));
      if (hours < 10) { hours = '0' + hours; }
      mod = mod % (60 * 60);
      let minutes = Math.floor(mod / 60);
      if (minutes < 10) { minutes = '0' + minutes; }
      mod = mod % 60;
      let seconds = mod;
      if (seconds < 10) { seconds = '0' + seconds; }
      const showTime = `${days > 0 ? `${days}天 ` : ''}${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds}`;
      document.title = `${showTime} - 青松土豆`;
      return showTime;
    }
  },
  methods: {
    clock: function() {
      this.process++;
      this.$emit('clock', this.process);
      if (this.process >= this.total) {
        clearInterval(this.timer);
        document.title = '青松土豆';
        this.$emit('completed');
      }
    },
  }
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
  width: 0%;
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