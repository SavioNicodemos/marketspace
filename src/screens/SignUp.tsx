import {
  ScrollView,
  VStack,
  Center,
  Text,
  Heading,
  Box,
  Icon,
  IconButton,
} from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import Logo from '@assets/Logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';

import defaultImage from '@assets/defaultAvatar.png';

const PHOTO_SIZE = 24;

export function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        bgColor="gray.600"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="3xl"
        px={12}
        pt={12}
        flex={1}
      >
        <Center>
          <Logo height={40} width={60} />
          <Heading fontSize="lg" color="gray.100" mt={4}>
            Boas vindas!
          </Heading>
          <Text color="gray.200" fontSize="sm" textAlign="center" mt={2}>
            Crie a sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Box
            alignItems="center"
            mt="4"
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
          >
            <UserPhoto size={PHOTO_SIZE} source={defaultImage} />
            <IconButton
              position="absolute"
              bottom="-5"
              right="-5"
              bg="blue.500"
              icon={<Icon as={Feather} name="edit-3" size="6" />}
              _icon={{
                color: 'white',
              }}
              borderRadius="full"
            />
          </Box>
        </Center>

        <Input placeholder="Nome" isInvalid={false} mt={4} />
        <Input placeholder="E-mail" isInvalid={false} />
        <Input placeholder="Telefone" isInvalid={false} />
        <Input placeholder="Senha" isInvalid={false} />
        <Input placeholder="Confirmar senha" isInvalid={false} />

        <Button title="Criar" variant="primary" mt="4" />

        <Text color="gray.200" fontSize="sm" mt={12} textAlign="center">
          Já tem uma conta?
        </Text>
        <Button title="Ir para o login" variant="secondary" mt="4" />
      </VStack>
    </ScrollView>
  );
}
