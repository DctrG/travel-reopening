import Vue from 'vue';
import VueGtm from 'vue-gtm';
import VueRouter, { RouteConfig } from 'vue-router';
import VueMeta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about.html',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/subscribe.html',
    name: 'Subscribe',
    component: () => import(/* webpackChunkName: "subscribe" */ '../views/Subscribe.vue'),
  },
  {
    path: '/404.html',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
    alias: '*',
  },
  {
    path: '/:country.html',
    name: 'Country',
    component: () => import('../views/Country.vue'),
  },
  {
    path: '/oembed-map',
    name: 'OembedMap',
    component: () => import(/* webpackChunkName: 'oembed-map' */ '../views/OembedMap.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.hash) {
      return {
        selector: to.hash, offset: { x: 0, y: 110 },
      };
    }

    if (to.name === from.name) {
      return undefined;
    }
    return { x: 0, y: 0 };
  },
});

Vue.use(VueGtm, {
  id: process.env.VUE_APP_GTM_ID,
  enabled: process.env.NODE_ENV === 'production',
  vueRouter: router,
});

export default router;
