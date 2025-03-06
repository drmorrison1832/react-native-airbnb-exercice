import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "./Icons";
import colors from "../assets/styles/colors";

export default function RoomMap({
  latitude,
  longitude,
  deltaLatitude = 0.01,
  deltaLongitude = 0.01,
}) {
  return (
    <View style={{ height: "500" }}>
      <MapView
        // La MapView doit obligatoirement avoir des dimensions
        style={{ flexGrow: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: deltaLatitude,
          longitudeDelta: deltaLongitude,
        }}
        showsUserLocation={false}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}

          // title={marker.title}
          // description={marker.description}
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
      </MapView>
    </View>
  );
}
