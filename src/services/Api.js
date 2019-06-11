import axios from 'axios'
import store from '@/store/store'
export default () => {
  return axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://mongodb-crud-server.herokuapp.com/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
