
import {
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    useColorModeValue,
    Text,
  
  
  } from '@chakra-ui/react';
  
  import InputField from 'components/fields/InputField';
  import React, { useState,useEffect } from 'react';
  import { useParams,useNavigate } from 'react-router-dom';
  
  // Custom components
  import OnToast from 'components/alerts/toast';
  import { PasswordValidation } from 'utils/formValidations/validations';
  
  import {
    resetLearnerPassword
  } from 'utils/leaner/leaner';
  import { checkPasswordset } from 'utils/creator/creator';
  import { HashLoader } from 'react-spinners';
  const ResetPasswordCentered: React.FC = () => {
  
  
    const [password, setPassword] = useState<{
      password: string;
      confirmPassword: string;
    }>({ password: '', confirmPassword: '' });
    const [err, setErr] = useState(false); 
    const [alert, setAlert] = useState(false); 
    const [msg, setMsg] = useState(null);
    const { type, uuid } = useParams();
    const [loading, setLoading] = useState(true);
    const [urlFound, setUrlFound] = useState(false);
    const navigate = useNavigate();
  
    const textColor = useColorModeValue('navy.700', 'white');
  
  
  
    useEffect(() => {
      
      const checkUrl = async () => {
        try {
          let dataToSend = {
            uuid: uuid,
            type: type,
          };
        
          let checkPasswordsetResult = await checkPasswordset(uuid, JSON.stringify(dataToSend));
          console.log("checkPasswordsetResult", checkPasswordsetResult);
          setLoading(true);
          if (checkPasswordsetResult?.status === 'Success') {
            // const gamePlayRoutePath = 'https://test.atlantisworld.co';
            const gamePlayRoutePath = 'https://play.atlantisworld.co';
            const url = `${gamePlayRoutePath}`;
            window.location.href = url;
          } else {
            setLoading(false);
          }
  
        } catch (e) {
          setMsg('An error occurred while checking the URL');
          setLoading(false); 
        }
      };
    
    
      checkUrl();
    }, [uuid, type]);
    
  
  
    const handleChange = (val: string, field: string) => {
      if (field === 'pwd') {
       
        setPassword({ ...password, password: val });
      } else {
        setPassword({ ...password, confirmPassword: val });
      }
    };
    const handleSubmit = async () => {
      
      if (password.confirmPassword === '') {
        setErr(true);
        setAlert(true);
        setMsg('Confirm Password Field is Empty');
      } else if (password.password == '') {
        setErr(true);
        setAlert(true);
        setMsg('Password Field is Empty');
      } else if (
        password.confirmPassword !== '' &&
        password.confirmPassword != password.password
      ) {
        setErr(true);
        setAlert(true);
        setMsg('Password and Confirm passwords are not matched');
      } else {
        let valid = PasswordValidation(password.password, 8, 16);
        if (valid.err) {
          setErr(true);
          setAlert(true);
          setMsg(valid.msg);
        } else {
          setErr(false);
          setAlert(false);
          let dataToSend = {
            password: password.password,
            uuid: uuid,
            type: type,
          };
      
          let updatePasswordResult = await resetLearnerPassword(uuid,  JSON.stringify(dataToSend));
          console.log("resetLearnerPassword",updatePasswordResult)
          setMsg(updatePasswordResult?.message);
          setAlert(true);
          updatePasswordResult?.status ==="Success" ? setErr(false) : setErr(true);
          
          setTimeout(function(){
            setErr(false);
            setMsg("");
            setAlert(false);
            console.log('***type',type)
            if(type === 'learner')
            {
              console.log('***type1',type)
              // const gamePlayRoutePath = 'https://test.atlantisworld.co'
              const gamePlayRoutePath = 'https://play.atlantisworld.co'
              const url = `${gamePlayRoutePath}`;
              console.log(url,'url123')
              window.location.href = url;
            }
          
            else
            {
              navigate('/auth/sign-in/default');
            }
          },2500);
        }
      }
  
    };
  
  
    if (loading) {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
            <HashLoader color="#3b38e0" />
          </div>
      );
    }
   
       return (
  
      <Flex
        w="100%"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        px={{ base: '25px', md: '0px' }}
        flexDirection="column"
      >
        <Box mb="34px">
          <Heading
            color={textColor}
            fontSize={{ base: '3xl', md: '36px' }}
            mb="16px"
          >
            Set your Password
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', lg: '456px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          align="start"
        >
          <FormControl>
            <InputField
              mb="10px"
              me="30px"
              id="ctPassword"
              name="ctPassword"
              isRequired={true}
              label="New Password1"
              placeholder="eg. pass"
              type="password"
              onChange={(e: any) => handleChange(e.target.value, 'pwd')}
              value={password.password}
              autoComplete="off"
            />
            <Text
              fontSize={13}
              mb="15px"
             >
                Note:
               The password must include :8 Charcters,a digit,a special character,uppercase
              </Text>
            
            <InputField
              mb="10px"
              me="30px"
              id="cnfPassword"
              name="cnfPassword"
              isRequired={true}
              label="Confirm Password"
              placeholder="eg. pass"
              type="text"
              // onChange={(e : any)=>{
              //   console.log(e);
              //   setPassword({...password, confirmPassword:e.target.value})
              // }}
              onChange={(e: any) => handleChange(e.target.value, 'cnf')}
              value={password.confirmPassword}
              autoComplete="off"
            />
            {alert ? (
              <OnToast msg={msg} status={err ? 'error' : 'success'} setAlert={setAlert} />
            ) : null}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    );
    
   
  };
  
  export default ResetPasswordCentered;
  