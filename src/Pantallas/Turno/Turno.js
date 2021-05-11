import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Avatar, CheckBox, Button, Overlay } from "react-native-elements";

import { ObtenerUsuario, addRegistroEspecifico } from "../../Utils/Acciones";
import Loading from "../../Componentes/Loading";
import Modal from "../../Componentes/Modal";
import { Calendar } from "react-native-calendars";

export default function Turno() {
  const [loading, setloading] = useState(false);
  const usuario = ObtenerUsuario();
  const [displayName, setdisplayName] = useState("");
  const [checked, setCheck] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const { displayName, phoneNumber, email } = usuario;
    setCheck(checked);
  }, []);

  const guardarCambios = () => {
    addRegistroEspecifico("Usuarios", usuario.uid, { proveedor: checked });
  };

  function CabeceraBG(props) {
    const { nombre } = props;
    //console.log(nombre);
    return (
      <View>
        <View style={styles.bg}>
          <Text style={{ color: "#fff", fontSize: 38, fontWeight: "bold" }}>
            {nombre}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <StatusBar backgroundColor="#1b94ce" />
      <CabeceraBG nombre={"Gestión de Turnos"} />

      <View
        styles={{
          backgroundColor: "red",
        }}
      >
        <View>
          <Calendar
            style={styles.calendario}
            current={Date()}
            minDate={Date()}
            onDayPress={(day) => {
              console.log("selected day", day),
                { toggleOverlay2 },
                { toggleOverlay };
            }}
            markedDates={{
              "2021-05-16": {
                selected: true,
                marked: true,
                selectedColor: "red",
              },
              "2021-05-17": {
                selected: true,
                marked: true,
                selectedColor: "green",
              },
              "2021-05-18": {
                selected: true,
                marked: true,
                selectedColor: "green",
              },
              "2021-05-10": {
                selected: true,
                marked: true,
                selectedColor: "red",
              },
              "2021-05-21": {
                selected: true,
                marked: true,
                selectedColor: "green",
              },
            }}
          ></Calendar>
        </View>
      </View>

      <Button
        title="Guardar"
        buttonStyle={styles.btn_turnos}
        onPress={() => console.log("Guardar")}
      />

      <Loading isVisible={loading} text="Favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    // height: 130,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: "#1b94ce",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarinline: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 0,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  confirmacion: {
    height: 200,
    width: "100%",
    alignItems: "center",
  },
  titulomodal: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  detalle: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1b94ce",
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  calendario: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  btn_turnos: {
    marginTop: 30,
    marginBottom: 30,
    width: 230,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "center",
  },
  btn_guardar: {
    marginBottom: 10,
    width: 230,
    //backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "center",
  },
});
