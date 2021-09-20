import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "./Add";
import SaveScreen from "./Save";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

export default function AddStack() {
  return (
    <Provider store={store}>
    <Stack.Navigator initalRouteName="Main">
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{ title: "Awesome app" }}
      />
      <Stack.Screen name="Save" component={SaveScreen} />
    </Stack.Navigator>
    </Provider>
  );
}
