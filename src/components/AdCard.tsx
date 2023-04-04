import { HStack, Image, Pressable, Text, VStack } from 'native-base';
import { UserPhoto } from './UserPhoto';

type Props = {
  userPhoto: string;
  isNew: boolean;
  productImage: string;
  name: string;
  price: number;
};

export function AdCard({ isNew, name, price, productImage, userPhoto }: Props) {
  const formattedPrice = (price / 100).toFixed(2);
  return (
    <Pressable
      width="48%"
      height="40"
      mx={1}
      mb={6}
      _pressed={{ opacity: 0.7 }}
    >
      <VStack flex={1}>
        <Image
          source={{
            uri: productImage,
          }}
          rounded="md"
          alt="Foto do produto vendido"
          resizeMode="cover"
          position="absolute"
          width="full"
          h="115"
        />

        <HStack alignItems="center" justifyContent="space-between" p={2}>
          <UserPhoto
            size={7}
            borderWidth={2}
            borderColor="white"
            source={{
              uri: `http://192.168.1.66:3333/images/${userPhoto}`,
            }}
          />
          <Text
            px="2"
            py="0.5"
            fontSize="10"
            fontWeight="bold"
            rounded="full"
            bg={isNew ? 'blue.700' : 'gray.200'}
            color="white"
            ml="2"
          >
            {isNew ? 'NOVO' : 'USADO'}
          </Text>
        </HStack>
      </VStack>
      <Text color="gray.200" fontSize="sm">
        {name}
      </Text>
      <Text fontWeight="bold" fontSize="md">
        R$ {formattedPrice}
      </Text>
    </Pressable>
  );
}
