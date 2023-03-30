/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {
  useFonts,
  Karla_400Regular as Karla400Regular,
  Karla_700Bold as Karla700Bold,
} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import Loading from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });
  return (
    <NativeBaseProvider>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {fontsLoaded ? <View /> : <Loading />}
    </NativeBaseProvider>
  );
}
