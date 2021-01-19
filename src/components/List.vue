<template>
  <div class="ui grid">

    <!-- Form field - Show Completed Tasks -->
    <div class="eight wide column">
      <div class="ui toggle checkbox">
        <input type="checkbox" v-model="showCompleted" /><label>Show completed tasks</label>
      </div>
    </div>

    <!-- Form button - New Task -->
    <div class="eight wide column">
      <button @click="toggleAddingTask" class="ui primary large button right floated">Create a new task</button>
    </div>

    <!-- Task list -->
    <div class="sixteen wide column">
      <div v-if="!tasks.length" class="ui list">
        <div class="item">Your task list is empty</div>
      </div>
      <div v-else class="ui list raised segment">
        <Task v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Task from './Task'

export default {
  components: { Task },
  computed: {
    tasks () { return this.$store.getters.tasks },
    showCompleted: {
      get () { return this.$store.getters.showCompleted },
      set () { this.$store.dispatch('toggleShowCompleted') }
    }
  },
  methods: {
    ...mapActions(['completeTask', 'toggleAddingTask'])
  }
}
</script>

<style scoped>
.field {
  padding: 30px 5px;
}
.segment {
  padding: 0px !important;
}

</style>
