import React from "react";
import Form from "../components/Form";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import Tab2 from "../components/Form/Tab2";
const Stack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
          hideNavBar={true}
        />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Tab2" component={Tab2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
