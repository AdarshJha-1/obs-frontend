import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Initial State
const initialState = {
  status: false,
  userData: null,
};

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      console.log("🔻 Logging out user...");
      Object.assign(state, initialState); // ✅ Reset state to initial values
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
  whitelist: ["userData", "status"], // ✅ Removed loginTimestamp
};

// ✅ Persisted Reducer
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
