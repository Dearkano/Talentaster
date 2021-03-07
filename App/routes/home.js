import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { CameraPreview } from "../Component/camera";
import * as ImagePicker from "expo-image-picker";
import { Block, Button, theme, Text } from "galio-framework";

import materialTheme from "../Constants/Theme";
import Images from "../Constants/Image";
import * as ImageManipulator from "expo-image-manipulator";

let camera = null;
const { height, width } = Dimensions.get("screen");
export default function App({ navigation }) {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState("off");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const __loadLibrary = async () => {
    setLoading(true);
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    await __uploadImage(response);
    setLoading(false);
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __uploadImage = async (image) => {
    const photo = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [],
      { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
    );
    const file = {
      uri: photo.uri.replace("file://", ""),
      type: "multipart/form-data",
      name: "image.jpg",
    };
    const body = new FormData();
    body.append("file", file);
    try {
      //   const res = await fetch("http://100.64.1.76:7001/upload", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     body,
      //   });
      const res = await fetch("http://18.181.247.60:5010/postMobile", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body,
      });
      const data = await res.json();
      console.log(data);
      setCapturedImage(null);
      setPreviewVisible(false);
      setStartCamera(false);
      navigation.navigate("Result", { data, photo });
    } catch (e) {
      console.log(e);
      setCapturedImage(null);
      setPreviewVisible(false);
      setStartCamera(false);
      navigation.navigate("Home");
    }
  };

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync({ base64: true });
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };
  const __savePhoto = async () => {
    if (loading) return;
    setLoading(true);
    const photo = capturedImage;
    await __uploadImage(photo);
    setLoading(false);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "10%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === "off" ? "#000" : "#fff",
                      borderRadius: "50%",
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: "50%",
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {cameraType === "front" ? "🤳" : "📷"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <HomeScreen
          __loadLibrary={__loadLibrary}
          __startCamera={__startCamera}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const HomeScreen = ({ __startCamera, __loadLibrary }) => {
  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex center>
        <ImageBackground
          source={{ uri: Images.Onboarding }}
          style={{ height: height, width: width, marginTop: "-55%", zIndex: 1 }}
        />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block>
            <Block>
              <Text color="white" size={60}>
                Talentaster
              </Text>
            </Block>
            <Text size={16} color="rgba(255,255,255,0.6)">
              Make the world a better place
            </Text>
          </Block>
          <Block center row>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => __startCamera()}
            >
              Camera
            </Button>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => __loadLibrary()}
            >
              Library
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
