import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { validaremail } from "../../Utils/Utils";
import { isEmpty } from "lodash";
import Loading from "../../Componentes/Loading";
import * as firebase from "firebase";
import { Alert } from "react-native";

export default function RestaurarPassword(props) {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  const recuperar = () => {
    if (isEmpty(email)) {
      Alert.alert("Error", "Debe introducir un email", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
      setloading(false);
    } else if (!validaremail(email)) {
      Alert.alert("Error", "Debe introducir un email válido", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
      setloading(false);
    } else {
      setloading(true);
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          alert(
            "Se envión un correo con instrucciones para recuperar su contraseña!"
          );
          setloading(false);
          navigation.navigate("login");
        })

        .catch(function (e) {
          setloading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "#25D366",
          borderBottomWidth: 2,
          width: 100,
        }}
      />
      <Text>Ingrese el email de su cuenta:</Text>
      <Input
        placeholder="Correo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#1b94ce",
        }}
        leftIcon={{
          type: "material-community",
          name: "account",
          color: "#1b94ce",
        }}
        onChangeText={(text) => {
          setemail(text);
        }}
        value={email}
      />
      <Button
        title="Recuperar"
        containerStyle={styles.btnentrar}
        buttonStyle={{ backgroundColor: "#25d366" }}
        onPress={() => recuperar()}
      />
      <Loading isVisible={loading} text="Favor Espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    width: "90%",
    marginTop: 20,
    height: 50,
  },
  btnentrar: {
    width: "90%",
    marginTop: 20,
  },
  txtcrearcuenta: {
    marginTop: 20,
  },
  cuenta: {
    color: "#1b94ce",
    fontFamily: "System",
    fontSize: 15,
  },
  txto: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    color: "#1b94ce",
  },
  btnlogin: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
