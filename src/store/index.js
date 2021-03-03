import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalReducer from './modalSlice';
import memberReducer from './memberSlice';
import uiReducer from './uiSlice';
// import thunk from "redux-thunk";

const reducers = combineReducers({
  modal: modalReducer,
  member: memberReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui', 'router'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

export { store, persistor };