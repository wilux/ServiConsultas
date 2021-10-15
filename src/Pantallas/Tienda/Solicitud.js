import React from "react";

import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Solicitud(props) {
  const { route } = props;
  const navigation = useNavigation();

  const videoLlamada = async () => {
    console.log("Video");
    navigation.navigate("videollamada");
  };

  const iniciarChat = async () => {
    console.log("Chat");
    navigation.navigate("chat");
  };

  return (
    <View style={styles.container}>
      <View style={styles.codigo}>
        {/* <Avatar size="large" rounded style={styles.avatar} /> */}
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>CODIGO de Seguridad: ACC447</Text>
        </View>
      </View>

      <View style={styles.detalle}>
        {/* <Avatar size="large" rounded style={styles.avatar} /> */}
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>Pepe Confirmó el Turno para el día: </Text>
          <Text style={styles.text}>15/11/2021 a las 15:00 hs</Text>
          <Text style={styles.text}>
            Desde aquí podra contactarlo, solo el día pactado.
          </Text>
        </View>
      </View>

      <View style={styles.aviso}>
        {/* <Avatar size="large" rounded style={styles.avatar} /> */}
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>
            Si requiere una visita domiciliaria, recuerde verificar con el
            prestador el codigo de seguridad.
          </Text>
        </View>
      </View>

      <View style={styles.rowicon}>
        <Button
          buttonStyle={styles.btn_videollamada}
          title="Videollamada"
          onPress={() => videoLlamada()}
        ></Button>
        <Button
          buttonStyle={styles.btn_videollamada}
          title="Mensajería"
          onPress={() => iniciarChat()}
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
    backgroundColor: "red",
    borderRadius: 10,
    alignSelf: "center",
  },
});
