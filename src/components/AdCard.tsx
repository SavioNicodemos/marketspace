import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { api } from '@services/api';
import defaultProductImage from '@assets/noProduct.png';
import defaultUserImage from '@assets/defaultAvatar.png';
import { UserPhoto } from './UserPhoto';

type Props = {
  userPhoto?: string;
  isNew: boolean;
  productImage: string;
  name: string;
  price: number;
  adIsDisabled?: boolean;
};

export function AdCard({
  isNew,
  name,
  price,
  productImage,
  userPhoto,
  adIsDisabled,
}: Props) {
  const formattedPrice = (price / 100).toFixed(2);

  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const handleGoToAdDetails = () => {
    navigation.navigate('ad');
  };
  return (
    <Pressable
      width="48%"
      height="40"
      mx={1}
      mb={6}
      _pressed={{ opacity: 0.7 }}
      onPress={handleGoToAdDetails}
    >
      <VStack flex={1}>
        <Image
          source={
            productImage
              ? {
                  uri: `${api.defaults.baseURL}/images/${productImage}`,
                }
              : defaultProductImage
          }
          rounded="md"
          alt="Foto do produto vendido"
          resizeMode="cover"
          position="absolute"
          width="full"
          h="115"
        />

        <HStack alignItems="center" justifyContent="space-between" p={2}>
          {userPhoto ? (
            <UserPhoto
              position="absolute"
              left="2"
              top="2"
              size={7}
              borderWidth={2}
              borderColor="white"
              source={
                userPhoto
                  ? {
                      uri: `${api.defaults.baseURL}/images/${userPhoto}`,
                    }
                  : defaultUserImage
              }
            />
          ) : null}
          <Text
            px="2"
            py="0.5"
            fontSize="10"
            fontWeight="bold"
            rounded="full"
            bg={isNew ? 'blue.700' : 'gray.200'}
            color="white"
            top={2}
            right={2}
            position="absolute"
          >
            {isNew ? 'NOVO' : 'USADO'}
          </Text>
        </HStack>
        {adIsDisabled ? (
          <Box bg="#1A181B3D" flex="1" mt={-4} p={2} justifyContent="flex-end">
            <Text color="white" fontSize="xs" fontWeight="bold">
              {'Anúncio desativado'.toUpperCase()}
            </Text>
          </Box>
        ) : null}
      </VStack>
      <Text color={adIsDisabled ? 'gray.400' : 'gray.200'} fontSize="sm">
        {name}
      </Text>
      <Text
        color={adIsDisabled ? 'gray.400' : 'gray.100'}
        fontWeight="bold"
        fontSize="md"
      >
        R$ {formattedPrice}
      </Text>
    </Pressable>
  );
}
