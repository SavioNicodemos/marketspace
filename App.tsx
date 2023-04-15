/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Karla_400Regular as Karla400Regular,
  Karla_700Bold as Karla700Bold,
} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import Loading from '@components/Loading';

import { Routes } from '@routes/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import THEME from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />

        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
