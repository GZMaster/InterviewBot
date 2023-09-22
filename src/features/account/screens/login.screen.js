import React, { useState, useContext } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountCover,
  LoginContainer,
  AuthButton,
  AuthTextInput,
  Title,
} from "../components/account.styles";
import styled from "styled-components/native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const LoginScreen = ({ navigation }) => {
  const [matno, setMatNo] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AuthenticationContext);

  return (
    <Container>
      <AccountCover />
      <Title>Interview Login</Title>
      <LoginContainer>
        <AuthTextInput
          label="Matric Number"
          value={matno}
          textContentType="matno"
          keyboardType="mat-number"
          autoCapitalize="none"
          onChangeText={(u) => setMatNo(u)}
        />
        <Spacer size="large">
          <AuthTextInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => authenticate(matno, password)}
          >
            Login
          </AuthButton>
        </Spacer>
      </LoginContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </Container>
  );
};
