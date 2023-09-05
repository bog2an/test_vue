<template>
  <div id="app">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            <input v-model="searchText" @input="debouncedSearch" type="text" class="form-control" placeholder="Filter by author..." aria-label="Filter by author..." aria-describedby="basic-addon1">
          </div>
        </div>
      </div>
      <div class="row g-4 row-cols-lg-3 row-cols-md-2">
        <div v-for="item in (searchResults ?? dataList)" :key="item.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{item.title}}
              </h5>
              <p class="card-text">
                {{item.body}}
              </p>
              <small class="muted">
                {{item.author}}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '../src/plugins/bootstrap'
import _debounce from 'lodash/debounce'

export default {
  name: 'App',
  data: () => ({
    dataList: [],
    searchText: '',
    searchResults: null // []
  }),
  async mounted () {
    const dataPosts = await this.getPosts()
    const dataUsers = await this.getUsers()
    this.addAuthor(dataPosts, dataUsers)

    // Создайте обработчик запроса с задержкой в 400 миллисекунд
    this.debouncedSearch = _debounce(this.search, 400)
  },
  methods: {
    search () {
      // Поиск с использованием this.searchText и обновлением this.searchResults
      this.searchResults = this.dataList.filter(item => {
        return item.author.toLowerCase().includes(this.searchText.toLowerCase())
      })
    },
    // получение список публикаций
    getPosts () {
      return this.$api.posts.getPosts()
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          console.log('getPosts ERROR:', err)
        })
    },
    // получение списка авторов
    getUsers () {
      return this.$api.users.getUsers()
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          console.log('getUsers ERROR:', err)
        })
    },
    // добавление имя автора по его id
    addAuthor (dataPosts, dataUsers) {
      dataPosts.forEach((item, index) => {
        const found = dataUsers.find(e => {
          if (e.id === item.userId) {
            return true
          }
        })
        if (found) {
          dataPosts[index].author = found.name
        }
      })
      this.dataList = dataPosts ?? []
    }
  }
}
</script>

<style lang="sass">
@import "src/assets/sass/bootstrap.sass"

.card
  .card-title
    color: dodgerblue
  .muted
    opacity: 0.3
</style>
