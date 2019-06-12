<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm10 lg8>
        <v-card class="elevation-4">
          <v-flex class="header display-1 primary white--text">
            <h1 class="mb-5">Welcome</h1>
            <p>This is a material design visualizer for a mongoDB database</p>
            <v-card-actions
              v-if="!$store.state.isUserLoggedIn"
              class="pa-0 mt-5"
            >
              <router-link to="register">
                <v-btn round large depressed color="accent">Register</v-btn>
              </router-link>
            </v-card-actions>
          </v-flex>
          <div>
            <h3 class="headline ma-0 text">
              A collection will be created for your and you will be able to
              insert documents, modify and delete them
            </h3>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: 'home page'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 8vw 4vw;
}

a {
  text-decoration: none;
}

.text {
  padding: 2vw 4vw;
}
</style>
