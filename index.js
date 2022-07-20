/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import React from "react";
import { UserList } from "./src/features/user/UserList";

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <UserList/>
  </Provider>
));
