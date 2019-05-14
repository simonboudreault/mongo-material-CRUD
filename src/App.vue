<template>
  <v-app>
    <v-toolbar extended app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MONGO DB</span>&nbsp;
        <span class="font-weight-light">MATERIAL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Nav></Nav>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  components: {
    Nav
  },
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>
