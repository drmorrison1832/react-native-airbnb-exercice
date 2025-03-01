import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

import axios from "axios";

import styles from "../../assets/styles/styles";

export default function ArroundMe() {
  console.log("Rendering ArroundMe");

  const [sourroundingRooms, setSourroundingRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    setError(null);
    async function retrieveSourroundingRooms() {
      console.log("Retrieving sourrounding rooms data...");
      const latitude = 48.8564449;
      const longitude = 2.4002913;
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
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      <Marker
        coordinate={{
          latitude: 2.3981123,
          longitude: 48.8613664,
        }}
        title="Test"
        description="Et sa description"
      />

      {/* {sourroundingRooms.map((room) => {
        return (
          <Marker
            key={room._id}
            coordinate={{
              latitude: room.location[0],
              longitude: room.location[1],
            }}
            title={room.title}
            description={room.description}
          />
        );
      })} */}
    </MapView>
  );
}
