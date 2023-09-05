export default function (instance) {
  return {
    getPosts () {
      return instance.get('/posts')
    }
  }
}
