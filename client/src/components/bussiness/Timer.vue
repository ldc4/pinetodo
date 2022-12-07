<template>
  <div class="timer-wrap">
    <div :class="{ timer: true, 'no-finish': noFinish }">
      <div class="process" :style="{ width: (process/total)*100 + '%' }"></div>
      <div class="time">
        <div>{{showTime}}</div>
        <template v-if="!noFinish">
          <PauseIcon v-if="status=='running'" class="pause-icon" @click="handlePause" />
          <PlayIcon v-else class="play-icon" @click="handleContinue" />
        </template>
      </div>
      <span class="close" @click="$emit('close')">×</span>
    </div>
    <button v-if="!noFinish" class="finish-btn btn" @click="handleFinish">结束</button>
  </div>
</template>

<script>
import PauseIcon from '../icon/PauseIcon'
import PlayIcon from '../icon/PlayIcon'

export default {
  name: 'Timer',
  components: {
    PauseIcon,
    PlayIcon
  },
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
    },
    fixProcess: {
      type: Number,
      default: 0,
    },
    noFinish: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: 'running',
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
    clock() {
      this.process++;
      this.$emit('clock', this.process);
      if (this.process >= this.total) {
        this.handleFinish()
      }
    },
    handlePause() {
      this.status = 'pause'
      clearInterval(this.timer)
    },
    handleContinue() {
      this.status = 'running'
      this.timer = setInterval(this.clock, 1000)
    },
    handleFinish() {
      clearInterval(this.timer);
      document.title = '青松土豆';
      this.$emit('finished');
    }
  },
  watch: {
    fixProcess(newData, oldData) {
      if (newData !== oldData) {
        this.process = newData;
      }
    },
  }
}
</script>

<style scoped>
.timer-wrap {
  display: flex;
  justify-content: space-around;
}
.timer {
  font-weight: 700;
  color: #666;
  cursor: default;
  z-index: 1;
  border: 1px solid #CCC;
  border-radius: 4px;
  background: #F8F8F8;
  width: calc(100% - 75px);
  height: 2.5em;
  line-height: 2.4em;
  padding: 0;
  position: relative;
  font-size: 1em;
}
.timer.no-finish {
  width: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
.finish-btn {
  width: 50px;
}
.pause-icon {
  margin: 5px;
  cursor: pointer;
}
.play-icon {
  margin: 5px;
  cursor: pointer;
}
</style>