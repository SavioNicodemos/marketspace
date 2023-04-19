import {
  HStack,
  VStack,
  Icon,
  IconButton,
  Heading,
  Box,
  useToast,
} from 'native-base';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { AdDetails } from '@components/AdDetails';
import { IAdDetailsRoutes } from '@dtos/RoutesDTO';
import { useQuery } from '@tanstack/react-query';
import { api } from '@services/api';
import { IProductId, ProductDTO } from '@dtos/ProductDTO';
import Loading from '@components/Loading';

const getProduct = async (productId: IProductId): Promise<ProductDTO> => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export function Ad({ navigation, route }: IAdDetailsRoutes): JSX.Element {
  const toast = useToast();
  const { productId, isMyAd } = route.params;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    onError: (error: any) => {
      toast.show({
        description: `Algo deu errado: ${error?.message}`,
        placement: 'top',
        color: 'red.200',
      });
      navigation.goBack();
    },
  });

  const handlePressArrowBackButton = () => {
    navigation.goBack();
  };

  const handleGoToEditAd = () => {
    navigation.navigate('createAd');
  };

  if (isError) {
    return <Heading>Sorry, something went wrong! try again later</Heading>;
  }

  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <HStack px={6} justifyContent="space-between">
        <IconButton
          rounded="full"
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
          onPress={handlePressArrowBackButton}
        />
        {isMyAd ? (
          <IconButton
            rounded="full"
            icon={
              <Icon as={Feather} name="edit-3" color="gray.100" size="lg" />
            }
            onPress={handleGoToEditAd}
          />
        ) : null}
      </HStack>

      {isLoading ? (
        <Loading backgroundStyle="appDefault" />
      ) : (
        <>
          <AdDetails product={product} />

          {isMyAd ? (
            <HStack
              justifyContent="space-between"
              bg="white"
              pt={4}
              pb={8}
              alignItems="center"
              px="6"
              flexDir="column"
              space={4}
            >
              <VStack>
                <Button
                  title="Desativar anúncio"
                  icon="power"
                  variant="primary"
                  minW={360}
                />
              </VStack>
              <VStack mt={3}>
                <Button
                  title="Excluir anúncio"
                  icon="trash"
                  variant="secondary"
                  minW={360}
                />
              </VStack>
            </HStack>
          ) : (
            <HStack
              justifyContent="space-between"
              bg="white"
              pt={Platform.OS === 'ios' ? 4 : 8}
              pb={8}
              alignItems="center"
              px="6"
            >
              <Box flexDir="row" alignItems="baseline">
                <Heading
                  color="blue.700"
                  fontSize="sm"
                  mr="1"
                  fontFamily="heading"
                >
                  R$
                </Heading>
                <Heading color="blue.700" fontSize="2xl" fontFamily="heading">
                  {(product.price / 100).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Heading>
              </Box>
              <Button
                icon="message-circle"
                title="Entrar em contato"
                variant="blue"
                maxWidth={200}
                px={4}
              />
            </HStack>
          )}
        </>
      )}
    </VStack>
  );
}
