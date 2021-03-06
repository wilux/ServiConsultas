import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ListarNotificaciones, actualizarRegistro } from "../../Utils/Acciones";
import moment from "moment/min/moment-with-locales";
import { Button } from "react-native";

export default function Notificaciones() {
  const [notificaciones, setnotificaciones] = useState(null);
  const [mensaje, setmensaje] = useState("Cargando..");
  const [usuario, setusuario] = useState("");

  const navigation = useNavigation();
  moment.locale("es");
  useEffect(() => {
    (async () => {
      const consulta = await ListarNotificaciones();
      if (consulta.statusresponse) {
        setnotificaciones(consulta.data);
      } else {
        setmensaje("No se encontraron mensajes");
      }
    })();
  }, []);

  if (!notificaciones) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#25d366" }}>
          {mensaje}
        </Text>
      </View>
    );
  }

  return (
    notificaciones && (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <FlatList
          data={notificaciones}
          renderItem={(item) => (
            <Notificacion notificacion={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  );
}

function Notificacion(props) {
  const { notificacion, navigation } = props;

  const { mensaje, fechacreacion, sender, idTurno, serviciotitulo, id } =
    notificacion.item;

  const { displayName, photoURL, phoneNumber, email } = sender;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("contacto", {
          displayName,
          phoneNumber,
          photoURL,
          email,
          mensaje,
          idTurno,
          id,
        });
      }}
    >
      <View style={styles.container}>
        <View>
          <Avatar
            size="large"
            source={
              photoURL
                ? { uri: photoURL }
                : require("../../../assets/avatar.jpg")
            }
            rounded
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {displayName}
            <Text style={{ fontWeight: "normal" }}>
              {" "}
              ha solicitado un turno para el {mensaje}, para el servicio:
            </Text>
            <Text style={{ fontWeight: "bold" }}> {serviciotitulo}</Text> -{" "}
            <Text style={{ fontWeight: "normal" }}>
              {" "}
              {moment(fechacreacion.toDate()).startOf("hour").fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 60,
    borderBottomColor: "#bdbdbd",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
