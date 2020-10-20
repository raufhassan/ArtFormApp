/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Routes from "./src/routes/index";
import Main from "./src/components/Main";
import { PersistGate } from "redux-persist/es/integration/react";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // Whitelist:['user']
};
const middleware = [thunk, logger];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistedStore = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
