<template>
  <div class="year-picker">
    <div class="year-dropdown">
      <Dropdown :value="yearData" @change="handleDropdownChange" :options="yearOptions" />
    </div>
    <div class="year-label">年</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Dropdown from '../base/Dropdown.vue';

export default {
  name: 'YearPicker',
  props: ['value'],
  components: {
    Dropdown,
  },
  computed: {
    ...mapState([
      'yearData'
    ])
  },
  data() {
    return {
      yearOptions: [
        {
          label: '2022',
          value: 2022,
        },
        {
          label: '2021',
          value: 2021,
        },
      ],
    };
  },
  methods: {
    ...mapMutations([
      'setYearData'
    ]),
    handleDropdownChange(value) {
      this.setYearData(value);
    }
  }
}
</script>

<style scoped>
.year-dropdown {
  width: 50px;
  display: inline-block;
}
.year-label {
  display: inline-block;
}
</style>