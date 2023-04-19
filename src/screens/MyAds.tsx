import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Select,
  FlatList,
  IconButton,
} from 'native-base';

import { AdCard } from '@components/AdCard';
import { IProductId, ProductDTO } from '@dtos/ProductDTO';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { api } from '@services/api';
import Loading from '@components/Loading';

const getMyAds = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/users/products');
  return response.data;
};

export function MyAds() {
  const [status, setStatus] = useState('');

  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const { data: myAds, isLoading } = useQuery({
    queryKey: ['myAds'],
    queryFn: () => getMyAds(),
  });

  const handleGoToAdDetails = (productId: IProductId) => {
    navigation.navigate('ad', { productId, isMyAd: true });
  };

  const handleGoToCreateAd = () => {
    navigation.navigate('createAd');
  };
  return (
    <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
      <HStack justifyContent="space-between" mb="8">
        <VStack />
        <Heading fontSize="lg" color="gray.100" mr={-5}>
          Meus anúncios
        </Heading>
        <IconButton
          icon={<Icon as={Feather} name="plus" color="gray.100" size="lg" />}
          rounded="full"
          onPress={handleGoToCreateAd}
        />
      </HStack>
      {isLoading ? (
        <Loading backgroundStyle="appDefault" />
      ) : (
        <>
          <HStack alignItems="center" justifyContent="space-between" mb={5}>
            <Text color="gray.200" fontSize="sm">
              {myAds?.length} anúncios
            </Text>
            <Select
              selectedValue={status}
              minWidth="100"
              accessibilityLabel="Choose Service"
              placeholder="Todos"
              _selectedItem={{
                _text: {
                  color: 'white',
                },
                bg: 'blue.500',
                endIcon: <Feather name="check" size={20} color="white" />,
              }}
              onValueChange={itemValue => setStatus(itemValue)}
            >
              <Select.Item label="Todos" value="all" />
              <Select.Item label="Ativos" value="active" />
              <Select.Item label="Inativos" value="disabled" />
            </Select>
          </HStack>
          <FlatList
            data={myAds}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <AdCard
                name={item.name}
                isNew={item.is_new}
                price={item.price}
                productImage={item.product_images[0]?.path}
                adIsDisabled={!item.is_new}
                onPress={() => handleGoToAdDetails(item.id)}
              />
            )}
            numColumns={2}
          />
        </>
      )}
    </VStack>
  );
}
