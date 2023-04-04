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
  Modal,
  IconButton,
  Switch,
  Checkbox,
} from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { Input } from '@components/Input';
import { AdCard } from '@components/AdCard';
import { useState } from 'react';

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
    user: {
      avatar: '193161b2f0d886f9368c-profile_picture.jpg',
    },
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
    user: {
      avatar: '193161b2f0d886f9368c-profile_picture.jpg',
    },
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
    user: {
      avatar: '193161b2f0d886f9368c-profile_picture.jpg',
    },
  },
];

export function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [groupValue, setGroupValue] = useState(['Photography', 'Gardening']);
  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="center">
          <UserPhoto
            size={12}
            mr={2}
            source={{ uri: 'https://github.com/savionicodemos.png' }}
          />
          <VStack>
            <Text fontSize="md">Boas vindas,</Text>
            <Heading fontSize="md">Nicodemos</Heading>
          </VStack>
          <Box flex={1} pl={12}>
            <Button title="Criar anúncio" icon="plus" />
          </Box>
        </HStack>

        <VStack mt="8">
          <Text color="gray.300" fontSize="sm" mb="3">
            Seus produtos anunciados para venda
          </Text>
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
                productImage={item.product_images[0]}
              />
            )}
            numColumns={2}
          />
        </VStack>
      </VStack>
      <Modal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        animationPreset="slide"
        justifyContent="flex-end"
      >
        <VStack
          width="full"
          bg="gray.600"
          py="8"
          px="6"
          borderTopLeftRadius="3xl"
          borderTopRightRadius="3xl"
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Heading color="gray.100" fontSize="lg">
              Filtrar anúncios
            </Heading>
            <IconButton
              rounded="full"
              icon={<Icon as={Feather} name="x" color="gray.400" size="lg" />}
            />
          </HStack>
          <VStack>
            <Text>Condição</Text>
            <HStack>
              <Text>Novo</Text>
              <Text>Usado</Text>
            </HStack>
          </VStack>
          <VStack alignItems="flex-start">
            <Text>Aceita troca?</Text>
            <Switch />
          </VStack>
          <VStack space={2}>
            <HStack alignItems="baseline">
              <Heading fontSize="lg">Meios de pagamento aceito</Heading>
            </HStack>
            <Checkbox.Group
              colorScheme="blue"
              defaultValue={groupValue}
              accessibilityLabel="pick an item"
              onChange={values => {
                setGroupValue(values || []);
              }}
            >
              <Checkbox value="Boleto" my="1">
                Boleto
              </Checkbox>
              <Checkbox value="Pix" my="1">
                Pix
              </Checkbox>
              <Checkbox value="Dinheiro" my="1">
                Dinheiro
              </Checkbox>
              <Checkbox value="Cartão de crédito" my="1">
                Cartão de crédito
              </Checkbox>
              <Checkbox value="Depósito Bancário" my="1">
                Depósito Bancário
              </Checkbox>
            </Checkbox.Group>
          </VStack>
          <HStack space={2}>
            <Button title="Resetar filtros" variant="secondary" flex={1} />
            <Button title="Aplicar filtros" flex={1} />
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}
