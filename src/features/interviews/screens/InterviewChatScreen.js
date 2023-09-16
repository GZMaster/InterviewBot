import React from "react";
import styled from "styled-components/native";
import { ScrollView, Image, Button } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const InterviewChatContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
`;

const BackButton = styled.Button`
  align-self: flex-start;
`;

const ChatArea = styled(ScrollView)`
  width: 100%;
  flex: 1;
`;

const CenterImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export const InterviewChatScreen = ({ navigation }) => {
  return (
    <InterviewChatContainer>
      <BackButton
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <CenterImage source={{ uri: "YOUR_IMAGE_URL" }} />

      <ChatArea>
        {/* Add your chat messages here */}
        <Text>Sample chat message</Text>
        {/* ... */}
      </ChatArea>

      <Spacer position="bottom" size="large">
        <Button
          title="Submit"
          onPress={() => {
            /* Add action code here */
          }}
        />
      </Spacer>
    </InterviewChatContainer>
  );
};
