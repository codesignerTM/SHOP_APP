import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import Colors from "../constants/Colors";

import PorductsoverScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: PorductsoverScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primray : ""
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold"
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans"
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primray
    }
  }
);

export default createAppContainer(ProductsNavigator);
