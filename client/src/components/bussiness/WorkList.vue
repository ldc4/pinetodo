<template>
  <ul class="work-list">
    <li v-for="(records, key) in list" :key="key">
      <div class="work-content">
        <div class="work-day">{{key}}</div>
      </div>
      <ul class="record-list">
        <li v-for="record in records" :key="record.key">
          <span class="record-time">{{record.time}}</span>
          <div class="record-content-wrap">
            <p v-if="!record.isEdit" class="record-content">{{record.content}}</p>
            <div v-if="!record.isEdit" class="record-tools">
              <div class="tool-item">
                <EditIcon @click="showEdit(record)" />
              </div>
              <div class="tool-item">
                <DeleteIcon @click="remove(record)" />
              </div>
            </div>
            <EnterTextarea
              v-else
              v-model="record.content"
              placeholder="编辑工作记录"
              :height="100"
              @enter="edit(record)"
              @close="cancelEdit(record)"
            />
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import dayjs from 'dayjs'
import _ from 'lodash'
import DeleteIcon from '../icon/DeleteIcon.vue';
import EditIcon from '../icon/EditIcon.vue';
import EnterTextarea from './EnterTextarea.vue';

export default {
  name: 'WorkList',
  props: {
    data: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    DeleteIcon,
    EditIcon,
    EnterTextarea,
  },
  computed: {
    list: function() {
      const worksMap = {};
      this.data.forEach((record) => {
        const { startTime, endTime } = record;
        const sMonth = dayjs.unix(startTime).month() + 1;
        const sDate = dayjs.unix(startTime).date();
        const sFormatTime = dayjs.unix(startTime).format('HH:mm');
        const eFormatTime = dayjs.unix(endTime).format('HH:mm');
        if (!worksMap[`${sMonth}月${sDate}日`]) {
          worksMap[`${sMonth}月${sDate}日`] = [];
        }
        record.time = `${sFormatTime} - ${eFormatTime}`
        worksMap[`${sMonth}月${sDate}日`].push(record);
      });
      return worksMap;
    }
  },
  methods: {
    remove(record) {
      const { key } = record
      _.forEach(this.data, (item, index) => {
        if (item.key === key) {
          this.$emit('remove', item, index);
          return false
        }
      })
    },
    showEdit(record) {
      _.forEach(this.data, (item) => {
        this.$set(item, 'isEdit', false)
      })
      this.$set(record, 'oldContent', record.content)
      this.$set(record, 'isEdit', true)
    },
    cancelEdit(record) {
      this.$set(record, 'content', record.oldContent)
      this.$set(record, 'isEdit', false)
    },
    edit(record) {
      this.$set(record, 'isEdit', false)
      const { key } = record
      _.forEach(this.data, (item, index) => {
        if (item.key === key) {
          this.$emit('edit', record, index);
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.work-list {
  min-height: 240px;
  max-height: 960px;
  padding: 16px 8px 0;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
  font-size: 14px;
  line-height: 21px;
  margin: 0;
}
.work-content {
  margin-bottom: 8px;
}
.work-content .work-day {
  float: left;
  font-size: 1.1em;
}
.work-content:after {
  content: " ";
  display: table;
  clear: both;
}
.work-list > li {
  margin-bottom: .8em;
}
.record-list {
  clear: both;
  text-align: left;
}
.record-list > li::after {
  content:" ";
  display: block;
  clear: both;
}
.record-time {
  float: left;
  width: 25%;
  color: #999;
}
.record-content-wrap {
  position: relative;
  float: left;
  width: 75%;
  padding-left: 5px;
  white-space: pre-wrap;
}
.record-content-wrap:hover {
  background-color: #F9F9F9;
}
.record-tools {
  display: none;
  position: absolute;
  right: 2px;
  top: 2px;
}
.tool-item {
  display: inline-block;
  height: 16px;
  width: 16px;
  cursor: pointer;
}
.record-content-wrap:hover .record-tools {
  display: block;
}
</style>