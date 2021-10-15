import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import CustomDrawerContent from "../Componentes/CustomDrawerContent";
import TiendaStack from "./TiendaStack";
import PerfilStack from "./PerfilStack";
import MiTienda from "./MiTiendaStack";
import SolicitudesList from "../Pantallas/Tienda/SolicitudesList";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="tienda"
      tabBarOptions={{
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
        style: {
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          alignItems: "center",
          backgroundColor: "#1b94ce",
          paddingBottom: 5,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => mostrarIcono(route, color),
      })}
    >
      <Tab.Screen
        component={TiendaStack}
        name="Servicios"
        optiones={{ title: "Servicios" }}
      />

      {/* <Tab.Screen
        component={MiTienda}
        name="Mis Servicios"
        optiones={{ title: "Reservas" }}
      /> */}

      <Tab.Screen
        component={SolicitudesList}
        name="Solicitudes"
        optiones={{ title: "Solicitudes" }}
      />
      <Tab.Screen
        component={PerfilStack}
        name="Cuenta"
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
};

function mostrarIcono(route, color) {
  let iconName = "";

  switch (route.name) {
    case "Servicios":
      iconName = "expand-all";
      break;

    case "Cuenta":
      iconName = "shield-account";
      break;

    case "Solicitudes":
      iconName = "mail";
      break;

    case "Mis Servicios":
      iconName = "home-flood";
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={24} color={color} />
  );
}

export default function RutasAutenticadas() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="tienda"
          component={TabBar}
          options={{
            title: "Tienda",
            drawerIcon: () => {
              <Icon type="material-community" name="store" size={24} />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
