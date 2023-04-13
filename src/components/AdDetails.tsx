import { HStack, VStack, Text, Heading, Box, ScrollView } from 'native-base';
import { ImageCarousel } from '@components/ImageCarousel';
import { UserPhoto } from '@components/UserPhoto';
import { PaymentMethods } from '@components/PaymentMethods';
import { ProductDTO } from '@dtos/ProductDTO';

type Props = {
  product: ProductDTO;
};

export function AdDetails({ product }: Props) {
  return (
    <VStack flex={1}>
      <ImageCarousel images={product.product_images} />
      <ScrollView
        px={6}
        py={6}
        flex={1}
        showsVerticalScrollIndicator={false}
        bg="gray.600"
        mt={-5}
      >
        <HStack mb={6} mt={5}>
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
    </VStack>
  );
}
