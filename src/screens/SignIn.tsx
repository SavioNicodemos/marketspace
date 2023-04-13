import { ScrollView, VStack, Center, Text, Heading } from 'native-base';
import Logo from '@assets/Logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <VStack
          pt={24}
          bgColor="gray.600"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
        >
          <Center>
            <Logo height={80} width={200} />
            <Heading fontSize={35} color="gray.100">
              marketspace
            </Heading>
            <Text color="gray.300" fontSize="sm">
              Seu espaço de compra e venda
            </Text>
          </Center>

          <Center px={12}>
            <Text color="gray.200" fontSize="sm" mt={16}>
              Acesse sua conta
            </Text>
            <Input
              placeholder="E-mail"
              errorMessage="E-mail inválido"
              isInvalid
              mt={4}
            />
            <Input placeholder="Senha" isInvalid={false} />
          </Center>
          <Button title="Entrar" variant="blue" mb="16" mt="4" mx={12} />
        </VStack>
        <Center px={12} mt={16}>
          <Text color="gray.200" fontSize="sm">
            Ainda não tem acesso?
          </Text>
        </Center>
        <Button title="Criar uma conta" variant="secondary" mt="4" mx={12} />
      </VStack>
    </ScrollView>
  );
}
