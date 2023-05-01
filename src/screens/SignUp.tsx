import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
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
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Logo from '@assets/Logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';
import { ICreateUser } from '@dtos/UserDTO';

const PHOTO_SIZE = 24;

const createUserSchema = yup.object({
  name: yup.string().required('Informe o nome de usuário'),

  email: yup
    .string()
    .email('Formato de e-mail errado')
    .required('Informe um email'),

  tel: yup
    .number()
    .typeError('Please enter only numeric values')
    .nullable()
    .required('Informe um telefone')
    .min(0),

  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .transform(value => value || null)
    .required('Informe uma senha'),

  confirm_password: yup
    .string()
    .nullable()
    .transform(value => value || null)
    .oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: schema =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform(value => value || null),
    }),
});

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: yupResolver(createUserSchema),
  });

  const handleCreateUser = (data: ICreateUser) => {
    console.log(data);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

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
            <UserPhoto size={PHOTO_SIZE} imageLink="" />
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

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Nome"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              mt={4}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="E-mail"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="tel"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Telefone"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.tel?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Confirmar senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.confirm_password?.message}
            />
          )}
        />

        <Button
          title="Criar"
          variant="primary"
          mt="4"
          onPress={handleSubmit(handleCreateUser)}
        />

        <Text color="gray.200" fontSize="sm" mt={12} textAlign="center">
          Já tem uma conta?
        </Text>
        <Button
          title="Ir para o login"
          variant="secondary"
          mt="4"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
