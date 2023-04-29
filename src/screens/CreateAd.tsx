import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Switch,
  ScrollView,
  IconButton,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';
import { Button } from '@components/Button';
import { ICreateAdRoutes } from '@dtos/RoutesDTO';
import { CreateProductDTO, IImageUpload } from '@dtos/ProductDTO';
import { IsNewRadioContainer } from '@components/IsNewRadioContainer';
import { PaymentMethodsCheckbox } from '@components/PaymentMethodsCheckbox';
import { UploadPicturesContainer } from '@components/UploadPicturesContainer';
import { api } from '@services/api';
import { findDeletedObjects } from '@utils/helpers/arrayHelper';
import { handleError } from '@utils/handleError';

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

export function CreateAd({ navigation, route }: ICreateAdRoutes) {
  const toast = useToast();

  const { product } = route.params;

  const isEditView = !!product;

  const initialPhotos = product?.product_images;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductDTO>({
    defaultValues: isEditView
      ? {
          is_new: product.is_new,
          accept_trade: product.accept_trade,
          name: product.name,
          description: product.description,
          price: String(product.price / 100),
          payment_methods: product.payment_methods,
          product_images: product.product_images,
        }
      : { is_new: true, accept_trade: true },
    resolver: yupResolver(createAdSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToPreview = (data: CreateProductDTO) => {
    navigation.navigate('adPreview', { product: data });
  };

  const handleSuccessPress = async (data: CreateProductDTO) => {
    if (!isEditView) {
      handleGoToPreview(data);
      return;
    }

    const deletedPhotos = findDeletedObjects(
      initialPhotos as IImageUpload[],
      data.product_images,
      'path',
    );
    const deletedPhotosIds = deletedPhotos.map(image => image.id);

    const newPhotosToAdd = data.product_images.filter(
      image => image.isExternal === false,
    );

    try {
      // eslint-disable-next-line no-param-reassign
      data.price = (Number(data.price) * 100) as unknown as string;
      await api.put(`/products/${product.id}`, data);

      if (newPhotosToAdd.length) {
        const imagesForm = new FormData();
        imagesForm.append('product_id', product.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newPhotosToAdd.forEach((element: any) => {
          imagesForm.append('images', element);
        });

        await api.post('/products/images', imagesForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (deletedPhotosIds.length) {
        await api.delete('/products/images', {
          data: {
            productImagesIds: deletedPhotosIds,
          },
        });
      }

      toast.show({
        title: 'Anúncio atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.navigate('ad', { productId: product.id, isMyAd: true });
    } catch (error) {
      handleError(error);
    }
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
            {isEditView ? 'Editar anúncio' : 'Criar anúncio'}
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
              render={({ field: { value, onChange } }) => (
                <TextArea
                  placeholder="Descrição do produto"
                  value={value}
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
          title={isEditView ? 'Salvar Alterações' : 'Avançar'}
          variant="primary"
          maxWidth={200}
          px={4}
          onPress={handleSubmit(handleSuccessPress)}
        />
      </HStack>
    </>
  );
}
