import { HStack, VStack, Text, Heading, Center } from 'native-base';
import { Platform } from 'react-native';
import { Button } from '@components/Button';
import { AdDetails } from '@components/AdDetails';
import { useNavigation } from '@react-navigation/native';
import { INavigationRoutes } from '@dtos/RoutesDTO';

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
  product_images: [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?man',
    'https://source.unsplash.com/1024x768/?tree',
  ],
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

export function AdPreview() {
  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToAd = () => {
    navigation.navigate('ad');
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

      <AdDetails product={product} />

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
