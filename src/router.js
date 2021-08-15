import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './pages/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      // component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      meta: { needsAuth: true },
      children: [
        {
          name: 'team-member',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      name: 'users',
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log('Users beforeEnter()');
        next();
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(_, _2, savedPos) {
    if (savedPos) return savedPos;

    return { left: 0, top: 0 };
  }
});

router.beforeEach(function(to, from, next) {
  console.log(from, to);
  // if (to.name === 'team-member') {
  //   next();
  // } else {
  //   next({ name: 'team-member', params: { teamId: 't2' } });
  // }
  next();
});

router.afterEach((to, from) => {
  console.log(to.path, from.path);
  console.log('Global afterEach()');
});

export default router;
