import { SafeAreaView, FlatList, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";

import axios from "axios";

import { RoomHeader, RoomShowcasePicture } from "../../../components/Index";

import styles from "../../../assets/styles/styles";

export default function Home() {
  console.log("Rendering Home");

  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    setError(null);
    async function retrieveRoomsData() {
      console.log("Retrieving rooms data...");
      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms";
      try {
        const response = await axios.get(URL);
        setRoomsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
        setError(error?.message);
        setIsLoading(false);
      }
    }
    retrieveRoomsData();
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
    <SafeAreaView style={[styles.containers.fullScreen]}>
      <FlatList
        data={roomsData}
        keyExtractor={(item) => String(item._id)}
        style={styles.containers.flatList}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                router.navigate({
                  pathname: "./room",
                  params: { roomID: item._id },
                });
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? "0.7" : 1,
                },
              ]}
            >
              <View style={[styles.containers.flatListRoomContainer]}>
                <RoomShowcasePicture
                  URI={item.photos[0].url}
                  height="200"
                  price={item.price}
                />
                <RoomHeader
                  title={item.title}
                  ratingValue={item.ratingValue}
                  reviews={item.reviews}
                  photoURI={item.user.account.photo.url}
                />
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.containers.separator}></View>;
        }}
      />
    </SafeAreaView>
  );
}
