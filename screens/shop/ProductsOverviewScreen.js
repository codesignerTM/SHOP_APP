import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart";
import * as productAction from "../../store/actions/products";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(productAction.fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={Colors.primray} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.spinner}>
        <Text>No products found! Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primray}
            title="View details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primray}
            title="To cart"
            onPress={() => {
              dispatch(cartAction.addToCArt(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverViewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="shopping-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          title="Shopping cart"
        ></Item>
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverViewScreen;
