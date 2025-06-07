import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './LoginSlice';

const store = configureStore({
    reducer: {
        loginStore: loginSlice.reducer,
        // Add your reducers here
        // Example: user: userReducer,
    }
})
// Optional: Add TypeScript types for the store
 


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;