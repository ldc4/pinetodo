<template>
  <div class="todo-list">
    <template v-if="data && data.length > 0">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="item.key"
        >
          <div class="item-content">
            <div class="check-container" @click="select(item, index)">
              <div class="check">
                <CheckIcon :checked="item.checked" />
              </div>
            </div>
            <div class="value" @click="click(item, index)">
              <div v-if="!item.isEdit" class="value-content">{{ item.value }}</div>
              <div v-else class="value-edit">
                <EnterInput class="value-edit-input" type="mini" v-model="item.value" placeholder="编辑待办事项" @enter="edit(item, index)" />
                <div class="value-edit-cancel">
                  <CancelIcon @click="cancelEdit(item)" />
                </div>
              </div>
              <div v-if="!item.isEdit" class="tool-container tool-container-left">
                <div class="tool-item">
                  <EditIcon @click="showEdit(item)" />
                </div>
              </div>
            </div>
            <div v-if="!item.isEdit" class="tool-container tool-container-right">
              <div class="tool-item">
                <DeleteIcon @click="remove(item, index)" />
              </div>
            </div>
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
import DeleteIcon from '../icon/DeleteIcon.vue';
import EditIcon from '../icon/EditIcon.vue';
import EnterInput from '../bussiness/EnterInput.vue'
import CancelIcon from '../icon/CancelIcon.vue'

export default {
  name: 'TodoList',
  components: {
    EmptyIcon,
    CheckIcon,
    DeleteIcon,
    EditIcon,
    EnterInput,
    CancelIcon,
  },
  props: {
    isRadioClick: Boolean,
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      
    }
  },
  methods: {
    click(item, index) {
      this.$emit('click', item, index);
    },
    select(item, index) {
      this.$emit('select', item, index);
    },
    remove(item, index) {
      this.$emit('remove', item, index);
    },
    showEdit(item) {
      this.$set(item, 'oldContent', item.content)
      this.$set(item, 'isEdit', true)
    },
    cancelEdit(item) {
      this.$set(item, 'content', item.oldContent)
      this.$set(item, 'isEdit', false)
    },
    edit(item, index) {
      this.$set(item, 'isEdit', false)
      this.$emit('edit', item, index);
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
  position: relative;
  padding: 5px 3px;
  display: flex;
}
.item-content:hover {
  background: #F9F9F9;
}

.item-content .check-container {
  padding: 2px 3px;
}
.item-content .check {
  padding: 0;
  border: 1px solid #C6C6C6;
  border-radius: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  overflow: visible;
  background-color: #FFF;
}

.item-content .value {
  font-size: 14px;
  flex: 1;
  margin-right: 5px;
  line-height: 22px;
  word-wrap: break-word;
  display: flex;
}

.item-content .value-content {
  margin-right: 10px;
}

.item-content .value-edit {
  flex: 1;
  display: flex;
}

.value-edit-input {
  position: relative;
  flex: 1;
}

.value-edit-cancel {
  height: 16px;
  width: 16px;
  margin-left: 5px;
  align-self: center;
}

.item-content .tool-container {
  display: none;
  align-self: center;
}
.item-content:hover .tool-container {
  display: inline-block;
}
.item-content .tool-item {
  height: 16px;
  width: 16px;
  cursor: pointer;
}
.empty {
  text-align: center;
  margin-top: 16px;
  padding: 16px;
}
.msg-empty {
  margin: 16px;
  color: #999;
}
</style>