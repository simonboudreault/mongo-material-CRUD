<template>
  <div @click="$emit('deleteItem', k)">
    item: {{ item }} index: {{ index }} key: {{ k }}
  </div>
</template>

<script>
export default {
  props: ['item', 'index', 'k'],
  methods: {}
}
</script>

<style lang="scss" scoped></style>
