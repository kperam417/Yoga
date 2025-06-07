
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../types/User'; // Adjust the import path as necessary


export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {       
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }
      const data = await response.json();
      return data as User; // Assuming the API returns a User object
    } catch (error) {   

      return rejectWithValue('Network error or server is down');
    }
  }
);  

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    user: null as User | null,
    error: null as string | null,
    loading: false,
  },
    reducers: { 
    loginRequest: (state,payload) => {
      state.loading = true;
      state.error = null;
      console.log("payload:", payload);
    },
    // loginSuccess: (state, action: PayloadAction<User>) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // loginFailure: (state, action: PayloadAction<string>) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   state.loading = false;
    //   state.error = action.payload;
    // },                                      
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = true;
        
        state.loading = false;
        state.error = null;
        console.error('Login pending:');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = action.payload;
        state.loading = false;
        console.error('Login fulfilled:', action.payload);
        
      }).addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload as string; // Ensure payload is a string
        console.error('Login failed:', action.payload);
      });
  }
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
 // Adjust the import path as necessary
 // Adjust the import path as necessary     