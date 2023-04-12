/* eslint-disable import/no-extraneous-dependencies */
import {
  HStack,
  VStack,
  Icon,
  IconButton,
  Text,
  Heading,
  Box,
  ScrollView,
} from 'native-base';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ImageCarousel } from '@components/ImageCarousel';
import { UserPhoto } from '@components/UserPhoto';
import { PaymentMethods } from '@components/PaymentMethods';
import { Button } from '@components/Button';

const product = {
  id: 'e81de72d-34b3-4c2a-8096-25d3904cf100',
  name: 'Luminária Pendente',
  description:
    'Essa é a melhor luminária do mundo. Você não vai se arrependerEssa é a melhor luminária do mundo. Você não vai se arrependerEssa é a melhor luminária do mundo. Você não vai se arrependerEssa é a melhor luminária do mundo. Você não vai se arrepender',
  is_new: true,
  price: 4500,
  accept_trade: true,
  user_id: 'cab6e6f2-a201-4682-8da4-1d517261da1d',
  is_active: true,
  created_at: '2023-04-10T23:10:27.531Z',
  updated_at: '2023-04-10T23:10:27.531Z',
  product_images: [],
  payment_methods: [
    {
      key: 'pix',
      name: 'Pix',
    },
    {
      key: 'card',
      name: 'Cartão de crédito',
    },
  ],
  user: {
    avatar: 'ea793fa105371dccb856-Profile_picture.png',
    name: 'Nicodemos Santos',
    tel: '351926154569',
  },
};

const images = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?girl',
  'https://source.unsplash.com/1024x768/?man',
  'https://source.unsplash.com/1024x768/?tree',
];

export function Ad() {
  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <HStack px={6}>
        <IconButton
          rounded="full"
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
        />
      </HStack>
      <ImageCarousel images={images} />
      <ScrollView px={6} py={6} flex={1} showsVerticalScrollIndicator={false}>
        <HStack mb={6}>
          <UserPhoto
            size={6}
            borderWidth={2}
            source={{ uri: 'https://source.unsplash.com/1024x768/?nature' }}
            mr={2}
          />

          <Text fontSize="sm">{product.user.name}</Text>
        </HStack>
        <HStack>
          <Box py={0.5} px={2} rounded="full" bg="gray.500">
            <Text fontSize="10" fontFamily="heading">
              {product.is_new ? 'NOVO' : 'USADO'}
            </Text>
          </Box>
        </HStack>

        <HStack justifyContent="space-between" mt="3">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading">
            {product.name}
          </Heading>
          <Box flexDir="row" alignItems="baseline">
            <Heading color="blue.500" fontSize="sm" mr="1" fontFamily="heading">
              R$
            </Heading>
            <Heading color="blue.500" fontSize="lg" fontFamily="heading">
              {(product.price / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Heading>
          </Box>
        </HStack>

        <Text mt="2" fontSize="sm" color="gray.200">
          {product.description}
        </Text>

        <HStack mt={4}>
          <Text mr="2" fontFamily="heading" color="gray.200">
            Aceita troca?
          </Text>
          <Text>{product.accept_trade ? 'Sim' : 'Não'}</Text>
        </HStack>

        <VStack mt="4" mb="6">
          <Text fontFamily="heading" mb="1.5" color="gray.200">
            Meios de pagamento:
          </Text>
          <PaymentMethods paymentsArray={product.payment_methods} />
        </VStack>
      </ScrollView>

      <HStack
        justifyContent="space-between"
        bg="white"
        pt={Platform.OS === 'ios' ? 4 : 8}
        pb={8}
        alignItems="center"
        px="6"
      >
        <Box flexDir="row" alignItems="baseline">
          <Heading color="blue.700" fontSize="sm" mr="1" fontFamily="heading">
            R$
          </Heading>
          <Heading color="blue.700" fontSize="2xl" fontFamily="heading">
            {(product.price / 100).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Heading>
        </Box>
        <VStack>
          <Button
            icon="message-circle"
            title="Entrar em contato"
            variant="blue"
            maxWidth={200}
            px={4}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}
