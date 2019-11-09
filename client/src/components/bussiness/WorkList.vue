<template>
  <ul class="work-list">
    <li v-for="(records, key) in list" :key="key">
      <div class="work-content">
        <div class="work-day">{{key}}</div>
      </div>
      <ul class="record-list">
        <li v-for="record in records" :key="record.key">
          <span class="record-time">{{record.time}}</span>
          <p class="record-content">{{record.content}}</p>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'WorkList',
  props: {
    data: {
      type: Array,
      default: () => [],
    }
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
        worksMap[`${sMonth}月${sDate}日`].push({
          ...record,
          time: `${sFormatTime} - ${eFormatTime}`
        });
      });
      return worksMap;
    }
  },
}
</script>

<style scoped>
.work-list {
  min-height: 15em;
  max-height: 20em;
  padding: 1em .3em 0;
  overflow: hidden;
  list-style: none;
  font-size: .9em;
  line-height: 1.5em;
  margin: 0;
}
.work-content {
  margin-bottom: .3em;
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
.record-list > li {
  display: block;
  clear: both;
}
.record-time {
  float: left;
  padding-right: .8em;
  color: #999;
}
.record-content {
  float: left;
  white-space: pre;
}
</style>