import { Checkbox, FormControl } from 'native-base';
import { useState } from 'react';

import { PaymentMethodsTypes } from '@dtos/ProductDTO';

type Props = {
  errorMessage?: string | null;
  isInvalid?: boolean;
  onChange: (value: PaymentMethodsTypes[]) => void;
  value: PaymentMethodsTypes[];
};

export function PaymentMethodsCheckbox({
  errorMessage = null,
  isInvalid,
  value = [],
  onChange = () => {},
}: Props) {
  const [checkboxesValue, setValue] = useState<PaymentMethodsTypes[]>(value);

  const isInvalidField = !!errorMessage || isInvalid;

  const handleChangeCheckboxes = (values: PaymentMethodsTypes[]) => {
    setValue(values);
    onChange(values);
  };

  return (
    <FormControl isInvalid={isInvalidField} mb={4}>
      <Checkbox.Group
        colorScheme="blue"
        value={checkboxesValue}
        accessibilityLabel="pick an item"
        onChange={handleChangeCheckboxes}
      >
        <Checkbox
          _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
          value="boleto"
          my="1"
        >
          Boleto
        </Checkbox>
        <Checkbox
          value="pix"
          my="1"
          _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
        >
          Pix
        </Checkbox>
        <Checkbox
          value="cash"
          my="1"
          _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
        >
          Dinheiro
        </Checkbox>
        <Checkbox
          value="card"
          my="1"
          _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
        >
          Cartão de crédito
        </Checkbox>
        <Checkbox
          value="deposit"
          my="1"
          _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
        >
          Depósito Bancário
        </Checkbox>
      </Checkbox.Group>

      <FormControl.ErrorMessage
        _text={{ color: 'red.500' }}
        bg="red.100"
        borderBottomLeftRadius="sm"
        borderBottomRightRadius="sm"
        mt={0}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
