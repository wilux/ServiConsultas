import React from "react";

import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button, Image } from "react-native-elements";

export default function Chat(props) {
  const { route } = props;

  const videoLlamada = async () => {
    console.log("Video");
  };

  const iniciarChat = async () => {
    console.log("Chat");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Avatar size="large" rounded style={styles.avatar} /> */}
        <View style={{ marginLeft: 5 }}>
          <TextInput value="Conectando..." style={styles.sala} />
          <TextInput value="Ingrese mensaje" style={styles.input} />
        </View>

        <View style={styles.rowicon}>
          <Button
            buttonStyle={styles.btn_videollamada}
            title="Enviar"
            onPress={() => videoLlamada()}
          ></Button>
          <Button
            buttonStyle={styles.btn_rechazar}
            title="Terminar"
            onPress={() => iniciarChat()}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 380,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  sala: {
    height: 500,
    width: 380,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
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
    fontSize: 16,
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
  btn_rechazar: {
    marginTop: 10,
    marginBottom: 30,
    width: 150,
    backgroundColor: "#FFC4D8",
    borderRadius: 10,
    alignSelf: "center",
  },
});
