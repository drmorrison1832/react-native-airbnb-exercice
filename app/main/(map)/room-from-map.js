import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

import axios from "axios";

import { ShowRoom } from "../../../components/Index";

import styles from "../../../assets/styles/styles";

export default function Room() {
  const { roomID } = useLocalSearchParams();

  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    setError(null);
    async function retrieveRoomData() {
      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" +
        roomID;

      try {
        const response = await axios.get(URL);

        setRoomData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
        setError(error?.message);
        setIsLoading(false);
      }
    }
    retrieveRoomData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.containers.fullScreen]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.containers.fullScreen]}>
        <Text style={styles.text.errorMessage}>{error?.message || error}</Text>
      </View>
    );
  }

  return <ShowRoom roomData={roomData} />;
}
