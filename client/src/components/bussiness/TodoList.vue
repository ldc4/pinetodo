<template>
  <div class="todo-list">
    <template v-if="data && data.length > 0">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="item.key"
        >
          <div class="item-content">
            <div class="check-container" @click="click(item, index)">
              <span class="check">
                <CheckIcon :checked="item.checked" />
              </span>
            </div>
            <span class="value">{{ item.value }}</span>
            <span class="tool">
              <slot></slot>
            </span>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="empty">
        <EmptyIcon />
        <p class="msg-empty">没有记录</p>
      </div>
    </template>
  </div>
</template>

<script>
import EmptyIcon from '../icon/EmptyIcon.vue';
import CheckIcon from '../icon/CheckIcon.vue';

export default {
  name: 'TodoList',
  components: {
    EmptyIcon,
    CheckIcon
  },
  props: {
    isRadioClick: Boolean,
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    click: function(item, index) {
      this.$emit('click', item, index);
    }
  }
}
</script>

<style scoped>
.todo-list {
  text-align: left;
}
.todo-list > ul > li {
  border-bottom: 1px solid #eee;
}
.item-content {
  border-top: 1px solid #fff;
  position: relative;
  padding: 5px 3px;
  display: flex;
}
.item-content:hover {
  background: #F9F9F9;
}
.item-content .value {
  font-size: .9rem;
  flex: 1;
  align-items: center;
  margin-right: 5px;
  line-height: 22px;
  word-wrap: break-word;
}
.item-content .check-container {
  display: inline-block;
  padding: 2px 3px;
}
.item-content .check {
  display: inline-block;
  padding: 0;
  border: 1px solid #C6C6C6;
  border-radius: 1em;
  width: 17px;
  height: 17px;
  font-size: 1em;
  cursor: pointer;
  position: relative;
  overflow: visible;
  background-color: #FFF;
}
.empty {
  text-align: center;
  margin-top: 1em;
  padding: 1em;
}
.msg-empty {
  margin: 1em;
  color: #999;
}
</style>