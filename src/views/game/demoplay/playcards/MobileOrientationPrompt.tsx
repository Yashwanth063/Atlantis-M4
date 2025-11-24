import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Rotate from '../../../../TemplateData/rotate.svg'

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const MobileOrientationPrompt = ({ onRotate }: { onRotate: () => void }) => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
     if (!isMobileDevice) return;
    const handleOrientationChange:any = () => {
      const landscape = window.innerWidth > window.innerHeight;
      setIsLandscape(landscape);
      if (landscape) {
        onRotate();
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [onRotate]);

  if (!isMobileDevice || isLandscape) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="white"
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
       <img id="Rotation-SVG" src={Rotate}alt="Rotate" width="50%" height="50%" />
      <Text fontSize="lg" color="black" textAlign="center">
         Please enable auto-rotate and rotate your device to landscape mode to continue.
      </Text>
    </Box>
  );
};

export default MobileOrientationPrompt;
