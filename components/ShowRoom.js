import { SafeAreaView, ScrollView, View, Text } from "react-native";

import RoomHeader from "./RoomHeader";
import RoomDescription from "./RoomDescription";
import RoomMap from "./RoomMap";
import RoomPicturesSwiper from "./RoomPicturesSwiper";

export default function ShowRoom({ roomData }) {
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
