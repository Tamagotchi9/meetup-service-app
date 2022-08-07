import Vue from "vue";
import VueRouter from "vue-router";
import { authService } from "@/services/AuthService";

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    };
  } else if (savedPosition) {
    return savedPosition;
  } else if (
    from.matched.some(path => path.meta.saveScrollPosition) &&
    to.matched.some(path => path.meta.saveScrollPosition)
  ) {
    return false;
  } else {
    return { x: 0, y: 0 };
  }
}



const routes = [
  {
    path: "/",
    name: "index",
    alias: "/meetups",
    redirect: { name: "meetups" },
    // component: () => import("@/views/MeetupsPage")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage")
  },
  {
    path: "/meetups",
    name: "meetups",
    component: () => import("@/views/MeetupsPage"),
  },
  {
    path: "/meetups/create",
    name: "create",
    component: () => import("@/views/FormPage"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/meetups/:meetupId(\\d+)",
    name: "meetup",
    redirect: to => ({ name: "meetup-description", params: to.params }),
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true
    },
    component: () => import("../views/MeetupPage"),
    children: [
      {
        path: "description",
        name: "meetup-description",
        props: true,
        component: () => import("../components/MeetupDescription")
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        component: () => import("../components/MeetupAgenda")
      },
    ]
  },
  {
    path: "/meetups/:meetupId(\\d+)/edit",
    name: "edit",
    props: true,
    component: () => import("@/views/FormPage"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("@/views/NotFoundPage"),
  }

];

const router = new VueRouter({
  mode: "history",
  routes
});

function requireAuthGuard(to, from, next) {
  if (to.matched.some(route => route.meta.requireAuth)) {
    if (authService.user) {
      next();
    } else {
      router.push({ name: "login" });
    }
  } else {
    next();
  }
}

router.beforeEach(requireAuthGuard);

export default router;
