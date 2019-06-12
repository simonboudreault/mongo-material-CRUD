<template>
  <div class="sections">
    <v-layout align-start justify-center row fill-height class="pb-5">
      <!-- EDIT DIALOG -->

      <v-dialog v-model="$store.state.editDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>Edit Value</h4>
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
                    @keypress.enter="editField"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="closeEditDialog">Cancel</v-btn>
            <v-btn color="accent" flat @click="editField">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- EDIT DIALOG END -->

      <!-- DELETEITEM DIALOG -->

      <v-dialog v-model="$store.state.deleteItemDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>Delete Value</h4>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>Are you sure you want to delete this item</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="closeDeleteItemDialog"
              >Cancel</v-btn
            >
            <v-btn color="accent" flat @click="deleteField">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- DELETEITEM DIALOG END -->

      <!-- DELETE DIALOG -->

      <v-dialog v-model="deleteDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <h4>Delete Document</h4>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12
                  >Are you sure you want to delete this document</v-flex
                >
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="closeDeleteDialog">Cancel</v-btn>
            <v-btn color="accent" flat @click="confirmDelete">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- DELETE DIALOG END -->

      <!-- INSERT DIALOG -->

      <v-flex xs10>
        <v-dialog v-model="$store.state.insertDialog" max-width="800px">
          <v-card>
            <v-card-title>
              <h4>Add an Item</h4>
              <v-spacer></v-spacer>
              <v-btn
                fab
                small
                depressed
                @click="expand = !expand"
                style="font-size:20px;"
                >?</v-btn
              >
            </v-card-title>
            <v-card-text class="text-xs-center py-0">
              <v-expand-transition>
                <div v-show="expand">
                  <div class="text-xs-center title accent--text mb-2">
                    You can try inserting strings, numbers, arrays or objects as
                    the value.
                  </div>
                  <v-icon class="accent--text">arrow_drop_down</v-icon>
                  <p
                    class="text-xs-left insert-example info--text px-5 py-4 mx-4 secondary lighten-4"
                  >
                    {{ sampleDocument }}
                  </p>
                  <v-card-actions class="text-xs-center">
                    <v-flex>
                      <v-btn color="accent" flat @click="initialize"
                        >Try it !</v-btn
                      >
                      <v-btn color="error" flat @click="expand = false"
                        >Close this</v-btn
                      >
                    </v-flex>
                  </v-card-actions>
                </div>
              </v-expand-transition>

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
              <v-btn color="accent" flat @click="closeInsertDialog"
                >Cancel</v-btn
              >
              <v-btn color="accent" flat @click="insertInfo">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- INSERT DIALOG END -->

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <div xs12 class="text-xs-center">
              <v-btn
                outline
                class="mb-3"
                @click="toggle"
                :color="isDbOn ? 'accent' : 'error'"
                v-on="on"
                >database is {{ isDbOn ? 'on' : 'off' }}</v-btn
              >
            </div>
          </template>
          <span>
            {{
              isDbOn
                ? 'Trigger errors from server calls to database'
                : 'Restore server link to database'
            }}
          </span>
        </v-tooltip>

        <v-toolbar dark color="info">
          <v-toolbar-title>Collection</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <!-- ERROR ALERT -->

        <v-alert :value="error" type="error" outline>{{ error }}</v-alert>

        <!-- ERROR ALERT END -->

        <v-expansion-panel expand>
          <Recur
            v-for="(section, index) in documents"
            :elements="section"
            :key="section._id"
            :index="index"
            :k="index"
            :isArray="true"
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
      path: '',
      documents: [],
      error: '',
      expand: true,
      sampleDocument:
        '[{ "id": 1, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" } }, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets" } }, { "id": 2, "name": "Ervin Howell", "username": "Antonette", "email": "Shanna@melissa.tv", "address": { "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh", "zipcode": "90566-7771", "geo": { "lat": "-43.9509", "lng": "-34.4618" } }, "phone": "010-692-6593 x09125", "website": "anastasia.net", "company": { "name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency", "bs": "synergize scalable supply-chains" } }]'
    }
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.getSections()
      this.setLoadingStatus(true)

      if (this.sections.length !== 0) {
        setTimeout(() => {
          this.documents = this.sections
          this.setLoadingStatus(false)
        }, 50)
      }
    } else {
      this.error = 'You need to be logged in'
    }
  },
  computed: {
    ...mapState([
      'sections',
      'editObject',
      'editDialog',
      'insertDialog',
      'deleteItemDialog',
      'loading',
      'isDbOn',
      'isUserLoggedIn'
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
    },
    sections: function(newValue) {
      setTimeout(() => {
        this.documents = newValue
        this.setLoadingStatus(false)
      }, 50)
    }
  },
  methods: {
    ...mapActions([
      'fetchSections',
      'insertDocument',
      'editDocument',
      'deleteItem',
      'deleteDocument',
      'setEditDialog',
      'setInsertDialog',
      'setLoadingStatus',
      'setDeleteItemDialog',
      'resetEditObject',
      'toggleDatabaseConnexion',
      'createSnackbar'
    ]),
    getSections() {
      this.setLoadingStatus(true)
      this.fetchSections().then(data => {
        if (data.error) {
          this.error = data.error
        }
      })
    },
    testJSON(str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return JSON.parse(`"${str}"`)
      }
    },
    editField() {
      let params = {
        value: this.value,
        modifyer: '$set'
      }
      this.setLoadingStatus(true)
      this.editDocument(params)
        .then(() => {
          this.createSnackbar({
            text: 'Document Modified',
            color: 'success',
            value: true
          })
          this.editObject.component.value = params.value
          this.resetEditObject()
          this.value = ''
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.createSnackbar({
              text: err.response.data.error,
              color: 'error',
              value: true
            })
            this.editObject.component.value = params.value
            this.resetEditObject()
            this.value = ''
            this.setLoadingStatus(false)
          }
        })
      this.setEditDialog(false)
    },

    deleteField() {
      let params = {
        value: '__item_to_be_deleted__',
        modifyer: ''
      }
      this.setLoadingStatus(true)
      if (this.editObject.isArray) {
        params.modifyer = '$set'
        this.editDocument(params).then(() => {
          params.modifyer = '$pull'
          this.editObject.arrayPath = this.editObject.field.split('.')
          this.editObject.arrayPath.pop()
          this.editObject.arrayPath.join('.')
          this.editDocument(params)
            .then(() => {
              this.createSnackbar({
                text: 'Field Deleted',
                color: 'success',
                value: true
              })
              this.getSections()
              this.value = ''
              this.resetEditObject()
              this.setLoadingStatus(false)
            })
            .catch(err => {
              if (err) {
                this.createSnackbar({
                  text: err.response.data.error,
                  color: 'error',
                  value: true
                })
                this.getSections()
                this.value = ''
                this.resetEditObject()
                this.setLoadingStatus(false)
              }
            })
        })
      } else {
        params.modifyer = '$unset'
        this.editDocument(params)
          .then(() => {
            this.createSnackbar({
              text: 'Field Deleted',
              color: 'success',
              value: true
            })
            this.getSections()
            this.value = ''
            this.resetEditObject()
            this.setLoadingStatus(false)
          })
          .catch(err => {
            if (err) {
              this.createSnackbar({
                text: err.response.data.error,
                color: 'error',
                value: true
              })
              this.value = ''
              this.resetEditObject()
              this.setLoadingStatus(false)
            }
          })
      }
      this.setDeleteItemDialog(false)
    },

    insertInfo() {
      this.setLoadingStatus(true)
      let payload = this.key
        ? { [this.key]: this.testJSON(this.value) }
        : { key: this.testJSON(this.value) }
      this.insertDocument(payload)
        .then(() => {
          this.createSnackbar({
            text: 'Document Inserted',
            color: 'success',
            value: true
          })
          this.getSections()
          this.value = ''
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.createSnackbar({
              text: err.response.data.error,
              color: 'error',
              value: true
            })
            this.value = ''
            this.setLoadingStatus(false)
          }
        })
      this.closeInsertDialog()
    },

    confirmDelete() {
      let _id = this.idToDelete
      this.setLoadingStatus(true)
      this.deleteDocument(_id)
        .then(() => {
          this.createSnackbar({
            text: 'Document Deleted',
            color: 'success',
            value: true
          })
          this.getSections()
          this.idToDelete = null
          this.deleteDialog = false
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.createSnackbar({
              text: err.response.data.error,
              color: 'error',
              value: true
            })
            this.idToDelete = null
            this.deleteDialog = false
            this.setLoadingStatus(false)
          }
        })
    },

    initialize() {
      this.value = this.sampleDocument
      this.key = 'users'
      this.insertInfo()
    },

    closeInsertDialog() {
      this.setInsertDialog(false)
      this.value = ''
      this.key = ''
    },

    openEditDialog() {
      this.setEditDialog(true)
    },

    closeEditDialog() {
      this.setEditDialog(false)
      this.value = ''
    },

    openDeleteItemDialog() {
      this.setDeleteItemDialog(true)
    },

    closeDeleteItemDialog() {
      this.setDeleteItemDialog(false)
      this.value = ''
    },

    openDeleteDialog(idToDelete) {
      this.deleteDialog = true
      this.idToDelete = idToDelete
    },

    closeDeleteDialog() {
      this.deleteDialog = false
      this.idToDelete = null
    },

    toggle() {
      this.toggleDatabaseConnexion()
    }
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
.insert-example {
  font: 14px/18px Roboto Mono, monospace;
  border-radius: 1.5em;
}
</style>
