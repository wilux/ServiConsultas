import React, { useState, useEffect, useCallback } from "react";

import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { actualizarRegistro, ObtenerUsuario } from "../../Utils/Acciones";
import Loading from "../../Componentes/Loading";
export default function Contacto(props) {
  const { route } = props;
  const { displayName, phoneNumber, photoURL, email, mensaje, idTurno } =
    route.params;
  const [estadoTurno, setEstadoTurno] = useState(false);
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const confirmarTurno = async () => {
    setEstadoTurno(false);

    const turno = {
      estado: estadoTurno,
    };

    const registrarproducto = await actualizarRegistro(
      "Turnos",
      idTurno,
      turno
    );

    if (registrarproducto.statusreponse) {
      setloading(false);
      Alert.alert("Confirmación de turno", "El turno se ha confirmado.", [
        {
          style: "cancel",
          text: "Aceptar",
          // onPress: () => navigation.navigate("turno"),
        },
      ]);
    } else {
      setloading(false);

      Alert.alert(
        "Confirmación de turno",
        "Ha ocurrido un error al confirmar el turno, vuelva a intentar.",
        [
          {
            style: "cancel",
            text: "Aceptar",
          },
        ]
      );
    }
  };

  const mensaje2 = `Hola, ${displayName}. Te escribo de ServiConsultas, para confirmar el turno. `;
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Avatar
          size="large"
          source={
            photoURL ? { uri: photoURL } : require("../../../assets/avatar.jpg")
          }
          rounded
          style={styles.avatar}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>
            {displayName} está solicitando un turno
          </Text>
          <Text style={styles.text}>para el día {mensaje}.</Text>
        </View>
      </View>

      <View style={styles.rowicon}>
        <Button
          buttonStyle={styles.btn_confirmar}
          title="Confirmar"
          onPress={() => confirmarTurno()}
        ></Button>
        <Button
          buttonStyle={styles.btn_rechazar}
          title="Rechazar"
          onPress={() => console.log("Rechazar")}
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
  avatar: { width: 50, height: 50 },
  panel: {
    backgroundColor: "#075e54",
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
  btn_confirmar: {
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
