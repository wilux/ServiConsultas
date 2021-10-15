import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tienda from "../Pantallas/Tienda/Tienda";
import Contacto from "../Pantallas/Tienda/Contacto";
import Solicitud from "../Pantallas/Tienda/Solicitud";
import VideoLlamada from "../Pantallas/Tienda/VideoLlamada";
import Chat from "../Pantallas/Tienda/Chat";
import Notificaciones from "../Pantallas/Tienda/Notificaciones";
import Detalle from "../Pantallas/Tienda/Detalle";

const Stack = createStackNavigator();

export default function TiendaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Tienda}
        name="tienda"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={Detalle}
        name="detalle"
        options={{
          headerTransparent: true,
          headerTintColor: "#1b94ce",
          title: "",
        }}
      />
      <Stack.Screen
        component={Notificaciones}
        name="mensajes"
        options={{
          title: "Notificaciones",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Contacto}
        name="contacto"
        options={{
          title: "Confirmación de Turno",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Solicitud}
        name="solicitud"
        options={{
          title: "Detalle de Solicitud",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={VideoLlamada}
        name="videollamada"
        options={{
          title: "Video Llamada",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Chat}
        name="chat"
        options={{
          title: "Mensajería",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
