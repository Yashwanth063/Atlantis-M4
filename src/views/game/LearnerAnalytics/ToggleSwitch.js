import { useState } from 'react';
import { Switch, Stack, Text } from '@chakra-ui/react';

function ToggleSwitch({ isToggled, setIsToggled }) {
  const handleToggle = () => setIsToggled(!isToggled);

  return (
    <Stack direction="row" align="center">
      <Text>Absolute Score</Text>
      <Switch isChecked={isToggled} onChange={handleToggle} />
    </Stack>
  );
}

export default ToggleSwitch;
