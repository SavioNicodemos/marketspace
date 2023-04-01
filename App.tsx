/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Karla_400Regular as Karla400Regular,
  Karla_700Bold as Karla700Bold,
} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import Loading from '@components/Loading';

import { Home } from '@screens/Home';
import THEME from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Home /> : <Loading />}
    </NativeBaseProvider>
  );
}
