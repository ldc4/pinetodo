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
import { mapState, mapMutations } from 'vuex'

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
      records: [
        // {
        //   key: 'x-1',
        //   period: 1,
        //   startTime: 1567876016,
        //   completeTime: 1567876020,
        //   endTime: 1567876033,
        //   content: "完成了一个demo",
        // }
      ]
    }
  },
  computed: {
    ...mapState(['pasteData'])
  },
  async created() {
    const { code, data } = await this.$api('getRecordList')
    if (code === 0) {
      this.records = data.map((record) => {
        return {
          key: record._id,
          period: record.period,
          startTime: record.startTime,
          completeTime: record.completeTime,
          endTime: record.endTime,
          content: record.content,
        }
      }).filter(t => t.content).reverse()
    }
  },
  methods: {
    ...mapMutations(['clearPastData']),
    // 开始工作
    start: function() {
      this.status = 'doing';
      this.curRecord = {
        startTime: dayjs().unix(),
        period: 5,
        content: ''
      };
    },
    // 完成工作
    completed: function() {
      this.status = 'done';
      this.curRecord = {
        ...this.curRecord,
        completeTime: dayjs().unix()
      }
    },
    // 取消工作
    cancel: function() {
      this.curRecord = {};
      this.status = 'todo';
    },
    // 创建记录
    createRecord: async function() {
      this.curRecord = {
        ...this.curRecord,
        endTime: dayjs().unix()
      }
      if (this.curRecord.content) {
        const { code, data } = await this.$api('addRecord', this.curRecord)
        if (code === 0) {
          this.records.unshift({
            key: data._id,
            period: data.period,
            startTime: data.startTime,
            completeTime: data.completeTime,
            endTime: data.endTime,
            content: data.content,
          });
          this.curRecord = {};
        }
      }
      this.status = 'todo';
    }
  },
  watch: {
    pasteData(newData, oldData) {
      // 通过监听粘贴待办的数据内容发生变化，来设置当前工作记录的内容
      if (newData !== oldData && newData && this.status === 'done') {
        if (this.curRecord.content) {
          this.curRecord.content += ` + ${newData}`
        } else {
          this.$set(this.curRecord, 'content', newData)
        }
        this.clearPastData()
      }
    }
  }
}
</script>

<style scoped>
.workspace {
  min-width: 27em;
  width: 50%;
  float: left;
}
.workspace::after {
  display:block; 
  content:"clear"; 
  clear:both; 
  line-height:0;
  visibility:hidden;
}
</style>
