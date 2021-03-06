import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, Alert } from "react-native";
import CodeInput from "react-native-code-input";
import Loading from "../../Componentes/Loading";
import {
  confirmarcodigo,
  obtenerToken,
  ObtenerUsuario,
  addRegistroEspecifico,
} from "../../Utils/Acciones";

export default function ConfirmarNumero(props) {
  const { route } = props;
  const { verificationid } = route.params;

  const [loading, setloading] = useState(false);

  const confirmarCodigoSMS = async (code) => {
    setloading(true);
    const resultado = await confirmarcodigo(verificationid, code);
    console.log(resultado);
    if (resultado) {
      const token = await obtenerToken();
      const { uid, displayName, photoURL, email, phoneNumber } =
        ObtenerUsuario();

      const proveedor = "true";

      const registro = await addRegistroEspecifico("Usuarios", uid, {
        token,
        displayName,
        photoURL,
        email,
        phoneNumber,
        fechacreacion: new Date(),
        proveedor,
        usuario: ObtenerUsuario().uid,
      });

      setloading(false);
    } else {
      Alert.alert("Error", "Favor válidar el código introducido", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
      setloading(false);
    }
    //1. Obtener token móvil para push notification
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.imglogo}
      />
      <Text style={styles.titulo}>
        Favor revise su sms e introduzca los códigos de confirmación
      </Text>
      inputComponent={() => TextInput}
      <CodeInput
        activeColor="#fff"
        inactiveColor="#fff"
        autoFocus={true}
        inputPosition="center"
        size={50}
        codeLength={6}
        containerStyle={{ marginTop: 30 }}
        codeInputStyle={{ borderWidth: 1.5 }}
        onFulfill={(code) => {
          confirmarCodigoSMS(code);
        }}
        secureTextEntry
      />
      <Loading isVisible={loading} text="Favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b94ce",
    paddingHorizontal: 20,
  },
  imglogo: {
    width: 106,
    height: 106,
    alignSelf: "center",
    marginTop: 20,
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginVertical: 20,
  },
});
