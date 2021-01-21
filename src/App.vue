<template>
  <div>
    <Header></Header>
    <div class="ui main text container">
      <h1>Task list</h1>

      <!-- Loading screen -->
      <Loader v-if="!tasksLoadingComplete" />

      <!-- New task form -->
      <Form v-else-if="addingTask" />

      <!-- Task list -->
      <List v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/Header';
import Loader from './components/Loader';
import Form from './components/Form';
import List from './components/List';

export default {
  components: { Header, Loader, Form, List },
  computed: { ...mapGetters(['tasksLoadingComplete', 'addingTask']) },
  created () {
    // Get user and task data
    this.$store.dispatch('fetchUser');
  }
};
</script>

<style scoped>
.container {
  margin-top: 75px;
}
.grid {
  padding: 40px 0px;
}
</style>
