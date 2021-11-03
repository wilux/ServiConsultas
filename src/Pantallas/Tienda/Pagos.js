import React from "react";

import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Pagos(props) {
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
        <View style={{ marginLeft: 100 }}>
          <Text style={styles.text}>Gestión de Ingresos</Text>
        </View>
      </View>

      <View style={styles.detalle}>
        {/* <Avatar size="large" rounded style={styles.avatar} /> */}
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>Saldo disponible para retirar</Text>
          <View style={styles.aviso}>
            {/* <Avatar size="large" rounded style={styles.avatar} /> */}
            <View style={{ marginLeft: 50 }}>
              <Text style={styles.text}>Total ingresos: $58.700</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.rowicon}>
        <Button
          buttonStyle={styles.btn_videollamada}
          title="Retirar dinero"
          onPress={() => videoLlamada()}
        ></Button>
        <Button
          buttonStyle={styles.btn_videollamada}
          title="Medios de Pagos"
          onPress={() => videoLlamada()}
        ></Button>
      </View>
      <Button
        buttonStyle={styles.btn_rechazar}
        title="Pagos Pendientes"
        onPress={() => iniciarChat()}
      ></Button>
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
    width: 400,
    margin: 10,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
  },
  detalle: {
    backgroundColor: "#075e54",
    flexDirection: "row",
    alignItems: "center",
    width: 400,
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
