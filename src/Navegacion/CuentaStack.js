import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConfirmarNumero from "../Pantallas/Cuenta/ConfirmarNumero";
import EnviarConfirmacion from "../Pantallas/Cuenta/EnviarConfirmacion";
import Registrar from "../Pantallas/Cuenta/Registrar";

const Stack = createStackNavigator();

export default function CuentaStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={EnviarConfirmacion}
          name="enviar-confirmacion"
          options={{
            title: "Confirma Tu Número De Teléfono",
            headerStyle: { backgroundColor: "#1b94ce" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          component={ConfirmarNumero}
          name="confirmar-movil"
          options={{
            title: "Confirmar Número",
            headerStyle: { backgroundColor: "#1b94ce" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen component={Registrar} name="register" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
