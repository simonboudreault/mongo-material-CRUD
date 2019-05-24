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
    >
      <template v-slot:header>
        <div class="subheading font-weight-medium">{{ header }}</div>
        <div class="accent--text text-xs-center spacer">
          <div v-if="header === '_id'">{{ value }}</div>
        </div>
        <!-- <v-spacer class="spacer"></v-spacer> -->
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
          {{ value }}
          <Badge v-if="k !== '_id'" @edit="editDocument"></Badge>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-flex>
</template>
<script>
import recur from '@/components/Recur.vue'
import Badge from '@/components/Badge.vue'
import dbService from '@/services/dbService'
export default {
  name: 'recur',
  props: [
    'elements',
    'k',
    'index',
    'path',
    'deletable',
    'lazy',
    'isArray',
    'oPath'
  ],
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
    // this.$store.dispatch('setRenderCount', -1)
    // if (this.cPath === '_id') {
    //   this.$store.state.id = this.elements
    // }
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
      // console.log(eval('this.$store.state.sections' + this.oPath))
      this.$store.dispatch('setDeleteItemDialog', true)
      this.$store.dispatch('setEditObject', editObject)
    },
    deleteDocument(e) {
      e.stopPropagation()
      this.$emit('delete-document', this.docId)
    },
    confirmDelete() {
      let object = {
        _id: this.docId
      }
      dbService.deleteSection(object).then(response => {
        console.log(
          response.data.ok
            ? `Votre document a été supprimé : \n ${this.docId}`
            : `Votre document n'a PAS été supprimé !`
        )
        this.$store.dispatch('fetchSections')
      })
      this.closeDelete()
    },

    changeInfo() {
      let object = {
        _id: this.docId,
        payload: {
          [this.cField]: this.value
        }
      }
      dbService
        .putSection(object)
        .then(response =>
          console.log(
            response.data.nModified
              ? `Votre modification a été enregistrée : \n ${
                  Object.keys(object.payload)[0]
                } => ${object.payload[this.cField]}`
              : `Votre modification n'a PAS été enregistrée !`
          )
        )
      this.close()
    },
    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },

    // deleteItem(item) {
    //   const index = this.desserts.indexOf(item)
    //   confirm('Are you sure you want to delete this item?') &&
    //     this.desserts.splice(index, 1)
    // },
    close() {
      this.dialog = false
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // }, 300)
    },
    closeDelete() {
      this.$store.state.deleteDialog = false
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
    },
    activate() {
      console.log('activate')
      this.isActive = !this.isActive
    }

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // },
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
      // eslint-disable-next-line no-useless-escape
      let exp = new RegExp(/[^\.]*/)
      return this.cPath.match(exp)
    },
    header() {
      // eslint-disable-next-line no-control-regex
      let regexp = new RegExp('[0-9]')
      return regexp.test(this.k.toString())
        ? this.deletable
          ? `Document ${this.k + 1}`
          : `Item ${this.k + 1}`
        : this.k
    },
    computedKey() {
      return Math.floor(Math.random() * 1000)
    }
  }
}
</script>
<style scoped>
.fl {
  background-color: rgba(0, 0, 0, 0.103);
}
.v-expansion-panel__container--active {
  /* background: #ff000046 !important; */
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

.v-btn:hover {
  /* color: var(--v-error-base) !important; */
}

.v-btn--floating {
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

/* .v-expansion-panel__container--active:hover {
  background: #fff !important;
} */
</style>
