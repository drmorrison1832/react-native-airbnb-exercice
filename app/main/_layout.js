import { Tabs } from "expo-router";

import Icons from "../../components/Icons";
import colors from "../../assets/styles/colors";

export default function MainLayout() {
  console.log("Rendering MainLayout");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.mainRed,
        headerShown: true,
        headerTintColor: colors.mainRed,
        headerTitle: (props) => {
          return <Icons.Airbnb size="headerTitle" color={props.tintColor} />;
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: (props) => {
            return <Icons.Airbnb size="tabBarIcon" color={props.color} />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="map"
        options={{
          title: "Arround me",
          tabBarIcon: (props) => {
            return <Icons.MapMarker size="tabBarIcon" color={props.color} />;
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "My account",
          tabBarIcon: (props) => {
            return <Icons.User size="tabBarIcon" color={props.color} />;
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
