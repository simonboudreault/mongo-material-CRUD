# mongoDB material CRUD

live version : https://simonboudreault.github.io/mongo-material-CRUD/#/


### 

This app is a material design interface to interact with a mongoDB database. It uses Vue.js, vuex, vue-router, Vuetify and axios for the api calls. Upon registration, you get a collection named after your user with which you can interact. The backend part uses express for the routes, joi for validation, jsonWebToken and passport for authentication and bcrypt for password hash. The display of the documents uses expansion panels from vuetify and a system of recursive components to display string and number values in a different way than arrays or objects. Since this project was created for learning purposes, it has a way to trigger errors so they can be passed to the front-end to be displayed.

