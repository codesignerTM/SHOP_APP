import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keyBoardType="email-address"
            required
            email
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;
