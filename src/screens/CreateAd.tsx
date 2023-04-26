import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Switch,
  ScrollView,
  IconButton,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';
import { Button } from '@components/Button';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { CreateProductDTO } from '@dtos/ProductDTO';
import { IsNewRadioContainer } from '@components/IsNewRadioContainer';
import { PaymentMethodsCheckbox } from '@components/PaymentMethodsCheckbox';
import { UploadPicturesContainer } from '@components/UploadPicturesContainer';

const createAdSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),

  description: yup.string().required('Informe uma descrição para o produto'),

  price: yup
    .number()
    .typeError('Please enter only numeric values')
    .nullable()
    .required()
    .min(0)
    .max(100000),

  payment_methods: yup
    .array()
    .min(1, 'Informe pelo menos um método de pagamento')
    .required('Informe pelo menos um método de pagamento'),

  product_images: yup
    .array()
    .min(1, 'Adicione pelo menos uma foto do produto')
    .required('Adicione pelo menos uma foto do produto'),
});

export function CreateAd() {
  const navigation = useNavigation<INavigationRoutes['navigation']>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductDTO>({
    defaultValues: { is_new: true, accept_trade: true },
    resolver: yupResolver(createAdSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToPreview = (data: CreateProductDTO) => {
    navigation.navigate('adPreview', { product: data });
  };

  const handlePreviewAd = (data: CreateProductDTO) => {
    handleGoToPreview(data);
  };

  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="space-between" mb="8">
          <IconButton
            icon={
              <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
            }
            rounded="full"
            onPress={handleGoBack}
          />

          <Heading fontSize="lg" color="gray.100" ml={-5}>
            Meus anúncios
          </Heading>
          <VStack />
        </HStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack>
            <Text fontFamily="heading" fontSize="md" color="gray.200">
              Imagens
            </Text>
            <Text color="gray.300" fontSize="sm">
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível!
            </Text>

            <Controller
              control={control}
              name="product_images"
              render={({ field: { value, onChange } }) => (
                <UploadPicturesContainer
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.product_images?.message}
                />
              )}
            />
          </VStack>
          <VStack>
            <Text mb="4" fontFamily="heading" fontSize="md" color="gray.200">
              Sobre o produto
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Título do anúncio"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <TextArea
                  placeholder="Descrição do produto"
                  onChangeText={onChange}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="is_new"
              render={({ field: { value, onChange } }) => (
                <IsNewRadioContainer value={value} onChange={onChange} />
              )}
            />
          </VStack>
          <VStack>
            <Text my="4" fontFamily="heading" fontSize="md" color="gray.200">
              Venda
            </Text>
            <Controller
              control={control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Valor do produto"
                  errorMessage={errors.price?.message}
                  InputLeftElement={
                    <Text ml="4" fontSize="md" fontFamily="heading">
                      R$
                    </Text>
                  }
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <VStack alignItems="flex-start">
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>

              <Controller
                control={control}
                name="accept_trade"
                render={({ field: { value, onChange } }) => (
                  <Switch
                    offTrackColor="gray.500"
                    thumbColor="white"
                    onTrackColor="blue.500"
                    value={value}
                    onValueChange={onChange}
                  />
                )}
              />
            </VStack>
            <Text fontFamily="heading" fontSize="sm" color="gray.200">
              Meios de pagamento aceitos
            </Text>

            <Controller
              control={control}
              name="payment_methods"
              render={({ field: { value, onChange } }) => (
                <PaymentMethodsCheckbox
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.payment_methods?.message}
                />
              )}
            />
          </VStack>
        </ScrollView>
      </VStack>
      <HStack
        justifyContent="space-between"
        bg="white"
        pt={4}
        pb={8}
        alignItems="center"
        px="6"
        space={4}
      >
        <Button
          title="Cancelar"
          variant="secondary"
          maxWidth={200}
          px={4}
          onPress={handleGoBack}
        />
        <Button
          title="Avançar"
          variant="primary"
          maxWidth={200}
          px={4}
          onPress={handleSubmit(handlePreviewAd)}
        />
      </HStack>
    </>
  );
}
