import { SafeAreaView, ScrollView, View, Text } from "react-native";

import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import axios from "axios";

import RoomHeader from "./RoomHeader";
import RoomDescription from "./RoomDescription";
import RoomMap from "./RoomMap";
import RoomPicturesSwiper from "./RoomPicturesSwiper";

import styles from "../assets/styles/index";

export default function ShowRoom({ roomID }) {
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

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <RoomPicturesSwiper
          data={roomData.photos}
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
          <RoomDescription description={roomData.description} />
        </View>

        <RoomMap
          latitude={roomData.location[1]}
          longitude={roomData.location[0]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
