<template>
  <div class="workspace">
    <BoxLayout>
      <template #header>
        <Timer /><br />
        <StartButton /><br />
        <EnterTextarea />
      </template>
      <template #main>
        main
      </template>
    </BoxLayout>
  </div>
</template>

<script>
import BoxLayout from './base/BoxLayout.vue'
import Timer from './bussiness/Timer.vue'
import StartButton from './bussiness/StartButton.vue'
import EnterTextarea from './bussiness/EnterTextarea.vue'

export default {
  name: 'Workspace',
  components: {
    BoxLayout,
    Timer,
    StartButton,
    EnterTextarea
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
