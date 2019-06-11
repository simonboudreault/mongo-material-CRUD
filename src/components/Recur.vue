<template>
  <v-flex
    row
    xs12
    @mouseover="isActive = true"
    @mouseleave="isActive = false"
    class="flexWrapper"
  >
    <v-expansion-panel-content
      :class="{ hover: header !== '_id' }"
      :readonly="header === '_id'"
      :disabled="header === '_id'"
    >
      <template v-slot:header>
        <div class="subheading font-weight-medium">{{ header }}</div>
        <div class="accent--text text-xs-center spacer">
          <div v-if="header === '_id'">{{ value }}</div>
        </div>
        <v-fab-transition>
          <v-btn
            class="headerButton"
            color="primary"
            v-if="!deletable && header !== '_id'"
            flat
            fab
            small
            v-show="isActive"
            @click="deleteItem"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-btn
          color="primary"
          v-if="deletable"
          flat
          fab
          small
          @click="deleteDocument"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        <div class="caption font-weight-bold accent--text text-uppercase">
          {{ type }}
        </div>
      </template>
      <v-layout>
        <v-flex
          v-if="type === 'object' || type === 'array'"
          xs-12
          class="pa-2 fl"
        >
          <v-expansion-panel expand v-model="panel">
            <recur
              v-for="(element, key, index) in elements"
              :elements="element"
              :key="key"
              :k="key"
              :isArray="type === 'array'"
              :index="index"
              :path="cPath"
              :oPath="objectPath"
            ></recur>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 v-else class="text-xs-center">
          <div class="value mx-5 pa-4 secondary lighten-3">{{ value }}</div>
          <Badge v-if="k !== '_id'" @edit="editDocument"></Badge>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-flex>
</template>
<script>
import recur from '@/components/Recur.vue'
import Badge from '@/components/Badge.vue'
export default {
  name: 'recur',
  props: ['elements', 'k', 'index', 'path', 'deletable', 'isArray', 'oPath'],
  components: {
    recur,
    Badge
  },
  data() {
    return {
      docId: null,
      dialog: false,
      deleteDialog: false,
      value: this.elements,
      dataElements: this.elements,
      panel: [],
      isActive: false
    }
  },
  watch: {
    elements(newValue) {
      this.value = newValue
    }
  },
  mounted() {
    let ind = this.documentIndex[0]
    this.docId = this.$store.state.sections[ind]._id.toString()
  },
  methods: {
    editDocument() {
      let editObject = {
        id: this.docId,
        field: this.cField,
        component: this,
        value: this.value
      }
      this.$store.dispatch('setEditDialog', true)
      this.$store.dispatch('setEditObject', editObject)
    },
    deleteItem() {
      let editObject = {
        id: this.docId,
        field: this.cField,
        component: this,
        path: this.Path,
        cPath: this.cPath,
        isArray: this.isArray,
        oPath: this.oPath,
        property: this.k
      }
      this.$store.dispatch('setDeleteItemDialog', true)
      this.$store.dispatch('setEditObject', editObject)
    },
    deleteDocument(e) {
      e.stopPropagation()
      this.$emit('delete-document', this.docId)
    },
    typeOf(el) {
      if (typeof el === 'object') {
        return el === null
          ? 'null'
          : Object.prototype.toString.call(el) === '[object Array]'
          ? 'array'
          : 'object'
      } else {
        return typeof el
      }
    }
  },
  computed: {
    type() {
      return this.typeOf(this.elements)
    },
    cPath() {
      if (!this.path) {
        return `${this.k}`
      } else {
        return `${this.path}.${this.k}`
      }
    },
    objectPath() {
      if (this.isArray) {
        if (!this.path) {
          return `[${this.k}]`
        } else {
          return `${this.oPath}[${this.k}]`
        }
      } else {
        if (!this.path) {
          return `${this.k}`
        } else {
          return `${this.oPath}.${this.k}`
        }
      }
    },
    cField() {
      return this.cPath.slice(2)
    },
    documentIndex() {
      let exp = new RegExp(/[^.]*/)
      return this.cPath.match(exp)
    },
    arrayItem() {
      let exp = new RegExp(/[^.]+$/gm)
      let match = this.path.match(exp)
      console.log(match)
      let replace = match[0].replace(/s$/i, '')
      return replace
    },
    header() {
      let regexp = new RegExp('[0-9]')
      return regexp.test(this.k.toString())
        ? this.deletable
          ? `Document ${this.k + 1}`
          : `${this.arrayItem} ${this.k + 1}`
        : this.k
    }
  }
}
</script>
<style scoped>
.fl {
  background-color: rgba(0, 0, 0, 0.103);
}
.hover:hover {
  background: rgb(243, 243, 243) !important;
}
.spacer {
  flex-grow: 999 !important;
}

.v-btn {
  transition-duration: 200ms;
}

.v-btn:before {
  color: var(--v-error-base);
}

.headerButton {
  margin: 0 6px;
  width: 20px;
  height: 20px;
}

.v-btn__content i {
  font-size: 13px !important;
}

.flexWrapper {
  margin-bottom: 1px;
}

.full-width {
  width: 100% !important;
}

.value {
  font: 16px Roboto Mono, monospace;
  border-radius: 1.5em;
}
.noPointer {
  cursor: wait !important;
}

.v-expansion-panel__container--disabled {
  color: inherit !important;
}
</style>
