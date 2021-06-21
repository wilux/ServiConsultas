import React, { useState, useEffect, useCallback } from "react";

import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  actualizarRegistro,
  addRegistro,
  obternerRegistroxID,
  setMensajeNotificacion,
  sendPushNotification,
  ObtenerUsuario,
} from "../../Utils/Acciones";
import { size } from "lodash";
import Loading from "../../Componentes/Loading";
export default function Contacto(props) {
  const { route } = props;
  const {
    displayName,
    phoneNumber,
    photoURL,
    email,
    mensaje,
    idTurno,
    id,
    usuario,
  } = route.params;
  const [estadoTurno, setEstadoTurno] = useState(false);
  const [servicio, setservicio] = useState({});
  const [loading, setloading] = useState(false);
  const [isVisible, setisvisible] = useState(false);
  const navigation = useNavigation();
  const [mensaje2, setmensaje] = useState("");
  const [expopushtoken, setexpopushtoken] = useState("");

  useEffect(() => {
    (async () => {
      setservicio((await obternerRegistroxID("Servicios", id)).data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(servicio) > 0) {
        const resultado = (
          await obternerRegistroxID("Usuarios", servicio.usuario)
        ).data;

        setexpopushtoken(resultado.token);
        setnombrevendedor(resultado.displayName);
        setphotovendedor(resultado.photoURL);
        setphonenumber(resultado.phoneNumber);
        setEvents(await ListarSusTurnos(servicio.usuario));
        console.log(events);
      }
    })();
  }, [servicio]);

  const confirmarTurno = async () => {
    setEstadoTurno(false);
    console.log("el id es: " + id);
    const turno = {
      estado: estadoTurno,
    };

    const registrarservicio = await actualizarRegistro(
      "Turnos",
      idTurno,
      turno
    );

    const actualizarNotificacion = async () =>
      await actualizarRegistro("Notificaciones", id, {
        visto: 1,
      });

    if (registrarservicio.statusreponse) {
      setloading(false);
      actualizarNotificacion();
      enviarConfirmacion();
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

  const enviarConfirmacion = async () => {
    const notificacion = {
      sender: ObtenerUsuario().uid,
      receiver: "El que recibe",
      mensaje,
      fechacreacion: new Date(),
      //servicioid: servicio.id,
      idTurno: idTurno,
      //serviciotitulo: servicio.titulo,
      visto: 0,
    };

    const resultado = await addRegistro("Notificaciones", notificacion);
    if (resultado.statusreponse) {
      const mensajenotificacion = setMensajeNotificacion(
        expopushtoken,
        `Turno confirmado `,
        { data: "Prospecto Interesado" }
      );

      const respuesta = await sendPushNotification(mensajenotificacion);
      setloading(false);
      setisvisible(false);

      if (respuesta) {
        Alert.alert(
          "Acción realizada correctamente",
          `Se ha enviado la confirmación`,
          [
            {
              style: "cancel",
              text: "Entendido",
              onPress: () => setisvisible(false),
            },
          ]
        );
        setmensaje("");
      } else {
        Alert.alert(
          "Error",
          "Se ha producido un error al enviar la confirmación, favor intentelo nuevamente  ",
          [
            {
              style: "cancel",
              text: "Entendido",
            },
          ]
        );
        setloading(false);
      }
    }
  };

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
