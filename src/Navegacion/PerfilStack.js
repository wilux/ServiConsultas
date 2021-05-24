import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Perfil_oferente from "../Pantallas/Perfil/Perfil_oferente";
import Perfil_demandante from "../Pantallas/Perfil/Perfil_demandante";
import Turno from "../Pantallas/Turno/Turno";
import { ListarMiPerfil } from "../Utils/Acciones";
const Stack = createStackNavigator();

export default function PerfilStack() {
  const [perfiles, setperfiles] = useState([]);
  let tipoPerfil = "";
  useEffect(() => {
    (async () => {
      setperfiles(await ListarMiPerfil());
    })();
  }, []);

  Object.values(perfiles).map((e) => (tipoPerfil = e.proveedor));
  console.log(tipoPerfil);

  return tipoPerfil ? (
    <Stack.Navigator>
      <Stack.Screen
        component={Perfil_oferente}
        name="perfil"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Turno}
        name="turno"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        component={Perfil_demandante}
        name="perfil"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
