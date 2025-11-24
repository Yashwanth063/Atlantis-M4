import { Box, Grid, GridItem, Icon, Img, Button, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { FaLanguage } from "react-icons/fa6";
import { ScoreContext } from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { useParams } from 'react-router-dom';
import { getBackgrounds, getAssignedGame } from 'utils/gameApplication/gamePlayService';

interface GameIntroType {
  preloadedAssets: any;
  setCurrentScreenId: (id: number) => void;
  currentScreenId?: any;
  gameInfo: any;
  hasMulitLanguages: boolean;
  setReplayState: any;
  setReplayIsOpen: any;
  setQuestState: any;
  gameLanguages: any;
  profileData: any;
  setProfileData: any;
  isInitialLoadScreenWelcome: boolean;
  setIsInitialLoadScreenWelcome: (value: boolean) => void;
  setLearnerPlayingDetails:any;
  learnerPlayList:any;
  setAssignId:any;
  AssignId:any;
  setFeedbackList:any;
  UpdateLearnerData:()=>void;
}
const IsErrorInitialState: { language: string | null; } = {
  language: null,
};
const GameIntroScreen: React.FC<GameIntroType> = ({ preloadedAssets, setCurrentScreenId, currentScreenId, gameInfo, hasMulitLanguages, gameLanguages, profileData, setProfileData, isInitialLoadScreenWelcome, setIsInitialLoadScreenWelcome,setLearnerPlayingDetails,learnerPlayList,AssignId,setQuestState,setAssignId, UpdateLearnerData,setFeedbackList}) => {
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [isError, setIsError] = useState(IsErrorInitialState);
  const [loaded, setLoaded] = useState(false);
  const { learner_game_play_id } = useParams();
  const { profile, setProfile } = useContext(ScoreContext);
  const [formState, setFormState] = useState<any>({
    language: 1 , //1 for english
  });
  //**************************************************** start New State for M4**************************************************************** */
  const user: any = JSON.parse(localStorage.getItem('user'));


 //****************************************************end New State for M4**************************************************************** */

  
  const Handlemodel =async () => {
  
        const result = await getAssignedGame(learner_game_play_id);
        if(result?.status==="Success")
        {
          setAssignId(result?.LearnerPlayinggame?.gaId);
          const learnerPlayingDetails = result?.LearnerPlayinggame?.learnerGameplayDetails ? JSON.parse(result?.LearnerPlayinggame?.learnerGameplayDetails):null;
          if (!result?.LearnerPlayinggame?.learnerGameplayDetails) {
            UpdateLearnerData();
          }
         else
            {
            
            setLearnerPlayingDetails(learnerPlayingDetails);
            setProfile(learnerPlayingDetails?.PlayerScore_Level);
            setQuestState(learnerPlayingDetails?.questState);
            setFeedbackList(learnerPlayingDetails?.feedbackList);
            if(learnerPlayingDetails?.screenIdSeq.length !== 0)
              {
                if (learnerPlayingDetails?.screenIdSeq[0] === 2) {
                  setCurrentScreenId(13);
                  return;
                }
                else {
                  setCurrentScreenId(learnerPlayingDetails?.screenIdSeq[0]);
                  return;
                }
              }
          }
          
        }

    const newErrors = {
      language: gameLanguages.length > 0 && formState.language === '' ? 'Language field is mandatory' : null,
    };

    setIsError(newErrors);
    const isErrorPresent = Object.values(newErrors).some(error => error !== null);
    if (!isErrorPresent) {
      setProfileData((prev: any) => ({
        ...prev,
        language: formState.language
      }));
                if(isInitialLoadScreenWelcome){
                  setIsInitialLoadScreenWelcome(false);
                }
                    setCurrentScreenId(1);
                    return false;
        
      }

    }
  
  const handleProfile = (e: any, input?: any) => {
    const { id, value } = e.target;
    if (id === 'language') {
      setIsLanguageSelected(false);
    }
    // Restrict the length of 'value' to a maximum of 15 characters if 'id' is 'name'
    const trimmedValue = id === 'name' ? value.slice(0, 15) : value;
    setIsError((prevError) => ({ ...prevError, [id]: null }));
    setFormState((prev: any) => ({ ...prev, [id]: id === 'name' ? trimmedValue : input }));
  };
  return (
    <>
      <Img
        src={preloadedAssets.Login}
        onLoad={() => setLoaded(true)}
        display={'none'}
      />
      {loaded && 
      <Box
        position="relative"
        maxW="100%"
        w={'100vw'}
        height="100vh"
        backgroundImage={preloadedAssets?.introBgImage}
        backgroundSize={'cover'}
        backgroundRepeat={'no-repeat'}
        className="chapter_potrait"
        backgroundColor={'#0d161e'}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          className="story_note_grid"
        >
          <GridItem colSpan={1}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              position={'relative'}
            >
              <Img
                src={preloadedAssets.Login}
                className={'first_play'}
              />
              <Box className={'play_screen_content'}>
                <Box>
                  <Box
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                  >
                    <Text className={'play_screen_heading'}>
                      Atlantis
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    marginBottom={"20px"}
                    // mb={gameLanguages && gameLanguages.length === 1 ? '5%' : ''}
                  >
                      {/* <Text className={'play_screen_text'}>
                        Welcome To
                      </Text> */}
                  </Box>
                  <Box
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    // marginBottom={"20px"}
                    // mb={gameLanguages && gameLanguages.length === 1 ? '20%' : ''}
                  >
                    <Text className={'play_screen_text'}>
                       {gameInfo?.gameTitle}
                    </Text>
                  </Box>
                  {gameLanguages && gameLanguages.length > 1 &&
                    <Box position={'relative'} mb={'5%'}  mr={'25%'}>
                      <Img
                        w={'100%'}
                        h={'auto'}
                        src={preloadedAssets.redLang}
                        onClick={() => setIsLanguageSelected(!isLanguageSelected)}
                      />
                      <Box
                        w={'100%'}
                        position={'absolute'}
                        // className={isError?.language !== null  && isAnimating && 'animate_error'}
                        borderRadius={'50px'}
                        display={'flex'}
                        onClick={() => setIsLanguageSelected(!isLanguageSelected)}
                        // onFocus={()=>setIsAnimating(false)}
                        top={'38.5%'}
                      >
                        <Box w={'80%'} display={'flex'} justifyContent={'center'}>
                          <Text
                            onClick={() => setIsLanguageSelected(!isLanguageSelected)}
                            className={'choosen_lang'}
                            color={'#35332e !important'}
                          >
                            {gameLanguages.length > 0 ? gameLanguages.find((lan: any) => lan.value === formState?.language)?.label : 'English'}
                          </Text>
                        </Box>
                        <Box w={'18%'}>
                          <Img
                            src={preloadedAssets.Selected}
                            className={'select'}
                            mt={'31%'}
                          />
                        </Box>
                        {isLanguageSelected && (
                          <Box className="dropdown" background={'linear-gradient(0deg, #ecdca2, #a48d63)'} color={'#35332e !important'} borderRadius={'2px'}>
                            {gameLanguages.length > 0 ? gameLanguages.map((lang: any, num: any) => (
                              <Text
                                className={'choosen_langs'}
                                ml={'5px'}
                                key={num}
                                _hover={{ bgColor: '#ffdfa7', padding: '0 2%' }}
                                id={'language'}
                                onClick={(e: any) =>
                                  handleProfile(e, lang.value)
                                }
                              >
                                {lang.label}
                              </Text>
                            )) : null}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    }
                  <Box
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                  // mt={'9%'}
                  >
                    <Button
                      w={'90%'}
                      h={{ base: '6vw', sm: '6vw', lg: '5vh' }}
                      bg={'none'}
                      _hover={{ bg: 'none' }}
                      className='mouse_style'
                      onClick={() => {
                        Handlemodel();
                      }}
                    >
                      <Img
                        className='profile-okay-btn'
                        src={preloadedAssets.play}
                        w={'100%'}
                        h={'auto'}
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      }
    </>
  )
}

export default GameIntroScreen;