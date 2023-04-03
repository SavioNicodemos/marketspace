import { Image, Pressable, Text } from 'native-base';

export function ProductListCard() {
  return (
    <Pressable width="40" height="40">
      <Image
        source={{
          uri: 'https://ireland.apollo.olxcdn.com/v1/files/nu0599n0tz7y-PT/image;s=1000x750',
        }}
        alt="foto do produto vendido"
        resizeMode="contain"
        position="absolute"
        width="full"
        height={30}
      />
      <Text>ProductListCard</Text>
    </Pressable>
  );
}
