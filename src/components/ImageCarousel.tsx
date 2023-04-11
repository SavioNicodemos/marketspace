import { HStack, View, Image, Center } from 'native-base';
import Carousel from 'react-native-reanimated-carousel';
import { useState } from 'react';
import { Dimensions } from 'react-native';

type Props = {
  images: string[];
};

export function ImageCarousel({ images }: Props) {
  const { width } = Dimensions.get('window');
  const [viewingImageIndex, setViewingImageIndex] = useState(0);
  return (
    <>
      <Carousel
        width={width}
        height={width / 1.34}
        data={images}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 50,
        }}
        pagingEnabled
        snapEnabled
        onSnapToItem={index => setViewingImageIndex(index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={{
                uri: item,
              }}
              resizeMode="cover"
              alt="."
              width="full"
              h="full"
            />
          </View>
        )}
      />
      <Center mt={-9} mb={2}>
        <HStack space={1} bg="#0000005f" p="2" rounded="full">
          {images.map((item, index) => (
            <View
              key={item}
              h="2"
              w="2"
              bg={viewingImageIndex === index ? 'gray.700' : 'gray.300'}
              rounded="full"
            />
          ))}
        </HStack>
      </Center>
    </>
  );
}
