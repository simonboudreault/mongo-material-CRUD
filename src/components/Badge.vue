<template>
  <div class="text-xs-center pa-2">
    <v-badge left>
      <!-- <template v-slot:badge>
        <span></span>
      </template>-->
      <v-btn small flat round color="accent" @click="edit" class="caption">
        <v-icon class="iconA">edit</v-icon>&nbsp;&nbsp;Edit value
      </v-btn>
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

<style lang="scss" scoped>
.iconA {
  font-size: 16px !important;
}
</style>
