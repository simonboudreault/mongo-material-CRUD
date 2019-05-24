(function(t){function e(e){for(var n,s,r=e[0],c=e[1],l=e[2],d=0,f=[];d<r.length;d++)s=r[d],i[s]&&f.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,r=1;r<a.length;r++){var c=a[r];0!==i[c]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},i={app:0},o=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/mongo-material-CRUD/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("1356"),i=a.n(n);i.a},"0a2f":function(t,e,a){"use strict";var n=a("5428"),i=a.n(n);i.a},1356:function(t,e,a){},"37a8":function(t,e,a){},"469b":function(t,e,a){"use strict";var n=a("37a8"),i=a.n(n);i.a},5428:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),i=a("bb71");a("da64");n["a"].use(i["a"],{iconfont:"md",options:{customProperties:!0},theme:{primary:"#1a1a1a",secondary:"#000000",accent:"#13aa52",error:"#B00020",info:"#46494C",success:"#4CAF50",warning:"#FFC107"}});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",{attrs:{dark:"",extended:"",app:"",color:"primary"}},[a("div",{staticClass:"progressBarContainer"},[a("Progress")],1),a("v-toolbar-title",{staticClass:"headline text-uppercase"},[a("span",[t._v("MONGO DB")]),t._v(" \n      "),a("span",{staticClass:"font-weight-light"},[t._v("MATERIAL")]),a("img",{staticClass:"feuille",attrs:{src:"images/mongo.svg"}})]),a("v-spacer"),a("Nav")],1),a("v-content",[a("router-view")],1)],1)},s=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-toolbar-items",[a("v-btn",{attrs:{flat:"",dark:""},on:{click:function(e){return t.navigateTo({name:"home"})}}},[t._v("home")]),a("v-btn",{attrs:{flat:"",dark:""},on:{click:function(e){return t.navigateTo({name:"database"})}}},[t._v("database")]),a("v-fab-transition",[a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return["database"===t.$route.name?a("v-btn",t._g({attrs:{color:"accent",dark:"",small:"",absolute:"",bottom:"",left:"",fab:""},on:{click:function(e){return t.$store.dispatch("setInsertDialog",!0)}}},n),[a("v-icon",[t._v("add")])],1):t._e()]}}])},[a("span",[t._v("Add a Document")])])],1)],1)},c=[],l=(a("7f7f"),{components:{},methods:{navigateTo:function(t){var e=this;"database"===t.name&&this.$store.dispatch("setLoadingStatus",!0),setTimeout(function(){e.$router.push(t)},10)}}}),u=l,d=(a("e920"),a("2877")),f=a("6544"),v=a.n(f),h=a("8336"),p=a("0789"),m=a("132d"),b=a("2a7f"),g=a("3a2f"),D=Object(d["a"])(u,r,c,!1,null,"72880c05",null),_=D.exports;v()(D,{VBtn:h["a"],VFabTransition:p["b"],VIcon:m["a"],VToolbarItems:b["a"],VTooltip:g["a"]});var x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-fade-transition",{attrs:{mode:"out-in"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"progressBar"},[a("div",{staticClass:"spinner"},[a("div",{staticClass:"rect1 accent"}),a("div",{staticClass:"rect2 accent"}),a("div",{staticClass:"rect3 accent"}),a("div",{staticClass:"rect4 accent"}),a("div",{staticClass:"rect5 accent"})])])])},k=[],y=a("cebc"),S=a("2f62"),O={methods:{},data:function(){return{}},watch:{},computed:Object(y["a"])({},Object(S["c"])(["loading"]),{isLoading:function(){return this.loading}})},E=O,T=(a("96ec"),Object(d["a"])(E,x,k,!1,null,"158118f9",null)),I=T.exports;v()(T,{VFadeTransition:p["c"]});var j={components:{Nav:_,Progress:I},name:"App",data:function(){return{}}},C=j,V=(a("034f"),a("7496")),A=a("549c"),$=a("9910"),w=a("71d9"),L=Object(d["a"])(C,o,s,!1,null,null,null),P=L.exports;v()(L,{VApp:V["a"],VContent:A["a"],VSpacer:$["a"],VToolbar:w["a"],VToolbarTitle:b["b"]});var B=a("8c4f"),F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[a("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[a("h1",[t._v(t._s(t.title))])])],1)},N=[],R={data:function(){return{title:"home page"}}},M=R,J=a("0e8f"),G=a("a722"),U=Object(d["a"])(M,F,N,!1,null,"6587398a",null),z=U.exports;v()(U,{VFlex:J["a"],VLayout:G["a"]});var K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sections"},[a("v-layout",{staticClass:"pb-5",attrs:{"align-start":"","justify-center":"",row:"","fill-height":""}},[a("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.$store.state.editDialog,callback:function(e){t.$set(t.$store.state,"editDialog",e)},expression:"$store.state.editDialog"}},[a("v-card",[a("v-card-title",[a("h4",[t._v("Edit Value")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-textarea",{ref:"editInputArea",attrs:{box:"",label:"Value"},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.editField(e)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.closeEditDialog}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.editField}},[t._v("Save")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.$store.state.deleteItemDialog,callback:function(e){t.$set(t.$store.state,"deleteItemDialog",e)},expression:"$store.state.deleteItemDialog"}},[a("v-card",[a("v-card-title",[a("h4",[t._v("Delete Value")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[t._v("Are you sure you want to delete this item")])],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.closeDeleteItemDialog}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.deleteField}},[t._v("Delete")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[a("v-card",[a("v-card-title",[a("h4",[t._v("Delete Document")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[t._v("Are you sure you want to delete this document")])],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.closeDeleteDialog}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.confirmDelete}},[t._v("Delete")])],1)],1)],1),a("v-flex",{attrs:{xs10:""}},[a("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.$store.state.insertDialog,callback:function(e){t.$set(t.$store.state,"insertDialog",e)},expression:"$store.state.insertDialog"}},[a("v-card",[a("v-card-title",[a("h4",[t._v("Add an Item")])]),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{label:"key",box:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}}),a("v-textarea",{ref:"insertInputArea",attrs:{box:"",label:"Value"},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.insertInfo(e)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.closeInsertDialog}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"accent",flat:""},on:{click:t.insertInfo}},[t._v("Save")])],1)],1)],1),a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("div",{staticClass:"text-xs-center",attrs:{xs12:""}},[a("v-btn",t._g({staticClass:"mb-3",attrs:{outline:"",color:t.isDBOn?"accent":"error"},on:{click:t.toggle}},n),[t._v("database is "+t._s(t.isDBOn?"on":"off"))])],1)]}}])},[a("span",[t._v("\n          "+t._s(t.isDBOn?"Break server link to database":"Restore server link to database")+"\n        ")])]),a("v-toolbar",{attrs:{dark:"",color:"info"}},[a("v-toolbar-title",[t._v("Collection")]),a("v-spacer")],1),a("v-alert",{attrs:{value:t.error,type:"error",outline:""}},[t._v(t._s(t.error))]),a("v-expansion-panel",{attrs:{expand:""}},t._l(t.documents,function(e,n){return a("Recur",{key:e._id,attrs:{elements:e,index:n,k:n,isArray:!0,deletable:!0},on:{"delete-document":t.openDeleteDialog,"edit-document":t.openEditDialog}})}),1)],1)],1),a("v-snackbar",{attrs:{bottom:"bottom"===t.y,left:"left"===t.x,"multi-line":"multi-line"===t.mode,right:"right"===t.x,timeout:t.timeout,color:t.snackbarColor,top:"top"===t.y,vertical:"vertical"===t.mode},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n    "+t._s(t.snackbarText)+"\n    "),a("v-btn",{attrs:{flat:""},on:{click:function(e){t.snackbar=!1}}},[t._v("Close")])],1)],1)},W=[],q=a("bd86"),H=(a("28a5"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-flex",{staticClass:"flexWrapper",attrs:{row:"",xs12:""},on:{mouseover:function(e){t.isActive=!0},mouseleave:function(e){t.isActive=!1}}},[a("v-expansion-panel-content",{class:{hover:"_id"!==t.header},attrs:{readonly:"_id"===t.header},scopedSlots:t._u([{key:"header",fn:function(){return[a("div",{staticClass:"subheading font-weight-medium"},[t._v(t._s(t.header))]),a("div",{staticClass:"accent--text text-xs-center spacer"},["_id"===t.header?a("div",[t._v(t._s(t.value))]):t._e()]),a("v-fab-transition",[t.deletable||"_id"===t.header?t._e():a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],staticClass:"headerButton",attrs:{color:"primary",flat:"",fab:"",small:""},on:{click:t.deleteItem}},[a("v-icon",[t._v("delete")])],1)],1),t.deletable?a("v-btn",{attrs:{color:"primary",flat:"",fab:"",small:""},on:{click:t.deleteDocument}},[a("v-icon",[t._v("delete")])],1):t._e(),a("div",{staticClass:"caption font-weight-bold accent--text text-uppercase"},[t._v("\n        "+t._s(t.type)+"\n      ")])]},proxy:!0}])},[a("v-layout",["object"===t.type||"array"===t.type?a("v-flex",{staticClass:"pa-2 fl",attrs:{"xs-12":""}},[a("v-expansion-panel",{attrs:{expand:""},model:{value:t.panel,callback:function(e){t.panel=e},expression:"panel"}},t._l(t.elements,function(e,n,i){return a("recur",{key:n,attrs:{elements:e,k:n,isArray:"array"===t.type,index:i,path:t.cPath,oPath:t.objectPath}})}),1)],1):a("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[t._v("\n        "+t._s(t.value)+"\n        "),"_id"!==t.k?a("Badge",{on:{edit:t.editDocument}}):t._e()],1)],1)],1)],1)}),Q=[],X=(a("4917"),a("3b2b"),a("7618")),Y=a("a4bb"),Z=a.n(Y),tt=(a("6b54"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-xs-center pa-2"},[a("v-badge",{attrs:{left:""}},[a("v-btn",{staticClass:"caption",attrs:{small:"",flat:"",round:"",color:"accent"},on:{click:t.edit}},[a("v-icon",{staticClass:"iconA"},[t._v("edit")]),t._v("  Edit value\n    ")],1)],1)],1)}),et=[],at={methods:{edit:function(){this.$emit("edit")},deleteItem:function(){this.$emit("delete-item")}}},nt=at,it=(a("c190"),a("4ca6")),ot=Object(d["a"])(nt,tt,et,!1,null,"ba31be22",null),st=ot.exports;v()(ot,{VBadge:it["a"],VBtn:h["a"],VIcon:m["a"]});var rt=a("bc3a"),ct=a.n(rt),lt=ct.a.create({baseURL:"http://localhost:5000"}),ut=function(){return lt},dt={getSections:function(){return ut().get("/")},toggleDB:function(){return ut().get("/connexion")},putSection:function(t){return ut().put("/",t)},postSection:function(t){return ut().post("/",t)},getSection:function(t){return ut().get("/sections/"+t)},deleteSection:function(t){return ut().delete("/",{data:t})}},ft={name:"recur",props:["elements","k","index","path","deletable","lazy","isArray","oPath"],components:{recur:bt,Badge:st},data:function(){return{docId:null,dialog:!1,deleteDialog:!1,value:this.elements,dataElements:this.elements,panel:[],isActive:!1}},watch:{elements:function(t){this.value=t}},mounted:function(){var t=this.documentIndex[0];this.docId=this.$store.state.sections[t]._id.toString()},methods:{editDocument:function(){var t={id:this.docId,field:this.cField,component:this,value:this.value};this.$store.dispatch("setEditDialog",!0),this.$store.dispatch("setEditObject",t)},deleteItem:function(){var t={id:this.docId,field:this.cField,component:this,path:this.Path,cPath:this.cPath,isArray:this.isArray,oPath:this.oPath,property:this.k};this.$store.dispatch("setDeleteItemDialog",!0),this.$store.dispatch("setEditObject",t)},deleteDocument:function(t){t.stopPropagation(),this.$emit("delete-document",this.docId)},confirmDelete:function(){var t=this,e={_id:this.docId};dt.deleteSection(e).then(function(e){console.log(e.data.ok?"Votre document a été supprimé : \n ".concat(t.docId):"Votre document n'a PAS été supprimé !"),t.$store.dispatch("fetchSections")}),this.closeDelete()},changeInfo:function(){var t=this,e={_id:this.docId,payload:Object(q["a"])({},this.cField,this.value)};dt.putSection(e).then(function(a){return console.log(a.data.nModified?"Votre modification a été enregistrée : \n ".concat(Z()(e.payload)[0]," => ").concat(e.payload[t.cField]):"Votre modification n'a PAS été enregistrée !")}),this.close()},close:function(){this.dialog=!1},closeDelete:function(){this.$store.state.deleteDialog=!1},typeOf:function(t){return"object"===Object(X["a"])(t)?null===t?"null":"[object Array]"===Object.prototype.toString.call(t)?"array":"object":Object(X["a"])(t)},activate:function(){console.log("activate"),this.isActive=!this.isActive}},computed:{type:function(){return this.typeOf(this.elements)},cPath:function(){return this.path?"".concat(this.path,".").concat(this.k):"".concat(this.k)},objectPath:function(){return this.isArray?this.path?"".concat(this.oPath,"[").concat(this.k,"]"):"[".concat(this.k,"]"):this.path?"".concat(this.oPath,".").concat(this.k):"".concat(this.k)},cField:function(){return this.cPath.slice(2)},documentIndex:function(){var t=new RegExp(/[^\.]*/);return this.cPath.match(t)},header:function(){var t=new RegExp("[0-9]");return t.test(this.k.toString())?this.deletable?"Document ".concat(this.k+1):"Item ".concat(this.k+1):this.k},computedKey:function(){return Math.floor(1e3*Math.random())}}},vt=ft,ht=(a("469b"),a("cd55")),pt=a("49e2"),mt=Object(d["a"])(vt,H,Q,!1,null,"a55d7be0",null),bt=mt.exports;v()(mt,{VBtn:h["a"],VExpansionPanel:ht["a"],VExpansionPanelContent:pt["a"],VFabTransition:p["b"],VFlex:J["a"],VIcon:m["a"],VLayout:G["a"]});var gt={components:{Recur:bt},data:function(){return{title:"database",key:"",value:"",deleteDialog:!1,idToEdit:null,idToDelete:null,path:"",documents:[],snackbarColor:"",snackbarText:"",y:"top",x:null,mode:"",timeout:1200,snackbar:!1,error:"",isDBOn:!0}},created:function(){this.getSections()},mounted:function(){var t=this;this.setLoadingStatus(!0),0!==this.sections.length&&setTimeout(function(){t.documents=t.sections,t.setLoadingStatus(!1)},50)},computed:Object(y["a"])({},Object(S["c"])(["sections","editObject","editDialog","insertDialog","deleteItemDialog","loading"])),watch:{editDialog:function(t){var e=this;!0===t&&(this.value=this.editObject.value,this.$nextTick(function(){e.$refs.editInputArea.focus()}))},insertDialog:function(t){var e=this;!0===t&&this.$nextTick(function(){e.$refs.insertInputArea.focus()})},sections:function(t){var e=this;setTimeout(function(){e.documents=t,e.setLoadingStatus(!1)},50)}},methods:Object(y["a"])({},Object(S["b"])(["fetchSections","insertDocument","editDocument","deleteItem","setEditDialog","setInsertDialog","setLoadingStatus","setDeleteItemDialog","resetEditObject","toggleDatabaseConnexion"]),{getSections:function(){var t=this;this.setLoadingStatus(!0),this.fetchSections().then(function(e){"boolean"===typeof e?t.isDBOn=e:(t.error=e,t.isDBOn=!1)})},testJSON:function(t){try{return JSON.parse(t)}catch(e){return JSON.parse('"'.concat(t,'"'))}},resetSnackbar:function(){var t=this;setTimeout(function(){t.snackbarText="",t.snackbarColor=""},this.timeout+500)},snackbarSuccess:function(t){this.snackbarText=t,this.snackbarColor="accent",this.snackbar=!0,this.resetSnackbar()},snackbarError:function(t){this.snackbarText=t,this.snackbarColor="error",this.snackbar=!0,this.resetSnackbar()},editField:function(){var t=this,e={value:this.value,modifyer:"$set"};this.setLoadingStatus(!0),this.editDocument(e).then(function(a){t.snackbarSuccess("Document Modified"),t.editObject.component.value=e.value,t.resetEditObject(),t.value="",t.setLoadingStatus(!1)}).catch(function(a){a&&(t.snackbarError(a.response.data.error),t.editObject.component.value=e.value,t.resetEditObject(),t.value="",t.setLoadingStatus(!1))}),this.setEditDialog(!1)},deleteField:function(){var t=this,e={value:"__item_to_be_deleted__",modifyer:""};this.setLoadingStatus(!0),this.editObject.isArray?(e.modifyer="$set",this.editDocument(e).then(function(){e.modifyer="$pull",t.editObject.arrayPath=t.editObject.field.split("."),t.editObject.arrayPath.pop(),t.editObject.arrayPath.join("."),t.editDocument(e).then(function(e){t.snackbarSuccess("Field Deleted"),t.getSections(),t.value="",t.resetEditObject(),t.setLoadingStatus(!1)}).catch(function(e){e&&(t.snackbarError(e.response.data.error),t.getSections(),t.value="",t.resetEditObject(),t.setLoadingStatus(!1))})})):(e.modifyer="$unset",this.editDocument(e).then(function(e){t.snackbarSuccess("Field Deleted"),t.getSections(),t.value="",t.resetEditObject(),t.setLoadingStatus(!1)}).catch(function(e){e&&(t.snackbarError(e.response.data.error),t.value="",t.resetEditObject(),t.setLoadingStatus(!1))})),this.setDeleteItemDialog(!1)},insertInfo:function(){var t=this;this.setLoadingStatus(!0);var e=this.key?Object(q["a"])({},this.key,this.testJSON(this.value)):{key:this.testJSON(this.value)};this.insertDocument(e).then(function(e){t.snackbarSuccess("Document Inserted"),t.getSections(),t.value="",t.setLoadingStatus(!1)}).catch(function(e){e&&(t.snackbarError(e.response.data.error),t.value="",t.setLoadingStatus(!1))}),this.closeInsertDialog()},confirmDelete:function(){var t=this,e={_id:this.idToDelete};this.setLoadingStatus(!0),dt.deleteSection(e).then(function(e){t.snackbarSuccess("Document Deleted"),t.getSections(),t.idToDelete=null,t.deleteDialog=!1,t.setLoadingStatus(!1)}).catch(function(e){e&&(t.snackbarError(e.response.data.error),t.idToDelete=null,t.deleteDialog=!1,t.setLoadingStatus(!1))})},openInsertDialog:function(){this.setInsertDialog(!0)},closeInsertDialog:function(){this.setInsertDialog(!1),this.value="",this.key=""},openEditDialog:function(){this.setEditDialog(!0)},closeEditDialog:function(){this.setEditDialog(!1),this.value=""},openDeleteItemDialog:function(){this.setDeleteItemDialog(!0)},closeDeleteItemDialog:function(){this.setDeleteItemDialog(!1),this.value=""},openDeleteDialog:function(t){this.deleteDialog=!0,this.idToDelete=t},closeDeleteDialog:function(){this.deleteDialog=!1,this.idToDelete=null},toggle:function(){var t=this;this.toggleDatabaseConnexion().then(function(e){0===t.documents.length&&(t.error="",setTimeout(t.getSections,250)),t.isDBOn=e})}})},Dt=gt,_t=(a("0a2f"),a("0798")),xt=a("b0af"),kt=a("99d9"),yt=a("12b2"),St=a("a523"),Ot=a("169a"),Et=a("2db4"),Tt=a("2677"),It=a("a844"),jt=Object(d["a"])(Dt,K,W,!1,null,"f9714770",null),Ct=jt.exports;v()(jt,{VAlert:_t["a"],VBtn:h["a"],VCard:xt["a"],VCardActions:kt["a"],VCardText:kt["b"],VCardTitle:yt["a"],VContainer:St["a"],VDialog:Ot["a"],VExpansionPanel:ht["a"],VFlex:J["a"],VLayout:G["a"],VSnackbar:Et["a"],VSpacer:$["a"],VTextField:Tt["a"],VTextarea:It["a"],VToolbar:w["a"],VToolbarTitle:b["b"],VTooltip:g["a"]}),n["a"].use(B["a"]);var Vt=new B["a"]({routes:[{path:"/",name:"home",component:z},{path:"/database",name:"database",component:Ct}]});n["a"].use(S["a"]);var At=new S["a"].Store({state:{sections:[],editObject:{},editDialog:!1,insertDialog:!1,deleteItemDialog:!1,loading:!1,renderCount:0,error:""},mutations:{SET_SECTIONS:function(t,e){t.sections=e},SET_EDIT_OBJECT:function(t,e){t.editObject=e},RESET_EDIT_OBJECT:function(t){t.editObject={}},SET_EDIT_DIALOG:function(t,e){t.editDialog=e},SET_INSERT_DIALOG:function(t,e){t.insertDialog=e},SET_DELETE_ITEM_DIALOG:function(t,e){t.deleteItemDialog=e},SET_LOADING_STATUS:function(t,e){t.loading=e},SET_ERROR:function(t,e){t.error=e}},actions:{fetchSections:function(t){var e=t.commit;return dt.getSections().then(function(t){return e("SET_SECTIONS",t.data.documents),console.log("fetched documents"),t.data.db}).catch(function(t){return e("SET_LOADING_STATUS",!1),t.response.data.error})},setEditObject:function(t,e){var a=t.commit;a("SET_EDIT_OBJECT",e)},resetEditObject:function(t){var e=t.commit;e("RESET_EDIT_OBJECT")},setEditDialog:function(t,e){var a=t.commit;a("SET_EDIT_DIALOG",e)},setInsertDialog:function(t,e){var a=t.commit;a("SET_INSERT_DIALOG",e)},setDeleteItemDialog:function(t,e){var a=t.commit;a("SET_DELETE_ITEM_DIALOG",e)},setLoadingStatus:function(t,e){var a=t.commit;a("SET_LOADING_STATUS",e)},insertDocument:function(t,e){t.dispatch;var a={payload:e};return dt.postSection(a)},editDocument:function(t,e){var a=t.state,n={_id:a.editObject.id,payload:Object(q["a"])({},a.editObject.arrayPath?a.editObject.arrayPath:a.editObject.field,e.value),modifyer:e.modifyer};return dt.putSection(n)},deleteItem:function(t){var e=t.state,a={_id:e.editObject.id,payload:Object(q["a"])({},e.editObject.field,""),modifyer:"$unset"};return dt.putSection(a).catch(function(t){return t.response.data.error})},toggleDatabaseConnexion:function(){return dt.toggleDB().then(function(t){return t.data.DB})}}});n["a"].config.productionTip=!1,new n["a"]({router:Vt,store:At,render:function(t){return t(P)}}).$mount("#app")},"5e92":function(t,e,a){},"7cc1":function(t,e,a){},"96ec":function(t,e,a){"use strict";var n=a("7cc1"),i=a.n(n);i.a},c190:function(t,e,a){"use strict";var n=a("5e92"),i=a.n(n);i.a},d7ea:function(t,e,a){},e920:function(t,e,a){"use strict";var n=a("d7ea"),i=a.n(n);i.a}});
//# sourceMappingURL=app.dbcfc79d.js.map