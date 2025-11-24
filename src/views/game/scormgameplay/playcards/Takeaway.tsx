import {
  Box,
  Img,
  Text
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';
import Scrollbar from 'components/customScroll/CustomScroll';
const Takeway: React.FC<{
  formData: any;
  imageSrc: any;
  getData?: any;
  data?: any;
  preloadedAssets: any;
  gameInfo:any;
  setCurrentScreenId:any;
  FeedbackcurrentPosition:any;
  setFeedbackCurrentPosition:any;
  interactionBlockArray:any;
  profileData:any;
  setFeedbackNavigateNext:any;
  feedbackList:any;
  setInterActionBlockArray:any;
  getFeedbackData:() => void;
  setCurrentQuestNo:any;
  setFirstLoading:any;
}> = ({ formData, imageSrc, getData, data,preloadedAssets,gameInfo,setCurrentScreenId,FeedbackcurrentPosition, setFeedbackCurrentPosition,interactionBlockArray,profileData, getFeedbackData,setFeedbackNavigateNext,setInterActionBlockArray,feedbackList ,setCurrentQuestNo,setFirstLoading}) => {
  const useData = useContext(ProfileContext)
  const [TakeAwayContentLang, setTakeAwayContentLang] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
  const TakeAwayContentLanguage = () =>
    {
      if (profileData?.Audiogetlanguage.length !== 0) {
        const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === formData?.gameId,
       );
       if(GameLanguageFilter.length > 0)
        {
          const takeAwayFiltered = GameLanguageFilter.filter(
            (key: any) => key?.fieldName === 'gameTakeawayContent',
          );
          if(takeAwayFiltered.length > 0)
            {
              const TakeAwayContent = takeAwayFiltered[0]?.content ? takeAwayFiltered[0]?.content.split('\n') : formData?.gameTakeawayContent.split('\n');
              setTakeAwayContentLang(TakeAwayContent)
            }
        }
      }
      else
      {
              setTakeAwayContentLang(formData?.gameTakeawayContent?.split('\n'))
      }
    }
  useEffect(() =>
  {
    TakeAwayContentLanguage();
  },[formData])
  // useEffect(() =>
  // {
  //   TakeAwayContentLanguage();
  // },[])
 
  // const content = formData.gameTakeawayContent?.split('\n');
const previousNavigation =() =>
  {
    useData?.setMotionEffect(true);
    const LastquestNo = parseInt(profile.currentQuest);
    setFirstLoading(false)
    setCurrentQuestNo(LastquestNo)
    setTimeout(() => {
      if (
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
  const handleNext = () => {
    setFirstLoading(true)
    useData?.setMotionEffect(true)
    setTimeout(() => {
      getData(data)
    }, 300)
  }
  return (
    <>
      {imageSrc && (
        <Box className="takeaway-screen">
          <Box className="takeaway-screen-box">
            {formData?.gameIsShowTakeaway === 'true' ?
              (<>
                <Img src={imageSrc} className="bg-take" />
                <Box
                  className="content-box"
                >
                  <Scrollbar>
                    <Box>
                      {TakeAwayContentLang &&
                        TakeAwayContentLang.map((it: any, ind: number) => {
                          const bulletIndex = it.indexOf('\u2022');
                          const contentAfterBullet =
                            bulletIndex !== -1
                              ? it.slice(bulletIndex + 1).trim()
                              : it;
                          return (
                            contentAfterBullet &&
                            <Box
                              className="content"
                              fontFamily={'AtlantisText'}
                              color={'#D9C7A2'}
                              key={ind}
                            >
                              <>
                                <Img
                                  src={preloadedAssets.bull}
                                  className="dot-img"
                                  w={'16px'}
                                  h={'16px'}
                                />
                                {contentAfterBullet}
                              </>
                            </Box>
                          );
                        })}
                    </Box>
                  </Scrollbar>
                </Box>
                <Box className='take-away-btns'>
                  <Img
                    src={preloadedAssets.left}
                    className={'interaction_button'}
                    onClick={() => previousNavigation()}
                  />
                  <Img
                    src={preloadedAssets.right}
                    className={'interaction_button'}
                    onClick={() => handleNext()}
                  />
                </Box>
              </>)
              : <>
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
                          The"Show Takeaway" option is currently disabled. Please enable it if you want to use this feature.</Text>
                        <Box
                          w={'100%'}
                          display={'flex'}
                          justifyContent={'center'}
                          position={'absolute'}
                          bottom={'0'}
                          className='left-right-btn'
                        >
                          <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <Img src={preloadedAssets.left} className={'interaction_button'} cursor={'pointer'} h={'60px'} onClick={() => previousNavigation()} />
                            <Img
                              src={preloadedAssets.right}
                              className={'interaction_button'}
                              cursor={'pointer'}
                              h={'60px'}
                              onClick={() => getData(data)}
                            />
                          </Box>
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>}
          </Box>
        </Box>
      )}
    </>
  );
};
export default Takeway;
