import React from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/helper/Navigator';
import { PaperProvider } from 'react-native-paper';



const App = () => {
  return (
    <PaperProvider style={styles.container}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default App;
