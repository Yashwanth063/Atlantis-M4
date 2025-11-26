import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Img,
  Input,
  useToast,
} from '@chakra-ui/react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { ProfileContext } from '../EntirePreview';
import { updateLearnerNickName } from 'utils/gameApplication/gamePlayService';

interface PlayGamesProps {
  formData?: any;
  state?: any;
  dispatch?: any;
  setDatas?: any;
  imageSrc?: any;
  setCurrentScreenId?: any;
  players?: any;
  setSelectedPlayer?: any;
  profileData?: any;
  setProfileData?: any;
  demoBlocks?: any;
  preloadedAssets?: any;
  currentScreenId: any;
  ModelPlayer: any;
  setLearnerPlayingDetails: any;
  learnerPlayList: any;
  backgroundtheme: any;
  selectedBackground: any;
}

const IsErrorInitialState: { name: string | null } = {
  name: null,

};
const spokenLanguages = [
  'English',
  'Spanish',
  'Mandarin Chinese',
  'Hindi',
  'French',
  'Arabic',
  'Bengali',
  'Russian',
  'Portuguese',
  'Urdu',
  'Indonesian',
  'German',
  'Japanese',
  'Swahili',
  'Turkish',
  'Italian',
  'Thai',
  'Dutch',
  'Korean',
  'Vietnamese',
];

