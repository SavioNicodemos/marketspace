import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';
import { Box, HStack, Heading, Text, VStack, Icon } from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { Input } from '@components/Input';

export function Home() {
  return (
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
            <Icon as={Feather} name="arrow-right" color="blue.700" size="sm" />
          </Box>
        </HStack>
      </VStack>

      <VStack mt="8">
        <Text color="gray.300" fontSize="sm" mb="3">
          Compre produtos variados
        </Text>

        <Input placeholder="Buscar anúncio" searchBar />
      </VStack>
    </VStack>
  );
}
