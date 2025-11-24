import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NoAuth: React.FC<{ isAuthFailed: boolean, status: string , bgImage : string, isLoading:boolean ,reviewStatus :boolean}> = ({ isAuthFailed, status, bgImage, isLoading ,reviewStatus}) => {
  const navigate = useNavigate();
  const [isReload, setIsReload] = useState<boolean>(false);
  
   
    
    const goHome = ()=>{
        navigate('/auth/sign-in/default');
    }
    const doReload = ()=>{
      window.location.reload();
    }
  return (
    <Box width={'100%'} h={'100vh'} display={'flex'} justifyContent={"center"} alignItems={"center"} bgImage={bgImage} bgAttachment={'fixed'} bgSize={'cover'}>
      {isAuthFailed === true && isLoading === false && status !=='Msg' && (
        <>
        {reviewStatus === true ? <><Box w={{ base: '90%', md: '60%', lg: '30%' }}>
            <Text mb={'10px'} textAlign={'center'} color={'whitesmoke'}  variant="brand"> {status}</Text>
          </Box> </> :
          <Box w={{ base: '90%', md: '60%', lg: '30%' }}>
            <Text mb={'10px'} textAlign={'center'} color={'whitesmoke'}  variant="brand"> {status}</Text>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="600"
              w="100%"
              h="50"
              mb="24px"
              onClick={isReload ? doReload : goHome}
            >
              {isReload ? "Reload" : "Go to Login Page"}
            </Button>
          </Box>
      }
        </>
      )}
      {isAuthFailed === true && isLoading === false && status ==='Msg' && (
        <>
          <Box w={{ base: '90%', md: '60%', lg: '30%' }}>
            <Text mb={'10px'} textAlign={'center'} color={'whitesmoke'}  variant="brand"> {'You may go back to the game creation  and create a story'}</Text>
          </Box>
        </>
      )}
    </Box>
  )
}

export default NoAuth;