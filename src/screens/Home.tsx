import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';
import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Icon,
  FlatList,
  Pressable,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Input } from '@components/Input';
import { AdCard } from '@components/AdCard';
import { useState } from 'react';
import { FiltersModal, emptyFilters } from '@components/FiltersModal';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { IProductId, ProductDTO } from '@dtos/ProductDTO';
import { api } from '@services/api';
import Loading from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { IFiltersDTO } from '@dtos/FiltersDTO';
import { handleError } from '@utils/handleError';
import { EmptyListText } from '@components/EmptyListText';

const getAds = async (filters: IFiltersDTO): Promise<ProductDTO[]> => {
  const params = new URLSearchParams();
  if (filters?.productName) {
    params.append('query', filters.productName);
  }

  if (typeof filters?.acceptTrade === 'boolean') {
    params.append('accept_trade', filters.acceptTrade.toString());
  }

  if (typeof filters?.isNew === 'boolean') {
    params.append('is_new', filters.isNew.toString());
  }

  filters?.paymentMethods.forEach(element => {
    params.append('payment_methods', element);
  });

  const paramsString = params.toString();

  const response = await api.get(`/products?${paramsString}`);
  return response.data;
};

const getMyAds = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/users/products');
  return response.data;
};

export function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersDTO>(emptyFilters);

  const navigation = useNavigation<INavigationRoutes['navigation']>();
  const { user } = useAuth();

  const { data: productList, isLoading } = useQuery({
    queryKey: ['ads', filters],
    queryFn: () => getAds(filters),
    onError: error => {
      handleError(error);
    },
  });

  const { data: myAds } = useQuery({
    queryKey: ['myAds'],
    queryFn: () => getMyAds(),
    onError: error => {
      handleError(error);
    },
  });

  const myActiveProductsCount = myAds
    ? myAds.filter(product => product.is_active).length
    : 0;

  const handleGoToCreateAdd = () => {
    navigation.navigate('createAd', {});
  };

  const handleGoToMyAds = () => {
    navigation.navigate('myAds');
  };

  const handleGoToAdDetails = (productId: IProductId) => {
    navigation.navigate('ad', { productId, isMyAd: false });
  };

  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="space-between">
          <HStack flexShrink={1}>
            <UserPhoto size={12} mr={2} imageLink={user.avatar} />
            <VStack flexShrink={1}>
              <Text fontSize="md">Boas vindas,</Text>
              <Heading
                numberOfLines={1}
                ellipsizeMode="tail"
                fontSize="md"
                fontFamily="heading"
              >
                {user.name}
              </Heading>
            </VStack>
          </HStack>
          <Box flex={1} minW={150} maxW={150}>
            <Button
              title="Criar anúncio"
              icon="plus"
              onPress={handleGoToCreateAdd}
            />
          </Box>
        </HStack>

        <VStack mt="8">
          <Text color="gray.300" fontSize="sm" mb="3">
            Seus produtos anunciados para venda
          </Text>
          <Pressable onPress={handleGoToMyAds}>
            <HStack
              bgColor="blue.50"
              px="4"
              py="3"
              alignItems="center"
              rounded="lg"
            >
              <Icon as={Feather} name="tag" color="blue.700" size="lg" />
              <Box flex={1} ml={3}>
                <Heading fontSize="lg" color="gray.200">
                  {myActiveProductsCount}
                </Heading>
                <Text color="gray.200" fontSize="xs">
                  anúncios ativos
                </Text>
              </Box>
              <Box flexDir="row" alignItems="center">
                <Heading color="blue.700" fontSize="xs">
                  Meus anúncios
                </Heading>
                <Icon
                  as={Feather}
                  name="arrow-right"
                  color="blue.700"
                  size="sm"
                />
              </Box>
            </HStack>
          </Pressable>
        </VStack>

        <VStack mt="8">
          <Text color="gray.300" fontSize="sm" mb="3">
            Compre produtos variados
          </Text>

          <Input
            placeholder="Buscar anúncio"
            searchBar
            onFilterPress={() => setIsFiltersModalOpen(true)}
            onChangeText={value =>
              setFilters(prev => ({ ...prev, productName: value }))
            }
          />
        </VStack>

        {isLoading ? (
          <Loading backgroundStyle="appDefault" />
        ) : (
          <FlatList
            data={productList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={
              productList?.length
                ? {
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }
                : { flex: 1, justifyContent: 'center' }
            }
            renderItem={({ item }) => (
              <AdCard
                name={item.name}
                isNew={item.is_new}
                price={item.price}
                userPhoto={item.user.avatar}
                productImage={item.product_images[0]?.path}
                onPress={() => handleGoToAdDetails(item.id)}
              />
            )}
            ListEmptyComponent={
              <EmptyListText title="Ainda não há nenhum anúncio criado! Seja o primeiro!" />
            }
            numColumns={2}
          />
        )}
      </VStack>
      <FiltersModal
        visible={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onChangeFilters={modalFilters =>
          setFilters(prev => ({ ...prev, modalFilters }))
        }
        defaultValue={filters}
      />
    </>
  );
}
