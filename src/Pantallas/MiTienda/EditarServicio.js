import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Input,
  Image,
  Button,
  Icon,
  Avatar,
  AirbnbRating,
} from "react-native-elements";
import { map, size, filter, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../Componentes/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { cargarImagenesxAspecto } from "../../Utils/Utils";
import {
  subirImagenesBatch,
  actualizarRegistro,
  ObtenerUsuario,
  obternerRegistroxID,
} from "../../Utils/Acciones";

export default function EditarServicio(props) {
  const { route } = props;
  const { id } = route.params;
  const [titulo, settitulo] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [precio, setprecio] = useState(0.0);
  const [imagenes, setimagenes] = useState([]);
  const [categoria, setcategoria] = useState("");
  const [rating, setrating] = useState(0);
  const [errores, seterrores] = useState({});
  const [loading, setloading] = useState(false);
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Servicios", id);
      console.log(response);
      const { data } = response;
      settitulo(data.titulo);
      setdescripcion(data.descripcion);
      setprecio(data.precio);
      setimagenes(data.imagenes);
      setrating(data.rating);
      setcategoria(data.categoria);
    })();
  }, []);

  const editServicio = async () => {
    seterrores({});
    if (isEmpty(titulo)) {
      seterrores({ titulo: "El campo título es obligatorio" });
    } else if (isEmpty(descripcion)) {
      seterrores({ descripcion: "El campo descripcion es obligatorio" });
    } else if (!parseFloat(precio) > 0) {
      seterrores({ precio: "Introduzca un precio para el servicio" });
    } else if (isEmpty(categoria)) {
      Alert.alert(
        "Seleccione Categoría",
        "Favor seleccione una categoría para el servicio",
        [
          {
            style: "cancel",
            text: "Entendido",
          },
        ]
      );
    } else if (isEmpty(imagenes)) {
      Alert.alert(
        "Seleccione Imagenes",
        "Favor seleccione una imagen para su servicio",
        [
          {
            style: "cancel",
            text: "Entendido",
          },
        ]
      );
    } else {
      setloading(true);
      const urlimagenes = await subirImagenesBatch(
        imagenes,
        "ImagenesServicios"
      );
      const servicio = {
        titulo,
        descripcion,
        precio,
        usuario: ObtenerUsuario().uid,
        imagenes: urlimagenes,
        status: 0,
        fechacreacion: new Date(),
        rating,
        categoria,
      };

      const registrarservicio = await actualizarRegistro(
        "Servicios",
        id,
        servicio
      );

      if (registrarservicio.statusreponse) {
        setloading(false);
        Alert.alert(
          "Actualización completa",
          "El servicio se ha actualizado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("mitienda"),
            },
          ]
        );
      } else {
        setloading(false);

        Alert.alert(
          "Actualización Fallida",
          "Ha ocurrido un error al actualizar servicio",
          [
            {
              style: "cancel",
              text: "Aceptar",
            },
          ]
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View
        style={{
          borderBottomColor: "#25D366",
          borderBottomWidth: 2,
          width: 100,
          marginTop: 20,
          alignSelf: "center",
        }}
      />
      <Input
        placeholder="Título"
        onChangeText={(text) => settitulo(text)}
        inputStyle={styles.input}
        errorMessage={errores.titulo}
        value={titulo}
      />
      <Input
        placeholder="Descripcion"
        onChangeText={(text) => setdescripcion(text)}
        inputStyle={styles.textarea}
        errorMessage={errores.descripcion}
        multiline={true}
        value={descripcion}
      />
      <Input
        placeholder="Precio"
        onChangeText={(text) => setprecio(parseFloat(text))}
        inputStyle={styles.input}
        errorMessage={errores.precio}
        keyboardType="name-phone-pad"
        value={precio.toFixed(2)}
      />

      {/* <Text style={styles.txtlabel}>Calidad del Servicio o Servicio</Text>
      <AirbnbRating
        count={5}
        reviews={["Baja", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
        defaultRating={5}
        size={35}
        onFinishRating={(value) => {
          setrating(value);
        }}
      /> */}
      <Text style={styles.txtlabel}>Cargar Imágenes</Text>
      <SubirImagenes imagenes={imagenes} setimagenes={setimagenes} />
      <Text style={styles.txtlabel}>Asignar Categoria</Text>
      <Botonera categoria={categoria} setcategoria={setcategoria} />
      <Button
        title="Editar Servicio"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={editServicio}
      />
      <Loading isVisible={loading} text="Favor espere" />
    </KeyboardAwareScrollView>
  );
}

function SubirImagenes(props) {
  const { imagenes, setimagenes } = props;

  const removerimagen = (imagen) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estás Seguro de que quieres eliminar la imagen ?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setimagenes(filter(imagenes, (imagenURL) => imagenURL !== imagen));
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.viewimagenes}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {size(imagenes) < 5 && (
        <Icon
          type="material-community"
          name="plus"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={async () => {
            const resultado = await cargarImagenesxAspecto([1, 1]);
            console.log(resultado);
            if (resultado.status) {
              setimagenes([...imagenes, resultado.imagen]);
            }
          }}
        />
      )}

      {map(imagenes, (imagen, index) => (
        <Avatar
          key={index}
          style={styles.miniatura}
          source={{ uri: imagen }}
          onPress={() => {
            removerimagen(imagen);
          }}
        />
      ))}
    </ScrollView>
  );
}

function Botonera(props) {
  const { categoria, setcategoria } = props;
  return (
    <View style={styles.botonera}>
      <TouchableOpacity
        style={styles.btncategoria}
        onPress={() => {
          setcategoria("carpinteria");
        }}
      >
        <Icon
          type="material-community"
          name="hammer"
          size={24}
          color={categoria === "carpinteria" ? "#1b94ce" : "#757575"}
          reverse
        />
        <Text>Carpintería</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btncategoria}
        onPress={() => {
          setcategoria("herreria");
        }}
      >
        <Icon
          type="material-community"
          name="anvil"
          size={24}
          color={categoria === "herreria" ? "#1b94ce" : "#757575"}
          reverse
        />
        <Text>Herrería</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btncategoria}
        onPress={() => {
          setcategoria("herreria");
        }}
      >
        <Icon
          type="material-community"
          name="gas-cylinder"
          size={24}
          color={categoria === "plomeria" ? "#1b94ce" : "#757575"}
          reverse
        />
        <Text>Fontanería</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btncategoria}
        onPress={() => {
          setcategoria("plomeria");
        }}
      >
        <Icon
          type="material-community"
          name="electric-switch"
          size={24}
          color={categoria === "electricista" ? "#1b94ce" : "#757575"}
          reverse
        />
        <Text>Electricistas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    margin: 5,
    padding: 5,
    elevation: 3,
  },
  input: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#707070",
    marginTop: 20,
    paddingHorizontal: 20,
    height: 50,
  },
  textarea: {
    height: 150,
  },
  txtlabel: {
    fontSize: 20,
    fontFamily: "System",
    textAlign: "center",
    fontWeight: "bold",
    color: "#075e54",
  },
  btnaddnew: {
    backgroundColor: "#1b94ce",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  viewimagenes: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 150,
    width: 100,
    backgroundColor: "#e3e3e3",
    padding: 10,
  },
  miniatura: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  botonera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btncategoria: {
    justifyContent: "center",
    alignItems: "center",
  },
});
