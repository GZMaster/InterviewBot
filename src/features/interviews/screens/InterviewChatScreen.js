import React, { useState, useEffect, useRef } from "react";
import * as Speech from "expo-speech";
import { getToken } from "../../../services/authentication/token.service";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  InterviewChatContainer,
  CenterImage,
  ChatArea,
  ReplyMessage,
  MessageInput,
  SendButton,
} from "../components/Interview.styles";
import Image from "../components/Image.component";

export const InterviewChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [resetAnimation, setResetAnimation] = useState(false);

  useEffect(() => {
    speak(replyText);

    // Cleanup function
    return () => {
      // Stop the animation when the component unmounts or when replyText changes
      setResetAnimation(false);
    };
  }, [replyText]);

  useEffect(() => {
    if (numberOfMessages > 5 && !resetAnimation) {
      getScore().then(() => {
        setTimeout(() => {
          navigation.goBack();
        }, 10000);
      });
    }
  }, [numberOfMessages]);

  const speak = (text) => {
    // Start speaking
    Speech.speak(text, {
      onDone: () => {
        // Animation should stop when speech is done
        setResetAnimation(false);
      },
      onStopped: () => {
        // Animation should stop when speech is stopped
        setResetAnimation(false);
      },
    });

    // Animation should start when speech begins
    setResetAnimation(true);
  };

  const sendTextMessage = async () => {
    try {
      const token = await getToken();

      await fetch(
        "https://interview-server.cyclic.cloud/api/v1/chats/sendText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: messageText,
            roomId: "650842c3a796f5c9b11735e7",
          }),
        },
      )
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

      await fetch(
        "https://interview-server.cyclic.cloud/api/v1/chats/getScore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomId: "650842c3a796f5c9b11735e7",
          }),
        },
      )
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
      <ChatArea>
        <Image startAnimation={resetAnimation} />

        <ReplyMessage>{replyText}</ReplyMessage>
      </ChatArea>
      
      {numberOfMessages <= 5 ? (
        <>
          <MessageInput
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            placeholder="Type your message..."
          />

          <Spacer position="bottom" size="large">
            <SendButton onPress={sendTextMessage}>
              <Text>Send</Text>
            </SendButton>
          </Spacer>
        </>
      ) : (
        <Spacer position="bottom" size="large">
          <SendButton onPress={completeInterview}>
            <Text>Complete</Text>
          </SendButton>
        </Spacer>
      )}

      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Questions Asked: {numberOfMessages} / 5
      </Text>
    </InterviewChatContainer>
  );
};
