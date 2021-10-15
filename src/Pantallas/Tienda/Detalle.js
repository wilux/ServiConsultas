import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Avatar, Icon, Input, Button, Rating } from "react-native-elements";
import {
  obternerRegistroxID,
  ObtenerUsuario,
  sendPushNotification,
  ListarSusTurnos,
  setMensajeNotificacion,
  addRegistro,
} from "../../Utils/Acciones";
import { enviarWhatsapp } from "../../Utils/Utils";
import { size } from "lodash";
import Loading from "../../Componentes/Loading";
import Carousel from "../../Componentes/Carousel";
import Modal from "../../Componentes/Modal";
import { Calendar } from "react-native-big-calendar";

export default function Detalle(props) {
  const { route } = props;
  const { id, titulo } = route.params;

  const [servicio, setservicio] = useState({});
  const [expopushtoken, setexpopushtoken] = useState("");
  const [nombrevendedor, setnombrevendedor] = useState("Nombre");
  const [photovendedor, setphotovendedor] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [idTurno, setIdTurno] = useState("");
  const [turnoSeleccionado, setturnoSeleccionado] = useState("");

  const [activeslide, setactiveslide] = useState(0);
  const [loading, setloading] = useState(false);
  const [isVisible, setisvisible] = useState(false);
  const usuarioactual = ObtenerUsuario();

  const [events, setEvents] = useState([
    {
      title: "ejemplo",
      start: new Date(2021, 1, 30, 10, 0),
      end: new Date(2021, 1, 30, 10, 30),
    },
  ]);

  // console.log(id);
  // console.log(titulo);

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

  function EnviarMensaje(props) {
    const {
      isVisible,
      setisVisible,
      nombrevendedor,
      avatarvendedor,
      mensaje,
      setmensaje,
      receiver,
      sender,
      token,
      servicio,
      setloading,
      nombrecliente,
    } = props;

    const enviarNotificacion = async () => {
      if (!mensaje) {
        Alert.alert("Validación", "Favor seleccionar un turno para confirmar", [
          {
            style: "default",
            text: "Entendido",
          },
        ]);
        setisvisible(false);
      } else {
        setloading(true);
        const notificacion = {
          sender: sender,
          receiver: receiver,
          mensaje,
          fechacreacion: new Date(),
          servicioid: servicio.id,
          idTurno: idTurno,
          serviciotitulo: servicio.titulo,
          visto: 0,
        };

        const resultado = await addRegistro("Notificaciones", notificacion);
        if (resultado.statusreponse) {
          const mensajenotificacion = setMensajeNotificacion(
            token,
            `Cliente Interesado - ${servicio.titulo}`,
            `${nombrecliente}, te ha enviado una solicitud de turno`,
            { data: "Prospecto Interesado" }
          );

          const respuesta = await sendPushNotification(mensajenotificacion);
          setloading(false);
          setisvisible(false);

          if (respuesta) {
            Alert.alert(
              "Acción realizada correctamente",
              `Se ha enviado la solicitud correctamente. Debe aguardar la aceptación por parte de ${nombrevendedor}`,
              [
                {
                  style: "cancel",
                  text: "Entendido",
                  onPress: () => setisVisible(false),
                },
              ]
            );
            setmensaje("");
          } else {
            Alert.alert(
              "Error",
              "Se ha producido un error al enviar la solicitud, favor intentelo nuevamente  ",
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
      }
    };

    return (
      <Modal isVisible={isVisible} setIsVisible={setisVisible}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
            borderRadius: 20,
          }}
        >
          <Avatar
            source={
              avatarvendedor
                ? { uri: avatarvendedor }
                : require("../../../assets/avatar.jpg")
            }
            style={styles.photovendor}
          />

          <Text style={{ color: "#075e54", fontSize: 18, fontWeight: "bold" }}>
            Estas solicitando un turno con {nombrevendedor}.
          </Text>

          <Input
            // placeholder="Deja un mensaje"
            multiline={true}
            inputStyle={styles.textArea}
            // onChangeText={(text) => {
            //   setmensaje(text);
            // }}
            editable={false}
            value={"Turno: " + "\n" + mensaje}
          />
          <Button
            title="Enviar solicitud"
            buttonStyle={styles.btnsend}
            containerStyle={{ width: "90%" }}
            onPress={enviarNotificacion}
          />
          <Button
            title="Cancelar"
            buttonStyle={styles.btncerrar}
            containerStyle={{ width: "90%" }}
            onPress={() => setisvisible(false)}
          />
        </View>
      </Modal>
    );
  }

  if (servicio.lenght !== 0) {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#1b94ce" />
        {/* <Carousel
          data={null}
          imagenes={servicio.imagenes}
          height={200}
          width={Dimensions.get("window").width}
          activeslide={activeslide}
          setactiveslide={setactiveslide}
        /> */}
        <View>
          <View style={styles.avatarbox}>
            <Avatar
              source={
                photovendedor
                  ? { uri: photovendedor }
                  : require("../../../assets/avatar.jpg")
              }
              //  containerStyle={{ flex: 1, marginLeft: 300, marginTop: 20 }}
              size="large"
              rounded
            />
          </View>

          <View style={styles.boxTop}>
            <Text style={styles.titulos}>{servicio.titulo}</Text>
            <Text style={styles.precio}>
              ${parseFloat(servicio.precio).toFixed(2)}
            </Text>

            <View>
              <Text style={styles.descripcion}>{servicio.descripcion}</Text>
              <Rating imageSize={20} startingValue={servicio.rating} readonly />
            </View>
          </View>
          <Text style={styles.subtitulo}>Disponibilidad del proveedor</Text>
          {/* Esto debe completarse dinamicamente segun la ocupacion del proveedor */}
          <View>
            <Calendar
              //eventCellStyle={{ backgroundColor: "green" }}
              eventCellStyle={(event) => {
                const backgroundColor = event.estado ? "green" : "red";
                console.log(event);
                return { backgroundColor };
              }}
              events={events}
              height={550}
              startAccessor="start"
              endAccessor="end"
              // onPressCell={(date) => handleConfirm(date)}
              onPressEvent={(e) =>
                e.estado
                  ? setmensaje(
                      //e.start
                      e.end.getDate() +
                        "/" +
                        Number(e.end.getMonth() + 1) +
                        "/" +
                        e.end.getFullYear() +
                        " a las " +
                        e.end.getHours() +
                        " horas"
                    ) &
                    setisvisible(true) &
                    setIdTurno(e.id)
                  : Alert.alert(
                      "¡Atención!",
                      "El día y horario seleccionado no esta disponible. ",
                      [
                        {
                          style: "cancel",
                          text: "Entendido",
                        },
                      ]
                    )
              }
            />
          </View>

          <EnviarMensaje
            isVisible={isVisible}
            setisVisible={setisvisible}
            nombrevendedor={nombrevendedor}
            avatarvendedor={photovendedor}
            mensaje={mensaje}
            setmensaje={setmensaje}
            receiver={servicio.usuario}
            sender={usuarioactual.uid}
            token={expopushtoken}
            servicio={servicio}
            setloading={setloading}
            nombrecliente={usuarioactual.displayName}
          />
          <Loading isVisible={loading} text="Enviando solicitud..." />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  boxsuperior: {
    backgroundColor: "#fff",
    marginTop: -50,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  titulos: {
    color: "#075e54",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginRight: 20,
    textAlign: "center",
  },
  subtitulo: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  precio: {
    marginBottom: -12,
    fontSize: 18,
    color: "#1b94ce",
    fontWeight: "bold",
    paddingLeft: 10,
    textAlign: "center",
  },
  descripcion: {
    fontWeight: "300",
    fontSize: 16,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#757575",
    textAlign: "center",
  },

  boxTop: {
    flex: 1,
    marginTop: -70,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarbox: {
    alignItems: "flex-end",
  },
  avatar: {
    width: 60,
    height: 60,
  },

  boxinternoavatar: {
    justifyContent: "center",
    flexDirection: "row",
  },
  displayname: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#075E54",
  },
  photovendor: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
  },
  btnsend: {
    backgroundColor: "#075e54",
  },
  btncerrar: {
    marginTop: 20,
    backgroundColor: "red",
  },
});
