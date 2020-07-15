import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    teams: JSON.parse(localStorage.getItem('teams') || null),
    team: JSON.parse(localStorage.getItem('team') || null),
  },
  mutations: {
    setTeams(state, data) {
      // eslint-disable-next-line no-plusplus
      state.teams = data;
      localStorage.setItem('teams', JSON.stringify(state.teams));
    },
    setTeam(state, data) {
      // eslint-disable-next-line no-plusplus
      state.team = data;
      localStorage.setItem('team', JSON.stringify(state.team));
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
