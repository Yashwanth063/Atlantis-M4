import { Img, Text, SimpleGrid, Box, Textarea } from '@chakra-ui/react';
import { forEach } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../EntirePreview';
// import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScoreContext } from '../GamePreview';
import { storeReflection } from 'utils/gameApplication/gamePlayService';

/* for reflection question inside the image */
const Reflection: React.FC<{
  formData: any;
  reflectionQuestions?: any;
  imageSrc: any;
  gameInfo?: any;
  setCurrentScreenId?: any;
  preloadedAssets: any;
  FeedbackcurrentPosition: any;
  setFeedbackCurrentPosition: any;
  interactionBlockArray: any;
  profileData: any;
  feedbackList: any;
  getFeedbackData: () => void;
  setInterActionBlockArray: any;
  setFeedbackNavigateNext: any;
  setCurrentQuestNo: any;
  setFirstLoading: any;
  setLearnerPlayingDetails: any;
  learnerPlayList: any;
}> = ({ formData, reflectionQuestions, imageSrc, gameInfo, setCurrentScreenId, preloadedAssets,
  FeedbackcurrentPosition, setFeedbackCurrentPosition, interactionBlockArray, profileData, getFeedbackData, feedbackList, setInterActionBlockArray, setFeedbackNavigateNext, setCurrentQuestNo, setFirstLoading,learnerPlayList,setLearnerPlayingDetails
}) => {
    
    const useData = useContext(ProfileContext)
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [answers, setAnswers] = useState<any>([]);
    const [RefAnswer, setrefAnswer] = useState<any>([]);
    const [reflectionFilter, setReflectionFilter] = useState<any>([reflectionQuestions]);
    const { id } = useParams();
    const Gameid = id ? id : null;
    const { profile, setProfile } = useContext(ScoreContext);
    const playingQuestNo=learnerPlayList?.PlayerScore_Level?.currentQuest;
    const playingGameId=learnerPlayList?.GameId;
    const StroredAnsRefLang = () => {
      const storedRefAnswers =learnerPlayList?.playerInputs?.Refelection_Answer || [];
      if (storedRefAnswers !== undefined) {
        setrefAnswer(storedRefAnswers);
        const modifedAnswers = storedRefAnswers.map((item: { [key: string]: string }) => {
          const key = Object.keys(item)[0]; // Get the key of the current object
          return { text: item[key] }; // Return a new object with the "text" property
        });
        setAnswers(modifedAnswers)
      }
      if (reflectionQuestions) {
        const translationId = 1;
        const ReflectionFilter = reflectionQuestions.filter((item: any, index: number) => (item?.translationId === translationId));
        if (ReflectionFilter.length === formData.gameReflectionQuestion) {
          setReflectionFilter(ReflectionFilter);
        } else {
          const requiredQuestions = ReflectionFilter.slice(0, formData.gameReflectionQuestion);
          setReflectionFilter(requiredQuestions);
        }

      }
    }
    useEffect(() => {
      StroredAnsRefLang();
    }, [])
    const validateFunc = () => {
      if (
        formData?.gameIsLearnerMandatoryQuestion &&
        formData?.gameReflectionQuestion &&
        answers.length === formData?.gameReflectionQuestion
      ) {
        let validate = answers?.filter((ans: any) => ans === undefined || ans.text.trim() === '');
        validate.length === 0 ? setIsFormValid(true) : setIsFormValid(false);
      } else {
        formData?.gameIsLearnerMandatoryQuestion === "true"
          ? setIsFormValid(false)
          : setIsFormValid(true);
      }
    }

    useEffect(() => {
      validateFunc();
    }, [answers]);

    useEffect(() => {
      StroredAnsRefLang();
      // setReflectionFilter(reflectionQuestions);
    }, [reflectionQuestions])


    const updateAnswer = (e: any, index: any) => {

const refId = index;
const ansValue = e.target.value;

      const updatedAnswers = [...answers];
      updatedAnswers[index] = { ...updatedAnswers[index], text: e.target.value };
      const updatedRefAnswers = [...RefAnswer];
      updatedRefAnswers[index] = { ...updatedRefAnswers[index], [`ref${index + 1}`]: e.target.value };
      setAnswers(updatedAnswers);
    

      setrefAnswer(updatedRefAnswers);

    };
   
    const nextNavigation = async() => {
      setFirstLoading(true)
     
      setLearnerPlayingDetails((prev:any) => ({
        ...prev,
        playerInputs:{
          ...prev.playerInputs, 
          Refelection_Answer:RefAnswer,
          // Thankyou:learnerPlayList?.playerInputs?.Thankyou
        }
      }));
      const data = {
        answers: RefAnswer,
        // gameId: useData.gameDetail.id,
        gameId: playingGameId,
        questNo: playingQuestNo,
        refansGameMode: 'game'

      }
      const result = await storeReflection(JSON.stringify(data));
      if (result.status !== 'Success') {
        return false;
      }
      else
      {
        if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
          setCurrentScreenId(7);//Navigate to Takeaway screen
        }
        else {
          setCurrentScreenId(5);//Navigate to Thank you screen
        }
      }
     
      // },300)     
    }
    const backNavigation = () => {
      const LastquestNo = parseInt(profile.currentQuest);
      setFirstLoading(false)
      setCurrentQuestNo(LastquestNo)
      
      if (feedbackList.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
        if (feedbackList?.find((item: any) => item.quest == profile.currentQuest)) {
          const groupedFeedback: { [key: string]: any[] } = {};
          feedbackList.forEach((feedback: any) => {
            if (!(feedback.Seq in groupedFeedback)) {
              groupedFeedback[feedback.Seq] = [];
            }
            groupedFeedback[feedback.Seq].push(feedback);
          });
          const firstPageFeedback: any[] = [];
          Object.keys(groupedFeedback).forEach((seq: any) => {
            const lastIndex = groupedFeedback[seq].length - 1;
            if (profile.currentQuest == groupedFeedback[seq][lastIndex].quest) {
              firstPageFeedback.push(groupedFeedback[seq][lastIndex]);
            }
          });
          setFeedbackCurrentPosition(firstPageFeedback.length - 1);
          setInterActionBlockArray(firstPageFeedback.length - 1);
          getFeedbackData();
          setFeedbackNavigateNext(false);
          setCurrentScreenId(14); //Navigate to together all feedback
        }
        else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
          setCurrentScreenId(4); //Navigate to leaderboard
          return false;
        }
        else {
          setCurrentScreenId(6);
          // setCurrentScreenId(13);
          return false;
        }
      }
      else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4); //Navigate to leaderboard
        return false;
      }
      else {

        setCurrentScreenId(6);

        // setCurrentScreenId(13);
        return false;
      }
    }
    useEffect(() => {
      if (formData?.gameIsLearnerMandatoryQuestion === 'false') {
        setIsFormValid(true);
      }
      else {
        validateFunc();
      }
      StroredAnsRefLang();
    }, [formData])

  

    return (
      <>
        {imageSrc && (
          <>
            <Box className="reflection-screen">
              {/* <Img src={imageSrc} className="bg-img" /> */}
              <Img
                src={formData?.gameIsShowReflectionScreen === 'true' ? imageSrc : preloadedAssets?.introBgImage}
                className="bg-img"
              />
          
              {formData?.gameIsShowReflectionScreen === 'true' && (
                <Box className='title'>
                  <Img src={preloadedAssets.question} />
                  <Text className='reflection-p'> Reflection </Text>
                </Box>
              )}
             
              <Box className="content-ref">
                {formData?.gameIsShowReflectionScreen === 'true' ? (
                  <>
                  
                    <Box className="content-ref">
                      <SimpleGrid columns={formData?.gameReflectionQuestion === 1 ? { base: 1 } : { base: 2 }} spacing={2} className="grid-work">
                        {reflectionFilter?.map((item: any, index: number) => {
                          return (
                            <Box key={index}>
                              <Box
                                className="heading-wrapper"
                                w={{
                                  base: '150px',
                                  sm: '100px',
                                  md: '150px',
                                  lg: '180px',
                                }}
                                lineHeight={1}
                                display={'flex'}
                                // wordBreak="break-all"
                                fontFamily={'content'}
                                fontSize={{
                                  base: '8px',
                                  sm: '12px',
                                  md: '13px',
                                  lg: '15px',
                                }}
                              >
                                <Img src={preloadedAssets.qs} alt="ref" w={'20px'} h={'20px'} />
                                <Text
                                  fontFamily={'AtlantisText'}
                                  color={'black'}
                                  className="text drop"
                                  style={{ whiteSpace: 'break-spaces' }}
                                  fontSize={'large'}
                                >
                                  {item?.refQuestion}
                                </Text>
                              </Box>
                              <Box position={'relative'} className="input-wrapper">
                                <Img
                                  w={'350px'}
                                  h={{
                                    base: '20px',
                                    sm: '30px',
                                    md: '50px',
                                    lg: '100px',
                                  }}
                                  src={preloadedAssets.ref}
                                />
                                <Textarea
                                  resize={'none'}
                                  bottom={0}
                                  outline={'none'}
                                  focusBorderColor="none"
                                  border={'none'}
                                  position={'absolute'}
                                  w={'350px'}
                                  color={'#D9C7A2'}
                                  h={{
                                    base: '20px',
                                    sm: '30px',
                                    md: '50px',
                                    lg: '100px',
                                  }}
                                  _focus={{ boxShadow: 'none', border: 'none' }}
                                  fontFamily={'AtlantisText'}
                                   value={answers[index]?.text}
                                  onChange={(e: any) => updateAnswer(e, index)}
                                />
                              </Box>
                            </Box>
                          );
                        })}
                      </SimpleGrid>
                    </Box>
                  </>
                ) : (

                  <Box className="top-menu-home-section">
                    <Box className="Setting-box">
                      <Img
                        src={preloadedAssets?.Replay}
                        className="setting-pad"
                      />
                        <Box className="optional-vertex-error">
                        <Box
                          w={'100%'}
                          h={'100%'}
                          display={'flex'}
                          flexDirection={'column'}
                          justifyContent={' flex-start'}
                        >

                          <Text className="No_preview" textAlign={'center'} mt={12}>
                            The "Show Reflection" option is currently disabled. Please enable it if you want to use this feature.</Text>
                          <Box
                            w={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            position={'absolute'}
                            bottom={'0'}
                            className='left-right-btn'
                          >
                            <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                              <Img src={preloadedAssets.left} className={'interaction_button'} cursor={'pointer'} onClick={backNavigation} />
                              <Img
                                src={preloadedAssets.right}
                                className={'interaction_button'}
                                cursor={'pointer'}
                                onClick={() => nextNavigation()}
                              />
                            </Box>
                          </Box>

                        </Box>
                      </Box>
                    </Box>
                  </Box>


                )}
              </Box>


              {formData?.gameIsShowReflectionScreen === 'true' &&
                <>
                  <Box
                    w={'100%'}
                    display={'flex'}
                    justifyContent={'center'}
                    position={'absolute'}
                    bottom={'0'}
                    className='left-right-btn'
                  >
                    <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                      <Img src={preloadedAssets.left} w={'50px'} h={'50px'} cursor={'pointer'} onClick={backNavigation} />
                      {isFormValid && (
                        <Img
                          src={preloadedAssets.right}
                          w={'50px'}
                          h={'50px'}
                          cursor={'pointer'}
                          onClick={() => nextNavigation()}
                        />
                      )}
                    </Box>
                  </Box>
                </>


              }
            </Box>
          </>
        )}
      </>
    );
  };
export default Reflection;