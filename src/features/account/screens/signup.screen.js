import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountCover,
  LoginContainer,
  AuthButton,
  AuthTextInput,
  Title,
  ErrorContainer,
} from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const SignupScreen = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matno, setMatNo] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPssword, setRepeadedPassword] = useState("");
  const { signup, error, isLoading } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <LoginContainer>
        <AuthTextInput
          label="Name"
          value={name}
          textContentType="name"
          keyboardType="name"
          autoCapitalize="none"
          onChangeText={(u) => setName(u)}
        />
        <AuthTextInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <AuthTextInput
          label="MatNo"
          value={matno}
          textContentType="matno"
          keyboardType="matno"
          autoCapitalize="none"
          onChangeText={(u) => setMatNo(u)}
        />
        <AuthTextInput
          label="Department"
          value={department}
          textContentType="department"
          keyboardType="department"
          autoCapitalize="none"
          onChangeText={(u) => setDepartment(u)}
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
          <AuthTextInput
            label="Repeat Password"
            value={repeatedPssword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(r) => setRepeadedPassword(r)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email-outline"
              mode="contained"
              onPress={() =>
                signup({
                  name,
                  email,
                  matno,
                  department,
                  password,
                  repeatedPssword,
                })
              }
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </LoginContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
