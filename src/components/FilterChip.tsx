import { HStack, Text, Icon, Pressable } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';

type Props = {
  title: string;
};

export function FilterChip({ title }: Props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Pressable onPress={() => setIsActive(!isActive)}>
      <HStack
        pl="4"
        pr={isActive ? 0 : 4}
        py="1.5"
        bg={isActive ? 'blue.500' : 'gray.500'}
        rounded="full"
        alignItems="center"
      >
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={isActive ? 'white' : 'gray.200'}
        >
          {title.toUpperCase()}
        </Text>
        {isActive ? (
          <Icon
            as={Octicons}
            name="x-circle-fill"
            color="white"
            size="xs"
            mx="1.5"
          />
        ) : null}
      </HStack>
    </Pressable>
  );
}
