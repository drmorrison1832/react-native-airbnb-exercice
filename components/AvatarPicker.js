import { View, Text, Image, Pressable } from "react-native";

import * as ImagePicker from "expo-image-picker";

import styles from "../assets/styles/styles";
import colors from "../assets/styles/colors";
import Icons from "./Icons";

export default function AvatarPicker({ state, setState, currentPhotoURL }) {
  async function getPermissionAndGetPicture() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
        if (result.canceled === true) {
        } else {
          let newPhoto = {
            uri: result.assets[0].uri,
            mimeType: result.assets[0].mimeType,
            name: "my-pic." + result.assets[0].fileName.split(".").pop(),
          };

          setState(newPhoto);
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
          let newPhoto = {
            uri: result.assets[0].uri,
            mimeType: result.assets[0].mimeType,
            name: "my-pic." + result.assets[0].uri.split(".").pop(),
          };

          setState(newPhoto);
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
          }}
        >
          {
            // Show trash icon only if user picked a newPhoto.

            state && (
              <Pressable
                style={{
                  position: "absolute",
                  top: 7,
                  right: 7,
                  zIndex: 2,
                  backgroundColor: "white",
                  padding: 5,
                  borderWidth: 1,
                  borderRadius: "50%",
                  borderColor: colors.lightRed,
                }}
                onPress={() => {
                  setState(null);
                }}
              >
                <Icons.Trash color={colors.lightGrey1} size="XS" />
              </Pressable>
            )
          }
          <Pressable
            style={{
              position: "absolute",
              bottom: state ? 5 : 0,
              left: state ? 5 : -3,
              zIndex: 2,
              backgroundColor: "white",
              padding: 5,
              borderWidth: 1,
              borderRadius: "50%",
              borderColor: colors.lightRed,
            }}
            onPress={getPermissionAndGetPicture}
          >
            <Icons.Images size={state ? "XS" : "S"} color={colors.lightGrey1} />
          </Pressable>
          <Pressable
            style={{
              position: "absolute",
              bottom: state ? 5 : 0,
              right: state ? 5 : -3,
              zIndex: 2,
              backgroundColor: "white",
              padding: 5,
              borderWidth: 1,
              borderRadius: "50%",
              borderColor: colors.lightRed,
            }}
            onPress={getPermissionAndTakePicture}
          >
            <Icons.TakePhoto
              size={state ? "XS" : "S"}
              color={colors.lightGrey1}
            />
          </Pressable>

          {
            // Picture shown fall-trhough: newPhoto, currentPhoto, default Icon

            state ? (
              <Image
                source={{ uri: state.uri }}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: "50%",
                  borderColor: colors.lightRed,
                  borderWidth: 2,
                }}
              />
            ) : currentPhotoURL ? (
              <Image
                source={{ uri: currentPhotoURL }}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: "50%",
                  borderColor: colors.lightRed,
                  borderWidth: 2,
                }}
              />
            ) : (
              <View
                style={[
                  styles.containers.default,
                  {
                    height: 120,
                    width: 120,
                    borderRadius: "50%",
                    borderColor: colors.lightRed,
                    borderWidth: 2,
                  },
                ]}
              >
                <Icons.User color={colors.lightGrey2} />
              </View>
            )
          }
        </View>
      </View>
    </View>
  );
}
