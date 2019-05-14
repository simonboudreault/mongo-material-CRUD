<template>
  <v-toolbar-items>
    <v-btn flat @click="navigateTo({ name: 'home' })">home</v-btn>
    <v-btn flat @click="navigateTo({ name: 'database' })">database</v-btn>
    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      left
      fab
      @click="$store.dispatch('setInsertDialog', true)"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>
.noDecoration {
  text-decoration: none !important;
}
</style>
