import { Image, IImageProps } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';

type Props = IImageProps & {
  size: number;
  borderWidth?: number;
  borderColor?: ColorType;
};

export function UserPhoto({
  size,
  borderWidth = 3,
  borderColor = 'blue.500',
  ...rest
}: Props) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={borderWidth}
      borderColor={borderColor}
      alt="Foto de perfil do usuário"
      {...rest}
    />
  );
}
