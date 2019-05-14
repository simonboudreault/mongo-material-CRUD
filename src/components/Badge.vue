<template>
  <div class="text-xs-center pa-2">
    <v-badge left>
      <!-- <template v-slot:badge>
        <span></span>
      </template>-->
      <v-icon color="grey lighten-1" @click="edit">edit</v-icon>
    </v-badge>

    <v-badge color="red">
      <!-- <template v-slot:badge>
        <span></span>
      </template>-->
      <v-icon color="grey" @click="deleteItem">delete</v-icon>
    </v-badge>
  </div>
</template>

<script>
export default {
  methods: {
    edit() {
      this.$emit('edit')
    },
    deleteItem() {
      this.$emit('delete-item')
    }
  }
}
</script>

<style lang="scss" scoped></style>
