import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { InterviesNavigator } from "./interviews.navigator";

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={InterviesNavigator} />
    </Drawer.Navigator>
  );
};
