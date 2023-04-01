import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';
import { Box, HStack, Heading, Text, VStack } from 'native-base';

export function Home() {
  return (
    <VStack>
      <HStack mt={16} px={6} justifyContent="center">
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
    </VStack>
  );
}
