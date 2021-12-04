import Vue from "vue";
import VueRouter from "vue-router";

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
    component: () => import("@/views/MeetupsPage")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/LoginPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage")
  },
  {
    path: "/meetups",
    name: "meetups",
    component: () => import("@/views/MeetupsPage")
  },
  {
    path: "/meetups/:meetupId(\\d+)",
    name: "meetup",
    redirect: to => ({ name: "meetup-description", params: to.params }),
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true
    },
    // component: () => import("../views/MeetupPage"),
    children: [
      {
        path: "",
        alias: "description",
        name: "meetup-description",
        props: true,
        // component: () => import("../views/MeetupDescriptionPage")
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        // component: () => import("../views/MeetupAgendaPage")
      }
    ]
  },
  {
    path: "/create",
    name: "form",
    component: () => import("@/views/FormPage")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
