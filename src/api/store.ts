import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '@/features/posts/postSlice'
import usersReducer from '@/features/users/usersSlice'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
})

export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
