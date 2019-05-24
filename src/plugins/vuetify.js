import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  options: {
    customProperties: true
  },
  theme: {
    primary: '#1a1a1a',
    secondary: '#000000',
    accent: '#13aa52',
    // accent: '#68b245',
    error: '#B00020',
    info: '#46494C',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
