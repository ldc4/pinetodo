<template>
  <Dialog
    height="120px"
    width="300px"
    :visible="visible"
    @update:visible="updateVisible"
  >
    <div class="setting-box">
      <div class="setting-item">
        <div class="item-label">时间周期</div>
        <div class="item-input"><input class="period-input" v-model="setting.period" /></div>
      </div>
      <div class="setting-item">
        <div class="item-label">时间间隔</div>
        <div class="item-input"><input class="interval-input" v-model="setting.interval" /></div>
      </div>
    </div>
    <div class="footer">
      <button class="confirm-btn btn" @click="confirm">确认</button>
    </div>
  </Dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Dialog from '../base/Dialog'

export default {
  name: 'SettingDialog',
  props: ['visible'],
  components: {
    Dialog
  },
  data() {
    return {
      
    }
  },
  created() {

  },
  computed: {
    ...mapState([
      'userInfo',
      'setting'
    ]),
  },
  methods: {
    ...mapMutations([
      'setSetting'
    ]),
    updateVisible(e) {
      this.$emit('update:visible', e)
    },
    confirm() {
      this.$api('saveSetting', {
        ...this.setting
      }).then((response) => {
        const { code } = response
        if (code === 0) {
          this.$message({
            message: '修改配置成功',
            type: 'success'
          })
          this.setSetting(this.setting)
          this.updateVisible(false)
        }
      })
    }
  }
}
</script>

<style scoped>
.setting-box {
  height: calc(100% - 50px);
  width: 100%;
  padding: 30px;
}
.footer {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.setting-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.item-label {
  width: 100px;
  text-align: left;
}
.btn {
  height: 25px;
  width: 40px;
  padding: 0;
  position: relative;
  font-size: 1em;

  display: inline-block;
  vertical-align: middle;
  text-shadow: 0 1px 0 rgba(255,255,255,.9);
  color: #666;
  background-color: #f8f8f9;
  background: -webkit-gradient(linear,left top,left bottom,from(#f8f8f9),to(#e6e6e8));
  background: -webkit-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -moz-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -ms-linear-gradient(top,#f8f8f9,#e6e6e8);
  background: -o-linear-gradient(top,#f8f8f9,#e6e6e8);
  box-shadow: 0 1px 0 #fff inset, 0 1px 0 rgba(0,0,0,.1);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  cursor: pointer;
  border: 1px solid #BBB;

  font-weight: 700;
  white-space: nowrap;
}
.confirm-btn {
  margin: 10px;
}
.period-input {
  width: 50px;
}
.interval-input {
  width: 50px;
}
</style>