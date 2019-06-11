<template>
  <v-app>
    <Notifications></Notifications>
    <v-toolbar dark extended app color="primary">
      <!-- PROGRESS BAR -->

      <div class="progressBarContainer">
        <Progress></Progress>
      </div>

      <!-- PROGRESS BAR END-->
      <v-toolbar-title class="headline text-uppercase">
        <span :class="{ subheading: $vuetify.breakpoint.xs }">MONGO DB</span
        >&nbsp;
        <span
          class="font-weight-light"
          :class="{ subheading: $vuetify.breakpoint.xs }"
          >MATERIAL</span
        >
        <img
          v-if="!$vuetify.breakpoint.xs"
          src="images/mongo.svg"
          class="feuille"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <mobileNav v-if="$vuetify.breakpoint.xs"></mobileNav>
      <Nav v-if="!$vuetify.breakpoint.xs"></Nav>
      <template v-slot:extension v-if="$store.state.isUserLoggedIn">
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text body-2 user">
          <v-icon color="accent" size="25" class="mr-2">account_circle</v-icon>
          {{ $store.state.user.email }}
        </v-toolbar-title>
      </template>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Nav from './components/Nav.vue'
import MobileNav from './components/MobileNav.vue'
import Progress from '@/components/Progress.vue'
import Notifications from '@/components/Notifications.vue'
export default {
  components: {
    Nav,
    MobileNav,
    Progress,
    Notifications
  },
  name: 'App'
}
</script>
<style>
.v-expansion-panel__header {
  padding: 5px 16px;
}

.subheading {
  font-size: 1em;
}

.feuille {
  width: 15px;
  position: absolute;
  margin-left: 10px;
}

.user {
  display: flex;
}
</style>
