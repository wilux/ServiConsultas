import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon, Avatar, Image, Rating, Badge } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size } from "lodash";
import {
  ListarServicios,
  ObtenerUsuario,
  listarServiciosxCategoria,
  Buscar,
  ListarNotificaciones,
} from "../../Utils/Acciones";
import Busqueda from "../../Componentes/Busqueda";

export default function Tienda() {
  const navigation = useNavigation();
  const [servicelist, setservicelist] = useState([]);
  const [search, setsearch] = useState("");
  const [mensajes, setmensajes] = useState("Cargando...");
  const [notificaciones, setnotificaciones] = useState(0);
  const { photoURL } = ObtenerUsuario();
  const [categoria, setcategoria] = useState("");

  useEffect(() => {
    (async () => {
      setnotificaciones(0);
      setservicelist(await ListarServicios());

      const consulta = await ListarNotificaciones();
      if (consulta.statusresponse) {
        setnotificaciones(size(consulta.data));
        console.log(consulta);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setnotificaciones(0);
        setservicelist(await ListarServicios());
        const consulta = await ListarNotificaciones();
        if (consulta.statusresponse) {
          setnotificaciones(size(consulta.data));
        }
      })();
    }, [])
  );

  const cargarFiltroxCategoria = async (categoria) => {
    const listaservicios = await listarServiciosxCategoria(categoria);
    setservicelist(listaservicios);
    if (listaservicios.length === 0) {
      setmensajes("No se encontraron datos para la categoría " + categoria);
    }
  };

  const actualizarServicios = async () => {
    setservicelist(await ListarServicios());
  };

  return (
    <View style={styles.frame}>
      <StatusBar backgroundColor="#1b94ce" />
      <View style={styles.header}>
        <KeyboardAwareScrollView>
          <View style={styles.menu}>
            <Avatar
              rounded
              size="medium"
              source={
                photoURL
                  ? { uri: photoURL }
                  : require("../../../assets/avatar.jpg")
              }
              onPress={() => navigation.toggleDrawer()}
            />

            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />

            <View>
              <Icon
                type="material-community"
                name="bell-outline"
                color="#fff"
                size={30}
                onPress={() => {
                  navigation.navigate("mensajes");
                }}
              />
              {notificaciones > 0 && (
                <Badge
                  status="error"
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                  value={notificaciones}
                />
              )}
            </View>
          </View>
          <Busqueda
            setservicelist={setservicelist}
            actualizarServicios={actualizarServicios}
            setsearch={setsearch}
            search={search}
            setmensajes={setmensajes}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.categoriaview}>
        <View style={styles.titulocategoria}>
          <Text style={styles.categoriatext}> - CATEGORIAS - </Text>
          {categoria.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setcategoria("");
                actualizarServicios();
              }}
            >
              <Icon
                type="material-community"
                color="red"
                name="close"
                reverse
                size={10}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.categorialist}>
          <BotonCategoria
            categoriaboton="carpinteria"
            categoria={categoria}
            icon="hammer"
            texto="Carpintería"
            setcategoria={setcategoria}
            cargarFiltroxCategoria={cargarFiltroxCategoria}
          />
          <BotonCategoria
            categoriaboton="herreria"
            categoria={categoria}
            icon="anvil"
            texto="Herrería"
            setcategoria={setcategoria}
            cargarFiltroxCategoria={cargarFiltroxCategoria}
          />
          <BotonCategoria
            categoriaboton="plomeria"
            categoria={categoria}
            icon="gas-cylinder"
            texto="Plomería"
            setcategoria={setcategoria}
            cargarFiltroxCategoria={cargarFiltroxCategoria}
          />
          <BotonCategoria
            categoriaboton="electricista"
            categoria={categoria}
            icon="electric-switch"
            texto="Electricista"
            setcategoria={setcategoria}
            cargarFiltroxCategoria={cargarFiltroxCategoria}
          />
        </View>
      </View>

      {size(servicelist) > 0 ? (
        <FlatList
          data={servicelist}
          renderItem={(servicio) => (
            <Servicio servicio={servicio} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text> {mensajes}</Text>
      )}
    </View>
  );
}

function Servicio(props) {
  const { servicio, navigation } = props;

  const { titulo, descripcion, precio, imagenes, rating, id, usuario } =
    servicio.item;

  const { displayName, photoURL } = usuario;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("detalle", { id, titulo });
      }}
    >
      <Image source={{ uri: imagenes[0] }} style={styles.imgservicio} />
      <View style={styles.infobox}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={{ textAlign: "center" }}>
          {descripcion.substring(0, 50)}
        </Text>
        <Text style={styles.vendidopor}>Ofrecido por</Text>
        <View style={styles.avatarbox}>
          <Avatar
            source={
              photoURL
                ? { uri: photoURL }
                : require("../../../assets/avatar.jpg")
            }
            rounded
            size="large"
            style={styles.avatar}
          />
          <Text style={styles.displayName}> {displayName} </Text>
        </View>
        <Rating
          imageSize={15}
          startingValue={rating}
          style={{ paddingLeft: 40 }}
          readonly
        />
        <Text style={styles.precio}>{precio.toFixed(2)} </Text>
      </View>
    </TouchableOpacity>
  );
}

function BotonCategoria(props) {
  const {
    categoriaboton,
    categoria,
    icon,
    texto,
    setcategoria,
    cargarFiltroxCategoria,
  } = props;
  return (
    <TouchableOpacity
      style={
        categoria === categoriaboton
          ? styles.categoriahover
          : styles.categoriabtn
      }
      onPress={() => {
        setcategoria(categoriaboton);
        cargarFiltroxCategoria(categoriaboton);
      }}
    >
      <Icon
        type="material-community"
        name={icon}
        size={30}
        color={categoria === categoriaboton ? "#fff" : "#1b94ce"}
      />
      <Text
        style={
          categoria === categoriaboton ? styles.cattxthover : styles.cattxt
        }
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: "25%",
    width: "100%",
    backgroundColor: "#1b94ce",
  },
  menu: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -15,
  },
  card: {
    width: "100%",
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderBottomColor: "#1b94ce",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imgservicio: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  infobox: {
    paddingLeft: 10,
    alignItems: "center",
    flex: 1,
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#075e54",
  },
  vendidopor: {
    fontSize: 16,
    marginTop: 5,
    color: "#075e54",
    fontWeight: "700",
  },
  avatarbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  precio: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b94ce",
    alignSelf: "center",
  },
  categoriahover: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 7.0,
      height: -8.0,
    },
    shadowOpacity: 0.5,
    shadowColor: "#000",
    backgroundColor: "#25d366",
    borderRadius: 40,
    elevation: 1,
  },

  categoriabtn: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 7.0,
      height: -8.0,
    },
    shadowOpacity: 0.5,
    shadowColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 1,
  },
  cattxthover: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#fff",
  },
  cattxt: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#1b94ce",
  },
  categoriaview: {
    marginTop: 10,
  },
  titulocategoria: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriatext: {
    color: "#1b94ce",
    fontSize: 14,
    fontWeight: "bold",
  },
  categorialist: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 5,
  },
});
