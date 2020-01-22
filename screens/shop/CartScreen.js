import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

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
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendorderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, totalAmount));
    setIsLoading(false);
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summarytext}>
          Total:
          <Text style={styles.summarytextAmount}>
            £ {Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading && <ActivityIndicator size="small" color={Colors.primray} />}
        <Button
          title="Order now"
          color={Colors.secondary}
          disabled={cartItems.length === 0}
          onPress={sendorderHandler}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletAble
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
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
