import {configureStore} from '@reduxjs/toolkit'
// import authSliceReducer from './authSlice'
import authSlice from './authSlice'
import postSlice from './postSlice'
import themeSlice  from './themeSlice'

const store = configureStore({
  reducer: {
    auth : authSlice,
    post : postSlice,
    // theme: themeSlice,
  },
});

export default store;