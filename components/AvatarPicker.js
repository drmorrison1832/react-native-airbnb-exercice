import { View, Text, Image, Pressable } from "react-native";

import * as ImagePicker from "expo-image-picker";

import styles from "../assets/styles/styles";
import colors from "../assets/styles/colors";
import { Icons } from "../components/Index";

export default function AvatarPicker({ state, setState, currentPhotoURL }) {
  console.log("Avatar Picker");

  async function getPermissionAndGetPicture() {
    console.log("Accessing library...");
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        console.log("Persmission granted");
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
        console.log("ImagePicker.launchImageLibraryAsync result is", result);
        if (result.canceled === true) {
        } else {
          // console.log("result is", result);
          // console.log("mime type is", result.assets[0].mimeType);
          let newPhoto = {
            uri: result.assets[0].uri,
            mimeType: result.assets[0].mimeType,
            name: "my-pic." + result.assets[0].fileName.split(".").pop(),
          };

          // console.log("uri is", result.assets[0].uri);
          setState(newPhoto);
        }
      }
    } catch (error) {
      console.error(error?.message);
    }
  }

  async function getPermissionAndTakePicture() {
    console.log("Accessing camera...");
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        console.log("Persmission granted");
        const result = await ImagePicker.launchCameraAsync({
          cameraType: "front",
          allowsEditing: true,
        });
        console.log("ImagePicker.launchCameraAsync result is", result);
        if (result.canceled === true) {
          return;
        } else {
          console.log("result is", result);
          console.log("mime type is", result.assets[0].mimeType);
          let newPhoto = {
            uri: result.assets[0].uri,
            mimeType: result.assets[0].mimeType,
            name: "my-pic." + result.assets[0].uri.split(".").pop(),
          };

          // console.log("uri is", result.assets[0].uri);
          setState(newPhoto);
        }
      }
    } catch (error) {
      console.error(error?.message);
    }
  }

  console.log("state is", state);

  return (
    <View style={styles.containers.default}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View
          style={{
            height: 120,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            // overflow: "hidden",
          }}
        >
          {state && (
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
          )}
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

          {state ? (
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
          )}
        </View>
      </View>
    </View>
  );
}
