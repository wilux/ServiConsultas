import React, { useState, useEffect } from "react";
import Loading from "../Componentes/Loading";
import RutasAutenticadas from "./RutasAutenticadas";
import RutasAutenticadasUser from "./RutasAutenticadasUser";
import CuentaStack from "./CuentaStack";
import { validarPhone } from "../Utils/Acciones";
import { ListarMiPerfil, ObtenerUsuario } from "../Utils/Acciones";

export default function SwitchNavigator() {
  const [phoneauth, setphoneauth] = useState(false);
  const [loading, setloading] = useState(true);
  const [tipoPerfil, setTipoPerfil] = useState(0);

  useEffect(() => {
    (async () => {
      setTipoPerfil(await ListarMiPerfil(ObtenerUsuario().uid));
    })();
    validarPhone(setphoneauth);
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando Configuración" />;
  } else {
    if (tipoPerfil == 1) {
      return phoneauth ? <RutasAutenticadas /> : <CuentaStack />;
    } else {
      return phoneauth ? <RutasAutenticadasUser /> : <CuentaStack />;
    }
  }
}
