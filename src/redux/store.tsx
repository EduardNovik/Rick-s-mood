import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './charactersSlice'
import inputReducer from './inputSlice'
import characterDetailsReducer from './characterDetailsSlice'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    inputState: inputReducer,
    characterDetails: characterDetailsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch