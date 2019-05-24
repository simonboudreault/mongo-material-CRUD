import axios from 'axios'
import store from '../store/store'

const apiClient = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://mongodb-crud-server.herokuapp.com/'
})

// apiClient.interceptors.request.use(config => {
//   store.dispatch('setLoadingStatus', true)
//   console.log(store.state.loading)
//   return config
// })

// apiClient.interceptors.response.use(response => {
//   // Called on response
//   store.dispatch('setLoadingStatus', false)
//   console.log(store.state.loading)
//   return response
// })

export default () => {
  return apiClient
}
