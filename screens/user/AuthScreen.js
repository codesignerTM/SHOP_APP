import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as AuthActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("Error occured!", error.message, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = AuthActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = AuthActions.logIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(action);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#62d5db", "#6ff1f5"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyBoardType="email-address"
              required
              email
              authoCapitalize="none"
              errorText="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyBoardType="default"
              secureTextEntry
              required
              minLength={5}
              authoCapitalize="none"
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.btnContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primray} />
              ) : (
                <Button
                  title={isSignUp ? "Sign up" : "Login"}
                  color={Colors.primray}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.btnContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign up"}`}
                color={Colors.secondary}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Sign in"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
