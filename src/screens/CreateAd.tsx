import {
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Box,
  Radio,
  Switch,
  ScrollView,
  Checkbox,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';
import { useState } from 'react';
import { Button } from '@components/Button';

export function CreateAd() {
  const [isNew, setIsNew] = useState<string>('new');
  const [groupValue, setGroupValue] = useState();
  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="space-between" mb="8">
          <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
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
            <Box
              alignItems="center"
              justifyContent="center"
              h="100"
              w="100"
              rounded="lg"
              bg="gray.500"
              mt="4"
              mb="8"
            >
              <Icon as={Feather} name="plus" color="gray.400" size="lg" />
            </Box>
          </VStack>
          <VStack>
            <Text mb="4" fontFamily="heading" fontSize="md" color="gray.200">
              Sobre o produto
            </Text>
            <Input placeholder="Título do anúncio" />
            <TextArea placeholder="Descrição do produto" />
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={isNew}
              onChange={nextValue => {
                setIsNew(nextValue);
              }}
            >
              <Box flexDirection="row">
                <Radio value="new" my={1}>
                  Produto novo
                </Radio>
                <Radio value="used" my={1} ml={4}>
                  Produto usado
                </Radio>
              </Box>
            </Radio.Group>
          </VStack>
          <VStack>
            <Text my="4" fontFamily="heading" fontSize="md" color="gray.200">
              Venda
            </Text>
            <Input
              placeholder="Valor do produto"
              InputLeftElement={
                <Text ml="4" fontSize="md" fontFamily="heading">
                  R$
                </Text>
              }
            />
            <VStack alignItems="flex-start">
              <Text fontFamily="heading" fontSize="sm" color="gray.200">
                Aceita troca?
              </Text>
              <Switch
                offTrackColor="gray.500"
                thumbColor="white"
                onTrackColor="blue.500"
              />
            </VStack>
            <Text fontFamily="heading" fontSize="sm" color="gray.200">
              Meios de pagamento aceitos
            </Text>
            <Checkbox.Group
              colorScheme="blue"
              defaultValue={groupValue}
              accessibilityLabel="pick an item"
              mb={6}
              onChange={values => {
                setGroupValue(values || []);
              }}
            >
              <Checkbox
                _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
                value="Boleto"
                my="1"
              >
                Boleto
              </Checkbox>
              <Checkbox
                value="Pix"
                my="1"
                _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
              >
                Pix
              </Checkbox>
              <Checkbox
                value="Dinheiro"
                my="1"
                _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
              >
                Dinheiro
              </Checkbox>
              <Checkbox
                value="Cartão de crédito"
                my="1"
                _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
              >
                Cartão de crédito
              </Checkbox>
              <Checkbox
                value="Depósito Bancário"
                my="1"
                _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
              >
                Depósito Bancário
              </Checkbox>
            </Checkbox.Group>
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
        <Button title="Cancelar" variant="secondary" maxWidth={200} px={4} />
        <Button title="Avançar" variant="primary" maxWidth={200} px={4} />
      </HStack>
    </>
  );
}
