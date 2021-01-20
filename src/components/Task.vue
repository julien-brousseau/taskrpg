<template>
  <div class="item" :class="{ completed: task.completed, active: task.xp }">
    <div v-if="task.xp > 0" class="ui blue horizontal basic label">
      {{ task.xp }} XP
    </div>
    <div class="content">
      <div style="float:left; height: 20px; padding: 5px;">
        <div class="inline field">
          <div
            v-if="task.xp && task.completed"
            class="ui checkbox"
            style="display:none"
          >
            <input type="checkbox" class="hidden" />
            <label></label>
          </div>
        </div>
      </div>

      <div class="header">{{ task.title }}</div>
      <div class="description">{{ task.description }}</div>
      <div class="small">{{ task.createdAt }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task']
};
</script>

<style scoped>
.header {
  font-weight: bold;
}
.description {
  color: #888;
}

.item {
  padding: 15px !important;
  background: none;
  border-top: 1px solid #cfcfcf !important;
  min-height: 65px;
}
.label {
  float: right;
  padding: 10px !important;
}
.active:hover {
  cursor: pointer;
  background-color: rgb(238, 247, 255);
}
.completed {
  color: #aaaaaa !important;
  text-decoration: line-through;
  background-color: #f1f1f1;
}
.completed .header {
  color: #aaaaaa !important;
}
.completed:hover {
  background-color: #f1f1f1;
  cursor: default;
}
.small {
  padding-left: 8px;
  padding-top: 10px;
  font-size: 75%;
  color: gray;
}
</style>
