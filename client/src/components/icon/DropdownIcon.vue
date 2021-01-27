<template>
  <object class="icon-delete-object">
    <IconBase
      class="icon-delete"
      width="16"
      height="16"
      icon-color="#949494"
      icon-hover-color="#949494"
      @click="handleClick"
    >
      <path d="M253.883291 350.83746 768.069073 350.83746 511.466857 673.16254Z"></path>
    </IconBase>
  </object>
</template>

<script>
import IconBase from './IconBase'

export default {
  name: 'DropdownIcon',
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

