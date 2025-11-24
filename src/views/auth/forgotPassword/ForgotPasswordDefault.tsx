import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useColorModeValue, Text,useToast } from '@chakra-ui/react';
import { useState } from 'react';
import DefaultAuth from 'layouts/auth/variants/Default';
import { forgotLearnerPassword } from 'utils/leaner/leaner';
import OnToast from 'components/alerts/toast';
import illustration from 'assets/img/avatars/LogoAtlantis.png';
import { HashLoader } from 'react-spinners';

function ForgotPassword() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  
 
  const toast = useToast();


  const [loading, setLoading] = useState(false);


  const [message, setMessage] = useState('');

  const [email, setEmail] = useState('');

const handleSubmit = async (e:any) => {
  e.preventDefault();

  if (!email) {
    // Show toast message for empty email
    toast({
      title: "Email is required",
      description: "Please enter your email address.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  // Validate email format using regex
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    // Show toast message for invalid email format
    toast({
      title: "Invalid email address",
      description: "Please enter a valid email address.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  try {
    setLoading(true); 
    const result = await forgotLearnerPassword({ email });
    if (result.error) {
      toast({
        // title: "Error",
        description: result.error, // Display the error message from the result
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Show success message if no error
      toast({
        title: "Success",
        description: "Password reset email sent!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('resetEmail', email);
    }
  } catch (error) {
    // Catch any other errors (like network issues or unexpected issues)
    toast({
      // title: "Error",
      description: "An error occurred. Please try again later.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }finally{
    setLoading(false); 
  }
};

  
  


  return (
    <>
    {loading && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
              <HashLoader color="#3b38e0" />
            </div>
          )}
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        w="100%"
        maxW="max-content"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px', lg: '100px', xl: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', lg: '16vh', xl: '22vh' }}
        flexDirection="column"
      >
        <Box me="auto" mb="34px">
          <Heading color={textColor} fontSize={{ base: '2lg', md: '16px' }} mb="10px">
            Forgot your password?
          </Heading>
          <Text color={textColorSecondary} fontSize="md" w={{ base: '100%', lg: '456px' }} maxW="100%">
            No problem. Just enter your email address, and we'll send you a password reset link.
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', lg: '456px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
          align="start"
        >
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl>
              <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
               
                variant="auth"
                fontSize="sm"
               
                placeholder="mail@example.com"
                mb="24px"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" mb="24px" type="submit">
                Email password reset link
              </Button>
            </FormControl>
          </form>
          {message && <Text color="red.500">{message}</Text>}
        </Flex>
      </Flex>
    </DefaultAuth>
    </>
  );
}

export default ForgotPassword;
