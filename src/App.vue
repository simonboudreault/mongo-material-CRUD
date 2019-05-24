<template>
  <v-app>
    <v-toolbar dark extended app color="primary">
      <!-- PROGRESS BAR -->

      <div class="progressBarContainer">
        <Progress></Progress>
      </div>

      <!-- PROGRESS BAR END-->
      <v-toolbar-title class="headline text-uppercase">
        <span>MONGO DB</span>&nbsp;
        <span class="font-weight-light">MATERIAL</span>
    <img src="images/mongo.svg" class="feuille"></img>
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
import Progress from '@/components/Progress.vue'
export default {
  components: {
    Nav,
    Progress
  },
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>
<style>
.v-expansion-panel__header {
  padding: 5px 16px;
}

.feuille {
  width: 15px;
  position: absolute;
  margin-left: 10px;
}
</style>
