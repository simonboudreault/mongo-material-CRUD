import Api from '@/services/Api'

export default {
  getSections(collName) {
    return Api().get('/?coll=' + collName)
  },
  toggleDB() {
    return Api().get('/connexion')
  },
  putSection(payload) {
    return Api().put('/', payload)
  },
  postSection(payload) {
    return Api().post('/', payload)
  },
  getSection(payload) {
    return Api().get('/sections/' + payload)
  },
  deleteSection(payload) {
    return Api().delete('/', { data: payload })
  }
}
