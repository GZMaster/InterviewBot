import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";
import { getToken } from "../../../services/authentication/token.service";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  InterviewChatContainer,
  ChatNavigationContainer,
  ChatArea,
  ReplyMessage,
  MessageInput,
  SendButton,
  CenterImage,
} from "../components/Interview.styles";
import { IconButton, MD3Colors } from "react-native-paper";

export const InterviewChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [numberOfMessages, setNumberOfMessages] = useState(0);

  useEffect(() => {
    speak(replyText);
  }, [replyText]);

  useEffect(() => {
    if (numberOfMessages === 10) {
      getScore().then(() => {
        setTimeout(() => {
          navigation.goBack();
        }, 10000);
      });
    }
  }, [numberOfMessages]);

  const speak = (text) => {
    Speech.speak(text);
  };

  const sendTextMessage = async () => {
    try {
      const token = await getToken();

      fetch("https://interview-server.cyclic.cloud/api/v1/chats/sendText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: messageText,
          roomId: "650842c3a796f5c9b11735e7",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);

          setReplyText(data.data.botResponse.reply);
          setNumberOfMessages(numberOfMessages + 1);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getScore = async () => {
    try {
      const token = await getToken();

      fetch("https://interview-server.cyclic.cloud/api/v1/chats/getScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: "650842c3a796f5c9b11735e7",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response:", data);

          setReplyText(data.data.score);
          setNumberOfMessages(numberOfMessages + 1);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <InterviewChatContainer>
      <ChatNavigationContainer>
        <IconButton
          icon="arrow-left"
          iconColor={MD3Colors.white}
          size={20}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ChatNavigationContainer>

      <ChatArea>
        <CenterImage
          source={require("../../../assets/man.png")}
          style={{ width: 200, height: 200 }}
        />

        <ReplyMessage>{replyText}</ReplyMessage>

        <MessageInput
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
          placeholder="Type your message..."
        />
      </ChatArea>

      <Spacer position="bottom" size="large">
        <SendButton onPress={sendTextMessage}>
          <Text>Send</Text>
        </SendButton>
      </Spacer>
    </InterviewChatContainer>
  );
};
