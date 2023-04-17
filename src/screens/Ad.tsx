import { HStack, VStack, Icon, IconButton, Heading, Box } from 'native-base';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { AdDetails } from '@components/AdDetails';
import { useNavigation } from '@react-navigation/native';
import { INavigationRoutes } from '@dtos/RoutesDTO';

const product = {
  id: 'e81de72d-34b3-4c2a-8096-25d3904cf100',
  name: 'Luminária Pendente',
  description: 'Essa é a melhor luminária do mundo. Você não vai se arrepender',
  is_new: true,
  price: 4500,
  accept_trade: true,
  user_id: 'cab6e6f2-a201-4682-8da4-1d517261da1d',
  is_active: false,
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

export function Ad() {
  const isMyAd = true;

  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const handleGoToHome = () => {
    navigation.navigate('home');
  };

  const handleGoToEditAd = () => {
    navigation.navigate('createAd');
  };

  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <HStack px={6} justifyContent="space-between">
        <IconButton
          rounded="full"
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
          onPress={handleGoToHome}
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
          <Button
            icon="message-circle"
            title="Entrar em contato"
            variant="blue"
            maxWidth={200}
            px={4}
          />
        </HStack>
      )}
    </VStack>
  );
}
