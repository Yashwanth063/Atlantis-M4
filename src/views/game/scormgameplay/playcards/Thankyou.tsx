import { Box, Button, Icon, Img, Text, Textarea } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
// import next from 'assets/img/screens/next.png'
import Feedback from 'assets/img/screens/Feedback.png';
import {
  FaHatCowboy,
} from 'react-icons/fa';
import { debounce } from 'lodash';
import Scrollbar from 'components/customScroll/CustomScroll';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';
import { scorminsertGameFedback } from '../../../../utils/scormGameControl/scormgamecontrol';
import  pipwerks   from "../scorm_piwark/SCORM_API_wrapper";
import { SCORMWrapper }  from "../scorm_piwark/SCORM_API_wrapper";
interface Badge {
  gasId: number;
  gasAssetImage: string;
  gasAssetName: string;
}

const ThankYou: React.FC<{
  setCurrentScreenId: any;
  formData: any;
  imageSrc: any;
  preloadedAssets: any;
  gameInfo: any;
  setFeedbackCurrentPosition: (Value: any) => void;
  FeedbackcurrentPosition:any;
  interactionBlockArray:any;
  profileData: any;
  setFeedbackNavigateNext: any;
  feedbackList: any;
  setInterActionBlockArray: any;
  getFeedbackData: () => void;
  setCurrentQuestNo: any;
  setFirstLoading: any;
  setLearnerPlayingDetails: any;
  learnerPlayList: any;
  AssignId: any;
  Setstatus:any;
  Setcompletionstatus:any;

}> = ({ formData,imageSrc, setCurrentScreenId, preloadedAssets, gameInfo,FeedbackcurrentPosition, setFeedbackCurrentPosition, profileData, getFeedbackData, setFeedbackNavigateNext, setInterActionBlockArray, feedbackList,interactionBlockArray, setCurrentQuestNo, setFirstLoading, learnerPlayList, setLearnerPlayingDetails, AssignId,Setstatus, Setcompletionstatus }) => {
  const useData = useContext(ProfileContext)
  const user: any = JSON.parse(localStorage.getItem('user'));
  const { profile, setProfile } = useContext(ScoreContext);
  const GameId=learnerPlayList?.GameId;
  
  const typeofUser = gameInfo?.reviewer?.ReviewerId ? 'reviewer' : user?.data?.id ? 'creator':null;
  const renderContentTy = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    let parts = null;
    if (profileData?.Audiogetlanguage.length !== 0) {
      const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
        (key: any) => key?.textId === formData?.gameId,
     );
     if(GameLanguageFilter.length > 0)
      {
        const ThankYouFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameThankYouMessage',
        );
        if(ThankYouFiltered.length > 0)
          {
            parts = ThankYouFiltered[0]?.content ? ThankYouFiltered[0]?.content.split(linkRegex): formData.gameThankYouMessage?.split(linkRegex);
          }
          else{
            parts = formData.gameThankYouMessage?.split(linkRegex);
          }
      }
      else {
        parts = formData.gameThankYouMessage?.split(linkRegex);
      }
    }
    else {
      parts = formData.gameThankYouMessage?.split(linkRegex);
    }
    const contentWithLinks = parts?.map((part: any, index: any) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            style={{ color: '#caa784', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
    return <React.Fragment>{contentWithLinks}</React.Fragment>;
  };
  const feedbackOptions = [
    formData.gameContent,
    formData.gameRecommendation,
    formData.gameRelevance,
    formData.gameGamification,
    formData.gameBehaviour,
    formData.gameOthers,
  ];
  const countfbOptions = feedbackOptions.filter(option => option !== '' && option !== 'false' && option !== undefined && option !== null).length;
  const propertiesToCheck = [
    'gameContent',
    'gameRelevance',
    'gameBehaviour',
    'gameRecommendation',
    'gameGamification',
    'gameOthers',
  ];
  const trueValuesArray = propertiesToCheck.filter(property => formData[property] === 'true');
  const [userInputs, setUserInputs] = useState<any>({
    gameOthers: learnerPlayList?.playerInputs?.Thankyou?.gameOthers || null,
    gameContent: learnerPlayList?.playerInputs?.Thankyou?.gameContent || null,
    gameRelevance: learnerPlayList?.playerInputs?.Thankyou?.gameRelevance || null,
    gameBehaviour: learnerPlayList?.playerInputs?.Thankyou?.gameBehaviour || null,
    gameGamification: learnerPlayList?.playerInputs?.Thankyou?.gameGamification || null,
    gameRecommendation: learnerPlayList?.playerInputs?.Thankyou?.gameRecommendation || null,

  });

  var thirdValue = "";
  if (trueValuesArray.length >= 3) {
    thirdValue = trueValuesArray[2];
  }

  const styleflex = {};

  if (countfbOptions === 1) {
    Object.assign(styleflex, {
      display: 'flex',
      flexDirection: 'column', // Display in a column for 1 or 3 divs
      justifyContent: 'center',
    });
  }


  const handleNext = async () => {
    setFirstLoading(true);
    const data = {
      feedQuestNo: useData?.State?.PlayQuestNo,
      gameContent: userInputs.gameContent,
      gameRelevance: userInputs.gameRelevance,
      gameBehaviour: userInputs.gameBehaviour,
      gameGamification: userInputs.gameGamification,
      gameRecommendation: userInputs.gameRecommendation,
      gameOthers: userInputs.gameOthers,
      AssignId: AssignId,
      learnerid: learnerPlayList.playerId
    };

    const datas = JSON.stringify(data);
    const result = await scorminsertGameFedback(GameId, datas);
    if (result.status !== 'Success') {
      Setcompletionstatus('completed');
      // SCORMWrapper.setCompletionStatus_in_scorm('completed')
      Setstatus('passed');
      setCurrentScreenId(13);
      return false;
    } else {
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        playerInputs: {
          ...prev.playerInputs,
          Thankyou: userInputs,

        }
      }));
      setCurrentScreenId(13);
      return false;
    }
  }
  const previousNavigation = () => {
    useData?.setMotionEffect(true);
    const LastquestNo = parseInt(profile.currentQuest);
    setFirstLoading(false)
    setCurrentQuestNo(LastquestNo)
    setTimeout(() => {
      if (formData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      }
      else if (
        formData?.gameIsShowReflectionScreen === 'true'
        &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
        setCurrentScreenId(3);
        return false;
      } else if (feedbackList.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
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
      } else if (formData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      }
      else {
        setCurrentScreenId(6);
        return false;
      }
    }, 300)
  }


  const handleOptionClick = (value: any, category: any) => {
    if (userInputs[category] === value) {

      if (
        userInputs?.gameContent === learnerPlayList?.playerInputs?.Thankyou?.gameContent ||
        userInputs?.gameRelevance === learnerPlayList?.playerInputs?.Thankyou?.gameRelevance ||
        userInputs?.gameBehaviour === learnerPlayList?.playerInputs?.Thankyou?.gameBehaviour ||
        userInputs?.gameGamification === learnerPlayList?.playerInputs?.Thankyou?.gameGamification ||
        userInputs?.gameRecommendation === learnerPlayList?.playerInputs?.Thankyou?.gameRecommendation
      ) {
        setUserInputs({ ...userInputs, [category]: null });
      }
    }
    else {
      setUserInputs({ ...userInputs, [category]: value });

    }

  };
  const handleOtherFeedbackChange = (value: string, category: string) => {
    setUserInputs((prevInputs: any) => ({
      ...prevInputs,
      [category]: value,
    }));
    setLearnerPlayingDetails((prev: any) => ({
      ...prev,
      playerInputs: {
        ...prev.playerInputs,
        ...prev.Thankyou,
        gameOthers: userInputs.gameOthers,

      }
    }));
  };


  return (
    <>
      {preloadedAssets.Thankyou && (
        <Box className='section-thankyou-screen Thankyou-section'>
          <Img src={preloadedAssets.Thankyou} className="bg-img bg-thankyou" />
          <Text className='thankyou-title'>Thank You</Text>
          <Box className="thankyou-screen">
            <Scrollbar>
              <Box className='content'>
                <Box
                  w={'100%'}
                  fontFamily={'content'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  className="tq-msg"
                >
                  <Box
                    w={'80%'}
                    mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                    lineHeight={1}
                    textAlign={'center'}
                    color="#D9C7A2"
                    fontWeight="300"
                  >
                  </Box>
                </Box>
                <Box
                  w={'100%'}
                  fontFamily={'content'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  className="tq-msg"
                >
                  <Box
                    w={'80%'}
                    mt={{ base: '0px', sm: '0px', md: '20px', lg: '20px' }}
                    lineHeight={1}
                    textAlign={'center'}
                    color="#D9C7A2"
                    fontWeight="300"
                  >
                    {renderContentTy()}
                  </Box>
                </Box>
                {formData.gameIsCollectLearnerFeedback === 'true' && (
                  <>
                    <Text
                      className="about-experience"
                      fontSize={18}
                      fontWeight="300"
                      textAlign="center"
                    >
                      <Img src={Feedback} alt="rew" w={'82%'} h={'23px'} />
                      How do you feel about the experience?
                    </Text>
                    <Box className="collect-learner-feedback">
                      <Box className="grid-work" style={styleflex}>
                        {formData.gameContent === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameContent' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>
                            <Text
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Content
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                marginTop: '5px',
                                justifyContent: 'space-between',
                              }}
                            >

                              <div className="buttonfeel" tabIndex={1} onClick={() => handleOptionClick('I learned something useful', 'gameContent')} >

                                <p>
                                  &#128522; I learned something useful
                                </p>
                                {(userInputs.gameContent === 'I learned something useful' || (learnerPlayList?.playerInputs?.Thankyou?.gameContent === 'I learned something useful')) && <p>&#10004;</p>}
                              </div>
                              <div className="buttonfeel2" tabIndex={1} onClick={() => handleOptionClick("It wasn't useful", 'gameContent')}>
                                <p>
                                  &#128542; It wasn't useful
                                </p>
                                {(userInputs.gameContent === "It wasn't useful" || (learnerPlayList?.playerInputs?.Thankyou?.gameContent === "It wasn't useful")) && <p>&#10004;</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameRelevance === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameRelevance' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                            <Text
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Relevance
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}

                            >
                              <div className="buttonfeel" tabIndex={1} onClick={() => handleOptionClick("I'll apply what I learned", 'gameRelevance')}>
                                {/* &#127891; */}
                                <p>
                                  <Icon as={FaHatCowboy} /> I'll apply what I
                                  learned
                                </p>
                                {(userInputs.gameRelevance === "I'll apply what I learned" || (learnerPlayList?.playerInputs?.ThankYou?.gameRelevance === "I'll apply what I learned")) && <p>&#10004;</p>}
                              </div>
                              <div className="buttonfeel2" tabIndex={1} onClick={() => handleOptionClick("It's not relevant to me", 'gameRelevance')} >
                                <p>
                                  &#128542; It's not relevant to
                                  me
                                </p>
                                {(userInputs.gameRelevance === "It's not relevant to me" || (learnerPlayList?.playerInputs?.Thankyou?.gameRelevance === "It's not relevant to me")) && <p>&#10004;</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameBehaviour === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameBehaviour' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>
                            <Text
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Behaviour
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div className="buttonfeel" tabIndex={1} onClick={() => handleOptionClick('I understood what I can do differently', 'gameBehaviour')} >
                                <p>
                                  &#128526; I understood what
                                  I can do differently
                                </p>
                                {(userInputs.gameBehaviour === "I understood what I can do differently" || (learnerPlayList?.playerInputs?.Thankyou?.gameBehaviour === "I understood what I can do differently")) && <p>&#10004;</p>}
                              </div>
                              <div className="buttonfeel2" tabIndex={1} onClick={() => handleOptionClick('I am not sure', 'gameBehaviour')}>
                                <p>
                                  {' '}
                                  &#128566; I am not sure
                                </p>
                                {(userInputs.gameBehaviour === "I am not sure" || (learnerPlayList?.playerInputs?.Thankyou?.gameBehaviour === "I am not sure")) && <p>&#10004;</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameRecommendation === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameRecommendation' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                            <Text
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Recommendation
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div className="buttonfeel" tabIndex={1} onClick={() => handleOptionClick('I would recommend this game to others', 'gameRecommendation')}>
                                <p>
                                  {' '}
                                  &#128522; I would recommend
                                  this game to others
                                </p>
                                {(userInputs.gameRecommendation == "I would recommend this game to others" || (learnerPlayList?.playerInputs?.Thankyou?.gameRecommendation == "I would recommend this game to others")) && <p>&#10004;</p>}
                              </div>
                              <div className="buttonfeel2" tabIndex={1} onClick={() => handleOptionClick("I wouldn't recommend", 'gameRecommendation')} >
                                <p>
                                  {' '}
                                  &#128542; I wouldn't recommend
                                </p>
                                {(userInputs.gameRecommendation == "I wouldn't recommend" || (learnerPlayList?.playerInputs?.Thankyou?.gameRecommendation == "I wouldn't recommend")) && <p>&#10004;</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameGamification === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameGamification' && trueValuesArray.length == 3) || (trueValuesArray.length == 1)) ? 'span 2' : '' }}>

                            <Text
                              fontSize={18}
                              fontWeight="300"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Gamification
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div className="buttonfeel" tabIndex={1} onClick={() => handleOptionClick('I would like to learn via games', 'gameGamification')} >
                                <p>
                                  &#128077; I would like to learn
                                  via games
                                </p>
                                {(userInputs.gameGamification == "I would like to learn via games"
                                  || (learnerPlayList?.playerInputs?.Thankyou?.gameGamification == "I would like to learn via games")) && <p>&#10004;</p>}
                              </div>
                              <div className="buttonfeel2" tabIndex={1} onClick={() => handleOptionClick("I don't like this format", 'gameGamification')}>
                                <p>
                                  {' '}
                                  &#128078; I don't like this
                                  format
                                </p>
                                {(userInputs.gameGamification == "I don't like this format"
                                  || (learnerPlayList?.playerInputs?.Thankyou?.gameGamification == "I don't like this format")) &&

                                  <p>&#10004;</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameOthers === 'true' && (
                          <div className='content-box' style={{ gridColumn: ((thirdValue === 'gameOthers' && trueValuesArray.length === 3) || (trueValuesArray.length === 1)) ? 'span 2' : '' }}>
                            <Text
                              fontSize={16}
                              fontWeight="300"
                              letterSpacing="0px"
                              textAlign="center"
                              border="2px solid #b3a484"
                            >
                              Anything else you'd like to share
                            </Text>
                            <div
                              className="content-div"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                border: '2px solid #b3a484',
                              }}
                            >
                              <div className="buttonfeel3" >
                                <Textarea
                                  placeholder='Leave Your Comment Here...'
                                  outline="none"
                                  focusBorderColor="none"
                                  border="none"
                                  width="100%"
                                  minH={'auto'}
                                  pt={'0.2rem'}
                                  color="#D9C7A2"
                                  className='thankyou_textarea'
                                  resize={'none'}
                                  _focus={{ boxShadow: 'none', border: 'none' }}
                                  fontFamily="AtlantisContent"
                                  // onChange={handleOtherChange}
                                  // value={learnerPlayList?.playerInputs?.Thankyou?.gameOthers || ''}
                                  onChange={(e) => handleOtherFeedbackChange(e.target.value, 'gameOthers')}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.gameFeedBack === 'true' && (
                          <>
                            <div className="last-item">
                              <Text
                                className=""
                                fontSize={18}
                                fontWeight="300"
                                textAlign="center"
                              >
                                {' '}
                                Could you please share your feedback with us on the
                                below link:
                              </Text>
                              <Text
                                className=""
                                fontSize={18}
                                fontWeight="300"
                                textAlign="center"
                              >
                                <a
                                  href={formData.gameFeedBackLink}
                                  style={{
                                    color: '#caa784',
                                    textDecoration: 'underline',
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {formData.gameFeedBackLink}
                                </a>
                              </Text>
                            </div>

                          </>
                        )}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Scrollbar>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} position={'absolute'} className='thankyou_next_div'>
            <Img
              src={preloadedAssets.left}
              className={'interaction_button'}
              onClick={() => previousNavigation()}
            />
            <Img src={preloadedAssets.right} className={'interaction_button'} w={'auto'} onClick={() => handleNext()} />
          </Box>
        </Box>
      )}
    </>
  );
};
export default ThankYou;


