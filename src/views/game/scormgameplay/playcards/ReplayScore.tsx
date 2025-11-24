import { Box, Button, Img, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ScoreContext, ProfileType } from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { motion } from 'framer-motion';
import Scrollbar from 'components/customScroll/CustomScroll';
import { API_SERVER } from 'config/constant';

type replayScoreProps = {
  preloadedAssets: any;
  setReplayIsOpen: (value: boolean) => void;
  replayState?: string;
  handleReplayButtonClick?: (replayState: string) => void;
  setCurrentScreenId?: (id: number) => void;
  gameInfo?: any;
  setOptionalReplay?: (value: boolean) => void;
  setQuestState: any;
  setOptions: any;
  setType: any;
  setData: any;
  gameInfoquest: any;
  gameinfodata: any;
  profileData: any;
  replayNextHandler: any;
  data: any;
  feed: string;
  setAudioObj: any;
  isScreenshot: any;
  options: any;
  setSelectedOption: any;
  selectedOption: any;
  questState: any;
  navi: any;
  getSelectedOptions:any;
}

const ReplayScore: React.FC<replayScoreProps> = ({
  getSelectedOptions,
  preloadedAssets,
  setReplayIsOpen,
  replayState,
  handleReplayButtonClick,
  setCurrentScreenId,
  gameInfo,
  setOptionalReplay,
  setQuestState,
  setOptions,
  setType,
  setData,
  gameInfoquest,
  gameinfodata,
  profileData,
  replayNextHandler,
  data,
  feed,
  setAudioObj,
  isScreenshot,
  options,
  setSelectedOption,
  selectedOption,questState,navi
}) => {
  const [replayMessage, setReplayMessage] = useState<string>(null);
  const [translatedContentByLanguage, setTranslatedContentByLanguage] = useState(null);

  const playerInfo = useContext(ProfileContext);
  const { profile, setProfile } = useContext(ScoreContext);
  const initialProfileObject: ProfileType = {
    score: [],
    // completionScore: [],
    completedLevels: ['1'],
    compQuest:[],
    currentQuest: 1,
    replayScore: [],
    playerGrandTotal: { questScores: {} },
    playerGender: '',
    PlayerName: '',
    completeBadgseShow: []
  };
  const EnumType = {
    BGM: 'bgm',
    VOICE: 'voice',
  };
  useEffect(() => {
    const currentQuestMasterData = gameInfo?.gameQuest.find((item: any) => item.gameQuestNo == profile?.currentQuest);
    if (replayState === "mandatoryReplay") {
      const currentQuestIndex = profile?.currentQuest;
      const previousQuestScore = profile?.playerGrandTotal.questScores[currentQuestIndex] !== null && Object.entries(profile?.playerGrandTotal?.questScores).length > 0 ? profile?.playerGrandTotal.questScores[currentQuestIndex] : 0;
      const finalPlayerScore = previousQuestScore ? parseInt(previousQuestScore) : 0;
      const differedScore = parseInt(currentQuestMasterData.gameMinScore) - finalPlayerScore;
      setReplayMessage(`You are only ${differedScore ?? 'few'} points away from meeting the passing score.please try again.`)
    }
    else if (replayState === 'optionalReplay') {
      const if_firstgotfull_score = profile?.score;
      const sumscore: any = {};
      if_firstgotfull_score?.forEach((score: any) => {
        const quest = score.quest;
        if (!sumscore[quest]) {
          sumscore[quest] = 0;
        }
        sumscore[quest] += score.score;
      });
      // console.log("sumscore",sumscore)

      const currentQuestIndex = profile?.currentQuest;
      const previousQuestScore = profile?.playerGrandTotal.questScores[currentQuestIndex] !== null && Object.entries(profile?.playerGrandTotal?.questScores).length > 0 ? profile?.playerGrandTotal.questScores[currentQuestIndex] : 0;
      console.log('currentQuestMasterData', currentQuestMasterData)
      if (currentQuestMasterData.gameTotalScore) {
        const finalPlayerScore = previousQuestScore ? parseInt(previousQuestScore) : 0;
        const formDatadistinScore = currentQuestMasterData.gameTotalScore ? parseInt(currentQuestMasterData.gameTotalScore) : 0;
        const differedScore = formDatadistinScore - finalPlayerScore;
        if (differedScore !== 0) {
          if (sumscore[currentQuestIndex] === currentQuestMasterData.gameTotalScore) {
            setReplayMessage(`Would you like to replay?`)
          }
          else {
            setReplayMessage(`You are only ${differedScore} points away from a perfect score. Would you like to replay?`)
          }
        }
        else {
          setReplayMessage(`Would you like to replay?`)
        }
      }
      else {
        setReplayMessage(`Would you like to replay?`)
      }
    }
  }, [replayState]);




  useEffect(() => {
    if (selectedOption !== '' && replayState === 'replayPointPrompt') {

      console.log("optionfound-inuseeffect")

      feedBackAudioPlay();

    }
  }, [selectedOption, replayState]);


//   const feedBackAudioPlay = async () => {
//    console.log("optionfound-in feedBackAudioPlayt",selectedOption)
//     if (selectedOption !== '' && profileData?.Audiogetlanguage.length === 0) {
//    console.log("optionfound-in feedBackAudioPlayt-profileData",profileData)

//       // const AccessFindUrl = options[selectedOption]
//       if (questState[parseInt(profile?.currentQuest)] === 'Started') {
//            console.log("optionfound-in feedBackAudioPlayt-questState",profileData)

//         // Remove matching object from profile?.score
//       const optionFound = profile?.score?.find((item: any) => item?.choosedoption);
      
//       const foundOptionSelected=optionFound?.choosedoption
      
//       const AccessFindUrl = options?.filter((item: any) => foundOptionSelected
//       === item?.qpOptions)
      
//       const FindUrl = AccessFindUrl[0]?.qbfeedbackAudioUrl;
     
// console.log("optionFound",optionFound,"foundOptionSelected",foundOptionSelected,"AccessFindUrl",AccessFindUrl,"FindUrl",FindUrl)
//       if (FindUrl?.length > 0) {
//         try {
//           const optionFeedBackAudio = FindUrl ? FindUrl : '';
         
// console.log("optionFound-optionFeedBackAudio",optionFeedBackAudio)
//           if (optionFeedBackAudio !== '') {
//             const fullUrl = `${API_SERVER}${optionFeedBackAudio}`;
//             const responseblockText = await fetch(fullUrl);
            
//             if (responseblockText.ok) {
//               setAudioObj((prev: any) => ({
//                 ...prev,
//                 url: fullUrl,
//                 type: EnumType.VOICE,
//                 loop: false, // Voice doesn't loop
//                 autoplay: true, // Autoplay is disabled
//               }));
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       }
//       }
//       else if(questState[parseInt(profile?.currentQuest)] === 'replayallowed' && navi ==='Replay Point')
//       {
//         console.log("optionfound-in feedBackAudioPlayt-questState",profileData)

