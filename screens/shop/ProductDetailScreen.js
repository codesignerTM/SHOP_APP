import React from "react";
import {
  ScrollView,
  Image,
  Button,
  View,
  Text,
  StyleSheet
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => productId === product.id)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          color={Colors.primray}
          title="Add to cart"
          onPress={() => {
            dispatch(cartActions.addToCArt(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>£{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans"
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans"
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  }
});

export default ProductDetailsScreen;
