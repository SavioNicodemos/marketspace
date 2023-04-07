/* eslint-disable import/no-extraneous-dependencies */
import {
  Modal,
  IconButton,
  Switch,
  Checkbox,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

import { FilterChip } from './FilterChip';
import { Button } from './Button';

type Props = {
  visible: boolean;
  onClose?: () => void;
};

export function FiltersModal({ visible, onClose = () => {} }: Props) {
  const [groupValue, setGroupValue] = useState(['Photography', 'Gardening']);
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      animationPreset="slide"
      justifyContent="flex-end"
    >
      <VStack
        width="full"
        bg="gray.600"
        py="8"
        px="6"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
        space="5"
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Heading color="gray.100" fontSize="lg">
            Filtrar anúncios
          </Heading>
          <IconButton
            rounded="full"
            icon={<Icon as={Feather} name="x" color="gray.400" size="lg" />}
            onPress={onClose}
          />
        </HStack>
        <VStack space={3}>
          <Text fontSize="sm" fontWeight="bold">
            Condição
          </Text>
          <HStack space={2}>
            <FilterChip title="Novo" />
            <FilterChip title="Usado" />
          </HStack>
        </VStack>
        <VStack alignItems="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            Aceita troca?
          </Text>
          <Switch
            offTrackColor="gray.500"
            thumbColor="white"
            onTrackColor="blue.500"
          />
        </VStack>
        <VStack space={2}>
          <HStack alignItems="baseline">
            <Heading fontSize="lg">Meios de pagamento aceito</Heading>
          </HStack>
          <Checkbox.Group
            colorScheme="blue"
            defaultValue={groupValue}
            accessibilityLabel="pick an item"
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
        <HStack space={2} mt="4">
          <Button title="Resetar filtros" variant="secondary" flex={1} />
          <Button title="Aplicar filtros" flex={1} />
        </HStack>
      </VStack>
    </Modal>
  );
}
