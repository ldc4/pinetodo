<template>
  <IconBase
    class="icon-pause"
    width="16"
    height="16"
    icon-color="#949494"
    icon-hover-color="#ff0000"
    @click="handleClick"
  >
    <path d="M416 720c-17.67 0-32-14.33-32-32V336c0-17.67 14.33-32 32-32s32 14.33 32 32v352c0 17.67-14.33 32-32 32zM608 720c-17.67 0-32-14.33-32-32V336c0-17.67 14.33-32 32-32s32 14.33 32 32v352c0 17.67-14.33 32-32 32z" p-id="1575"></path><path d="M512 128c211.74 0 384 172.26 384 384S723.74 896 512 896 128 723.74 128 512s172.26-384 384-384m0-64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z" p-id="1576"></path>
  </IconBase>
</template>

<script>
import IconBase from './IconBase'

export default {
  name: 'PauseIcon',
  components: {
    IconBase
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

