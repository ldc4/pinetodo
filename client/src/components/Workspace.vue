<template>
  <div class="workspace">
    <BoxLayout>
      <template #header>
        <StartButton v-if="status === 'todo'" @click="start" />
        <Timer
          v-if="status === 'doing'"
          :initProcess="0"
          :total="curRecord.period"
          @completed="completed"
          @close="cancel"
        />
        <EnterTextarea
          v-if="status === 'done'"
          v-model="curRecord.content"
          @create="createRecord"
          @close="cancel"
        />
      </template>
      <template #main>
        <WorkList :data="records" />
      </template>
    </BoxLayout>
  </div>
</template>

<script>
import BoxLayout from './base/BoxLayout.vue'
import Timer from './bussiness/Timer.vue'
import StartButton from './bussiness/StartButton.vue'
import EnterTextarea from './bussiness/EnterTextarea.vue'
import WorkList from './bussiness/WorkList.vue'

import dayjs from 'dayjs'

export default {
  name: 'Workspace',
  components: {
    BoxLayout,
    Timer,
    StartButton,
    EnterTextarea,
    WorkList
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      status: 'todo',   // 工作状态：(todo - 未开始 | doing - 正在进行 | done - 完成)
      curRecord: {},
      index: 0,         // 新加的索引
      records: [
        {
          key: 'x-1',
          period: 1,
          startTime: 1567876016,
          completeTime: 1567876020,
          endTime: 1567876033,
          content: "完成了一个demo",
        },
        {
          key: 'x-2',
          period: 1,
          startTime: 1567775016,
          completeTime: 1567775020,
          endTime: 1567775033,
          content: "测试完成",
        },
        {
          key: 'x-3',
          period: 1,
          startTime: 1567774900,
          completeTime: 1567774960,
          endTime: 1567774999,
          content: "正在测试",
        }
      ]
    }
  },
  methods: {
    // 开始工作
    start: function() {
      this.status = 'doing';
      this.curRecord = {
        key: this.index++,
        startTime: dayjs().unix(),
        period: 1,
        content: ''
      };
    },
    // 完成工作
    completed: function() {
      this.status = 'done';
      this.curRecord = {
        ...this.curRecord,
        completedTime: dayjs().unix()
      }
    },
    // 取消工作
    cancel: function() {
      this.curRecord = {};
      this.status = 'todo';
    },
    // 创建记录
    createRecord: function() {
      this.curRecord = {
        ...this.curRecord,
        endTime: dayjs().unix()
      }
      this.records.unshift(this.curRecord);
      this.curRecord = {};
      this.status = 'todo';
    }
  },
}
</script>

<style scoped>

</style>