//         // Remove matching object from profile?.score
//       const optionFound = profile?.score?.find((item: any) => item?.choosedoption);
      
//       const foundOptionSelected=optionFound?.choosedoption
      
//       const AccessFindUrl = options?.filter((item: any) => foundOptionSelected
//       === item?.qpOptions)
      
//       const FindUrl = AccessFindUrl[0]?.qbfeedbackAudioUrl;
     
// console.log("optionFound",optionFound,"foundOptionSelected",foundOptionSelected,"AccessFindUrl",AccessFindUrl,"FindUrl",FindUrl)
//       if (FindUrl?.length > 0) {
//         try {
//           const optionFeedBackAudio = FindUrl ? FindUrl : '';
         
// console.log("optionFound-optionFeedBackAudio-2",optionFeedBackAudio)
//           if (optionFeedBackAudio !== '') {
//             const fullUrl = `${API_SERVER}${optionFeedBackAudio}`;
//             const responseblockText = await fetch(fullUrl);
            
//             if (responseblockText.ok) {
//               setAudioObj((prev: any) => ({
//                 ...prev,
//                 url: fullUrl,
//                 type: EnumType.VOICE,
//                 loop: false, // Voice doesn't loop
//                 autoplay: true, // Autoplay is disabled
//               }));
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       }
//       }
//       else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
//         // Remove matching object from profile?.replayScore
//                    console.log("optionfound-in feedBackAudioPlayt-questState-2",questState)

//         const getreplayOption = profile?.replayScore?.find((item: any) => item?.choosedoption);
        
//         const foundReplayOptionSelected=getreplayOption?.choosedoption
        
//         const AccessFindUrl = options?.filter((item: any) => foundReplayOptionSelected
//         === item?.qpOptions)
        
//         const FindUrl =  AccessFindUrl[0]?.qbfeedbackAudioUrl;
       
  
//         if (FindUrl?.length > 0) {
//           try {
//             const optionFeedBackAudio = FindUrl ? FindUrl : '';
            
  
//             if (optionFeedBackAudio !== '') {
//               const fullUrl = `${API_SERVER}${optionFeedBackAudio}`;
//               const responseblockText = await fetch(fullUrl);
              
//               if (responseblockText.ok) {
//                 setAudioObj((prev: any) => ({
//                   ...prev,
//                   url: fullUrl,
//                   type: EnumType.VOICE,
//                   loop: false, // Voice doesn't loop
//                   autoplay: true, // Autoplay is disabled
//                 }));
//               }
//             }
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         }
//       }
      
     
//     }
    
