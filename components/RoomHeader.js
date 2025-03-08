import { View, Text, Image } from "react-native";

import Rating from "./Rating";

import styles from "../assets/styles/index";

export default function RoomHeader({ title, ratingValue, reviews, photoURI }) {
  return (
    <View style={styles.containers.flatListDetailsContainer}>
      <View style={styles.containers.flatListRoomTextContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.text.searchResults.roomTitle}
        >
          {title}
        </Text>
        <Rating ratingValue={ratingValue} reviews={reviews} />
      </View>
      <Image
        source={{
          uri: photoURI,
        }}
        style={{ height: 70, width: 70, borderRadius: "50%" }}
        resizeMode="contain"
      />
    </View>
  );
}
