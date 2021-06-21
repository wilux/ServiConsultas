import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MiTienda from "../Pantallas/MiTienda/MiTienda";
import EditarServicio from "../Pantallas/MiTienda/EditarServicio";
import AddServicio from "../Pantallas/MiTienda/AddServicio";

const Stack = createStackNavigator();

export default function MiTiendaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1b94ce" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        component={MiTienda}
        name="mitienda"
        options={{
          title: "Mis Servicios",
        }}
      />
      <Stack.Screen
        component={AddServicio}
        name="add-service"
        options={{
          title: "Agregar Nuevo Servicio",
          headerStyle: { backgroundColor: "#1b94ce" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={EditarServicio}
        name="edit-service"
        options={{
          title: "Editar Servicio",
        }}
      />
    </Stack.Navigator>
  );
}
