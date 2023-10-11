import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";
import {
  InterviewScheduleContainer,
  ViewContainer,
  Title,
  InterviewText,
  InterviewButton,
} from "../components/Interview.styles";

export const InterviewScheduleScreen = ({ navigation }) => {
  return (
    <InterviewScheduleContainer>
      <Spacer position="bottom" size="large">
        <Title>All your assessments at a glance</Title>
      </Spacer>

      <Search />

      <ViewContainer>
        <InterviewText>Upcoming assessments</InterviewText>
      </ViewContainer>

      <Spacer position="bottom" size="large">
        <InterviewButton onPress={() => navigation.navigate("InterviewChat")}>
          Go to Interview Chat
        </InterviewButton>
      </Spacer>
    </InterviewScheduleContainer>
  );
};
