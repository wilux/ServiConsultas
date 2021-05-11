import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../Pantallas/Perfil/Perfil";
import Turno from "../Pantallas/Turno/Turno";

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Perfil}
        name="perfil"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Turno}
        name="turno"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
