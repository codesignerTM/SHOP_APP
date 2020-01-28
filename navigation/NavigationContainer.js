import React, { useEffect, useRef } from "react";
import ShopNavigatior from "./ShopNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.authentication.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ route: "Auth" }));
    }
  }, [isAuth]);

  return <ShopNavigatior ref={navRef} />;
};

export default NavigationContainer;
