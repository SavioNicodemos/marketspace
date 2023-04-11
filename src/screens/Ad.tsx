/* eslint-disable import/no-extraneous-dependencies */
import { HStack, VStack, Icon, IconButton } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { ImageCarousel } from '@components/ImageCarousel';

const product = {
  id: 'e81de72d-34b3-4c2a-8096-25d3904cf100',
  name: 'Luminária Pendente',
  description: 'Essa é a melhor luminária do mundo. Você não vai se arrepender',
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
    <VStack bgColor="gray.600" flex={1} pt={16}>
      <HStack px={6}>
        <IconButton
          rounded="full"
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
        />
      </HStack>
      <ImageCarousel images={images} />
    </VStack>
  );
}
