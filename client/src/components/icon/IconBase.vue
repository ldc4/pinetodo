<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    role="presentation"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <g
      class="icon"
      :fill="isHover ? iconHoverColor : iconColor"
    >
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconBase",
  props: {
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    viewBox: {
      type: String,
      default: '0 0 1024 1024'
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    iconHoverColor: {
      type: String,
      default: "currentColor"
    }
  },
  data() {
    return {
      isHover: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    handleMouseOver() {
      this.isHover = true
    },
    handleMouseOut() {
      this.isHover = false
    }
  }
};
</script>

<style scoped>
.icon {
  transition: fill 0.4s ease;
}
</style>
