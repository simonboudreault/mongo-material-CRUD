<template>
  <v-toolbar-items>
    <v-btn flat dark @click="navigateTo({ name: 'home' })">home</v-btn>
    <v-btn
      v-if="$store.state.isUserLoggedIn"
      flat
      dark
      @click="navigateTo({ name: 'database' })"
      >database</v-btn
    >
    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      flat
      dark
      @click="navigateTo({ name: 'register' })"
      >register</v-btn
    >
    <v-btn
      v-if="!$store.state.isUserLoggedIn"
      flat
      dark
      @click="navigateTo({ name: 'login' })"
      >login</v-btn
    >
    <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout"
      >logout</v-btn
    >
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
