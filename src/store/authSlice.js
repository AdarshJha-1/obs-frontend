import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Initial State
const initialState = {
  status: false,
  userData: null,
  loginTimestamp: null, // Store login time
};

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.loginTimestamp = Date.now(); // Store login time
      localStorage.setItem("loginTimestamp", Date.now()); // Persist it in localStorage
    },
    logout: (state) => {
      console.log("🔻 Logging out user...");
      Object.assign(state, initialState); // ✅ Reset state to initial values
      localStorage.removeItem("loginTimestamp"); // Remove login time
    },
    resetAuthState: (state) => {
      console.log("♻️ Resetting auth state...");
      Object.assign(state, initialState);
      storage.removeItem("persist:auth"); // ✅ Clear persisted storage
    },
  },
});

// ✅ Export Actions
export const { login, logout, resetAuthState } = authSlice.actions;

// ✅ Persist Config
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["userData", "status", "loginTimestamp"], // Persist login time
};

// ✅ Persisted Reducer
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
