import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import * as Location from "expo-location";

import axios from "axios";

import styles from "../../../assets/styles/styles";
import colors from "../../../assets/styles/colors";

import Icon from "../../../components/Icons";

export default function ArroundMe() {
  console.log("Rendering ArroundMe");

  const [sourroundingRooms, setSourroundingRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  // Default position (Paris)
  const [latitude, setLatitude] = useState(48.866667);
  const [longitude, setLongitude] = useState(2.3333);

  useEffect(() => {
    async function askLocationPermission() {
      console.log("askLocationPermission...");
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          console.log("location =>", location); // console.log permettant de visualiser l'objet obtenu
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        }
      } catch (error) {
        console.error(error?.message);
      }
    }
    askLocationPermission();
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

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }}
      showsUserLocation={true}
      onRegionChangeComplete={(coordinates) => {
        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);
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
            <View
              style={{
                backgroundColor: colors.mainRed,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: "50%",
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon.Airbnb size="S" color={"white"} />
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
}
