import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

import { testPage } from "../static/testpage";

export default function Webview() {
  return (
    // 외부 URL
    // <WebView style={styles.container} source={{ uri: "https://expo.dev" }} />
    // 내부 정적 html
    <WebView style={styles.container} source={{ html: testPage }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
