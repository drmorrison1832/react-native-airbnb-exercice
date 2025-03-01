import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function RoomMap({ latitude, longitude, delta = 0.01 }) {
  return (
    <View style={{ height: "500" }}>
      <MapView
        // La MapView doit obligatoirement avoir des dimensions
        style={{ flexGrow: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          // title={marker.title}
          // description={marker.description}
        />
      </MapView>
    </View>
  );
}
