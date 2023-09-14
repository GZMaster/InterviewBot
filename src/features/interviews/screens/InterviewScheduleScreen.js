import React from "react";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const InterviewScheduleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InterviewScheduleScreen = () => {
  return (
    <SafeArea>
      <InterviewScheduleContainer>
        <Spacer size="large">
          <Text variant="label">Interview Schedule Screen</Text>
        </Spacer>
      </InterviewScheduleContainer>
    </SafeArea>
  );
};
