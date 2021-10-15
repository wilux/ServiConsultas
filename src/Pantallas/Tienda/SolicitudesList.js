import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Avatar, Button, ListItem } from "react-native-elements";
import Loading from "../../Componentes/Loading";
import { useNavigation } from "@react-navigation/native";

export default function SolicitudesList() {
  const [loading, setloading] = useState(false);

  const guardarCambios = () => {
    console.log("Guardar ");
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View>
          <StatusBar backgroundColor="#1b94ce" />
          <CabeceraBG nombre="Mis Solicitudes" />

          <View>
            <View
              styles={{
                backgroundColor: "red",
              }}
            ></View>
          </View>
          <FormDatos />
          <Loading isVisible={loading} text="Favor espere" />
        </View>
      </View>
    </ScrollView>
  );
}

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

function FormDatos() {
  const navigation = useNavigation();

  const verSolicitud = () => {
    navigation.navigate("solicitud");
  };

  const list = [
    {
      name: "Anibal Sych",
      avatar_url:
        "https://firebasestorage.googleapis.com/v0/b/serviconsultas-56100.appspot.com/o/Perfil%2Ff4faed4b-ae9e-412a-8a52-f539f9c385bf?alt=media&token=1ac738c0-0b14-4a2d-a400-4d424ba9d1bd",
      subtitle: "Solicitud Aceptada",
      icon: "done",
    },
    {
      name: "Matias Ruben",
      avatar_url:
        "https://images.clarin.com/2021/04/27/recomiendan-que-periodicamente-un-gasista___1UYHhM56h_720x0__1.jpg",
      subtitle: "Pendiente de Confirmación",
      icon: "info",
    },
    {
      name: "Luis Escar",
      avatar_url:
        "https://image.shutterstock.com/image-photo/portrait-friendly-painter-work-apartment-260nw-224697112.jpg",
      subtitle: "Solicitud Rechazada",
      icon: "warning",
    },
    {
      name: "Anibal Sych",
      avatar_url:
        "https://firebasestorage.googleapis.com/v0/b/serviconsultas-56100.appspot.com/o/Perfil%2Ff4faed4b-ae9e-412a-8a52-f539f9c385bf?alt=media&token=1ac738c0-0b14-4a2d-a400-4d424ba9d1bd",
      subtitle: "Solicitud Aceptada",
      icon: "done",
    },
    {
      name: "Matias Ruben",
      avatar_url:
        "https://images.clarin.com/2021/04/27/recomiendan-que-periodicamente-un-gasista___1UYHhM56h_720x0__1.jpg",
      subtitle: "Pendiente de Confirmación",
      icon: "info",
    },
    {
      name: "Luis Escar",
      avatar_url:
        "https://image.shutterstock.com/image-photo/portrait-friendly-painter-work-apartment-260nw-224697112.jpg",
      subtitle: "Solicitud Rechazada",
      icon: "warning",
    },
  ];
  return (
    <View>
      <View>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} style={styles.ratingImage} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              {/* <Icon name={l.icon} style={styles.ratingImage} /> */}
              <Button
                title="Ver Solicitud"
                buttonStyle={styles.btn_guardar}
                onPress={() => verSolicitud()}
              />
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      {/* <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn_guardar}
        onPress={() => guardarCambios()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 100,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
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
  btn_guardar: {
    // marginTop: 30,
    width: 230,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "center",
  },
});
