import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function ShopButton() {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => {
        navigation.navigate("mitienda");
      }}
    >
      <Icon name="publish" color="#fff" size={20} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d38225",
    alignItems: "center",
    justifyContent: "center",
    width: 62,
    height: 62,
    borderRadius: 36,
    top: 0,
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "#fff",
    padding: 20,
  },
});
