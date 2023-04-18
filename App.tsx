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
import { AuthContextProvider } from '@contexts/AuthContext';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import THEME from './src/theme';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            {fontsLoaded ? <Routes /> : <Loading />}
          </AuthContextProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
