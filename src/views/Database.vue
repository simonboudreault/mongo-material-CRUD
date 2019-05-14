<template>
  <div class="sections">
    <v-layout align-start justify-center row fill-height>
      <!-- EDIT DIALOG -->

      <v-dialog v-model="$store.state.editDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>editDialog Title</h4>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-textarea
                    ref="editInputArea"
                    box
                    v-model="value"
                    label="Value"
                    @keypress.enter="changeInfo"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeEditDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click="changeInfo">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- EDIT DIALOG END -->

      <!-- DELETEITEM DIALOG -->

      <v-dialog v-model="$store.state.deleteItemDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>deleteitem Dialog Title</h4>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>{{ this.editObject.value }}</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDeleteItemDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click="deleteEntry"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- DELETEITEM DIALOG END -->

      <!-- DELETE DIALOG -->

      <v-dialog v-model="deleteDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>delete item</h4>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>are you sure you want to delete this item</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDeleteDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" flat @click="confirmDelete"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- DELETE DIALOG END -->

      <!-- INSERT DIALOG -->

      <v-flex xs10 class="blue lighten-5">
        <v-dialog v-model="$store.state.insertDialog" max-width="800px">
          <v-card>
            <v-card-title>
              <h4>Add an Item</h4>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="key" label="key" box></v-text-field>
                    <v-textarea
                      @keypress.enter="insertInfo"
                      ref="insertInputArea"
                      box
                      label="Value"
                      v-model="value"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeInsertDialog"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" flat @click="insertInfo">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- INSERT DIALOG END -->

        <v-expansion-panel expand>
          <!-- <Section
            v-for="(section, index) in sections"
            :section="section"
            :key="section.id"
          />-->
          <Recur
            v-for="(section, index) in sections"
            :elements="section"
            :key="section._id"
            :index="index"
            :k="index"
            :deletable="true"
            @delete-document="openDeleteDialog"
            @edit-document="openEditDialog"
          ></Recur>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Recur from '@/components/Recur.vue'
import dbService from '@/services/dbService'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Recur
  },
  data() {
    return {
      title: 'database',
      key: '',
      value: '',
      deleteDialog: false,
      idToEdit: null,
      idToDelete: null,
      path: ''
    }
  },
  computed: {
    ...mapState([
      'sections',
      'editObject',
      'editDialog',
      'insertDialog',
      'deleteItemDialog'
    ])
  },
  watch: {
    editDialog(newValue) {
      if (newValue === true) {
        this.value = this.editObject.value
        this.$nextTick(() => {
          this.$refs.editInputArea.focus()
        })
      }
    },
    insertDialog(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          this.$refs.insertInputArea.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchSections',
      'insertDocument',
      'editDocument',
      'deleteItem',
      'setEditDialog',
      'setInsertDialog',
      'setDeleteItemDialog',
      'resetEditObject'
    ]),

    ifJSON(str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    testJSON(str) {
      return this.ifJSON(this.value) ? JSON.parse(str) : JSON.parse(`"${str}"`)
    },
    changeInfo() {
      let value = this.value
      this.editDocument(value).then(response => {
        console.log(
          response.data.nModified
            ? `Votre modification a été enregistrée : \n ${
                this.editObject.field
              } => ${this.value}`
            : `Votre modification n'a PAS été enregistrée !`
        )
        this.editObject.component.value = value
        this.resetEditObject()
        this.value = ''
      })
      this.setEditDialog(false)
    },
    deleteEntry() {
      this.deleteItem().then(response => {
        console.log(
          response.data.nModified
            ? `Votre modification a été enregistrée : \n ${
                this.editObject.field
              } => effacé`
            : `Votre modification n'a PAS été enregistrée !`
        )
        // console.log(this.sections)
        // delete this.sections[this.editObject.path]
        // console.log(this.sections[this.editObject.path])
        // this.resetEditObject()
        this.fetchSections()
        this.value = ''
      })
      this.setDeleteItemDialog(false)
    },
    insertInfo() {
      let payload = this.key
        ? { [this.key]: this.testJSON(this.value) }
        : { key: this.testJSON(this.value) }
      this.insertDocument(payload).then(response => {
        console.log(
          response.data
          // ? `Votre modification a été enregistrée : \n ${
          //     Object.keys(object.payload)[0]
          //   } => ${object.payload[this.cField]}`
          // : `Votre modification n'a PAS été enregistrée !`
        )
        this.fetchSections()
        this.value = ''
      })
      this.closeInsertDialog()
    },
    confirmDelete() {
      let object = {
        _id: this.idToDelete
      }
      dbService.deleteSection(object).then(response => {
        console.log(
          response.data.ok
            ? `Votre document a été supprimé : \n ${this.idToDelete}`
            : `Votre document n'a PAS été supprimé !`
        )
        this.fetchSections()
        this.idToDelete = null
        this.deleteDialog = false
      })
    },
    openInsertDialog: function() {
      this.setInsertDialog(true)
    },
    closeInsertDialog() {
      this.setInsertDialog(false)
      this.value = ''
      this.key = ''
    },
    openEditDialog() {
      this.setEditDialog(true)
      // this.idToEdit = info.id
      // this.path = info.field
    },
    closeEditDialog() {
      this.setEditDialog(false)
      this.value = ''
    },
    openDeleteItemDialog() {
      this.setDeleteItemDialog(true)
      // this.idToDeleteItem = info.id
      // this.path = info.field
    },
    closeDeleteItemDialog() {
      this.setDeleteItemDialog(false)
      this.value = ''
    },
    openDeleteDialog: function(idToDelete) {
      this.deleteDialog = true
      this.idToDelete = idToDelete
    },
    closeDeleteDialog() {
      this.deleteDialog = false
      this.idToDelete = null
    }
  },
  created() {
    this.fetchSections()
  }
}
</script>

<style lang="scss" scoped>
.sections {
  margin-top: 10px;
}
.hover:hover {
  background: rgb(243, 243, 243) !important;
}
</style>
