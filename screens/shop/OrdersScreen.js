import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrderItem from "../../components/shop/Orderitem";
import * as ordersAction from "../../store/actions/orders";
import COlors from "../../constants/Colors";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersAction.fetchOrder()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <View style={styles.placeHolder}>
        <Text style={styles.ordersText}>
          No orders placed yet! Go to the products screen and start buying. :)
        </Text>
      </View>
    );
  }

  if (isLoading) {
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={COlors.primray} />
    </View>;
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readAbleDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          title="Shopping cart"
        ></Item>
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  placeHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20
  },
  ordersText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500"
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OrdersScreen;
