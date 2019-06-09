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
                :color="isDBOn ? 'accent' : 'error'"
                v-on="on"
                >database is {{ isDBOn ? 'on' : 'off' }}</v-btn
              >
            </div>
          </template>
          <span>
            {{
              isDBOn
                ? 'Break server link to database'
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
          <!-- <Section
            v-for="(section, index) in sections"
            :section="section"
            :key="section.id"
          />-->
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
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :color="snackbarColor"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ snackbarText }}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
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
      snackbarColor: '',
      snackbarText: '',
      y: 'top',
      x: null,
      mode: '',
      timeout: 1200,
      snackbar: false,
      error: '',
      isDBOn: true
    }
  },
  created() {
    // eslint-disable-next-line prettier/prettier
    this.getSections()
  },
  mounted() {
    this.setLoadingStatus(true)

    if (this.sections.length !== 0) {
      setTimeout(() => {
        this.documents = this.sections
        this.setLoadingStatus(false)
      }, 50)
    }
  },
  computed: {
    ...mapState([
      'sections',
      'editObject',
      'editDialog',
      'insertDialog',
      'deleteItemDialog',
      'loading'
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
      'toggleDatabaseConnexion'
    ]),
    getSections() {
      this.setLoadingStatus(true)
      this.fetchSections().then(res => {
        if (typeof res === 'boolean') {
          this.isDBOn = res
        } else {
          this.error = res
          this.isDBOn = false
        }
      })
    },

    // ifJSON(str) {
    //   try {
    //     JSON.parse(str)
    //   } catch (e) {
    //     return false
    //   }
    //   return true
    // },

    testJSON(str) {
      // return this.ifJSON(this.value) ? JSON.parse(str) : JSON.parse(`"${str}"`)
      try {
        return JSON.parse(str)
      } catch (e) {
        return JSON.parse(`"${str}"`)
      }
    },
    resetSnackbar() {
      let self = this
      setTimeout(function() {
        self.snackbarText = ''
        self.snackbarColor = ''
      }, this.timeout + 500)
    },
    snackbarSuccess(text) {
      this.snackbarText = text
      this.snackbarColor = 'accent'
      this.snackbar = true
      this.resetSnackbar()
    },
    snackbarError(text) {
      this.snackbarText = text
      this.snackbarColor = 'error'
      this.snackbar = true
      this.resetSnackbar()
    },

    editField() {
      let params = {
        value: this.value,
        modifyer: '$set'
      }
      this.setLoadingStatus(true)
      this.editDocument(params)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.snackbarSuccess('Document Modified')
          this.editObject.component.value = params.value
          this.resetEditObject()
          this.value = ''
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.snackbarError(err.response.data.error)
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
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              this.snackbarSuccess('Field Deleted')
              // console.log(this.sections)
              // delete this.sections[this.editObject.path]
              // console.log(this.sections[this.editObject.path])
              // this.resetEditObject()

              // this.editObject.component.$parent.$parent.$parent.dataElements.splice(
              //   this.editObject.component.k,
              //   1
              // )
              // this.$store.state.sections = null

              // this.getSections()
              // console.log(this.sections[1].key)
              this.getSections()
              this.value = ''
              this.resetEditObject()
              this.setLoadingStatus(false)
            })
            .catch(err => {
              if (err) {
                this.snackbarError(err.response.data.error)
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
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            this.snackbarSuccess('Field Deleted')
            this.getSections()
            this.value = ''
            this.resetEditObject()
            this.setLoadingStatus(false)
          })
          .catch(err => {
            if (err) {
              this.snackbarError(err.response.data.error)
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
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.snackbarSuccess('Document Inserted')
          this.getSections()
          this.value = ''
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.snackbarError(err.response.data.error)
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
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.snackbarSuccess('Document Deleted')
          this.getSections()
          this.idToDelete = null
          this.deleteDialog = false
          this.setLoadingStatus(false)
        })
        .catch(err => {
          if (err) {
            this.snackbarError(err.response.data.error)
            this.idToDelete = null
            this.deleteDialog = false
            this.setLoadingStatus(false)
          }
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

    openDeleteDialog: function(idToDelete) {
      this.deleteDialog = true
      this.idToDelete = idToDelete
    },

    closeDeleteDialog() {
      this.deleteDialog = false
      this.idToDelete = null
    },
    toggle() {
      this.toggleDatabaseConnexion().then(response => {
        if (this.documents.length === 0) {
          this.error = ''
          setTimeout(this.getSections, 250)
        }
        this.isDBOn = response
      })
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
</style>
