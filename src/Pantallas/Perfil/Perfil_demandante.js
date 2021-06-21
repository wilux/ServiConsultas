import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Avatar, CheckBox, Button, Overlay } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { cargarImagenesxAspecto, validaremail } from "../../Utils/Utils";
import {
  subirImagenesBatch,
  ObtenerUsuario,
  addRegistroEspecifico,
  actualilzarPerfil,
  enviarconfirmacionphone,
  reautenticar,
  actualizaremailfirebase,
} from "../../Utils/Acciones";
import Loading from "../../Componentes/Loading";
import InputEditable from "../../Componentes/InputEditable";
import Modal from "../../Componentes/Modal";
import CodeInput from "react-native-code-input";
import FirebaseRecapcha from "../../Utils/FirebaseRecapcha";

export default function Perfil_demandante() {
  const navigation = useNavigation();
  const [imagenperfil, setimagenperfil] = useState("");
  const [loading, setloading] = useState(false);
  const usuario = ObtenerUsuario();
  const [displayName, setdisplayName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [editablename, seteditablename] = useState(false);
  const [editableemail, seteditableemail] = useState(false);
  const [editablephone, seteditablephone] = useState(false);
  const [verificationid, setverificationid] = useState("");
  const [isVisible, setisVisible] = useState(false);

  const recapcha = useRef();

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setimagenperfil(usuario.photoURL);
    const { displayName, phoneNumber, email } = usuario;
    setdisplayName(displayName);
    setphoneNumber(phoneNumber);
    setemail(email);
  }, []);

  const onChangeInput = (input, valor) => {
    switch (input) {
      case "displayName":
        setdisplayName(valor);
        break;
      case "email":
        setemail(valor);
        break;
      case "phoneNumber":
        setphoneNumber(valor);
        break;
    }
  };

  const obtenerValor = (input) => {
    switch (input) {
      case "displayName":
        return displayName;
        break;
      case "email":
        return email;
        break;
      case "phoneNumber":
        return phoneNumber;
        break;
    }
  };

  const guardarCambios = () => {
    // addRegistroEspecifico("Usuarios", usuario.uid, { proveedor: checked });
    console.log("Guardar ");
  };

  const actualizarValor = async (input, valor) => {
    switch (input) {
      case "displayName":
        console.log(await actualilzarPerfil({ displayName: valor }));
        addRegistroEspecifico("Usuarios", usuario.uid, { displayName: valor });
        console.log(usuario);

        break;
      case "email":
        if (valor !== usuario.email) {
          if (validaremail(valor)) {
            const verification = await enviarconfirmacionphone(
              phoneNumber,
              recapcha
            );
            if (verification) {
              setverificationid(verification);
              setisVisible(true);
            } else {
              alert("Ha ocurrido un error en la verificación");
              setemail(usuario.email);
            }
          }
        }
        break;
      case "phoneNumber":
        break;
    }
  };

  const ConfirmarCodigo = async (verificationid, code) => {
    setloading(true);
    const resultado = await reautenticar(verificationid, code);
    console.log(resultado);

    if (resultado.statusresponse) {
      const emailresponse = await actualizaremailfirebase(email);
      const updateregistro = await addRegistroEspecifico(
        "Usuarios",
        usuario.uid,
        { email: email }
      );

      console.log(emailresponse);
      console.log(updateregistro);

      setloading(false);
      setisVisible(false);
    } else {
      alert("Ha ocurrido un error al actualizar el correo");
      setloading(false);
      setisVisible(false);
    }
  };

  return (
    <View>
      <StatusBar backgroundColor="#1b94ce" />
      <CabeceraBG nombre={displayName} />
      <HeaderAvatar
        usuario={usuario}
        imagenperfil={imagenperfil}
        setimagenperfil={setimagenperfil}
        setloading={setloading}
      />
      <View>
        <View
          styles={{
            backgroundColor: "red",
          }}
        ></View>
      </View>
      <FormDatos
        onChangeInput={onChangeInput}
        obtenerValor={obtenerValor}
        editableemail={editableemail}
        editablephone={editablephone}
        editablename={editablename}
        seteditableemail={seteditableemail}
        seteditablephone={seteditablephone}
        seteditablename={seteditablename}
        actualizarValor={actualizarValor}
        guardarCambios={guardarCambios}
      />
      {/* <Text style={styles.label}>Mi disponibilidad</Text>
      <Button
        buttonStyle={styles.btn_turnos}
        title="Gestionar turnos"
        onPress={() => {
          navigation.navigate("turno");
        }}
      /> */}

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn_guardar}
        onPress={() => guardarCambios()}
      />

      <ModalVerification
        isVisibleModal={isVisible}
        setisVisibleModal={setisVisible}
        verificationid={verificationid}
        ConfirmarCodigo={ConfirmarCodigo}
      />
      <FirebaseRecapcha referencia={recapcha} />
      <Loading isVisible={loading} text="Favor espere" />
    </View>
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

