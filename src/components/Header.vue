<template>
  <div class="ui fixed inverted segment">
    <div class="ui container text">
      <div class="item">
        <label>CHARACTER NAME</label>
        {{ user.name }}
      </div>

      <div class="item">
        <label>LEVEL</label>
        {{ user.level }}
      </div>

      <div class="item">
        <button @click="clearTasks" class="ui red button">CLEAR</button>
        <button @click="initUser(true)" class="ui teal button">NEW USER</button>
      </div>

      <div class="item rgt">
        <label>EXPERIENCE</label>
        {{ user.xp }} / {{ xpForNextLevel }}
      </div>

      <!-- Floating xp alert -->
      <div class="item rgt">
        <Xp />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Xp from './Xp.vue';

export default {
  components: { Xp },
  computed: {
    ...mapGetters(['user', 'xpForNextLevel', 'showFloatingXp'])
  },
  methods: {
    ...mapActions(['clearTasks', 'initUser'])
  }
};
</script>

<style scoped>
.segment {
  height: 90px;
  border-radius: 0px;
}
.item {
  padding-right: 40px;
  font-size: 140%;
  float: left;
}
label {
  display: block;
  font-size: 50%;
  color: gray;
}
.rgt {
  float: right;
  text-align: right;
  padding-right: 0px;
}
</style>
