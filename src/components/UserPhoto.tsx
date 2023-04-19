import { api } from '@services/api';
import { Image, IImageProps } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';
import defaultUserImage from '@assets/defaultAvatar.png';

type Props = IImageProps & {
  size: number;
  borderWidth?: number;
  borderColor?: ColorType;
  imageLink: string;
};

export function UserPhoto({
  size,
  borderWidth = 3,
  borderColor = 'blue.500',
  imageLink,
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
      source={
        imageLink
          ? { uri: `${api.defaults.baseURL}/images/${imageLink}` }
          : defaultUserImage
      }
      {...rest}
    />
  );
}
