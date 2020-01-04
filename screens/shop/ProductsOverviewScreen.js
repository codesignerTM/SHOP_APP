import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  console.log("products", products);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <Text style={{ color: "black" }}>{itemData.item.title}</Text>
      )}
    />
  );
};

ProductsOverViewScreen.navigationOptions = () => {
  return {
    headerTitle: "All Products"
  };
};

const styles = StyleSheet.create({});

export default ProductsOverViewScreen;
