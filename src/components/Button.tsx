/* eslint-disable no-nested-ternary */
import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'blue' | 'primary' | 'secondary';
};

export function Button({ title, variant = 'primary', ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={
        variant === 'blue'
          ? 'blue.500'
          : variant === 'primary'
          ? 'gray.100'
          : 'gray.500'
      }
      borderColor="green.500"
      rounded="md"
      _pressed={{
        bg:
          variant === 'blue'
            ? 'blue.700'
            : variant === 'primary'
            ? 'gray.200'
            : 'gray.600',
      }}
      {...rest}
    >
      <Text
        color={variant === 'secondary' ? 'gray.200' : 'gray.700'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
