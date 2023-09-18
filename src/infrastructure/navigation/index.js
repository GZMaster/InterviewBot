import React, { useContext } from "react";
import { AuthenticationProvider } from "../../services/authentication/authentication.context";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  // const { isAuthenticated } = useContext(AuthenticationProvider);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <AppNavigator /> : <AccountNavigator />} */}

      <AppNavigator />
    </NavigationContainer>
  );
};
