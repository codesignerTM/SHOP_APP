import React from "react";
import { FlatList, StyleSheet, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as UserActions from "../../store/actions/products";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editPorductHandler = id => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteProductHandler = id => {
    Alert.alert("Are you sure?", "This will delete the products forever!", [
      { text: "No" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(UserActions.deleteProduct(id));
        }
      }
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editPorductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primray}
            title="Edit"
            onPress={() => {
              editPorductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primray}
            title="Delete"
            onPress={deleteProductHandler.bind(this, itemData.item.id)}
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="create"
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
          title="Add"
        ></Item>
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
