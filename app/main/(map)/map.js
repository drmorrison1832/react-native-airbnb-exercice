import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import * as Location from "expo-location";

import axios from "axios";

import styles from "../../../assets/styles/styles";

import { Icons, MapMarker } from "../../../components/Index";

export default function ArroundMe() {
  console.log("Rendering ArroundMe");
  console.log(
    "type of MapView.animateToRegion is",
    typeof MapView.animateToRegion
  );

  const [sourroundingRooms, setSourroundingRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  // Default position (Paris)
  const [latitude, setLatitude] = useState(48.866667);
  const [longitude, setLongitude] = useState(2.3333);
  const [latitudeDelta, setLatitudeDelta] = useState(0.025);
  const [longitudeDelta, setLongitudeDelta] = useState(0.025);
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    async function askLocationPermissionAndUpdateCoordinates() {
      console.log("askLocationPermission...");
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setUserCoordinates(location.coords);
        }
      } catch (error) {
        console.error(error?.message);
      }
    }
    askLocationPermissionAndUpdateCoordinates();
  }, []);

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
        console.error("retrieveSourroundingRooms error", error?.message);
        setError(error?.message);
        setIsLoading(false);
      }
    }
    retrieveSourroundingRooms();
  }, [latitude, longitude]);

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

  console.log("Rendering to coordinates", { latitude, longitude });
  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      }}
      showsUserLocation={true}
      onRegionChangeComplete={(coordinates) => {
        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);
        setLongitudeDelta(coordinates.longitudeDelta);
        setLatitudeDelta(coordinates.latitudeDelta);
        console.log("New coordinates set to", coordinates);
      }}
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
            onPress={() => {
              router.navigate({
                pathname: "./room-from-map",
                params: { roomID: room._id },
              });
            }}
          >
            <MapMarker />
          </Marker>
        );
      })}
      <Pressable
        style={{ position: "absolute", bottom: 10, right: 10 }}
        onPress={() => {
          console.log(
            "Setting coordinates to",
            userCoordinates.latitude,
            userCoordinates.longitude
          );

          setLatitude(userCoordinates.latitude);
          setLongitude(userCoordinates.longitude);
          setLongitudeDelta(0.025);
          setLatitudeDelta(0.025);
        }}
      >
        <Icons.MyLocation size="S" />
      </Pressable>
    </MapView>
  );
}
