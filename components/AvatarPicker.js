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
        const result = await ImagePicker.launchCameraAsync({
          cameraType: "front",
          allowsEditing: true,
        });

        if (result.canceled === true) {
          return;
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
            height: 120,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {selectedPicture && (
            <Pressable
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                backgroundColor: "white",
                padding: 3,
                borderWidth: 1,
                borderRadius: "50%",
                borderColor: colors.lightRed,
              }}
              onPress={() => {
                setSelectedPicture("null");
              }}
            >
              <Icons.Trash color={colors.lightGrey1} size="XS" />
            </Pressable>
          )}
          {selectedPicture ? (
            <Image
              source={{ uri: selectedPicture }}
              style={{
                height: 120,
                width: 120,
                borderRadius: "50%",
                borderColor: colors.lightRed,
                borderWidth: 2,
              }}
            ></Image>
          ) : (
            <Icons.User color={colors.lightGrey2} />
          )}
        </View>
        <View
          style={{
            justifyContent: "space-around",
            // padding: 20,
            // borderWidth: 1,
          }}
        >
          <Pressable onPress={getPermissionAndGetPicture}>
            <Icons.Images size="S" color={colors.lightGrey1} />
          </Pressable>

          <Pressable onPress={getPermissionAndTakePicture}>
            <Icons.TakePhoto size="S" color={colors.lightGrey1} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
