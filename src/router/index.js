import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '@/views/Articles.vue'
import Article from "@/views/Article.vue";
import ArticlePart from "@/views/ArticlePart.vue";
import Words from "@/views/Words.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Profile from "@/views/Profile.vue";
import LogOut from "@/views/LogOut.vue";
import Store from '../store/general'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/articles",
      name: "articles",
      component: Articles,
    },
    {
      path: "/article/:id",
      name: "article",
      props: true,
      component: Article,
    },
    {
      path: "/article/:articleId/part/:partId",
      name: "articlePart",
      props: true,
      component: ArticlePart,
    },
    {
      path: "/words",
      name: "words",
      component: Words,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOut,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
  mode: "history",
});

function AuthGuard(from, to, next) {
  if(Store.getters.isUserAuthenticated) {
    next()
  }
  else {
    next('/signin')
  }
}