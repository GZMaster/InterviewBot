import React from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { Search } from "../components/search.component";

const InterviewScheduleContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${(props) => props.theme.space[3]};
`;

export const InterviewScheduleScreen = () => {
  return (
    <SafeArea>
      <InterviewScheduleContainer>
        <Spacer size="large">
          <Text variant="label" size="large">
            All your assessments at a glance
          </Text>

          <Search />s
        </Spacer>
      </InterviewScheduleContainer>
    </SafeArea>
  );
};
