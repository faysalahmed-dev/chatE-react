import { configureStore, Reducer } from '@reduxjs/toolkit';
import createReducer from './rootReducer';

function config() {
   const store = configureStore({
      reducer: createReducer,
   });
   return store;
}
const store = config();
console.log(store.getState());
// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
   // @ts-ignore
   module.hot.accept('./rootReducer', () => {
      const newRootReducer = require('./rootReducer').default;
      store.replaceReducer(newRootReducer);
   });
}

export type AppDispatch = typeof store.dispatch;

export default store;
