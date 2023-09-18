import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, Image, Button } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

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
  const speak = (text) => {
    Speech.speak(text);
  };

  const [recording, setRecording] = useState();

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

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDgzODAzMmJmYzY1MGUzNTg0ZWU4YyIsImlhdCI6MTY5NTAzNzU3NCwiZXhwIjoxNjk1MTIzOTc0fQ.om08FPfDGDhDAQwc4JqycohpwdfsvM7fxhBU7z0MvRI";

    // Send the audio data to your backend
    fetch("https://interview-server.cyclic.cloud/api/v1/chats/sendMessage", {
      method: "POST",
      body: JSON.stringify({ data: audioData }),
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
        {/* ... */}
      </ChatArea>

      <Spacer position="bottom" size="large">
        <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
        {/* Display the transcription here */}
      </Spacer>
    </InterviewChatContainer>
  );
};
