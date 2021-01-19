<template>
  <div>

    <Header></Header>

    <div class="ui main text container">
      <h1>Task list</h1>

      <!-- Loading screen -->
      <div v-if="!tasksLoadingComplete">
        <div class="ui active dimmer">
          <div class="ui loader" style="margin-top:-40px"></div>
          <p style="color: white;">Loading tasks...</p>
        </div>
      </div>

      <!-- New task form -->
      <div v-else-if="addingTask">
        FORM
      </div>

      <!-- Task list -->
      <div v-else>
        LIST
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './components/Header'

export default {
  components: { Header },
  computed: { ...mapGetters(['tasksLoadingComplete', 'addingTask']) },  
  created () {
    // this.$store.dispatch('initUser')
    this.$store.dispatch('loadTasks')
  }
}
</script>