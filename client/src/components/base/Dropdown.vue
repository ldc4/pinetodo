<template>
  <div class="dropdown" ref="dropdown">
    <div class="dropdown-input" @click="handleDropdownClick">
      <input :value="value" />
      <div class="dropdown-icon">
        <DropdownIcon />
      </div>
    </div>
    <div v-if="showDropdown" class="dropdown-list">
      <template v-for="opt of options">
        <div
          class="dropdown-item"
          :key="opt.value"
          @click="handleDropdownItemClick(opt)"
        >{{opt.label || ''}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import DropdownIcon from '../icon/DropdownIcon'

export default {
  name: 'Dropdown',
  props: ['value', 'options'],
  components: {
    DropdownIcon,
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  mounted() {
    window.addEventListener("click", this.handleWindowClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick);
  },
  methods: {
    handleDropdownClick() {
      this.showDropdown = !this.showDropdown;
    },
    handleWindowClick(e) {
      if (this.$refs['dropdown'] && e.target) {
        if (!this.$refs['dropdown'].contains(e.target)) {
          this.showDropdown = false;
        }
      }
    },
    handleDropdownItemClick(opt) {
      this.$emit('change', opt.value);
      this.showDropdown = false;
    },
  },
}
</script>

<style scoped>
.dropdown {
  width: 100%;
  position: relative;
}
.dropdown-input {
  width: 100%;
  position: relative;
}
.dropdown-input input {
  width: 100%;
  outline-style: none;
  border: 0px;
  border-bottom: 1px solid #ccc;
  padding-right: 16px;
}
.dropdown-icon {
  display: inline-block;
  position: absolute;
  right: 0;
  top: 2px;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 100px;
  text-align: left;
  z-index: 99999;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,.175);
  line-height: 24px;
}
.dropdown-list .dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}
.dropdown-list .dropdown-item:hover {
  background: #f4f4f4;
}
</style>