import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { Search } from "../components/search.component";

const InterviewScheduleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  space-between: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[3]};
`;

const ViewContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  width: 23.375rem;
  height: 13.1875rem;
  flex-shrink: 0;
  padding: ${(props) => props.theme.space[3]};
`;

export const InterviewScheduleScreen = ({ navigation }) => {
  return (
    <InterviewScheduleContainer>
      <Spacer position="top" size="large">
        <Text variant="label" size="large">
          All your assessments at a glance
        </Text>
      </Spacer>

      <Search />

      <ViewContainer>
        <Text variant="label" size="large">
          Upcoming assessments
        </Text>
      </ViewContainer>

      <Spacer position="bottom" size="large">
        <Button
          title="Go to Interview Chat"
          onPress={() => navigation.navigate("InterviewChat")}
        />
      </Spacer>
    </InterviewScheduleContainer>
  );
};
