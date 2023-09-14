import React from "react";
import { InterviesNavigator } from "./interviews.navigator";

export const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={InterviesNavigator} />
    </Drawer.Navigator>
  );
};
