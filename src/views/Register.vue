<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="info">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-flex>
            <v-expand-transition>
              <div v-show="container">
                <v-alert
                  dismissible
                  v-show="alert"
                  v-model="container"
                  outline
                  type="error"
                  class="ma-3"
                  >{{ error }}</v-alert
                >
              </div>
            </v-expand-transition>
          </v-flex>
          <v-card-text>
            <v-form autocomplete="new-password">
              <v-text-field
                prepend-icon="person"
                name="email"
                label="email"
                type="text"
                autocomplete="off"
                v-model="email"
                @keypress.enter="register"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="password"
                type="password"
                autocomplete="new-password"
                v-model="password"
                @keypress.enter="register"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="register">register</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      alert: false,
      container: false
    }
  },
  watch: {
    alert(newValue) {
      this.$nextTick(() => {
        this.container = newValue
      })
    },

    container(newValue) {
      this.$nextTick(() => {
        this.alert = newValue
      })
    }
  },
  methods: {
    async register() {
      let user = {
        email: this.email,
        password: this.password,
        collName: this.email
      }
      this.$store.dispatch('setLoadingStatus', true)
      try {
        const response = await AuthenticationService.register(user)
        this.$store.dispatch('login', response.data)
        this.$store.dispatch('createSnackbar', {
          text: `Registered ${user.email}`,
          color: 'success',
          value: true
        })
        setTimeout(() => {
          this.$router.push({ name: 'database' })
        }, 500)
      } catch (err) {
        this.alert = true
        this.error = err.response.data.error
        this.$store.dispatch('createSnackbar', {
          text: 'Unable to register',
          color: 'error',
          value: true
        })
        this.$store.dispatch('setLoadingStatus', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
