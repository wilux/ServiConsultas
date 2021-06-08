import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Calendar } from "react-native-big-calendar";
import {
  ObtenerUsuario,
  addRegistro,
  eliminarTodosTurno,
  eliminarTurno,
  ListarMisTurnos,
} from "../../Utils/Acciones";
import Loading from "../../Componentes/Loading";

export default function Turno() {
  const [loading, setloading] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "ejemplo",
      start: new Date(2021, 1, 30, 10, 0),
      end: new Date(2021, 1, 30, 10, 30),
    },
  ]);
  const [turnos, setTurnos] = useState({});
  const mes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const usuario = ObtenerUsuario();

  useEffect(() => {
    (async () => {
      setEvents(await ListarMisTurnos());
    })();
  }, []);

  const borrar_Turnos = async () => {
    console.log("Borrando turnos...");
    await eliminarTodosTurno("Turnos");
    setTurnos(await ListarMisTurnos());
  };

  const AgregarTurno = async (date) => {
    const title = "Turno de las " + date.getHours();

    if (Object.keys(turnos).length !== 0) {
      setloading(true);

      setTurnos((turnos) => ({
        ...turnos,
        usuario: ObtenerUsuario().uid,
        estado: true,
        title: title,
        start: date.toString(),
        end: date.toString(),
        fechacreacion: new Date().toString(),
      }));

      const registrarFecha = await addRegistro("Turnos", turnos);
      if (registrarFecha.statusreponse) {
        setloading(false);
        Alert.alert("Registro Exitoso", "El turno se habilito exitosamente");

        setEvents(await ListarMisTurnos());
      } else {
        setloading(false);
        Alert.alert(
          "Registro Fallido",
          "El turno se guardo, vuelva a intentar"
        );

        setEvents(await ListarMisTurnos());
      }
    } else {
      setTurnos({
        usuario: ObtenerUsuario().uid,
        estado: true,
        title: title,
        start: date.toString(),
        end: date.toString(),
        fechacreacion: new Date().toString(),
      });
      console.log(turnos);
    }
  };

  const borrarTurno = async (e) => {
    await eliminarTurno("Turnos", e.id);
    setEvents(await ListarMisTurnos());
  };

  function CabeceraBG(props) {
    const { nombre } = props;
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
      {/* {events.length > 0 ? ( */}
      <View
        styles={{
          backgroundColor: "red",
        }}
      >
        <Calendar
          eventCellStyle={(event) => {
            const backgroundColor = event.estado ? "green" : "red";

            return { backgroundColor };
          }}
          events={events}
          height={500}
          startAccessor="start"
          endAccessor="end"
          onPressCell={(date) => AgregarTurno(date)}
          onPressEvent={(e) =>
            e.estado
              ? Alert.alert(
                  "Eliminar turno disponible",
                  "¿Estás Seguro de que deseas eliminar el turno disponible?",
                  [
                    {
                      style: "default",
                      text: "Confirmar",
                      onPress: async () => {
                        borrarTurno(e);

                        setEvents(await ListarMisTurnos());
                      },
                    },
                    {
                      style: "default",
                      text: "Cancelar",
                    },
                  ]
                )
              : Alert.alert(
                  "Detalle del turno",
                  "El turno está dado para el día " +
                    e.start.getDate() +
                    " a las " +
                    e.start.getHours() +
                    " hs " +
                    " del mes " +
                    mes[e.start.getMonth()],
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

      <Button
        title="Borrar Todo"
        buttonStyle={styles.btn_borrar}
        onPress={() =>
          Alert.alert(
            "Eliminar turnos disponibles",
            "¿Estás seguro de que deseas eliminar todos los turnos disponibles?",
            [
              {
                style: "default",
                text: "Confirmar",
                onPress: async () => {
                  borrar_Turnos();

                  setEvents(await ListarMisTurnos());
                },
              },
              {
                style: "default",
                text: "Cancelar",
              },
            ]
          )
        }
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
  btn_turnos: {
    marginTop: 10,
    marginBottom: 30,
    width: 230,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "center",
  },
  btn_borrar: {
    marginTop: 10,
    marginBottom: 30,
    width: 230,
    backgroundColor: "red",
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
