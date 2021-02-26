<template>
  <div class="workspace">
    <BoxLayout>
      <template #header>
        <StartButton v-if="status === 'todo'" @start="start" @restore="restore" />
        <Timer
          v-if="status === 'doing'"
          :initProcess="0"
          :total="curRecord.period"
          @finished="completed"
          @close="cancel"
        />
        <div v-if="status === 'done'">
          <div v-if="curRecord.period <= 0" class="time-edit">
            <div class="start-time">
              <div class="time-label">开始时间</div>
              <div class="time-input-wrap"><input class="time-input" v-model="startTime" :placeholder="timePlaceholder" /></div>
            </div>
            <div class="end-time">
              <div class="time-label">结束时间</div>
              <div class="time-input-wrap"><input class="time-input" v-model="endTime" :placeholder="timePlaceholder" /></div>
            </div>
          </div>
          <EnterTextarea
            v-model="curRecord.content"
            placeholder="添加工作记录"
            :height="100"
            @enter="createRecord"
            @close="cancel"
          />
        </div>
        <Timer
          v-if="status === 'rest'"
          :initProcess="0"
          :total="curRecord.interval"
          :noFinish="true"
          @finished="restFinished"
          @close="cancel"
        />
      </template>
      <template #main>
        <WorkList :data="records" @edit="editRecord" @remove="removeRecord" />
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
      ],
      startTime: '',
      endTime: '',
      timePlaceholder: '',
      timeFormat: 'MM-DD HH:mm:ss'
    }
  },
  computed: {
    ...mapState([
      'pasteData',
      'setting'
    ])
  },
  async created() {
    const { code, data } = await this.$api('getRecordList')
    if (code === 0) {
      this.records = data.map((record) => {
        return {
          key: record._id,
          period: record.period,
          interval: record.interval,
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
        period: this.setting.period,
        interval: this.setting.interval,
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
        if (this.curRecord.period <= 0) {
          const startTimeObj = dayjs(this.startTime, this.timeFormat)
          const endTimeObj = dayjs(this.endTime, this.timeFormat)
          if (startTimeObj.isValid() && endTimeObj.isValid()) {
            this.curRecord.startTime = startTimeObj.unix()
            this.curRecord.completeTime = endTimeObj.unix()
            this.curRecord.endTime = endTimeObj.unix()
          } else {
            this.$message({
              message: '时间格式错误',
              type: 'error'
            })
            return
          }
        }
        const { code, data, msg } = await this.$api('addRecord', this.curRecord)
        if (code === 0) {
          this.records.unshift({
            key: data._id,
            period: data.period,
            startTime: data.startTime,
            completeTime: data.completeTime,
            endTime: data.endTime,
            content: data.content,
          });
          if (this.curRecord.period <= 0) {
            this.curRecord = {};
            this.status = 'todo';
          } else {
            this.status = 'rest';
          }
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      }
    },
    // 编辑记录
    async editRecord(item, index) {
      if (index >= 0 && index < this.records.length) {
        const { code } = await this.$api('editRecord', { id: item.key, content: item.content })
        if (code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }
    },
    // 删除记录
    async removeRecord(item, index) {
      if (index >= 0 && index < this.records.length) {
        const { code } = await this.$api('removeRecord', { id: item.key })
        if (code === 0) {
          this.records.splice(index, 1);
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      }
    },
    // 补单
    restore() {
      this.status = 'done';
      this.curRecord = {
        startTime: dayjs().unix(),
        period: -1, // -1 说明不是走的计时，而是补的单
        content: '',
      }
      const timeStr = dayjs().format(this.timeFormat)
      this.startTime = timeStr
      this.endTime = timeStr
      this.timePlaceholder = timeStr
    },
    // 休息结束
    restFinished() {
      this.curRecord = {};
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
.time-edit {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
}
.start-time {
  display: flex;
  justify-content: center;
  align-items: center;
}
.end-time {
  display: flex;
  justify-content: center;
  align-items: center;
}
.time-label {
  width: 70px;
}
.time-input {
  width: 135px;
}
</style>
