import React from "react";
import { FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as UserActions from "../../store/actions/products";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  console.log("userProducts", userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button color={Colors.primray} title="Edit" onPress={() => {}} />
          <Button
            color={Colors.primray}
            title="Delete"
            onPress={() => {
              dispatch(UserActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
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

const styles = StyleSheet.create({});

export default UserProductsScreen;
