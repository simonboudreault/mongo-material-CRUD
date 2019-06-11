<template>
  <v-toolbar-items>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn fab flat color="primary" dark v-on="on">
          <v-toolbar-side-icon></v-toolbar-side-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="navigateTo({ name: 'home' })">
          <v-list-tile-title>home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="$store.state.isUserLoggedIn"
          @click="navigateTo({ name: 'database' })"
        >
          <v-list-tile-title>database</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="!$store.state.isUserLoggedIn"
          @click="navigateTo({ name: 'register' })"
        >
          <v-list-tile-title>register</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="!$store.state.isUserLoggedIn"
          @click="navigateTo({ name: 'login' })"
        >
          <v-list-tile-title>login</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="$store.state.isUserLoggedIn"
          flat
          dark
          @click="logout"
        >
          <v-list-tile-title>logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-fab-transition>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="$route.name === 'database'"
            color="accent"
            dark
            small
            absolute
            bottom
            left
            fab
            @click="$store.dispatch('setInsertDialog', true)"
            v-on="on"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <span>Add a Document</span>
      </v-tooltip>
    </v-fab-transition>
  </v-toolbar-items>
</template>

<script>
export default {
  components: {},
  methods: {
    navigateTo(route) {
      if (route.name === 'database') {
        this.$store.dispatch('setLoadingStatus', true)
      }
      setTimeout(() => {
        this.$router.push(route)
      }, 10)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.noDecoration {
  text-decoration: none !important;
}

.feuille {
  min-width: 12px;
}
</style>
