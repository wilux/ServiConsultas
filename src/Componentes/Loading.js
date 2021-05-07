// import React from "react";
// import { StyleSheet, Text, View, Dimensions } from "react-native";
// import { Overlay } from "react-native-elements";
// import { Grid } from "react-native-animated-spinkit";

// export default function Loading(props) {
//   const { isVisible, text } = props;

//   return (
//     <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
//       <View style={styles.view}>
//         <Grid size={60} color="#1b94ce" />
//         {text && <Text style={styles.text}>{text}</Text>}
//       </View>
//     </Overlay>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     backgroundColor: "rgba(0,0,0, 0.6)",
//     borderWidth: 1,
//     borderColor: "#1b94ce",
//     borderRadius: 20,
//     width: "90%",
//     height: Dimensions.get("window").height / 2,
//   },
//   view: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "#1b94ce",
//     marginTop: 20,
//     fontWeight: "bold",
//     fontSize: 24,
//     textTransform: "uppercase",
//     textAlign: "center",
//   },
// });

import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
