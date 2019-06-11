<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="info">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-alert outline :value="error" type="error" class="ma-3">
            {{ error }}
          </v-alert>
          <v-card-text>
            <v-form autocomplete="new-password">
              <v-text-field
                prepend-icon="person"
                name="register"
                label="register"
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
      error: ''
    }
  },
  methods: {
    async register() {
      let user = {
        email: this.email,
        password: this.password,
        collName: this.email
      }
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
        this.error = err.response.data.error
        this.$store.dispatch('createSnackbar', {
          text: 'Unable to register',
          color: 'error',
          value: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
