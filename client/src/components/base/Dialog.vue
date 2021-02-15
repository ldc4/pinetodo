<template>
  <div v-if="visible" class="dialog">
    <div class="dialog-mask"></div>
    <div class="dialog-content-wrap">
      <div class="dialog-content" :style="{ height, width }">
        <div class="close">
          <CloseIcon @click="close" />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../icon/CloseIcon'

export default {
  name: 'Dialog',
  props: ['visible', 'height', 'width'],
  components: {
    CloseIcon
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.dialog {
  
}

.dialog-mask {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2999;
  overflow: auto;
  overflow-y: scroll;
}

.dialog-content-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
}

.dialog-content {
  position: relative;
  height: 300px;
  width: 500px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 2px rgba(136,136,136,.5);
}

.dialog-content .close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}



</style>