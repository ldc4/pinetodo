<template>
	<div :class="`global-message ${type}`">
		<p>{{message}}</p>
	</div>
</template>

<script>
export default {
	name: 'Message',
	data() {

  },
	mounted() {
		setTimeout(() => {
			// wait 后通过父级移除子元素的方式移除该组件实例和DOM节点
			this.$destroy(true);
			this.$el.parentNode.removeChild(this.$el);
		}, 3000);
	}
}
</script>

<style>
.global-message {
  border-width: 1px;
  border-style: solid;
  border-color: #EBEEF5;
  position: fixed;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity .3s,transform .4s,top .4s,-webkit-transform .4s;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
}

.global-message p {
  font-size: 14px;
  color: #909399;
}

.global-message.success p {
  color: #67c23a;
}

.global-message.warning p {
  color: #e6a23c;
}

.global-message.error p {
  color: #f56c6c;
}

.global-message.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.global-message.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
}

.global-message.error {
    background-color: #fef0f0;
    border-color: #fde2e2;
}
</style>