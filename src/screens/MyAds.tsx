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
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { AdCard } from '@components/AdCard';
import { useNavigation } from '@react-navigation/native';
import { INavigationRoutes } from '@dtos/RoutesDTO';

const productList = [
  {
    id: '33d40919-8a12-42b3-bcba-a67f29cf6e7c',
    name: 'Tênis Vermelho',
    price: 5990,
    is_new: false,
    accept_trade: false,
    product_images: ['https://avatars.githubusercontent.com/u/111062089?v=4'],
    payment_methods: [
      {
        key: 'pix',
        name: 'Pix',
      },
      {
        key: 'card',
        name: 'Cartão de Crédito',
      },
    ],
  },
  {
    id: 'f17e4861-59dd-4fd5-870c-2a4c104e06b9',
    name: 'Luminária Pendente',
    price: 4500,
    is_new: true,
    accept_trade: true,
    product_images: ['https://avatars.githubusercontent.com/u/111062089?v=4'],
    payment_methods: [
      {
        key: 'pix',
        name: 'Pix',
      },
    ],
  },
  {
    id: 'f17e4861-59dd-4fd5-870c-2a4c104e06b8',
    name: 'Luminária Pendente',
    price: 4500,
    is_new: true,
    accept_trade: true,
    product_images: ['https://avatars.githubusercontent.com/u/111062089?v=4'],
    payment_methods: [
      {
        key: 'pix',
        name: 'Pix',
      },
    ],
  },
];

export function MyAds() {
  const [status, setStatus] = useState('');
  const navigation = useNavigation<INavigationRoutes['navigation']>();
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
      <HStack alignItems="center" justifyContent="space-between" mb={5}>
        <Text color="gray.200" fontSize="sm">
          9 anúncios
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
        data={productList}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <AdCard
            name={item.name}
            isNew={item.is_new}
            price={item.price}
            productImage={item.product_images[0]}
            adIsDisabled={!item.is_new}
          />
        )}
        numColumns={2}
      />
    </VStack>
  );
}
