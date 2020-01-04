import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { userSelector, useSelector } from "react-redux";

const ProductsOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      render={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverViewScreen;
