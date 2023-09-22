import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AccountScreen = ({ navigation }) => {
  return (
    <Container>
      <AccountCover />
      {/* <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper> */}
      <Title>Interview Bot</Title>
      <AccountContainer>
        <AuthButton
          icon="account-circle-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        {/* <Spacer size="large">
          <AuthButton
            icon="account-circle-outline"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </AuthButton>
        </Spacer> */}
      </AccountContainer>
    </Container>
  );
};