const Characterspage: React.FC<PlayGamesProps> = ({
  state,
  dispatch,
  setDatas,
  imageSrc,
  setCurrentScreenId,
  players,
  setSelectedPlayer,
  profileData,
  setProfileData,
  demoBlocks,
  formData,
  preloadedAssets,
  currentScreenId,
  ModelPlayer,
  setLearnerPlayingDetails,
  learnerPlayList, selectedBackground,
  backgroundtheme,
}) => {
  const [i, setI] = useState(0);
  const [toggleLeft, setToggleLeft] = useState(false);
  const [toggleRight, setToggleRight] = useState(false)
  const [blackScreen, setBlackScreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const toast = useToast();
  const useData = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(IsErrorInitialState);
  // const [formState, setFormState] = useState<any>({
  //   name: learnerPlayList?.LearnerProfile?.nickName || learnerPlayList?.LearnerProfile?.name || '', 
  // });

  const [formState, setFormState] = useState<any>({
    name: '',
  });

  // useEffect(() => {

  //   if (learnerPlayList?.LearnerProfile?.nickName) {
  //     setFormState((prevState: any) => ({
  //       ...prevState,
  //       name: learnerPlayList.LearnerProfile.nickName,
  //     }));
  //   } else if (learnerPlayList?.LearnerProfile?.name) {
  //     setFormState((prevState: any) => ({
  //       ...prevState,
  //       name: learnerPlayList.LearnerProfile.name,
  //     }));
  //   }
  // }, [learnerPlayList]);

  // const selectPlayerClick = async () => {
  //   const Errors = {
  //     name: formState.name.trim() === '' ? 'Alias name is empty! Please enter an alias name' : null,
  //   };
  //   setIsError(Errors);

  //   const isErrorPresent = Object.values(Errors).some((error) => error !== null);

  //   if (isErrorPresent) {
  //     toast({
  //       title: 'Error',
  //       description: 'Alias name is empty! Please enter an alias name.',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom-right',
  //     });
  //     return;
  //   }

  //   // Ensure we are updating the learner's nickname in the correct place
  //   const data = {
  //     learnerPlayList: {
  //       ...learnerPlayList,
  //       LearnerProfile: {
  //         ...learnerPlayList?.LearnerProfile,
  //         nickName: formState.name.trim(), // Ensure this is the updated name
  //       },
  //     },
  //   };

  //   // Send the updated nickname to the backend
  //   const dataString = JSON.stringify(data);
  //   const UpdateLearnerNickname = await updateLearnerNickName(dataString);





  //   // Handle backend response
  //   if (UpdateLearnerNickname?.status === 'Success' && UpdateLearnerNickname?.data) {
  //     setLearnerPlayingDetails((prev: any) => ({
  //       ...prev,
  //       LearnerProfile: {
  //         ...prev.LearnerProfile,
  //         nickName: UpdateLearnerNickname?.data?.lenNickName, // Assuming this is the correct key
  //       },

  //     }));

  //     setFormState((prevState: any) => ({
  //       ...prevState,
  //       name: UpdateLearnerNickname?.data?.lenNickName, // Update formState with the new nickname
  //     }));
  //   }

  //   // Update local profile data
  //   setProfileData((prev: any) => ({
  //     ...prev,
  //     name: formState.name,
  //   }));

  //   // Trigger motion effect (assuming this is needed)
  //   useData?.setMotionEffect(true);

  //   // Change screen after a delay
  //   setTimeout(() => {
  //     const i = 0;
  //     setSelectedPlayer(players[i]);
  //     setCurrentScreenId(13);
  //   }, 300);
  // };

  const selectPlayerClick = async () => {
    if (!formState.name.trim()) {
      toast({
        // title: 'Error',
        description: 'Please Enter Your Name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    // Update backend & local state
    const data = {
      learnerPlayList: {
        ...learnerPlayList,
        LearnerProfile: {
          ...learnerPlayList?.LearnerProfile,
          nickName: formState.name.trim(),
        },
      },
    };
    const dataString = JSON.stringify(data);
    const UpdateLearnerNickname = await updateLearnerNickName(dataString);

    if (UpdateLearnerNickname?.status === 'Success' && UpdateLearnerNickname?.data) {
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        LearnerProfile: {
          ...prev.LearnerProfile,
          nickName: UpdateLearnerNickname?.data?.lenNickName,
        },
      }));
    }

    setProfileData((prev: any) => ({
      ...prev,
      name: formState.name,
    }));

    useData?.setMotionEffect(true);

    setTimeout(() => {
      const i = 0;
      setSelectedPlayer(players[i]);
      setCurrentScreenId(13);
    }, 300);
  };


  const handleInputChange = (e: any) => {
    const { value } = e.target;
    const trimmedValue = value.slice(0, 15);


    setFormState((prevState: any) => ({
      ...prevState,
      name: trimmedValue,
    }));
    setLearnerPlayingDetails((prevState: any) => ({
      ...prevState,
      LearnerProfile: {
        ...prevState.LearnerProfile,
        nickName: trimmedValue, // Set the new name as the nickname
      },

    }));

  };
  const [rightBlink, setRightBlink] = useState(false);



  useEffect(() => {

  }, [formState.name]);




  let theme: string | string[] = '';
  if ([1, 2, 3].includes(backgroundtheme?.gasId)) {
    theme = 'Medieval';
  } else if ([4, 5, 6].includes(backgroundtheme?.gasId)) {
    theme = 'Future';
  } else if ([10, 11, 12].includes(backgroundtheme?.gasId)) {
    theme = 'Real';
  } else if ([7, 8, 9].includes(backgroundtheme?.gasId)) {
    theme = ['Magical'];
  }



  const matchingCharacter = preloadedAssets?.Player_Image?.filter((char: any) =>
    Array.isArray(theme) ? theme.includes(char.theme) : char.theme === theme
  );

  const [blinking, setBlinking] = useState(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedCharacter, setSelectedCharacter] = useState(matchingCharacter[0]);


  const [selectedIndex, setSelectedIndex] = useState(0); // Initialize index as 0
  const choosegender = profileData?.gender && profileData?.gender === 'Female' ? preloadedAssets.Player_Image[1] : preloadedAssets.Player_Image[0];
  // const [selectedCharacter, setSelectedCharacter] = useState(preloadedAssets.Player_Image[0]);
  const [toggleLeftCharacter, setToggleLeftCharacter] = useState(false);
  const [toggleRightCharacter, setToggleRightCharacter] = useState(false);

  const getTexture = (selected: number): THREE.Texture => {

    const asset = selectedCharacter;

    return new THREE.TextureLoader().load(asset?.src || 'fallback-image-url.png');
  };


  useEffect(() => {
    if (selectedCharacter?.id) {
      setProfileData((prev: any) => ({ ...prev, gender: selectedCharacter?.id, selectedplayer: selectedCharacter?.name }));
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,

        player_gender: selectedCharacter?.id,
        selectedplayer_charcter: selectedCharacter?.name
      }));
    }
  }, [selectedCharacter]);



  return (
    <>
      <Img
        src={preloadedAssets.Login}
        onLoad={() => setLoaded(true)}
        display={'none'}
      />
      {loaded && <Box
        position="relative"
        // w={'100%'}
        // height="100vh"

        backgroundImage={preloadedAssets?.introBgImage}
        backgroundColor={'#0d161e'}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        className="CharacterScreen chapter_potrait"
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
        >
          <GridItem colSpan={1} position={'relative'}>
            <Box display={'flex'} justifyContent={'center'}>
              <Img
                src={preloadedAssets.Select}
                className={'character_template'}
                loading="lazy"
              />
              <Box className={'character_select_area'}>
                <Box
                  className='child_of_character_select_area'
                  w={'55%'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >

                  <img
                    src={preloadedAssets.Selected}
                    className={`character_toggle_left ${toggleLeft ? 'toggle_effect_on' : 'toggle_effect_off'
                      }`}
                    onMouseDown={() => {
                      setToggleLeft(true);
                      // setSelectedCharacter((prev:any) => (prev - 1)); // Set to male
                      setSelectedIndex((prevIndex) => {
                        const newIndex =

                          (prevIndex - 1 + matchingCharacter.length) % matchingCharacter.length;
                        setSelectedCharacter(matchingCharacter[newIndex]); // Update character
                        return newIndex;
                      });

                    }}
                    onMouseUp={() => setToggleLeft(false)}
                    alt="Toggle Left"
                  />
                  {/* <Canvas
                    style={{
                      width: window.innerWidth < 520 ? "100%" : "140%",
                      height: window.innerWidth < 520 ? "100%" : "160%",
                    }}
                      camera={{ position: [0, 1, 9] }}
                      dpr={window.devicePixelRatio}
                    > */}
                  <Canvas
                    style={{
                      width: window.innerWidth < 520 ? '100%' : '140%',
                      height: window.innerWidth < 520 ? '100%' : '160%',
                    }}
                    camera={{ position: [0, 1, 9] as [number, number, number] }}
                    dpr={window.devicePixelRatio}
                  >
                    {' '}
                    <directionalLight
                      position={[2.0, 78.0, 100]}
                      intensity={0.8}
                      color={'ffffff'}
                      castShadow
                    />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[1.0, 4.0, 0.0]} color={'ffffff'} />
                    {/* <ModelPlayer position={[0, -1.5, 4]} rotation={[0,0,0]}/> */}

                    {/* <sprite position={[0, -0.0, 4]} rotation={[0, 0, 0]} scale={[5, 8, 1]}> */}
                    {/* <sprite position={[0, 1, 3.5]} rotation={[0, 0, 0]} scale={[5, 8, 1]}> */}
                    <sprite position={[0, 1, 3.5]} rotation={[0, 0, 0]}
                      scale={
                        selectedCharacter?.id === 'male' && selectedCharacter?.theme === 'Medieval' ? [5, 8, 1] :
                          selectedCharacter?.id === 'female' && selectedCharacter?.theme === 'Medieval' ? [5, 8, 1] :
                            selectedCharacter?.id === 'male' && selectedCharacter?.theme === 'Real' ? [5, 8, 1] :
                              selectedCharacter?.id === 'female' && selectedCharacter?.theme === 'Real' ? [5, 8.2, 1] :
                                selectedCharacter?.id === 'male' && selectedCharacter?.theme === 'Future' ? [5, 8.7, 1] :
                                  selectedCharacter?.id === 'female' && selectedCharacter?.theme === 'Future' ? [5, 8, 1] :
                                    [5, 8, 1] // Default scale
                      }
                    >
                      <spriteMaterial
                        attach="material"
                        // ## Updated map logic to use selectedCharacter state
                        map={getTexture(selectedCharacter)}
                      />
                    </sprite>
                  </Canvas>
                  {/*                     
<img
      src={preloadedAssets.Selected}
      className={`character_toggle_right ${
        toggleRight ? 'toggle_effect_on' : 'toggle_effect_off'
      }`}
      onMouseDown={() => {
        setToggleRight(true);
        // setSelectedCharacter((prev:any) => (prev + 1)); // Set to female
        setSelectedIndex((prevIndex) => {
         
          const newIndex = (prevIndex + 1) % matchingCharacter.length;
          setSelectedCharacter(matchingCharacter[newIndex]); // Update character
          return newIndex;
        });
    
      }}
      onMouseUp={() => setToggleRight(false)}
      alt="Toggle Right"
                    /> */}
                  <Box className='blinking-wave-character-select'
                    w={'7vw'}
                    h={'7vh'}
                  >
                    <img
                      src={preloadedAssets.Selected}
                      style={{ marginLeft: '10px' }}
                      className={`character_toggle_right ${toggleRight ? 'toggle_effect_on' : 'toggle_effect_off'
                        }  `}  // 👈 add blinking class conditionally
                      onMouseDown={() => {
                        setToggleRight(true);
                        setSelectedIndex((prevIndex) => {
                          const newIndex = (prevIndex + 1) % matchingCharacter.length;
                          setSelectedCharacter(matchingCharacter[newIndex]);
                          return newIndex;
                        });
                      }}
                      onMouseUp={() => setToggleRight(false)}
                      alt="Toggle Right"
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={'select_player'}>
                <Button
                  w={'15%'}
                  bg={'none'}
                  className="mouse_style"
                  _hover={{ bg: 'none' }}
                  onClick={selectPlayerClick}
                ></Button>
              </Box>
              <Box className={'character_next'}>
                <Box className={'character_buttons'}>
                  <Button
                    className="btns left-btn mouse_style"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={() => {
                      setBlackScreen(true)

                      setTimeout(() => {
                        setCurrentScreenId(1);
                      }, 1000)
                    }}
                  ></Button>

                  {/* <Box w={'25%'} position={'relative'} display="flex" alignItems="center" justifyContent="center">

                    { isEditing ? (
       <Input
       style={{
         width: '100%',
         padding: '5px',
         border: 'none',
         outline: 'none',
         textAlign: 'center',
       }}
       textAlign={'center'}
       className="player_name"
      //  value={formState.name} 
       onChange={handleInputChange} 
     />
    ) :
                      (<FormLabel
                        style={{ width: '100%' }}
                        className="player_name"
                        textAlign={"center"} 
                        me={0}
                        mb={1}
                onClick={()=>setIsEditing(true)}
                      > 
{ learnerPlayList?.LearnerProfile?.nickName

    ? learnerPlayList?.LearnerProfile?.nickName  : learnerPlayList?.LearnerProfile?.name
}                   
                  </FormLabel>
)}
                    </Box> */}

                  <Box
                    w={'40%'}
                    position={'relative'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Input
                      style={{
                        width: '100%',
                        padding: '5px',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        background: 'transparent',
                        boxShadow: 'none',
                      }}
                      placeholder="Enter your name"
                      textAlign="center"
                      className="player_name"
                      value={formState.name}
                      onChange={(e) => {
                        handleInputChange(e);

                        // Clear previous timeout
                        if (typingTimeoutRef.current) {
                          clearTimeout(typingTimeoutRef.current);
                        }

                        // Don't blink while typing
                        setBlinking(false);

                        // Blink only after typing stops
                        typingTimeoutRef.current = setTimeout(() => {
                          setBlinking(true);

                        }, 700);
                      }}
                    />
                  </Box>

                  <Button
                    className={`btns right-btn mouse_style ${blinking ? 'blinking-wave-new' : ''}`}
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    onClick={selectPlayerClick}
                  />

                  {/* <Box 
  w={'40%'} 
  position={'relative'} 
  display="flex" 
  alignItems="center" 
  justifyContent="center"
>
  <Input
    style={{
      width: '100%',
      padding: '5px',
      border: 'none',
      outline: 'none',
      textAlign: 'center',
      background: 'transparent',
      boxShadow:'none',
      // color: '#fff',
    }}
    placeholder="Enter your name"
    textAlign="center"
    className="player_name"
    value={formState.name}
    onChange={(e) => {
  handleInputChange(e);
  setBlinking(true);

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(() => setBlinking(false), 700);
}}

  />
</Box>

<Button
  className={`btns right-btn mouse_style ${blinking ? 'blinking-wave' : ''}`}
  bg={'none'}
  _hover={{ bg: 'none' }}
  onClick={selectPlayerClick}
/> */}

                  {/* <Button
                      className="btns right-btn mouse_style"
                      bg={'none'}
                      _hover={{ bg: 'none' }}
                      onClick={selectPlayerClick}
                    ></Button> */}
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>}
    </>
  );
};

export default Characterspage;