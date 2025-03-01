import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";

import axios from "axios";

import styles from "../../../assets/styles/styles";

export default function ArroundMe() {
  console.log("Rendering ArroundMe");

  const [sourroundingRooms, setSourroundingRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  const latitude = 48.866667;
  const longitude = 2.3333;

  useEffect(() => {
    setError(null);
    async function retrieveSourroundingRooms() {
      console.log("Retrieving sourrounding rooms data...");

      const query = `?latitude=${latitude}&longitude=${longitude}`;
      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around" +
        query;
      try {
        const response = await axios.get(URL);
        setSourroundingRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
        setError(error?.message);
        setIsLoading(false);
      }
    }
    retrieveSourroundingRooms();
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
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }}
      showsUserLocation={true}
    >
      {sourroundingRooms.map((room) => {
        return (
          <Marker
            key={room._id}
            coordinate={{
              longitude: room.location[0],
              latitude: room.location[1],
            }}
            title={room.title}
            description={room.description}
            // image={{ URI: room.photos[0].url }}
            onPress={() => {
              router.navigate({
                pathname: "./room-from-map",
                params: { roomID: room._id },
              });
            }}
          >
            {/* <Pressable
            ></Pressable> */}
            {/* <Image
              source={{
                uri: room.photos[0].url,
                }}
                style={{ height: 100, width: 100, borderRadius: 50 }}
                resizeMode="contain"
                /> */}
          </Marker>
        );
      })}
    </MapView>
  );
}
