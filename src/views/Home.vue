<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 class="text-xs-center">
      <h1>{{ title }}</h1>
    </v-flex>
  </v-layout>
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

<style lang="scss" scoped></style>
