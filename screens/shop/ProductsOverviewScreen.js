import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

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
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {
            dispatch(cartAction.addToCArt(itemData.item));
          }}
        >
          {itemData.item.title}
        </ProductItem>
      )}
    />
  );
};

ProductsOverViewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
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

const styles = StyleSheet.create({});

export default ProductsOverViewScreen;
