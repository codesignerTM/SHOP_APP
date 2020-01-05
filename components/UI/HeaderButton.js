import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color={Platform.OS === "android" ? "#fff" : Colors.primray}
    />
  );
};

//const styles = StyleSheet.create({});

export default CustomHeaderButton;
