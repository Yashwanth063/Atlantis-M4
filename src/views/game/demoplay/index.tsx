import React, { useEffect, useReducer, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Badge,
} from '@chakra-ui/react';
import NFTBanner from 'assets/img/auth/topbg.jpg';
import Card from 'components/card/Card';
import Rocket from 'assets/img/games/rocket1-removebg-preview.png';
import { MdArrowCircleRight } from 'react-icons/md';
import { getAssignedGame } from 'utils/gameApplication/gamePlayService';
import { SearchIcon } from '@chakra-ui/icons';
import { VSeparator } from 'components/separator/Separator';
import { useNavigate } from 'react-router-dom';
import { updateGameRecentlyPlayed } from 'utils/game/gameService';
import MobileOrientationPrompt from './playcards/MobileOrientationPrompt';

type State = {
  level: string;
  payload?: any;
  gameTitle?: any;
};

type Action = {
  type?: string;
  payload?: any;
  gameTitle?: any;
  [x: string]: any;
};

const reducer = (state: State, action: Action) => {
  const { type, payload, gameTitle } = action;

  switch (type) {
    case 'level_0': {
      return { ...state, level: '0', payload };
    }
    case 'level_1': {
      return { ...state, level: '1', payload };
    }
    case 'level_2': {
      return { ...state, level: '2', payload };
    }
    case 'level_3': {
      return { ...state, level: '3', payload };
    }

    default:
      return state;
  }
};

