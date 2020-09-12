import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native';
import ScrollViewContent from "./components/ScrollViewContent";
import LocalFlatlList from "./components/LocalFlatlList";
import ApiFlatList from "./components/ApiFlatList";

export default function App() {
  return (
    <SafeAreaView  style={styles.container}>

            <ScrollViewContent/>
            <LocalFlatlList/>
            <ApiFlatList/>
            <StatusBar style="auto" />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      marginTop:40,
  },
});
