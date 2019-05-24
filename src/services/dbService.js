import Api from '@/services/Api'

export default {
  getSections() {
    return Api().get('/')
  },
  toggleDB() {
    return Api().get('/connexion')
  },
  putSection(id) {
    return Api().put('/', id)
  },
  postSection(id) {
    return Api().post('/', id)
  },
  getSection(id) {
    return Api().get('/sections/' + id)
  },
  deleteSection(id) {
    return Api().delete('/', { data: id })
  }
}
