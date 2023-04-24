import { Box, Radio } from 'native-base';
import { useState } from 'react';

type Props = {
  onChange: (value: boolean) => void;
  value: boolean;
};

export function IsNewRadioContainer({
  onChange = () => {},
  value = true,
}: Props) {
  const [isNew, setIsNew] = useState<string>(value ? 'new' : 'used');

  const handleChangeRadioValue = (radioValue: string) => {
    setIsNew(radioValue);
    onChange(radioValue === 'new');
  };

  return (
    <Radio.Group
      name="Is New Radio Container"
      value={isNew}
      onChange={nextValue => {
        handleChangeRadioValue(nextValue);
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
  );
}
