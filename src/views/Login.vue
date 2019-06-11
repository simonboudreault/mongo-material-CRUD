<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="info">
            <v-toolbar-title>Login</v-toolbar-title>
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
                name="login"
                label="login"
                type="text"
                autocomplete="off"
                v-model="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="password"
                type="password"
                autocomplete="new-password"
                v-model="password"
                @keypress.enter="login"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="login">login</v-btn>
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
    async login() {
      let user = {
        email: this.email,
        password: this.password,
        collName: this.email
      }
      try {
        const response = await AuthenticationService.login(user)
        this.$store.dispatch('login', response.data)
        this.$store.dispatch('createSnackbar', {
          text: `Login successful`,
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
          text: 'Unable to login',
          color: 'error',
          value: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