const GamePlay: React.FC = () => {
  const { data, token } = JSON.parse(localStorage.getItem('user'));
  const { id } = data;
  const navigate = useNavigate();
  const [assignedData, setFormData] = useState([]);
  const [fil, setFil] = useState<string>('');
  const [datas, setDatas] = useState<any>();
  // vignesh 08-01-24
  const [formData, setData] = useState({
    galGameId: null,
    galLearnerId: null,
    galGameState: 'level_0',
    galBlockId: null,
    galQuestionState: null,
    galTimeSpent: null,
    galAverageScore: null,
    galStartDateTime: null,
    galEndDateTime: null,
  });

  const searchIconColor = useColorModeValue('gray.700', 'white');

  const initialState: State = {
    level: '0',
  };

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const fetchAssignedGame = async () => {
    try {
      const result = await getAssignedGame(id);

      if (result?.data) {
        setFormData(result?.data); // Set the data if it exists
      } else {
        setFormData([]); // If no data, set as an empty array
      }
    } catch (error) {
      console.error('Error fetching assigned games:', error);
      setFormData([]); // Ensure it's empty in case of an error
    }
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      galLearnerId: id,
    }));
    //
    fetchAssignedGame();
  }, []);

  const handlePlay = async (gid: any) => {
    if (gid) {
      const currentDate = new Date();

      const gameLog = await updateGameRecentlyPlayed(gid);
      if (gameLog?.status === 'Success') {
        navigate(`/play/${gid}`);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('datas', datas);
  }, [datas]);

  useEffect(() => {
    const getData = localStorage.getItem('datas');
    dispatch({ type: getData });
  }, []);

  const filteredData = (assignedData || []).filter((game) =>
    game.gameTitle?.toLowerCase().includes(fil.toLowerCase()),
  );

  return (
    <>
      <Box className="LearnerGames" position={'relative'}>
        <Box
          mb={{ base: '30px', xl: '30px' }}
          mt={{ base: '0px', md: '130px', xl: '100px' }}
          className="box"
        >
          <Card
            backgroundImage={NFTBanner}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
            height={'300px'}
            width={'100%'}
            h={'auto'}
            mt={{ base: '0px', md: '87px' }}
          >
            <Box
              display={{ base: 'block', xl: 'flex' }}
              justifyContent="space-between"
              alignItems={'end'}
              padding={{ base: '0', xl: '20px' }}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Heading
                  color={'#fff'}
                  pb={'20px'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  Learning Adventures Hub{' '}
                  <Img
                    src={Rocket}
                    height={'50px'}
                    width={'50px'}
                    ml={'20px'}
                    transform={'rotate(40deg)'}
                  />
                </Heading>
                <Text fontSize={'15px'} color={'#fff'} letterSpacing={'1px'}>
                  Play. Learn. Grow. Succeed.
                </Text>
              </Box>
            </Box>
          </Card>
          <Card mt="25px">
            <Flex
              gridArea="1 / 1 / 2 / 2"
              display={{ base: 'block', lg: 'flex' }}
            >
              <VSeparator mx="30px" h="100%" />
              <InputGroup w={{ base: '100%', md: '300px' }} ml="auto">
                <InputLeftElement
                  children={
                    <IconButton
                      aria-label="search"
                      bg="inherit"
                      borderRadius="inherit"
                      _active={{
                        bg: 'inherit',
                        transform: 'none',
                        borderColor: 'transparent',
                      }}
                      _hover={{
                        background: 'none',
                      }}
                      _focus={{
                        background: 'none',
                        boxShadow: 'none',
                      }}
                      icon={
                        <SearchIcon color={searchIconColor} w="15px" h="15px" />
                      }
                    />
                  }
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={fil || ''}
                  onChange={(e) => setFil(e.target.value)}
                  bg={'#f9f9f9'}
                  borderRadius={'14px'}
                  w={{ base: '200px', xl: '300px' }}
                />
              </InputGroup>
            </Flex>
          </Card>
        </Box>

        <Card
          mt="10px"
          content={assignedData.length === 0 ? 'Ooops...! No Game Found' : ''}
          // bg={assignedData.length === 0 ? 'grey' : ''}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredData.length !== 0 &&
              filteredData?.map((game, i) => (
                <Card
                  key={i}
                  borderRadius={'15px'}
                  justifyContent={'center'}
                  boxShadow={'1px 4px 29px #44445429'}
                  transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                  position={'relative'}
                  width={'100%'}
                  padding={'10px'}
                  className="list-card"
                >
                  <Box
                    position={'relative'}
                    overflow={'hidden'}
                    borderRadius={'10px'}
                  >
                    <Img
                      className="list-img"
                      // src={img && img[i]?.gasAssetImage}
                      // src={'http://192.168.1.46:5555/uploads/background/9ls0_4iri_201221.jpg'}
                      // src={`http://192.168.1.46:5555/${game.gasAssetImage}`}
                      src={`${game?.image?.gasAssetImage}`}
                      height={'220px'}
                      width={'100%'}
                      borderRadius={'15px'}
                      position={'relative'}
                    />
                    {game?.status === 'not yet started' && (
                      <Badge
                        position="absolute"
                        top="0px"
                        left="0px"
                        variant="solid"
                        borderTopLeftRadius={'5px'}
                        borderBottomLeftRadius={'0px'}
                        borderTopRightRadius={'0px'}
                      >
                        Newly Assigned
                      </Badge>
                    )}
                  </Box>
                  <Flex justifyContent={'space-between'} margin={'10px 0'}>
                    <Box>
                      <Text
                        color={'#2b2b2ede'}
                        fontSize={'16px'}
                        fontWeight={'800'}
                      >
                        {game?.gameTitle}
                      </Text>

                      {game?.skillNames.map((skill: any, i: any) => (
                        <Box
                          as="button"
                          key={i}
                          borderRadius="md"
                          bg="lightblue"
                          color="blue"
                          px={4}
                          // h={8}
                          margin={'2px 0 0 2px'}
                        >
                          {skill}
                        </Box>
                      ))}

                      <Text
                        color={'#745c5cc9'}
                        mt={'5px'}
                        fontSize={'14px'}
                        fontWeight={'700'}
                        height={'30px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                      >
                        {game?.ctName}
                      </Text>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <Button
                        bg={'linear-gradient(to left, #7551ff, #3311db)'}
                        _hover={{
                          bg: 'linear-gradient(to left, #7551ff, #3311db)',
                        }}
                        borderRadius={'150px'}
                        height={'40px'}
                        width={'40px'}
                        boxShadow={'2px 4px 13px #4845456b'}
                        // onClick={handlePlay}
                        onClick={() => handlePlay(game?.gameId)}
                      >
                        <Icon
                          as={MdArrowCircleRight}
                          color={'#fff'}
                          fontSize={'22px'}
                        />
                      </Button>
                    </Box>
                  </Flex>
                </Card>
              ))}
          </SimpleGrid>
        </Card>
      </Box>
    </>
  );
};

export default GamePlay;
