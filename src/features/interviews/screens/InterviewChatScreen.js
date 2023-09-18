import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Image, Button } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";

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

const MessageInput = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`;

export const InterviewChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");

  const speak = (text) => {
    Speech.speak(text);
  };

  const [recording, setRecording] = useState();

  const sendTextMessage = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzODAzMmJmYzY1MGUzNTg0ZWU4YyIsImlhdCI6MTY5NTAzNzU3NCwiZXhwIjoxNjk1MTIzOTc0fQ.om08FPfDGDhDAQwc4JqycohpwdfsvM7fxhBU7z0MvRI";

      // Send the audio data to your backend
      fetch("https://interview-server.cyclic.cloud/api/v1/chats/sendText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: messageText,
          roomId: "650842c3a796f5c9b11735e7", // Replace with the current room's ID
        }),
      });

      const responseJson = await response.json();

      if (responseJson.status === "success") {
        // Handle successful message sending, e.g., clear the text input
        setMessageText("");
        // ... any other logic you'd like to implement upon successful sending
      } else {
        // Handle errors, e.g., display an error message to the user
        console.error("Error sending message:", responseJson.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    // Use Expo's FileSystem API to read the audio file as binary data
    const audioData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(uri);

    let formData = new FormData();

    formData.append("audio", {
      uri: uri,
      type: "audio/mp3", // or another suitable MIME type
      name: "audio.mp3", // or another suitable name
    });

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzODAzMmJmYzY1MGUzNTg0ZWU4YyIsImlhdCI6MTY5NTAzNzU3NCwiZXhwIjoxNjk1MTIzOTc0fQ.om08FPfDGDhDAQwc4JqycohpwdfsvM7fxhBU7z0MvRI";

    // Send the audio data to your backend
    fetch("https://interview-server.cyclic.cloud/api/v1/chats/sendMessage", {
      method: "POST",
      body: {
        audio: formData,
        roomId: "650842c3a796f5c9b11735e7",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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

        <MessageInput
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
          placeholder="Type your message..."
        />

        {/* ... */}
      </ChatArea>

      <Button
        title="Speak"
        onPress={() => {
          speak("Hello, I am Interview Bot. How can I help you?");
        }}
      />

      <Spacer position="bottom" size="large">
        {/* <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        /> */}

        <SendButton onPress={sendTextMessage}>
          <Text>Send</Text>
        </SendButton>

        {/* Display the transcription here */}
      </Spacer>
    </InterviewChatContainer>
  );
};
