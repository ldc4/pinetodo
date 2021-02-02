<template>
  <IconBase
    class="icon-play"
    width="16"
    height="16"
    icon-color="#949494"
    icon-hover-color="#67C23A"
    @click="handleClick"
  >
    <path d="M512 128c211.74 0 384 172.26 384 384S723.74 896 512 896 128 723.74 128 512s172.26-384 384-384m0-64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z" p-id="1715"></path>
    <path d="M448 352l213.33 160L448 672V352m-31.87-96.06c-16.58 0-32.13 13.1-32.13 32.06v448c0 18.95 15.55 32.06 32.13 32.06 6.49 0 13.14-2.01 19.07-6.46l298.67-224c17.07-12.8 17.07-38.4 0-51.2l-298.67-224c-5.93-4.45-12.58-6.46-19.07-6.46z" p-id="1716"></path>
  </IconBase>
</template>

<script>
import IconBase from './IconBase'

export default {
  name: 'PlayIcon',
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

