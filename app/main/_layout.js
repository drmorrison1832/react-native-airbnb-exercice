import { Tabs, usePathname, router } from "expo-router";
import { Pressable } from "react-native";

import Icons from "../../components/Icons";
import colors from "../../assets/styles/colors";

export default function MainLayout() {
  console.log("Rendering MainLayout");

  const currentScreen = usePathname();
  console.log("currentScreen is", currentScreen);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.mainRed,
        headerShown: true,
        headerTintColor: colors.mainRed,
        headerLeft: () => {
          return currentScreen === "/main/room" ? (
            <Pressable
              onPress={() => {
                router.back();
              }}
              style={{ marginLeft: "5" }}
            >
              <Icons.CaretLeft size={25} color={colors.lightRed} />
            </Pressable>
          ) : null;
        },
        headerTitle: (props) => {
          return <Icons.Airbnb size="headerTitle" color={props.tintColor} />;
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
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
