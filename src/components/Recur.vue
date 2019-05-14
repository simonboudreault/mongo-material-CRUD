<template>
  <v-expansion-panel-content class="hover">
    <template v-slot:header>
      <div class="title">{{ k }}</div>
      <v-spacer class="spacer"></v-spacer>
      <v-btn
        color="grey"
        v-if="deletable"
        flat
        fab
        small
        @click="deleteDocument"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </template>
    <v-layout>
      <v-flex v-if="type == 'object'" xs-12 class="pa-2 fl">
        <v-expansion-panel expand v-model="panel">
          <!-- <div v-if="index">{{ index }}</div> -->
          <!-- <div v-else-if="key">{{ key }}</div> -->
          <!-- <div>{{ k }}</div> -->

          <!-- <div>index: {{ index }}</div>
        <div>key: {{ k }}</div>
          <div>path: {{ cPath }}</div>-->

          <recur
            v-for="(element, key, index) in elements"
            :elements="element"
            :key="key"
            :k="key"
            :index="index"
            :path="cPath"
          ></recur>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 v-else>
        <!-- <div v-if="index">{{ index }}</div> -->
        <!-- <div v-else>{{ k }}</div> -->
        <!-- <span>{{ k }}&nbsp;:&nbsp;</span> -->
        <!-- <div>index: {{ index }}</div>
        <div>key: {{ k }}</div>
        <div>path: {{ cPath }}</div>-->
        <h4 class="text-xs-center">{{ value }}</h4>
        <Badge @edit="editDocument" @delete-item="deleteItem"></Badge>
      </v-flex>
    </v-layout>
  </v-expansion-panel-content>
</template>
<script>
import recur from '@/components/Recur.vue'
import Badge from '@/components/Badge.vue'
import dbService from '@/services/dbService'
export default {
  name: 'recur',
  props: ['elements', 'k', 'index', 'path', 'deletable'],
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
      panel: [],
      isActive: true
    }
  },
  mounted() {
    // if (this.cPath === '_id') {
    //   this.$store.state.id = this.elements
    // }
    let ind = this.documentIndex[0]
    this.docId = this.$store.state.sections[ind]._id.toString()
  },
  methods: {
    editDocument() {
      // console.log(`${this.cPath}`)
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
        path: this.cPath
      }
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
      return typeof this.elements
    },
    cPath() {
      if (!this.path) {
        return `${this.k}`
      } else {
        return `${this.path}.${this.k}`
      }
    },
    cField() {
      return this.cPath.slice(2)
    },
    documentIndex() {
      // eslint-disable-next-line no-useless-escape
      let exp = new RegExp(/[^\.]*/)
      return this.cPath.match(exp)
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
/* .v-expansion-panel__container--active:hover {
  background: #fff !important;
} */
</style>
