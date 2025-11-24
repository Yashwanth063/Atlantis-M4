import { Box,Img, Text } from '@chakra-ui/react';
import { startTransition,useContext, useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../GamePreview';
const Completion: React.FC<{
  questState: any;
  setType: any;
  setData: any;
  setQuestState: any;
  type: any
  getFeedbackData: any;
  setCurrentScreenId?: any;
  currentScreenId:any;
  getData?: any;
  gameInfo: any;
  data?: any;
  setFeedbackNavigateNext: any;
  currentQuestNo: any;
  preloadedAssets: any;
  setOptions: any;
  profileData: any;
  feedbackList:any;
  setFeedbackList:any;
  learnerPlayList:any;
  setLearnerPlayingDetails:any;
  setprevBlock:any;
  prevBlock:any;
  demoBlocks:any;
  checkCompletionBadge:any;

}> = ({
  currentScreenId,
  setCurrentScreenId,
  gameInfo,
  setType,
  setData,
  type,
  questState,
  setQuestState,
  setFeedbackNavigateNext,
  getData,
  data,
  getFeedbackData,
  currentQuestNo,
  preloadedAssets,
  setOptions, 
  profileData,
  setFeedbackList,
  feedbackList,
  learnerPlayList,
  setLearnerPlayingDetails,
  setprevBlock,
  prevBlock,
  demoBlocks,
  checkCompletionBadge
}) => {
    
   
    const { profile, setProfile } = useContext(ScoreContext);
    const [curretQuestOptions, setCurrentQuestOptions] = useState(
      gameInfo?.gameQuest?.find(
        (quest: any) => quest?.gameQuestNo == profile?.currentQuest,
      ),
    );
    const finalProfileScore = Object.entries(profile?.playerGrandTotal?.questScores).length > 0 ? profile?.playerGrandTotal?.questScores[parseInt(profile.currentQuest)] !== null ? profile?.playerGrandTotal?.questScores[parseInt(profile.currentQuest)] :
    curretQuestOptions?.gameMinScore ? curretQuestOptions?.gameMinScore : 0 : curretQuestOptions?.gameMinScore ?
    curretQuestOptions?.gameMinScore : 0;
    // const finalProfileScore = Object.entries(profile?.playerGrandTotal?.questScores).length > 0 ? profile?.playerGrandTotal?.questScores[parseInt(profile.currentQuest)] !== null ? profile?.playerGrandTotal?.questScores[parseInt(profile.currentQuest)] :
    //   curretQuestOptions?.gameMinScore ? curretQuestOptions?.gameMinScore : 0 : curretQuestOptions?.gameMinScore ?
    //   curretQuestOptions?.gameMinScore : 0;
    const [geFinalscorequest, SetFinalscore] = useState(finalProfileScore);
    const [quetCompletionMessage, setQuestCompletionMessage] = useState<string>("");
    const [QuestTitleLanguage, setQuestTitleLanguage] = useState(null);



    const findQuestCompletionMessage = () => {

      const playerCurrentQuestGrandTotal = profile.playerGrandTotal.questScores[parseInt(currentQuestNo)] ?? 0;
      let completionScreenMessage = "";
      const getCompletionQuest = currentQuestNo - 1;
    
      const currentQuesTGameData = gameInfo?.gameQuest[getCompletionQuest];
      const isSingleMessage = currentQuesTGameData?.gameIsSetCongratsSingleMessage === 'true';
      const isScoreWiseMessage = currentQuesTGameData?.gameIsSetCongratsScoreWiseMessage === 'true';
    
      if (isSingleMessage) {
        const questContentFiltered = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === parseInt(currentQuestNo)
        );
    
        const congratsMsgFiltered = questContentFiltered?.filter(
          (key: any) => key?.fieldName === 'gameCompletedCongratsMessage'
        );
    
        completionScreenMessage = congratsMsgFiltered?.[0]?.content
          ? congratsMsgFiltered[0]?.content
          : currentQuesTGameData?.gameCompletedCongratsMessage;
    
      } 
      else if (isScoreWiseMessage) {
        if (playerCurrentQuestGrandTotal > currentQuesTGameData?.gameDistinctionScore) {
          if(currentQuesTGameData?.gameIsSetDistinctionScore==='true')
          {
            completionScreenMessage = currentQuesTGameData?.gameAboveDistinctionScoreCongratsMessage;
          }
          else{
            if(playerCurrentQuestGrandTotal > currentQuesTGameData?.gameMinScore)
            {
              completionScreenMessage = currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
            }
           
          }
          
        } 
        else if(playerCurrentQuestGrandTotal === currentQuesTGameData?.gameDistinctionScore )
          {
            if(currentQuesTGameData?.gameIsSetDistinctionScore==='true')
              {
                completionScreenMessage = currentQuesTGameData?.gameAboveDistinctionScoreCongratsMessage;
              }
              else{
                if(playerCurrentQuestGrandTotal > currentQuesTGameData?.gameMinScore)
                  {
                completionScreenMessage = currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
              }
            }
          }
        
          else if (playerCurrentQuestGrandTotal > currentQuesTGameData?.gameMinScore) {
          completionScreenMessage = currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
        } 

        else if(playerCurrentQuestGrandTotal ===currentQuesTGameData?.gameMinScore)
        {
          completionScreenMessage = currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
        }
        else if (playerCurrentQuestGrandTotal < currentQuesTGameData?.gameMinScore){
if(currentQuesTGameData?.gameIsSetMinPassScore==='true')
  {
    completionScreenMessage = currentQuesTGameData?.gameMinimumScoreCongratsMessage;
  }
            
            else{
              if(playerCurrentQuestGrandTotal < currentQuesTGameData?.gameDistinctionScore )
              completionScreenMessage = currentQuesTGameData?.gameaboveMinimumScoreCongratsMessage;
            }
          
          }
      } 
      else if (!isSingleMessage && !isScoreWiseMessage && 
                !currentQuesTGameData?.gameIsSetDistinctionScore && 
                !currentQuesTGameData?.gameIsSetMinPassScore) {
        const questContentFiltered = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === parseInt(currentQuestNo)
        );
    
        const congratsMsgFiltered = questContentFiltered?.filter(
          (key: any) => key?.fieldName === 'gameCompletedCongratsMessage'
        );
    
        completionScreenMessage = congratsMsgFiltered?.[0]?.content
          ? congratsMsgFiltered[0]?.content
          : currentQuesTGameData?.gameCompletedCongratsMessage;
    
      } 
      else {
        const questContentFiltered = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === parseInt(currentQuestNo)
        );
        const congratsMsgFiltered = questContentFiltered?.filter(
          (key: any) => key?.fieldName === 'gameCompletedCongratsMessage'
        );
    
        completionScreenMessage = congratsMsgFiltered?.[0]?.content
          ? congratsMsgFiltered[0]?.content
          : currentQuesTGameData?.gameCompletedCongratsMessage;
    
      }
    
      setQuestCompletionMessage(completionScreenMessage);
    };
    
   

    useEffect(() => {

      const findCurrentQuest = currentQuestNo === parseInt(profile?.currentQuest) ? parseInt(profile?.currentQuest) : currentQuestNo;
      const QuestContentFiltered = profileData?.Audiogetlanguage.filter(
        (key: any) => key?.textId === findCurrentQuest,
      );
      if (QuestContentFiltered.length > 0) {

        const gameTitleFiltered = QuestContentFiltered.filter(
          (key: any) => key?.fieldName === 'gameScreenTitle',
        );

        const FilteredTitlecontent = gameTitleFiltered[0]?.content ? gameTitleFiltered[0]?.content : curretQuestOptions?.gameScreenTitle;
        const screenTitleLanguage = FilteredTitlecontent;

        setQuestTitleLanguage(screenTitleLanguage);
      }
      else {
        setQuestTitleLanguage(curretQuestOptions?.gameScreenTitle);
      }

      

      findQuestCompletionMessage();
      // checkCompletionBadge();
// getData();

    }, []);

    useEffect(() => {
      if (gameInfo?.gameQuest.length > 0) {
        const currentQuestData = gameInfo?.gameQuest?.find(
          (quest: any) => quest.gameQuestNo == profile?.currentQuest,
        );
        setCurrentQuestOptions(currentQuestData);
        findQuestCompletionMessage();
      }
    }, [gameInfo?.gameQuest])


    const previousNavigation = () => {
      console.log(" learnerPlayList*********",learnerPlayList);
      console.log(" learnerPlayList********* profile",profile);
      const questNo=profile?.currentQuest;
      // const Prevquestseq =learnerPlayList?.Prevquestseq[playingQuest];
      const lastSeq = learnerPlayList?.Prevquestseq[questNo];
          let updateNavigateSeq: any = [...learnerPlayList?.Prevquestseq[questNo]];
          console.log("learner-updateNavigateSeq",updateNavigateSeq)
          updateNavigateSeq.pop();
          setLearnerPlayingDetails((prev: any) => ({
            ...prev,
            Prevquestseq: { ...prev.Prevquestseq, [questNo]: updateNavigateSeq }
          }));

          let prev = prevBlock.length > 0 ? prevBlock[prevBlock.length - 1] : lastSeq ? lastSeq[lastSeq.length - 1] : null;
         
      console.log("learner-prev",prev)
      console.log("learner-lastSeq",lastSeq)
      console.log("learner-prevBlock",prevBlock)
      let getBlocks:any;
      if(prev)
      {
         getBlocks = Object.values(demoBlocks[questNo]).filter((item: any) => item?.blockPrimarySequence === prev);
         if(prevBlock.length === 0 && updateNavigateSeq.length > 0)
         {
           setprevBlock(updateNavigateSeq);
          }
          prevBlock.pop();
          startTransition(() => {
        setData(getBlocks[0]);
        setType(getBlocks[0]?.blockChoosen);
        if (
          getBlocks[0]?.blockChoosen ===
          'Interaction'
        ) {
          const optionsFiltered = [];
          const primarySequence = getBlocks[0].blockPrimarySequence;
    
          for (const option of gameInfo.questOptions) {
            if (profileData?.Audiogetlanguage.length > 0) {
              if (option?.qpSequence === primarySequence) {
                const profilesetlan = profileData?.Audiogetlanguage.find(
                  (key: any) => key?.textId === option.qpOptionId,
                );
    
                if (profilesetlan) {
                  const languagecont = {
                    ...option,
                    qpOptionText: profilesetlan.content,
                  };
                  optionsFiltered.push(languagecont);
                } else {
                  optionsFiltered.push(option);
                }
              }
            } else {
              if (option?.qpSequence === primarySequence) {
                optionsFiltered.push(option);
              }
            }
          }
          if (gameInfo?.gameData?.gameShuffle === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ]; 
            }
          }
          setOptions(optionsFiltered);
        }
        if(questState && questState[profile?.currentQuest])
        {
           if(questState[profile?.currentQuest] !== 'Started')
           {
                setProfile((prev: any) => ({
                  ...prev,
                  replayScore: profile.score,
                }));
           }
        }
       
        setCurrentScreenId(2);
      });
              return false;
      }
      else{
        startTransition(() => {
        setCurrentScreenId(13);
        })
      }
   
    }
    useEffect(() => {
      gameInfo?.gameQuest.map((item: any) => {
        const questNoAsString = item.gameQuestNo.toString();
        if (profile?.completedLevels?.includes(questNoAsString)) {
          const scores = profile?.score;
          if (scores !== undefined) {
            const sums: any = {};
            scores.forEach((score: any) => {
              const quest = score.quest;
              if (!sums[quest]) {
                sums[quest] = 0;
              }
              sums[quest] += score.score;
            });
            const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
              quest,
              score,
            }));
            const getscores = getFinalscores.find(
              (row: any) => row.quest == item.gameQuestNo,
            );
            const finalscore = getscores?.score ?? 0;
            if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false') {
              if (item?.gameIsSetMinPassScore === 'true') {
                const getminpassscore = item?.gameMinScore;

                if (
                  finalscore >= getminpassscore &&
                  finalscore < item?.gameTotalScore && profile.compQuest.includes(questNoAsString)
                ) {
                  setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [item.gameQuestNo]: 'replayallowed',
                  }));
                } else {
                  if (finalscore !== undefined && profile.compQuest.includes(questNoAsString) ) {
                    const status = gameInfo?.gameData?.gameDisableOptionalReplays === 'false' ? "replayallowed" : "completed";

                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [item.gameQuestNo]: 'replayallowed',
                    }));
                  } else {
                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [item.gameQuestNo]: 'Started',
                    }));
                  }
                }
              } 
             
              else {
                if (finalscore !== undefined && profile.compQuest.includes(questNoAsString)) {
                  setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [item.gameQuestNo]: 'replayallowed',
                  }));
                }  
                
                
                else {
                  if (item.gameIsSetMinPassScore=== 'false' && profile.compQuest.includes(questNoAsString))
                    { 
                      setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [item.gameQuestNo]: 'completed',
                      }));
                    }
                    else
                    {
                      setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [item.gameQuestNo]: 'Started',
                      }));
                    }
                  
                }
              
              }
            } else {
              if (finalscore !== undefined && profile.compQuest.includes(questNoAsString) ) {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [item.gameQuestNo]: 'completed',
                }));
              } 
              else if (item.gameIsSetMinPassScore=== 'false' && profile.compQuest.includes(questNoAsString))
                {
                      setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [item.gameQuestNo]: 'completed',
                      }));

                }else {
                setQuestState((prevquestdataList: any) => ({
                  ...prevquestdataList,
                  [item.gameQuestNo]: 'Started',
                }));
              }
            }
          }
        }
        else {
          setQuestState((prevquestdataList: any) => ({
            ...prevquestdataList,
            [item.gameQuestNo]: 'locked',
          }));
        }
      });
    }, [profile?.compleLevel]);
 

    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="comple-screen">
            <Img src={preloadedAssets.Screen1} className="bg-img" />
            <Box className="title">
              <Text fontFamily={'AtlantisText'} textAlign={'center'}>
                {QuestTitleLanguage}
              </Text>
            </Box>
            <Box className="content-box">
              <Box className="congratulations">
                <Box className="content" mt="0px">
                  {quetCompletionMessage}
                </Box>
              </Box>
              <Box className="rewards-img-box">
                <Img className="rewards-arrow-img" src={preloadedAssets.rew} />
              </Box>
              <Box className="points-box">
                <Box className="box-1">
                  <Img src={preloadedAssets.back} className="box-1_img" />
                  <Text className="points-text" fontFamily={'content'}>
                    points
                  </Text>
                  <Box className="inside-box-1">
                    <Img
                      src={preloadedAssets.point}
                      className="inside-box-1_img"
                    />
                    <Text className="inside-points-text" fontFamily={'content'}>
                      {`${geFinalscorequest ? geFinalscorequest : 0 || 0 }/`}{curretQuestOptions?.gameTotalScore}
                    </Text>
                  </Box>
                </Box>

                {curretQuestOptions?.gameIsSetBadge === 'true' && (
                  <Box className="box-2 dfg">
                    <Img src={preloadedAssets.back} className="box-2_img" />
                    <Text className="points-text" fontFamily={'content'}>
                      {curretQuestOptions?.gameBadge && curretQuestOptions?.gameBadge !== '' ? curretQuestOptions?.gameBadgeName : ''}
                    </Text>
                    {curretQuestOptions?.gameBadge && curretQuestOptions?.gameBadge !== '' &&
                      curretQuestOptions?.gameIsSetCriteriaForBadge === 'true' ? curretQuestOptions?.gameAwardBadgeScore <= geFinalscorequest ?
                      (
                        <Img className="inside-img" src={preloadedAssets[`Quest_${currentQuestNo === profile?.currentQuest ? profile?.currentQuest : currentQuestNo}`]} />
                      )
                      : 
                        <span className='missed-reward'>You missed the reward!</span>
                      :
                      <Img className="inside-img" src={preloadedAssets[`Quest_${currentQuestNo === profile?.currentQuest ? profile?.currentQuest : currentQuestNo}`]} />
                    }{' '}
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="next-btn">
              {gameInfo.gameData?.gameDisableOptionalReplays === 'false' ?
                <Img
                  src={preloadedAssets.left}
                  className={'interaction_button'}
                  onClick={() => previousNavigation()}
                />
                : <Img />}

              <Img src={preloadedAssets.right} onClick={() => getData(data)} />
            </Box>
          </Box>
        </motion.div>
      </>
    );
  };
export default Completion;
