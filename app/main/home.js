import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import axios from "axios";

import { Icons } from "../../components/Index";

import styles from "../../assets/styles/styles";
import colors from "../../assets/styles/colors";

export default function Home() {
  console.log("Rendering Home");

  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function retrieveRooms() {
      console.log("Retrieving rooms...");
      const URL =
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms";
      const response = await axios.get(URL);
      setRoomsData(response.data);
      setIsLoading(false);
    }
    retrieveRooms();
  }, []);

  function rateToStars({ rate, size }) {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(Number(rate))) {
        stars.push(
          <Icons.StarRateFull key={i} size={size} color={colors.starsDefault} />
        );
      } else if (i - rate <= 0.5) {
        console.log("i-rate =", i - rate);
        stars.push(
          <Icons.StarRateHalf key={i} size={size} color={colors.starsDefault} />
        );
      } else {
        stars.push(
          <Icons.StarRateEmpty
            key={i}
            size={size}
            color={colors.starsDefault}
          />
        );
      }
    }
    return stars;
  }

  if (isLoading) {
    return (
      <View style={[styles.containers.fullScreen]}>
        <ActivityIndicator size="large" />
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
            <View style={[styles.containers.flatListRoomContainer]}>
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                resizeMode="cover"
                style={{ height: 200, width: "100%" }}
              >
                <View style={styles.containers.priceBox}>
                  <Text style={styles.text.priceBoxText}>{item.price} €</Text>
                </View>
              </ImageBackground>

              <View style={styles.containers.inLineDefault}>
                <View style={styles.containers.flatListRoomTextContainer}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.text.searchResults.roomTitle}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.containers.searchResultsRoomRateBox}>
                    <Text style={styles.text.ratingStars}>
                      {rateToStars({
                        rate: Number(item.ratingValue),
                        size: styles.text.numberOfReviews.fontSize * 1.5,
                      })}
                    </Text>
                    <Text style={styles.text.numberOfReviews}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <Image
                  source={{
                    uri: item.user.account.photo.url,
                  }}
                  style={{ height: 70, width: 70, borderRadius: "50%" }}
                  resizeMode="contain"
                />
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.containers.separator}></View>;
        }}
      />
    </SafeAreaView>
  );
}

// console.log("isLoading is", isLoading);

{
  /* <FlatList
        data={roomsData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          <Text>{item.name}</Text>;
        }}
      /> */
}
