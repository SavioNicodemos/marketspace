/* eslint-disable import/extensions */
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
// import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { colors } = useTheme();
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: colors.gray[700] },
  };

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {/* <AuthRoutes /> */}
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
