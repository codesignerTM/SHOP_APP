import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import Colors from "../constants/Colors";
import PorductsoverView from "../screens/shop/ProductsOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverView: PorductsoverView
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primray : ""
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primray
    }
  }
);

export default createAppContainer(ProductsNavigator);
