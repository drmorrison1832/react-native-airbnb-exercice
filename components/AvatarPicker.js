import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import styles from "../assets/styles/styles";
import colors from "../assets/styles/colors";
import {
  Icons,
  ScreenTitle,
  ShortTextInput,
  LongTextInput,
  NavText,
  DefaultButton,
} from "../components/Index";

export default function AvatarPicker() {
  const [selectedPicture, setSelectedPicture] = useState(null);

  async function getPermissionAndGetPicture() {
    console.log("Getting user permission to acces photo library...");

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });

        if (result.canceled === true) {
          alert("Pas de photo sélectionnée");
        } else {
          setSelectedPicture(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error(error?.message);
    }
  }

  async function getPermissionAndTakePicture() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync();

        if (result.canceled === true) {
          alert("Pas de photo sélectionnée");
        } else {
          setSelectedPicture(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error(error?.message);
    }
  }

  return (
    <View style={styles.containers.default}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View
          style={{
            borderRadius: "50%",
            height: 100,
            width: 100,
            borderWidth: 2,
            borderColor: colors.lightRed,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedPicture ? (
            <Image
              source={{ uri: selectedPicture }}
              style={{ height: 100, width: 100 }}
            ></Image>
          ) : (
            <Icons.User color={colors.lightGrey2} />
          )}
        </View>
        <View
          style={{
            justifyContent: "space-around",
            // padding: 20,
            borderWidth: 1,
          }}
        >
          <Pressable onPress={getPermissionAndGetPicture}>
            <Text>Chose a photo</Text>
          </Pressable>

          <Pressable onPress={getPermissionAndTakePicture}>
            <Text>Take a photo</Text>
          </Pressable>

          <Pressable
            // style={{ position: "absolute", top: 0, left: 0 }}
            onPress={() => {
              setSelectedPicture("null");
            }}
          >
            <Text>Discard</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
