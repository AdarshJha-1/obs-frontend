import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { authReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// ✅ Persistor for rehydration
export const persistor = persistStore(store);
export default store;
