<template>
  <div>
    <v-snackbar
      v-model="notifications.snackbar"
      top
      :timeout="notifications.timeout"
      :color="notifications.snackbarColor"
    >
      {{ notifications.snackbarText }}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['notifications'])
  },
  methods: {
    ...mapActions(['setSnackbar']),
    close() {
      this.setSnackbar(false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
