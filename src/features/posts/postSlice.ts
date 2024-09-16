import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import type { RootState } from '@/api/store'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // // Declare a "case reducer" named `postAdded`.
    // // The type of `action.payload` will be a `Post` object.
    // postAdded(state, action: PayloadAction<Post>) {
    //   // "Mutate" the existing state array, which is
    //   // safe to do here because `createSlice` uses Immer inside.
    //   state.push(action.payload)
    // },
    // instead of this
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

// Export the auto-generated action creator with the same name
export const { postAdded, postUpdated } = postsSlice.actions

// Определим повторно используемые функции выбора в файлах
// фрагментов и заставим компоненты использовать эти
// селекторы для извлечения необходимых им данных
// вместо повторения логики выбора в каждом компоненте.
export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)

// Export the generated reducer function
export default postsSlice.reducer
