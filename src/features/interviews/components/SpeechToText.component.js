import React, { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";
import { Button, View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const SpeechToText = ({ onResult }) => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAvailable, setIsAvailable] = useState();

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = (err) => setError(err.error);
  Voice.onSpeechResults = (result) => setResult(result.value[0]);

  //   useEffect(() => {
  //     onResult(result);
  //   }, !isRecording);

  useEffect(() => {
    console.log(isAvailable);
  }, [isAvailable]);

  const startRecording = async () => {
    try {
      let voiceAvailable = await Voice.isAvailable();
      setIsAvailable(voiceAvailable);

      await Voice.start("en-US");
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    console.log("STOP RECORDING");
    try {
      await Voice.stop();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={isRecording ? "pulse" : null}
        duration={500}
        easing="ease-out"
        style={styles.animationContainer}
      >
        <Button
          title={isRecording ? "Stop" : "Start"}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  animationContainer: {
    marginBottom: 20,
  },
  resultText: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default SpeechToText;
