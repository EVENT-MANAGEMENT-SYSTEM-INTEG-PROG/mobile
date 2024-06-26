import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Navigator from './src/helper/Navigator'; 
import { AuthProvider } from './src/services/authentication/authContext';


const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
