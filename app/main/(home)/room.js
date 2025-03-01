import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  ScrollView,
  TurboModuleRegistry,
} from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import axios from "axios";

import { RoomHeader, RoomShowcasePicture } from "../../../components/Index";

import styles from "../../../assets/styles/styles";

export default function Room() {
  console.log("Rendering Home");

  const { roomID } = useLocalSearchParams();

  console.log(roomID);

  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  const [descriptionIsCollapsed, setDescriptionIsCollapsed] = useState(true);

  useEffect(() => {
    setError(null);
    async function retrieveRoomData() {
      console.log("Retrieving rooms data...");
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

  console.log(Object.keys(roomData));

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <RoomShowcasePicture
          URI={roomData.photos[0].url}
          height="300"
          price={roomData.price}
        />
        <View style={{ padding: 20 }}>
          <RoomHeader
            title={roomData.title}
            ratingValue={roomData.ratingValue}
            reviews={roomData.reviews}
            photoURI={roomData.user.account.photo.url}
          />
          <Pressable
            onPress={() => {
              setDescriptionIsCollapsed((prev) => !prev);
            }}
          >
            <Text
              style={styles.text.descriptionText}
              numberOfLines={descriptionIsCollapsed ? "3" : null}
            >
              {roomData.description}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
