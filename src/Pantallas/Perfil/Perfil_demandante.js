import React, { useState, useEffect, useCallback, StatusBar } from "react";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import {
  Input,
  Avatar,
  CheckBox,
  Button,
  Overlay,
  Icon,
} from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { concat } from "lodash";
import { ListarMiPerfil } from "../../Utils/Acciones";

export default function Perfil() {
  const navigation = useNavigation();
  const [checked, setCheck] = useState(false);
  const [perfiles, setperfiles] = useState({});

  useEffect(() => {
    (async () => {
      setperfiles(await ListarMiPerfil());
      // setCheck(perfiles.proveedor);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setperfiles(await ListarMiPerfil());
      })();
    }, [])
  );

  return (
    <FlatList
      data={perfiles}
      renderItem={({ item }) => (
        <View>
          {/* <CheckBox
            center
            title="Proveedor"
            checked={checked}
            onPress={() => setCheck(!checked)}
          /> */}
          {item.proveedor ? (
            <Text>Es Proveedor: True</Text>
          ) : (
            <Text>ID: False</Text>
          )}
          <Avatar
            // style={styles.avatar}
            size="large"
            rounded
            showAccessory={true}
            // onAccessoryPress={cambiarfoto}
            source={{
              uri: item.photoURL,
            }}
          ></Avatar>
          <Input placeholder={item.displayName} />
          <Input placeholder={item.email} />
          <Input placeholder={item.phoneNumber} />
        </View>
      )}
    />
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
