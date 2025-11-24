
// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
// Assets
import banner from 'assets/img/auth/banner.png';
import profile from 'assets/img/avatars/pro.png';

// Custom components
import Info from './components/Info';
import Password from './components/Password';
import Profile from './components/Profile';
import Socials from './components/Socials';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLearnerById } from 'utils/leaner/leaner';

export default function Settings() {
  const [learner,setLearner] = useState<any>();
  const [funk, setFunk] = useState();
  const storage = JSON.parse(localStorage.getItem('user'));
     const {id} = useParams();
     const Learner = async (id:string) =>{
      const result = await getLearnerById(id)
      if(result?.status !== 'Success') return console.log('getCretaor error :',result?.message)
      setLearner(result?.data);
      setFunk(result?.data);
     }
     useEffect(()=>{
      Learner(storage.data.id); 
     },[])
    console.log('creator',learner);
  return (
    <Box pt={{ base: '20px', md: '80px', xl: '80px' }}>

      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        
        <Flex direction="column">
          <Profile name="Vlad Mihalache" data={learner} avatar={profile} banner={banner} />
          <Info funk={funk} setFunk={setFunk}/>
        </Flex>
        
        <Flex direction="column">
        <Password />  
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

