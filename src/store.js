import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: null,
    user: {},
    showCompleted: false,
    addingTask: false,
    showFloatingXp: false
  },
  mutations: {
    'INIT_USER' (state, user) {
      state.user = user;
    },
    'LOAD_TASKS' (state, tasks) {
      state.taskList = tasks;
    },
    'ADD_TASK' (state, task) {
      state.taskList.unshift(task);
      state.addingTask = false;
    },
    'COMPLETE_TASK' (state, task) {
      state.taskList = state.taskList.map(t => (t._id === task._id) ? task : t);
    },
    'CLEAR_TASKS' (state) {
      state.taskList = [];
    },
    'ADD_XP' (state, xp) {
      state.user.xp += xp;
    },
    'TOGGLE_SHOW_COMPLETED' (state) {
      state.showCompleted = !state.showCompleted;
    },
    'TOGGLE_ADDING_TASK' (state) {
      state.addingTask = !state.addingTask;
    }
  },
  actions: {
    initUser ({ commit }, reset = false) {
      Vue.http.post('users', { reset })
        .then(res => commit('INIT_USER', res.body))
        .catch(e => console.log('Error: Cannot init user > ', e));
    },
    completeTask: async ({ state, commit, getters }, task) => {
      // Skip if the task is invalid or already completed
      if (!task || task.completed) return null;

      Vue.http.post(`tasks/${task._id}`)
        .then(res => {
          // Complete task and add xp
          commit('COMPLETE_TASK', res.body);
          commit('ADD_XP', task.xp);
          // Levelup as many times as needed
          while (state.user.xp >= getters.xpForNextLevel) {
            state.user.level++;
            alert(`You just advanced to level ${state.user.level}`);
          }
          // Update user info
          return Vue.http.post('users/edit', state.user);
        })
        .then(() => {
          // Show floating xp text
          state.showFloatingXp = task.xp;
          setTimeout(() => { state.showFloatingXp = false; }, 1000);
        })
        .catch(e => console.log('Error: Cannot complete task > ', e));
    },
    addTask: ({ commit }, task) => {
      Vue.http.post('tasks', task)
        .then(res => commit('ADD_TASK', res.body))
        .catch(e => console.log('Error: Cannot add task > ', e));
    },
    clearTasks: ({ commit }) => {
      Vue.http.delete('tasks')
        .then(() => commit('CLEAR_TASKS'))
        .catch(e => console.log('Error: Cannot delete tasks > ', e));
    },
    loadTasks: ({ commit }) => {
      Vue.http.get('tasks')
        .then(res => res.body)
        .then(data => {
          if (data) {
            const tasks = Object.keys(data).map(id => ({ ...data[id], id }));
            commit('LOAD_TASKS', tasks);
          }
        })
        .catch(e => console.log('Error: Cannot load tasks > ', e));
    },
    toggleShowCompleted ({ commit }) {
      commit('TOGGLE_SHOW_COMPLETED');
    },
    toggleAddingTask ({ commit }) {
      commit('TOGGLE_ADDING_TASK');
    }
  },
  getters: {
    tasks: state => {
      const list = (state.showCompleted) ? state.taskList : state.taskList.filter(t => !t.completed);
      return list
        .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        .sort((a, b) => a.completed > b.completed ? 1 : -1);
    },
    user: state => state.user,
    tasksLoadingComplete: state => state.taskList !== null,
    addingTask: state => state.addingTask,
    showCompleted: state => state.showCompleted,
    xpForNextLevel: state => state.user.level * 300,
    showFloatingXp: state => state.showFloatingXp
  }
});
