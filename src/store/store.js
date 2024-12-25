import {configureStore} from '@reduxjs/toolkit'
// import authSliceReducer from './authSlice'
import authSlice from './authSlice'
import postSlice from './postSlice'

const store = configureStore({
  reducer: {
    auth : authSlice,
    post : postSlice,
  },
});

export default store;