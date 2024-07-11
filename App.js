
import MainNavigator from './src/Navigation/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import React from 'react';
import { StatusBar } from 'react-native';
import { Settings } from "react-native-fbsdk-next";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const tracking = () => {
    if (Platform.OS === "ios") {
      requestTrackingPermissionsAsync().then(({ status }: { status: string }) => {
        if (status === "granted") {
          Settings.setAdvertiserTrackingEnabled(true);
        }
      });
    }
  };
  
  tracking();
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#f5fafa" barStyle="dark-content"/>
     <MainNavigator/>
    </NavigationContainer>
  );
}
