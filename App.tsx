/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {
  useFonts,
  Karla_400Regular as Karla400Regular,
  Karla_700Bold as Karla700Bold,
} from '@expo-google-fonts/karla';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla400Regular, Karla700Bold });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      {fontsLoaded ? (
        <Text>Open up App.tsx to start working on your app!</Text>
      ) : (
        <View />
      )}
    </View>
  );
}
