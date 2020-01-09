import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "./CartItem";
import COlors from "../../constants/Colors";

const OrderItem = props => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>£ {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={COlors.primray} title="Show details" />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "#ccc",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888"
  }
});

export default OrderItem;
