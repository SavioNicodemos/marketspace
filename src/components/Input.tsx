import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid: boolean;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const isInvalidField = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={isInvalidField} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={12}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={isInvalidField}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue.500',
        }}
        {...rest}
      />
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
