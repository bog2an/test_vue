export default function (instance) {
  return {
    getUsers () {
      return instance.get('/users')
    }
  }
}
