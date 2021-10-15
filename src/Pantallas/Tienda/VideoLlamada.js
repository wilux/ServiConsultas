import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import { Button, Image, ActivityIndicator } from "react-native-elements";

export default function Videollamada(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const { route } = props;

  const videoLlamada = async () => {
    console.log("Video");
  };

  const Voltear = async () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.voltear}
        title="Cambiar camara"
        onPress={() => Voltear()}
      ></Button>
      <Camera style={styles.camera} type={type}></Camera>

      {/* <View style={{ marginLeft: 5 }}>
        <Image
          source={{
            uri: "https://support.content.office.net/en-us/media/b0dd61fa-29d8-45b7-a6a5-7e89d2f0acb1.png",
          }}
          style={{ width: 300, height: 300 }}
        />
      </View> */}

      <View style={styles.rowicon}>
        <Button
          buttonStyle={styles.btn_videollamada}
          title="Iniciar"
          onPress={() => videoLlamada()}
        ></Button>
        <Button
          buttonStyle={styles.btn_rechazar}
          title="Finalizar"
          onPress={() => Colgar()}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    //flex: 1,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  codigo: {
    backgroundColor: "#22A327",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  detalle: {
    backgroundColor: "#075e54",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  aviso: {
    backgroundColor: "#636363",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "System",
    color: "#fff",
  },
  rowicon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  btn_videollamada: {
    marginTop: 10,
    marginBottom: 30,
    margin: 20,
    width: 150,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "center",
  },
  voltear: {
    marginTop: 10,
    marginBottom: 30,
    margin: 20,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 10,
    alignSelf: "center",
  },
  btn_rechazar: {
    marginTop: 10,
    marginBottom: 30,
    width: 150,
    backgroundColor: "#FFC4D8",
    borderRadius: 10,
    alignSelf: "center",
  },
});
