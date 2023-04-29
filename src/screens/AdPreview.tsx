/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { HStack, VStack, Text, Heading, Center, useToast } from 'native-base';
import { Platform } from 'react-native';
import { Button } from '@components/Button';
import { AdDetails } from '@components/AdDetails';
import { IAdPreviewRoutes } from '@dtos/RoutesDTO';
import { ShowAdDetailsDTO } from '@dtos/ProductDTO';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';

export function AdPreview({ navigation, route }: IAdPreviewRoutes) {
  const { product } = route.params;
  const { user } = useAuth();
  const toast = useToast();

  const productPreview: ShowAdDetailsDTO = {
    ...product,
    price: Number(product.price) * 100,
    user: {
      name: user.name,
      avatar: user.avatar,
      tel: user.tel,
    },
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToAd = (productId: string) => {
    navigation.navigate('ad', { productId, isMyAd: true });
  };

  const handleCreateAd = async () => {
    try {
      const {
        name,
        description,
        is_new,
        accept_trade,
        payment_methods,
        product_images,
      } = product;
      const createAdResponse = await api.post('/products', {
        name,
        description,
        is_new,
        price: productPreview.price,
        accept_trade,
        payment_methods,
      });

      const productId = createAdResponse.data.id;

      const form = new FormData();
      form.append('product_id', productId);
      product_images.forEach((element: any) => {
        form.append('images', element);
      });

      await api.post('/products/images', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.show({
        title: 'Produto criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      handleGoToAd(productId);
    } catch (error) {
      handleError(error);
    }
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
          onPress={handleCreateAd}
        />
      </HStack>
    </VStack>
  );
}
