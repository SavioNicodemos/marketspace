import { HStack, VStack, Text, Heading, Center } from 'native-base';
import { Platform } from 'react-native';
import { Button } from '@components/Button';
import { AdDetails } from '@components/AdDetails';
import { IAdPreviewRoutes } from '@dtos/RoutesDTO';
import { ShowAdDetailsDTO } from '@dtos/ProductDTO';
import { useAuth } from '@hooks/useAuth';

export function AdPreview({ navigation, route }: IAdPreviewRoutes) {
  const { product } = route.params;
  const { user } = useAuth();

  const productPreview: ShowAdDetailsDTO = {
    ...product,
    price: Number(product.price) * 100,
    user: {
      name: user.name,
      avatar: user.avatar,
      tel: user.tel,
    },
    product_images: [],
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToAd = () => {
    navigation.navigate('ad', { productId: '1', isMyAd: true });
  };

  return (
    <VStack bgColor="blue.500" flex={1} pt={12}>
      <Center py="3">
        <Heading fontFamily="heading" color="gray.700" fontSize="md">
          Pré visualização do anúncio
        </Heading>
        <Text color="gray.700" fontSize="md">
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <AdDetails product={productPreview} />

      <HStack
        justifyContent="space-between"
        bg="white"
        pt={Platform.OS === 'ios' ? 4 : 8}
        pb={8}
        alignItems="center"
        px="6"
        space={4}
      >
        <Button
          icon="arrow-left"
          title="Editar"
          variant="secondary"
          maxWidth={200}
          px={4}
          onPress={handleGoBack}
        />
        <Button
          icon="tag"
          title="Publicar"
          variant="blue"
          maxWidth={200}
          px={4}
          onPress={handleGoToAd}
        />
      </HStack>
    </VStack>
  );
}
