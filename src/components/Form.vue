<template>
  <form
    @submit.prevent="addTask(newTask)"
    id="new-task-form"
    class="ui form grid"
  >
    <div class="five wide field">
      <label>Title</label>
      <input
        id="title"
        v-model="newTask.title"
        type="text"
        autocomplete="false"
        placeholder="Ex: Kill a dragon"
        required
      />
    </div>

    <div class="seven wide field">
      <label>Description</label>
      <input
        id="description"
        v-model="newTask.description"
        type="text"
        autocomplete="false"
        placeholder="...or just a firefly, it might be easier."
      />
    </div>

    <div class="four wide field">
      <label>Exp</label>
      <input id="xp" v-model.number="newTask.xp" type="number" required />
    </div>

    <div class="sixteen wide">
      <button
        type="submit"
        class="ui primary large button"
        :disabled="!newTask.title || !newTask.xp"
      >
        Add
      </button>
      <button @click="toggleAddingTask" class="ui large button">Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      newTask: {
        title: null,
        description: null,
        xp: 100
      }
    };
  },
  methods: {
    ...mapActions(['addTask', 'toggleAddingTask'])
  }
};
</script>

<style scoped>
form {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid lightgray;
}
</style>