function HeaderAvatar(props) {
  const { usuario, setimagenperfil, imagenperfil, setloading } = props;
  const { uid } = usuario;

  const cambiarfoto = async () => {
    const resultado = await cargarImagenesxAspecto([1, 1]);
    if (resultado.status) {
      setloading(true);
      const url = await subirImagenesBatch([resultado.imagen], "Perfil");
      const update = await actualilzarPerfil({ photoURL: url[0] });
      const response = await addRegistroEspecifico("Usuarios", uid, {
        photoURL: url[0],
      });

      if (response.statusreponse) {
        setimagenperfil(url[0]);
        setloading(false);
      } else {
        setloading(false);
        alert("Ha ocurrido un error al actualizar la foto de perfil");
      }
    }
  };
  return (
    <View style={styles.avatarinline}>
      <Avatar
        source={
          imagenperfil
            ? { uri: imagenperfil }
            : require("../../../assets/avatar.jpg")
        }
        style={styles.avatar}
        size="large"
        rounded
        showAccessory={true}
        onAccessoryPress={cambiarfoto}
      />
    </View>
  );
}

function FormDatos(props) {
  const {
    onChangeInput,
    obtenerValor,
    editableemail,
    editablename,
    editablephone,
    seteditableemail,
    seteditablename,
    seteditablephone,
    actualizarValor,
  } = props;
  return (
    <View>
      <InputEditable
        id="displayName"
        label="Nombre"
        obtenerValor={obtenerValor}
        placeholder="Nombre"
        onChangeInput={onChangeInput}
        editable={editablename}
        seteditable={seteditablename}
        actualizarValor={actualizarValor}
      />
      <InputEditable
        id="email"
        label="Correo"
        obtenerValor={obtenerValor}
        placeholder="ejemplo@ejemplo.com"
        onChangeInput={onChangeInput}
        editable={editableemail}
        seteditable={seteditableemail}
        actualizarValor={actualizarValor}
      />
      <InputEditable
        id="phoneNumber"
        label="Teléfono"
        obtenerValor={obtenerValor}
        placeholder="+00000000"
        onChangeInput={onChangeInput}
        editable={editablephone}
        seteditable={seteditablephone}
        actualizarValor={actualizarValor}
      />
    </View>
  );
}

function ModalVerification(props) {
  const { isVisibleModal, setisVisibleModal, ConfirmarCodigo, verificationid } =
    props;

  return (
    <Modal isVisible={isVisibleModal} setIsVisible={setisVisibleModal}>
      <View style={styles.confirmacion}>
        <Text style={styles.titulomodal}>Confirmar Código</Text>
        <Text style={styles.detalle}>
          Se ha enviado un código de verificación a su número de teléfono
        </Text>
        inputComponent={() => TextInput}
        <CodeInput
          secureTextEntry
          activeColor="#1b94ce"
          inactiveColor="#1b94ce"
          autoFocus={false}
          inputPosition="center"
          size={40}
          inputComponent={() => TextInput}
          containerStyle={{ marginTop: 30 }}
          codeInputStyle={{ borderWidth: 1.5 }}
          codeLength={6}
          onFulfill={(code) => {
            ConfirmarCodigo(verificationid, code);
          }}
        />
      </View>
    </Modal>
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
  btn_guardar: {
    marginTop: 30,
    width: 230,
    backgroundColor: "red",
    borderRadius: 10,
    alignSelf: "center",
  },
});
