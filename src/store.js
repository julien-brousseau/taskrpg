import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: null,
    user: { name: 'Blop', level: 1, xp: 10 },
    showCompleted: false,
    addingTask: false,
    showFloatingXp: false
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
    'TOGGLE_SHOW_COMPLETED' (state) {
      state.showCompleted = !state.showCompleted
    },
    'TOGGLE_ADDING_TASK' (state) {
      state.addingTask = !state.addingTask
    }
  },
  actions: {
    addTask: ({ commit }, task) => {
      Vue.http.post('tasks', task)
        .then(res => commit('ADD_TASK', res.body))
        .catch(e => console.log('Error:', e))
    },
    loadTasks: ({ commit }) => {
      Vue.http.get('tasks')
        .then(res => res.body)
        .then(data => {
          if (data) {
            const tasks = Object.keys(data).map(id => ({ ...data[id], id }))
            commit('LOAD_TASKS', tasks)
          }
        })
        .catch(e => console.log(e))
    },
    toggleShowCompleted ({ commit }) {
      commit('TOGGLE_SHOW_COMPLETED')
    },
    toggleAddingTask ({ commit }) {
      commit('TOGGLE_ADDING_TASK')
    },
  },
  getters: {
    tasks: state => {
      const list = (state.showCompleted) ? state.taskList : state.taskList.filter(t => !t.completed)
      return list
        .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        .sort((a, b) => a.completed > b.completed ? 1 : -1)
    },
    user: state => state.user,
    tasksLoadingComplete: state => state.taskList !== null,
    addingTask: state => state.addingTask,
    showCompleted: state => state.showCompleted,
    xpForNextLevel: state => state.user.level * 300,
    showFloatingXp: state => state.showFloatingXp,
  }
})
