import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";

const CartScreen = props => {
  const totalAmount = useSelector(state => state.cartItems.totalAMount);
  //const cartItems = useSelector(state => state.cartItems.items);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cartItems.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cartItems.items[key].productTitle,
        productPrice: state.cartItems.items[key].productPrice,
        quantity: state.cartItems.items[key].quantity,
        sum: state.cartItems.items[key].sum
      });
    }
    return transformedCartItems;
  });

  console.log("cartItems", cartItems);
  console.log("totalAmount", totalAmount);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summarytext}>
          Total:
          <Text style={styles.summarytextAmount}>
            £ {totalAmount.toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order now"
          color={Colors.secondary}
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summarytext: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  summarytextAmount: {
    color: Colors.primray
  }
});

export default CartScreen;
