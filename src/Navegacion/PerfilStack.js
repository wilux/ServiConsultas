import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil_oferente from "../Pantallas/Perfil/Perfil_oferente";
import Perfil_demandante from "../Pantallas/Perfil/Perfil_demandante";
import Turno from "../Pantallas/Turno/Turno";
import Pagos from "../Pantallas/Tienda/Pagos";
import { ListarMiPerfil, ObtenerUsuario } from "../Utils/Acciones";
const Stack = createStackNavigator();

export default function PerfilStack() {
  const [tipoPerfil, setTipoPerfil] = useState(0);

  useEffect(() => {
    (async () => {
      setTipoPerfil(await ListarMiPerfil(ObtenerUsuario().uid));
    })();
  }, []);

  return tipoPerfil == 1 ? (
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
      <Stack.Screen
        component={Pagos}
        name="pago"
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
