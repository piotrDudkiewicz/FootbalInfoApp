import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ClubDetails from '../views/ClubDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/clubDetails',
    name: 'ClubDetails',
    component: ClubDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
