import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ListarMisServicios, eliminarServicio } from "../../Utils/Acciones";

export default function MiTienda() {
  const navigation = useNavigation();
  const [servicios, setservicios] = useState({});

  useEffect(() => {
    (async () => {
      setservicios(await ListarMisServicios());
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setservicios(await ListarMisServicios());
      })();
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {servicios.length > 0 ? (
        <FlatList
          data={servicios}
          renderItem={(item) => (
            <Servicio
              servicio={item}
              setservicios={setservicios}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderColor: "#25d366",
              borderWidth: 1,
              borderRadius: 60,
              alignSelf: "center",
            }}
          >
            <Icon
              type="material-community"
              name="hammer"
              size={100}
              color="#25d366"
              style={{ margin: 10 }}
            />
          </View>
        </View>
      )}
      <Icon
        name="plus"
        type="material-community"
        color="#1b94ce"
        containerStyle={styles.btncontainer}
        onPress={() => {
          navigation.navigate("add-service");
        }}
        reverse
      />
    </View>
  );
}

function Servicio(props) {
  const { servicio, setservicios, navigation } = props;
  const { descripcion, precio, id, imagenes, titulo } = servicio.item;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imagenes[0] }}
        style={{ width: 150, height: 150, borderRadius: 10, marginLeft: 10 }}
        resizeMethod="resize"
      />
      <View style={styles.viewmedio}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descripcion}>
          {descripcion.length > 20 ? descripcion.substring(0, 20) : descripcion}
          ...
        </Text>
        <Text style={styles.precio}> $ {parseFloat(precio).toFixed(2)}</Text>
        <View style={styles.iconbar}>
          <View style={styles.iconedit}>
            <Icon
              type="material-community"
              name="pencil-outline"
              color="#FFA000"
              style={styles.iconedit}
              onPress={() => {
                navigation.navigate("edit-service", { id });
              }}
            />
          </View>
          <View style={styles.icondelete}>
            <Icon
              type="material-community"
              name="trash-can-outline"
              color="#D32F2F"
              style={styles.icondelete}
              onPress={async () => {
                Alert.alert(
                  "Eliminar Servicio",
                  "¿Estás seguro que deseas eliminar el servicio",
                  [
                    {
                      style: "default",
                      text: "Confirmar",
                      onPress: async () => {
                        await eliminarServicio("Servicios", id);
                        setservicios(await ListarMisServicios());
                      },
                    },
                    {
                      style: "default",
                      text: "Salir",
                    },
                  ]
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btncontainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: 0.5,
    borderBottomColor: "#1b94ce",
    shadowColor: "#1b94ce",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.9,
  },
  viewmedio: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#075e54",
  },
  descripcion: {
    fontSize: 16,
    color: "#757575",
  },
  precio: {
    fontSize: 16,
    color: "#1b94ce",
  },
  iconbar: {
    marginTop: 20,
    flexDirection: "row",
  },
  icon: {
    borderWidth: 1,
    borderColor: "#25D366",
    padding: 5,
    borderRadius: 60,
    marginLeft: 20,
  },
  iconedit: {
    borderWidth: 1,
    borderColor: "#FFA000",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },

  icondelete: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
});
