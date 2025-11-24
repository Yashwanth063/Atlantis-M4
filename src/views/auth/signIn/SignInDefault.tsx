/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/variants/Default';
// Assets
// import illustration from 'assets/img/auth/auth.png';
// import illustration from 'assets/img/auth/book.png';
import illustration from 'assets/img/avatars/LogoAtlantis.png';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import AuthApi from 'api/auth';
import { useAuth } from 'contexts/auth.context';
import { useNavigate } from 'react-router-dom';

import {learnerLogin} from 'utils/gameApplication/learnerProfile'
import OnToast from 'components/alerts/toast';
import { HashLoader } from 'react-spinners';
function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColorError = useColorModeValue('red.500', 'red');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email   : "", // DEFAULT Auth HERE (email) 
		password: ""  // DEFAULT Auth HERE (password)                              
  });
  const [error, setError] = React.useState('');
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<string>('');
  const token = localStorage.getItem('user');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  console.log('userss',user)
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    const {name,value} = event.target;
    setFormData((prev)=>({...prev,[name]:value}));
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    let data = JSON.stringify(formData);
    if(formData?.email === '' || formData?.password === '') {
      setMsg('Please Enter the  Username And Password');
      setToastStatus('error');
      setAlert(true);
      return false;
    }
    
    setLoading(true); 
    try {
    const result = await learnerLogin(data);
    if(result?.status !== 'Success') {
      setMsg('Incorrect Username Or Password');
      setToastStatus('error');
      setAlert(true);
      return false; 
    } 
    let valid = {data:result?.data,token:result?.token,role:result?.role};
    let user = JSON.stringify(valid);
    setUser(user);
    localStorage.setItem('user',user);
    
    // navigate('/game/dashboards');
    navigate('/game/gamePlay');
    window.location.reload();
  }catch (error) {
      setMsg('An error occurred. Please try again later.');
      setToastStatus('error');
      setAlert(true);
    } finally {
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
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="15px">
            Sign In
          </Heading>
          {/* <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Full-stack Starter built with React and Chakra UI
          </Text> */}
        </Box>
        { user && user?.token ? (
          <>
          <Text
          fontSize="xl"
          color={textColor}
          fontWeight="bold"
          textAlign="center"
          mb="22px"
        >
          Hi {user?.data?.name} Welcome back—you're already signed in.
        </Text>
          <Button
          fontSize="sm"
          // onClick={()=>navigate('/game/dashboards/default')}
          onClick={()=>navigate('/game/gamePlay')}
          variant="brand"
          fontWeight="500"
          w="100%"
          h="50"
          mb="24px"
        >
          Go To Dashboard
        </Button>
        </>
        ) : (
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: '100%', md: '420px' }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: 'auto', lg: 'unset' }}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
          >
            {/* <Button
              fontSize="sm"
              me="0px"
              mb="26px"
              py="15px"
              h="50px"
              borderRadius="16px"
              bg={googleBg}
              color={googleText}
              fontWeight="500"
              _hover={googleHover}
              _active={googleActive}
              _focus={googleActive} 
            >
              <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
              Sign in with Google
            </Button> */}
            {/* <Flex align="center" mb="25px">
              <HSeparator />
              <Text color="gray.400" mx="14px">
                or
              </Text>
              <HSeparator />
            </Flex> */}
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Emails<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: '0px', md: '0px' }}
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                fontWeight="500"
                size="lg"  
                name="email"
                onChange={handleChange}
                value={formData?.email}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                  name="password"
                  onChange={handleChange}
                  value={formData?.password}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <div 
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                
              }}
              >
                <div 
                style={{
                    display:"flex"

                }}
              >
                  <Checkbox
                    id="remember-login"
                    colorScheme="brandScheme"
                   
                  />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    fontWeight="normal"
                    color={textColor}
                   
                  >
                    Keep me logged in
                  </FormLabel>
                </div>
                {/* <NavLink to="https://appseed.us/support/">
                  <Text color={textColorBrand} fontSize="sm" fontWeight="500">
                    Support
                  </Text>
                </NavLink> */}
                <Text  fontWeight="400" fontSize="14px">
            
            <NavLink to="/learnerforgotPassword">
              <Text
               
                as="span"
           style={{
            color:'#422AFB'
           }}
                fontWeight="500"
              >
                Forgot Password
              </Text>
            </NavLink>
          </Text> 
              </div>
              <Flex justifyContent="center" align="center" mb="24px">
                <Text
                  color={textColorError}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  {error}
                </Text>
              </Flex>
              <Button
                fontSize="sm"
                onClick={handleLogin}
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign In
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              {/* <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <NavLink to="/auth/sign-up/default">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                    Create an Account
                  </Text>
                </NavLink>
              </Text> */}
            </Flex>
          </Flex>
        )}
      </Flex>
    </DefaultAuth>
      {alert ? <OnToast msg={msg} status={toastStatus}  setAlert={setAlert} /> : null}
      </>
  );
}

export default SignIn;
