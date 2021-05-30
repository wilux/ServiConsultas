import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
  const [turnos, setTurnos] = useState(null);
  const [turnosnube, setTurnosNube] = useState([]);
  const usuario = ObtenerUsuario();

  useEffect(() => {
    (async () => {
      setEvents(await ListarMisTurnos());
    })();
  }, []);

  // const actulizarTurnos = async () => {
  //   setEvents(await ListarMisTurnos());
  //   console.log(events);
  //   //console.log(map)
  //   //guardarCambios();
  // };

  const borrar_Turnos = async () => {
    console.log("Borrando turnos...");
    await eliminarTodosTurno("Turnos");
    setTurnos(await ListarMisTurnos());
  };

  const AgregarTurno = async (date) => {
    console.log("A date has been picked: ", date);

    const title = "Turno de las " + date.getHours();

    setTurnos((turnos) => ({
      ...turnos,
      usuario: ObtenerUsuario().uid,
      estado: true,
      title: title,
      start: date.toString(),
      end: date.toString(),
      fechacreacion: new Date().toString(),
    }));

    if (turnos !== null) {
      setloading(true);
      console.log(turnos);
      const registrarFecha = await addRegistro("Turnos", turnos);
      if (registrarFecha.statusreponse) {
        setloading(false);
        //Alert.alert("Registro Exitoso", "El turno se habilito exitosamente");
        console.log("Registro Exitoso", "El turno se habilito exitosamente");
        setEvents(await ListarMisTurnos());
      } else {
        setloading(false);
        //Alert.alert("Registro Fallido", "El turno se guardo, vuelva a intentar");
        console.log("Registro Fallido");
        setEvents(await ListarMisTurnos());
      }
    } else {
      setEvents(await ListarMisTurnos());
      console.log("Es null");
      console.log(turnos);
    }
  };

  const borrarTurno = async (e) => {
    await eliminarTurno("Turnos", e.id);
    setEvents(await ListarMisTurnos());
  };

  // const guardarCambios = async () => {
  //   if (turnos !== null) {
  //     setloading(true);
  //     const registrarFecha = await addRegistro("Turnos", turnos);
  //     if (registrarFecha.statusreponse) {
  //       setloading(false);
  //       //Alert.alert("Registro Exitoso", "El turno se habilito exitosamente");
  //       console.log("Registro Exitoso", "El turno se habilito exitosamente");
  //     } else {
  //       setloading(false);
  //       //Alert.alert("Registro Fallido", "El turno se guardo, vuelva a intentar");
  //       console.log("Registro Fallido");
  //     }
  //   } else {
  //     console.log("Es null");
  //     console.log(turnos);
  //   }
  // };

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
          eventCellStyle={{ backgroundColor: "green" }}
          events={events}
          height={500}
          startAccessor="start"
          endAccessor="end"
          onPressCell={(date) => AgregarTurno(date)}
          onPressEvent={(e) => borrarTurno(e)}

          // onPressEvent={(e) => {
          //   Alert.alert(
          //     "Eliminar Turno",
          //     "¿Estás seguro que deseas eliminar el turno",
          //     [
          //       {
          //         style: "default",
          //         text: "Confirmar",
          //         onPressEvent: async (e) => {
          //           console.log(e.id);
          //           setTurnos(await ListarMisTurnos());
          //         },
          //       },
          //       {
          //         style: "default",
          //         text: "Salir",
          //       },
          //     ]
          //   );
          // }}
        />
      </View>

      {/* <Button
        title="Actualizar Turnos"
        buttonStyle={styles.btn_turnos}
        onPress={actulizarTurnos}
      /> */}

      <Button
        title="Borrar Todo"
        buttonStyle={styles.btn_borrar}
        onPress={borrar_Turnos}
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
