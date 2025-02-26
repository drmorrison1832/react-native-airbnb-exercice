import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import colors from "../../assets/styles/colors";

export default function MainLayout() {
  // useEffect(() => {}, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.mainRed,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <FontAwesome6 name="airbnb" size={24} color={color} />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="map"
        options={{
          title: "Arround me",
          tabBarIcon: ({ color }) => {
            return <FontAwesome size={24} name="map-marker" color={color} />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "My account",
          tabBarIcon: ({ color }) => {
            return <FontAwesome size={24} name="user" color={color} />;
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
