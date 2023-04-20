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

const getAds = async (filters: IFiltersDTO): Promise<ProductDTO[]> => {
  const params = new URLSearchParams();
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

export function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersDTO>(emptyFilters);

  const navigation = useNavigation<INavigationRoutes['navigation']>();
  const { user } = useAuth();

  const { data: productList, isLoading } = useQuery({
    queryKey: ['ads', filters],
    queryFn: () => getAds(filters),
  });

  const handleGoToCreateAdd = () => {
    navigation.navigate('createAd');
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
        <HStack justifyContent="center">
          <UserPhoto size={12} mr={2} imageLink={user.avatar} />
          <VStack>
            <Text fontSize="md">Boas vindas,</Text>
            <Heading fontSize="md">{user.name}</Heading>
          </VStack>
          <Box flex={1} pl={12}>
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
                  4
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
          />

          {isLoading ? (
            <Loading backgroundStyle="appDefault" />
          ) : (
            <FlatList
              data={productList}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}
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
              numColumns={2}
            />
          )}
        </VStack>
      </VStack>
      <FiltersModal
        visible={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onChangeFilters={modalFilters => setFilters(modalFilters)}
        defaultValue={filters}
      />
    </>
  );
}
