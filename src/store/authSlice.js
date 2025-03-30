import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Updating Redux with user:", action.payload);
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      console.log("Logging out");
      state.status = false;
      state.userData = null;
    },
  },
});

// ✅ Extract actions
export const { login, logout } = authSlice.actions;

// ✅ Persist Reducer Configuration
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["userData", "status"], // ✅ Persist auth status too
};
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
