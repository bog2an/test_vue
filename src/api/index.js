import instance from './instance'

import postsModule from './posts'
import usersModule from './users'

export default {
  posts: postsModule(instance),
  users: usersModule(instance)
}
