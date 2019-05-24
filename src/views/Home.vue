<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 class="text-xs-center">
      <test
        v-for="(item, key, index) in array"
        :k="key"
        :key="key"
        :item="item"
        :index="index"
        @deleteItem="deleteItem"
      ></test>
    </v-flex>
  </v-layout>
</template>

<script>
import test from '@/components/test.vue'
export default {
  components: {
    test
  },
  data() {
    return {
      title: 'home page',
      array: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    deleteItem(key) {
      console.log(key)
      this.array.splice(key, 1)
    }
  },
  mounted() {
    this.$store.dispatch('setLoadingStatus', false)
  }
}
</script>

<style lang="scss" scoped>
p {
  background-color: #ff0000;
  margin: 10px;
}
</style>
