import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: [],
    user: {},
    tasksLoadingComplete: false,
    showCompleted: false,
    addingTask: false
  },
  mutations: {
    'INIT_USER' (state, user) {
      state.user = user
    },

    'LOAD_TASKS' (state, tasks) {
      state.taskList = tasks
    },
    'ADD_TASK' (state, task) {
      state.taskList.unshift(task)
      state.addingTask = false
    },
    'COMPLETE_TASK' (state, task) {
      state.taskList = state.taskList.map(t => (t._id === task._id) ? task : t)
    },
    'CLEAR_TASKS' (state) {
      state.taskList = []
    },

    'ADD_XP' (state, xp) {
      state.user.xp += xp
    },

    'TOGGLE_TASKS_LOADED' (state) {
      state.tasksLoadingComplete = !state.tasksLoadingComplete
    },
    'TOGGLE_SHOW_COMPLETED' (state) {
      state.showCompleted = !state.showCompleted
    },
    'TOGGLE_ADDING_TASK' (state) {
      state.addingTask = !state.addingTask
    }
  },
  getters: {
    tasks: state => {
      const list = (state.showCompleted) ? state.taskList : state.taskList.filter(t => !t.completed)
      return list
        .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        .sort((a, b) => a.completed > b.completed ? 1 : -1)
    },
    user: state => state.user,
})
