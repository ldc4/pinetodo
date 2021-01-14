<template>
  <div :class="`enter-input ${typeClass}`">
    <input
      class="input"
      type="text"
      v-bind="$attrs"
      v-on="inputListeners"
      :value="value"
      @input="input"
      @keyup.enter="handleEnter"
    />
    <div class="enter" @click="handleEnter">
      <EnterIcon />
    </div>
  </div>
</template>

<script>
import EnterIcon from '../icon/EnterIcon.vue'

export default {
  name: 'EnterInput',
  components: {
    EnterIcon
  },
  props: {
    value: String,
    type: {
      type: String,
      default: 'normal'
    },
  },
  data: function() {
    return {}
  },
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    },
    typeClass() {
      switch(this.type) {
        case 'mini':
          return 'mini'
        default:
          return ''
      }
    }
  },
  methods: {
    input: function(e) {
      const value = e.target.value;
      this.$emit('input', value);
    },
    handleEnter: function() {
      this.$emit('enter');
    }
  }
}
</script>


<style scoped>
input[type=text] {
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
.input {
  min-height: 2.5em;
  line-height: 1.4em;
  padding: .5em 1.5em .5em .5em;
  width: 100%;
  height: 2.5em;
  position: relative;
  font-size: 1em;
}
.input:focus {
  border: 1px solid #aaa;
  color: #444;
  -moz-box-shadow: 0 0 3px rgba(0,0,0,.2);
  -webkit-box-shadow: 0 0 3px rgba(0,0,0,.2);
  box-shadow: 0 0 3px rgba(0,0,0,.2);
}
.input:focus + .enter {
  opacity: 1;
}
.enter {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  height: 2.5em;
  padding: .5em;
  border: 1px solid transparent;
  opacity: 1;
  line-height: 1.7em;
  fill: #999;
  transition: all .1s linear;
  cursor: pointer;
  opacity: 0;
}

.mini .input {
  min-height: 1.5em;
  line-height: 1em;
  height: 1.5em;
}
.mini .enter {
  height: 1em;
  padding: .1em;
}
</style>