//   }

const feedBackAudioPlay = async () => {
  console.log("optionfound-in feedBackAudioPlayt", selectedOption);

  if (selectedOption !== '' && profileData?.Audiogetlanguage.length === 0) {
    console.log("optionfound-in feedBackAudioPlayt-profileData", profileData);

    // Ensure getSelectedOptions is an object, not an array
    if (getSelectedOptions && getSelectedOptions.options) {
      const foundOptionSelected = getSelectedOptions.options;
      const AccessFindUrl = options?.filter((item: any) => foundOptionSelected === item?.qpOptions);
      const FindUrl = AccessFindUrl[0]?.qbfeedbackAudioUrl;

      console.log("foundOptionSelected", foundOptionSelected, "AccessFindUrl", AccessFindUrl, "FindUrl", FindUrl);

      if (FindUrl?.length > 0) {
        try {
          const optionFeedBackAudio = FindUrl ? FindUrl : '';

          console.log("optionFound-optionFeedBackAudio", optionFeedBackAudio);
          if (optionFeedBackAudio !== '') {
            const fullUrl = `${API_SERVER}${optionFeedBackAudio}`;
            const responseblockText = await fetch(fullUrl);

            if (responseblockText.ok) {
              setAudioObj((prev: any) => ({
                ...prev,
                url: fullUrl,
                type: EnumType.VOICE,
                loop: false, // Voice doesn't loop
                autoplay: true, // Autoplay is disabled
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    } else {
      console.error('getSelectedOptions is missing options property:', getSelectedOptions);
    }
  }
};
  

  return (
    <>
      <Box id="container" className="Play-station">
        <Box className="top-menu-home-section">
          <Box className="Setting-box">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'coral',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {['replayPointPrompt', 'optionalReplay', 'mandatoryReplay'].includes(replayState) ?
                <>
                  <Img
                    src={replayState === 'replayPointPrompt' ? preloadedAssets?.ReplayPointBg : preloadedAssets?.Replay}
                    className="setting-pad"
                  />
                  {/* <Box className={replayState === 'Prompt' ? 'replay-prompt-vertex' : "replay-vertex replayPointPrompt"}
                  > */}
                  <Box className={replayState === 'Prompt' ? 'replay-prompt-vertex' : 'replay-vertex replayPointPrompt'}>
                    <Box
                      w={'100%'}
                      h={'100%'}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'space-between'}

                    >
                      {replayState === 'replayPointPrompt' && (

                        <>
                          <Scrollbar height='60%'>
                            <Box className='replay_game_text replayPointPrompt' display={'flex'} justifyContent={'center'}>
                              <Box w={'100%'}>
                                {feed || `You have been redirected to the replay point. Click "Replay" to continue`}</Box>
                            </Box>

                          </Scrollbar>

                          <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                            <Button
                              p={'0'}
                              h={'auto'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.replayBtn} className='replay_game_btn' onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} />
                            </Button>
                          </Box>
                        </>
                      )


                      }
                      
                      {replayState === "optionalReplay" &&
                        <>
                          <Box className='replay_game_text'>{replayMessage}</Box>
                          <Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
                            <Button
                              background={'transparent !important'}
                              p={'0'}
                              h={'auto'}
                            >
                              <Img src={preloadedAssets?.replayBtn} onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} className='replay_game_btn' />
                            </Button>
                            <Button
                              p={'0'}
                              h={'auto'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.NextBtn} onClick={() => { setReplayIsOpen(false); replayNextHandler(data) }} className='replay_game_btn' />
                            </Button>
                          </Box></>
                      }
                      {replayState === "mandatoryReplay" &&
                        <><Box className='replay_game_text'> {replayMessage}</Box>
                          <Box display={'flex'} justifyContent={'center'} w={'100%'}
                            onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }}>
                            <Button
                              p={'0'}
                              h={'auto'}
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.replayBtn} className='replay_game_btn' />
                            </Button>
                          </Box>
                        </>
                      }
                    
                    </Box>
                  </Box>
                </>
                :
                (
                  <>
                    {/** ReplayGame prompt*/}
                    <Img
                      src={preloadedAssets?.overview}
                      className="setting-pad"
                    />
                    <Box className="optional-vertex">
                      <Box
                        w={'100%'}
                        h={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                      >
                        <Text className='replay_game_text'>
                          {replayMessage}
                        </Text>

                        <Box display={'flex'} justifyContent={'center'} w={'100%'}>
                          {replayState === "mandatoryReplay" ?
                            <><Button
                              background={'transparent !important'}
                            >
                              <Img src={preloadedAssets?.OkayBtn} onClick={() => { setReplayIsOpen(false); handleReplayButtonClick(replayState) }} className='replay_game_btn' />
                            </Button></>

                            : null}

                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReplayScore;
