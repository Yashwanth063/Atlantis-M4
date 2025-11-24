import {
  Box,
  Grid,
  GridItem,
  Img,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import { ScoreContext } from '../GamePreview';
import { ProfileContext } from '../EntirePreview';
import { scormactivityCreate, scormactivitygetlastblock } from "utils/scormApplication/scormgameActivityService";
const ChapterPage: React.FC<{
  questState: any;
  setQuestState: any;
  backgroundImg: any;
  setCurrentScreenId: any;
  setCurrentQuestNo?: any;
  setData?: any;
  setType?: any;
  setOptions?: any;
  setFeedbackList?: any;
  preloadedAssets?: any;
  currentScreenId: any;
  profileData: any;
  gameInfo: any;
  setModalLoaded?: any;
  modalLoaded?: any;
  setLearnerPlayingDetails:any;
  learnerPlayList:any;
  setAssignId:any;
  AssignId:any;
  Activitydata:any;
  setActivitydata:any;
  setprevBlock:any;
  prevBlock:any;
  setNavi:any;
  getData:any;
  setFeed:any;
  setRepeatSelectOption:any;
  RepeatPrevOption:any;
  setRepeatPrevOption:any;
  setReplayState:any;
  setReplayIsOpen:any;
  setIsZoomComplete:any;
  isZoomComplete:any;
  handleReplayButtonClick:any;
  scoreChapter:any;
  setScoreChapter:any;
  questWisePlayerScore:any;
  setQuestWisePlayerScore:any;
  checkCompletionBadge:any;
}> = ({
  handleReplayButtonClick,
  setCurrentScreenId,
  setCurrentQuestNo,
  questState,
  setQuestState,
  setData,
  setType,
  setOptions,
  setFeedbackList,
  preloadedAssets,
  currentScreenId,
  profileData,
  gameInfo,
  backgroundImg,
  modalLoaded,
  setModalLoaded,
  setLearnerPlayingDetails,learnerPlayList,
  AssignId,
  setAssignId,
  Activitydata,
  setActivitydata,
  prevBlock,
  setprevBlock,
  setNavi,
  getData,
  setFeed,
  setRepeatSelectOption,
  RepeatPrevOption,
  setRepeatPrevOption,
  setReplayIsOpen,
  setReplayState,setIsZoomComplete,
  isZoomComplete,
  scoreChapter,
  setScoreChapter,
  setQuestWisePlayerScore,
  questWisePlayerScore,
  checkCompletionBadge
}) => {
  // console.log("learnerPlayList.progress in chapter",learnerPlayList.progress)
const progressforBadge=learnerPlayList.progress;
const progressforBadgeInpercent=Math.floor(progressforBadge * 100);
// console.log("progressforBadgeInpercent",progressforBadgeInpercent)
    const [questScores, setQuestScores] = useState(null);
    // const [questWisePlayerScore, setQuestWisePlayerScore] = useState(null);

    const [AllowedReplayOption, setAllowedReplayOption] = useState(null);
    const [hasClicked, setHasClicked] = useState(false);
    const  learner_game_play_id  = learnerPlayList?.GameId;
    const useData = useContext(ProfileContext);
    useEffect(() => {
      let GrandMaximumscore: any = {};
      let currentScores: any[];
      let getquest: any[];
      let maxScoreByQuest: { key: string; value: number }[] = [];
      profile?.score.map((profileQuest: any) => {
        if (!getquest?.includes(profileQuest?.quest)) {
          const scores = profile?.score;
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
          getquest = getFinalscores;
        }
      })
      const scores = profile?.score;
      const sums: any = {};
      scores?.forEach((score: any) => {
        const quest = score.quest;
        if (!sums[quest]) {
          sums[quest] = 0;
        }
        sums[quest] += score.score;
      });
      getquest?.map((profileQuest: any) => {
        if (sums[profileQuest?.quest] !== undefined) {
          currentScores = profile?.score
        }
        const currentQuestseqId = Array.isArray(currentScores)
          ? currentScores.map((item) => item.seqId)
          : [];
        if (Array.isArray(currentScores) && currentScores.length > 0) {
          // Map currentScores to extract scores
          const scores = currentScores.map((item) => item.score);

          const result = currentQuestseqId?.map((seqId) => {
            const QuestNo = seqId.split('.')[0];
            if (QuestNo == profileQuest?.quest) {
              const filteredOptions = gameInfo?.questOptions?.filter(
                (option: any) => option.qpSequence == seqId,
              );
              const qpScoresOption = filteredOptions.map((option: any) =>
                parseInt(option.qpScore),
              );
              qpScoresOption.sort((a: any, b: any) => b - a);
              if (!GrandMaximumscore[profileQuest?.quest]) {
                GrandMaximumscore[profileQuest?.quest] = 0;
              }
              GrandMaximumscore[profileQuest?.quest] += qpScoresOption[0];
            }
            maxScoreByQuest = { ...maxScoreByQuest, ...GrandMaximumscore }
          });
        } else {
         
        }
      })
      setQuestScores(maxScoreByQuest);
      const getQuestwisePlayerScore = async () => {
        let result: { [key: number]: number } = {};
        if (gameInfo?.blocks) {

          Object.keys(gameInfo?.blocks).forEach((it: any, num: number) => {
            // const scores = profile?.score;
              const scores =
        Object.entries(questState).length > 0 ?
          questState[parseInt(profile?.currentQuest)] === 'Started'
            ?
            profile?.score
            :
            Object.entries(questState).length > 0 ?
              (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
                profile?.replayScore.length > 0 ? profile?.replayScore : profile?.score
                :
                profile?.score
              :
              profile?.score
          :
          profile?.score
        ;
            const sums: any = {};
            scores?.forEach((score: any) => {
              const quest = score.quest;
              if (!sums[quest]) {
                sums[quest] = 0;
              }
              sums[quest] += score.score;
            });

            let getFinalscores: any = {};
            Object.entries(sums).forEach(([quest, score]) => {
              const IntQuest = parseInt(quest);
              const newQuest = { ...getFinalscores, [IntQuest]: score };
              getFinalscores = { ...newQuest };

            });
            const TotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
              if (it == acc[0]) {
                  tot = acc[1];
                return tot;
              }
            }, 0);
            result = { ...result, [parseInt(it)]: TotalScore ? TotalScore : getFinalscores[it] };
          })
        }
        return result;
      }
      getQuestwisePlayerScore().then((score: any) => {
        setQuestWisePlayerScore(score);
      });
    }, []);
console.log('AssignId=>',AssignId)
    const { profile, setProfile } = useContext(ScoreContext);
    useEffect(() => {
      const currentQuest = profile?.currentQuest;
      gameInfo?.gameQuest.map((item: any, index: number) => {
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
                  finalscore < item?.gameTotalScore
                ) {
                  if(Object.entries(questState).length === 0)
                  {

                      setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [item.gameQuestNo]: 'Started',
                  }));
                  }
                } else {
                  if (finalscore !== undefined) {
                    if(Object.entries(questState).length === 0)
                      {
                          setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [item.gameQuestNo]: 'Started',
                      }));
                      }

                  } else {
                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [item.gameQuestNo]: 'Started',
                    }));
                  }

                }
              } else {
                if (finalscore !== undefined) {
                  if(Object.entries(questState).length === 0)
                    {
                        setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [item.gameQuestNo]: 'Started',
                    }));
                    }
                } 
                
                  else {
                    const scores = profile?.playerGrandTotal?.questScores[currentQuest];
                    if(scores===0)
                    {
                      const status = gameInfo?.gameData?.gameDisableOptionalReplays === 'false' ? "replayallowed" : "completed";
                      const finalscore = 0;
                      if(finalscore===0 && profile.compQuest.includes(questNoAsString))
                        {
                          if(item?.gameIsSetMinPassScore === 'false')
                          {
                            setQuestState((prevquestdataList: any) => ({
                              ...prevquestdataList,
                              [item.gameQuestNo]: status,
                            }));
                          }
                        }
                    }
                   else{
                      setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [item.gameQuestNo]: 'Started',
                      }));
                    }
                    }
              }
            } else {
              if (finalscore !== undefined) {
                if(Object.entries(questState).length === 0)
                  {
                      setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [item.gameQuestNo]: 'Started',
                  }));
                  }
                  else if(questState[item.gameQuestNo] === 'locked')
                  {
                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [item.gameQuestNo]: 'Started',
                    }));
                  }

              } 
              
              else {
                if(Object.entries(questState).length === 0) {
                  setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [item.gameQuestNo]: 'Started',
                  }));
                }
               
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
    }, [profile]);
    const handleChapter = async(it: any) => {
      if (hasClicked) return; // Prevent multiple executions
      setHasClicked(true);
      if(isZoomComplete){
        setIsZoomComplete(false);
      }
      
        setProfile((prev: any) => ({
          ...prev,
          currentQuest: it.toString(),
        }));
      
      const checkdata = {
        gameId: learner_game_play_id,
        questNo: parseInt(it),
        learnerid:learnerPlayList.playerId,
      }
      const datas = JSON.stringify(checkdata);
      const lastBlockresult = await scormactivitygetlastblock(datas);
      if(lastBlockresult.status !== 'Success')
      {
        return false;
      }
      else if (gameInfo?.gameData?.gameDisableOptionalReplays === 'true' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
        
        if (questState[parseInt(it)] === 'replayallowed') {
          setQuestState((prevquestdataList: any) => ({
            ...prevquestdataList,
            [it]: 'completed',
          }));
        }
        setActivitydata(lastBlockresult?.data[0]?.galId);
        setCurrentQuestNo(parseInt(it));
        setCurrentScreenId(6);
        console.log('check 1')
        return false;
      }
      else{
        if (lastBlockresult.data.length !== 0) {
            if (lastBlockresult.data[0]?.galBlockId !== null) {
              if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
                if (questState[parseInt(it)] === 'completed') {
                  setQuestState((prevquestdataList: any) => ({
                    ...prevquestdataList,
                    [it]: 'replayallowed',
                  }));
                }
               
              }
              const Blockidcontinue = lastBlockresult.data[0].galBlockId;
              setActivitydata(lastBlockresult.data[0].galId);
              const selectedFindNext:any = Object.values(gameInfo?.blocks[it])?.filter((item: any) => item?.blockSecondaryId == Blockidcontinue);
              setCurrentQuestNo(it);
              let selectedNext:any;
              if (selectedFindNext.length > 0) {
                const getLeadsto = selectedFindNext[0]?.blockChoosen === 'Interaction' ? await getInteractionNavi(selectedFindNext[0],it)  :selectedFindNext[0]?.blockLeadTo;
                const condition = ['Complete','Replay Point','Repeat Question'];
                if(getLeadsto && !condition.includes(getLeadsto))
                {
                  selectedNext = Object.keys(gameInfo?.blocks[it])
                  .filter((item: any) => {
                    return (
                      gameInfo?.blocks[it][item]?.blockSecondaryId ===
                      parseInt(getLeadsto)
                    );
                  })
                  .map((item: any) => {
                    return gameInfo?.blocks[it][item];
                  });
                }
                else{
                   checkFunction(getLeadsto,selectedFindNext[0],it,gameInfo?.gameData?.gameDisableOptionalReplays);
                   return false;
                }
                if (selectedNext[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
  
                  for (const option of gameInfo?.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (
                        option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                      ) {
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
                      if (
                        option?.qpSequence === selectedNext[0]?.blockPrimarySequence
                      ) {
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
                  setData(selectedNext[0]);
                  setType(selectedNext[0]?.blockChoosen);
                  const AllSeq =learnerPlayList?.Prevquestseq[it];
                  if (AllSeq && AllSeq.length > 0) {
                    AllSeq.pop();
                    if (AllSeq && prevBlock.length === 0) {
                      setprevBlock(AllSeq);
                    }
                  }
                  setCurrentScreenId(2);
                  return false;
                }
                else{
                  setData(selectedNext[0]);
                  setType(selectedNext[0]?.blockChoosen);
                  const AllSeq =learnerPlayList?.Prevquestseq[it];
                  if (AllSeq && AllSeq.length > 0) {
                    AllSeq.pop();
                    if (AllSeq && prevBlock.length === 0) {
                      setprevBlock(AllSeq);
                    }
                  }
                  setCurrentScreenId(2);
                  return false;
                }
                
              }
              else
              {
                setLearnerPlayingDetails((prev: any) => {
                  const updatedPrevquestseq = { ...prev.Prevquestseq };
                  if (updatedPrevquestseq[it]) {
                    delete updatedPrevquestseq[it];
                  }
                  return {
                    ...prev,
                    Prevquestseq: updatedPrevquestseq
                  };
                });
                setprevBlock([]);
                
                if (profile?.completedLevels?.includes(it)) {
                  setType(gameInfo?.blocks[it]['1']?.blockChoosen);
                  setData(gameInfo?.blocks[it]['1']);
                  if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
                    const optionsFiltered = [];
                    const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
                    for (const option of gameInfo?.questOptions) {
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
                  setProfile((prev: any) => {
                    // const updatedscore = profile?.score.length > 0 ? profile?.score?.filter((item: any) => item.quest != it) : prev.score;
                    
                    const data = { ...prev }; 
                    if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
                    {
                      data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                    }
                    // else if(questState[parseInt(it)] === 'replayallowed')
                    // {
                    //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                    // }
                    if(profile.completedLevels.length === 0)
                      {
                        data.completedLevels = [String(it)];
                      }
                      else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
                      {
                        data.completedLevels = [...data.completedLevels, String(it)];
                      }
                    return data;
                  });
                  setCurrentScreenId(2);
                }
                return false;
              }

            }
            else {
              setLearnerPlayingDetails((prev: any) => {
                const updatedPrevquestseq = { ...prev.Prevquestseq };
                if (updatedPrevquestseq[it]) {
                  delete updatedPrevquestseq[it]; 
                }
                return {
                  ...prev,
                  Prevquestseq: updatedPrevquestseq 
                };
              });
              setprevBlock([]);
              if (profile?.score.length > 0) {
                // const updatedscore = profile?.score?.filter((item: any) => item.quest != it);
                // setProfile((prev: any) => ({
                //   ...prev,
                //   score: updatedscore,
                // }));
                setProfile((prev: any) => {
                  const data = { ...prev }; 
                  if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
                    {
                      data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                    }
                  // else if(questState[parseInt(it)] === 'replayallowed')
                  // {
                  //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                  // }
                  return data;
                });
              }
              const data = {
                gameId: learner_game_play_id,
                questNo: parseInt(it),
                galBlockId: '',
                averageScore: 0,
                galAssignedId:AssignId,
                learnerid:learnerPlayList.playerId,
              }
              const getdata = JSON.stringify(data)
              const result = await scormactivityCreate(getdata);
              if (result.status !== 'Success') {
                return false;
              } else {
                if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
                  if (questState[parseInt(it)] === 'completed') {
                    setQuestState((prevquestdataList: any) => ({
                      ...prevquestdataList,
                      [it]: 'replayallowed',
                    }));
                  }
                }
                if (profile?.score.length > 0) {
                  // const updatedscore = profile?.score?.filter((item: any) => parseInt(item.quest) !== parseInt(it));
                  // setProfile((prev: any) => ({
                  //   ...prev,
                  //   score: updatedscore,
                  // }));
                  setProfile((prev: any) => {
                    const data = { ...prev }; 
                    if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
                      {
                        data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                      }
                    // else if(questState[parseInt(it)] === 'replayallowed')
                    // {
                    //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                    // }
                    return data;
                  });
                }
                setCurrentQuestNo(it)
                setActivitydata(result.data);
                if (profile?.completedLevels?.includes(it)) {
                  setType(gameInfo?.blocks[it]['1']?.blockChoosen);
                  setData(gameInfo?.blocks[it]['1']);
                  if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
                    const optionsFiltered = [];
                    const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
                    for (const option of gameInfo?.questOptions) {
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
                  setProfile((prev: any) => {
                    const data = { ...prev };
                    if(profile.completedLevels.length === 0)
                      {
                        data.completedLevels = [String(it)];
                      }
                      else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
                      {
                        data.completedLevels = [...data.completedLevels, String(it)];
                      }
                    return data;
                  });
                  setCurrentScreenId(2);
                }
                return false;
              }

              
            }
          }
        else{
          setLearnerPlayingDetails((prev: any) => {
            const updatedPrevquestseq = { ...prev.Prevquestseq };
            if (updatedPrevquestseq[it]) {
              delete updatedPrevquestseq[it];
            }
            return {
              ...prev,
              Prevquestseq: updatedPrevquestseq
            };
          });
          setprevBlock([]);
          if (profile?.score.length > 0) {
            // const updatedscore = profile?.score?.filter((item: any) => item.quest != it);
            // setProfile((prev: any) => ({
            //   ...prev,
            //   score: updatedscore,
            // }));
            setProfile((prev: any) => {
              const data = { ...prev }; 
              if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
                {
                  data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                }
                    return data;
            });
          }
          const data = {
            gameId: learner_game_play_id,
            questNo: parseInt(it),
            galBlockId: '',
            averageScore: 0,
            galAssignedId:AssignId,
            learnerid:learnerPlayList.playerId,
          }
          const datas = JSON.stringify(data)
          const result = await scormactivityCreate(datas);
          if (result.status !== 'Success') {
            return false;
          } 
         else if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
                    if (questState[parseInt(it)] === 'completed') {
                      setQuestState((prevquestdataList: any) => ({
                        ...prevquestdataList,
                        [it]: 'replayallowed',
                      }));
                    }
                  }
          if (profile?.score.length > 0) {
            // const updatedscore = profile?.score?.filter((item: any) => parseInt(item.quest) !== parseInt(it));
            // setProfile((prev: any) => ({
            //   ...prev,
            //   score: updatedscore,
            // }));
            setProfile((prev: any) => {
              const data = { ...prev }; 
              if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
                {
                  data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
                }
              // else if(questState[parseInt(it)] === 'replayallowed')
              //       {
              //         data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
              //       }
                    return data;
            });
          }
          setCurrentQuestNo(it)
          setActivitydata(result.data);
          if (profile?.completedLevels?.includes(it)) {
            setType(gameInfo?.blocks[it]['1']?.blockChoosen);
            setData(gameInfo?.blocks[it]['1']);
            if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
              for (const option of gameInfo?.questOptions) {
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
            setProfile((prev: any) => {
              const data = { ...prev };
              if(profile.completedLevels.length === 0)
                {
                  data.completedLevels = [String(it)];
                }
                else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
                {
                  data.completedLevels = [...data.completedLevels, String(it)];
                }
              return data;
            });
            setCurrentScreenId(2);
          }
        }
      }
      for (let values in questState) {
        if (values === it) {
          if (questState[it] !== 'Locked') {
            useData?.setMotionEffect(true);
          }
          else {
            useData?.setMotionEffect(false);
          }
        }
      }


      setTimeout(() => setHasClicked(false), 10000); // Reset after 3s if needed
    };

    const getPrevSelectedOption =(selectedFindNext:any)=>
    {
      const scores =
        Object.entries(questState).length > 0 ?
          questState[parseInt(profile?.currentQuest)] === 'Started'
            ?
            profile?.score
            :
            Object.entries(questState).length > 0 ?
              (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
                profile?.replayScore.length > 0 ? profile?.replayScore : profile?.score
                :
                profile?.score
              :
              profile?.score
          :
          profile?.score
        ;
      const foundNavi = scores?.filter((item:any) => item.seqId == selectedFindNext?.blockPrimarySequence);
        if(foundNavi.length > 0)
        {
          return foundNavi[0]?.choosedoption;
        }
        else{
          return null;
        }
    }
    const getInteractionNavi = (getBlocks:any,Quest:any)=>
    {
       const scoreArray =
        Object.entries(questState).length > 0 ?
          questState[parseInt(profile?.currentQuest)] === 'Started'
            ?
            profile?.score
            :
            Object.entries(questState).length > 0 ?
              (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
                profile?.replayScore
                :
                profile?.score
              :
              profile?.score
          :
          profile?.score
        ;
        const foundNavi = scoreArray?.filter((item:any) => item.seqId == getBlocks?.blockPrimarySequence);
        if(foundNavi.length > 0)
        {
          const optionsFiltered = [];
  
          for (const option of gameInfo?.questOptions) {
              if (
                option?.qpSequence === getBlocks?.blockPrimarySequence
              ) {
                optionsFiltered.push(option);
              }
          }
          // item?.qpNextOption
          if(optionsFiltered)
          {
             const getFilterOption = optionsFiltered.filter((item:any)=>item?.qpOptions === foundNavi[0]?.choosedoption);
             if(getFilterOption)
             {
                return getFilterOption[0]?.qpNextOption;
             }
             else{
              return null;
             }
          }
          else{
              return null;
          }
        }
        else{
          return null;
        }

    }
    const checkFunction = async(getLeadsto:any,selectedFindNext:any,Quest:any,gameDisableOptionalReplays:any)=>
    {
      console.log('slecetedNext',getLeadsto);
      const nextLevel = parseInt(Quest) + 1 || null;
      if(getLeadsto === 'Repeat Question' && selectedFindNext?.blockChoosen === 'Interaction'){
           console.log('cond 1')
         setFeed('');
            setRepeatSelectOption(true);
            const getOption = await getPrevSelectedOption(selectedFindNext);
            if(getOption)
            {
              RepeatPrevOption.push(getOption);
            }
            setRepeatPrevOption(RepeatPrevOption);
            setType(selectedFindNext?.blockChoosen);
            setData(selectedFindNext);
            if (selectedFindNext?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              for (const option of gameInfo.questOptions) {
                if (profileData?.Audiogetlanguage.length > 0) {
                  if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
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
                  if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
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
            setCurrentScreenId(2);
            return false;
      }
      else if(getLeadsto === 'Repeat Question' && selectedFindNext?.blockChoosen !== 'Interaction')
      {
        console.log('cond 2')
          if (selectedFindNext?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
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
                if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
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
        setType(selectedFindNext?.blockChoosen);
        setData(selectedFindNext);
        setCurrentScreenId(2);
        return false;
      }
      else if(getLeadsto === 'Replay Point'){
      console.log('cond 3')
          // setReplayState('replayPointPrompt');
          // setReplayIsOpen(true);
          handleReplayButtonClick("replayPointPrompt")
          setCurrentQuestNo(Quest);
          setCurrentScreenId(2);
          return false;
        }
      else if(getLeadsto === 'Complete') {
      checkCompletionBadge();
        if (gameInfo?.blocks.hasOwnProperty(nextLevel)) {
          setProfile((prev: any) => {
            const data = { ...prev };
            if (profile.compQuest.length === 0) {
              data.compQuest = [String(profile?.currentQuest)];
            }
            else if (!profile.compQuest.includes(String(profile?.currentQuest))) {
              data.compQuest = [...data.compQuest, String(profile?.currentQuest)];
            }
            if (!profile.completedLevels.includes(String(nextLevel))) {
              data.completedLevels = [...data.completedLevels, String(nextLevel)];
            }
            return data;
          });
        }
        else {
          setProfile((prev: any) => {
            const data = { ...prev };
            if (profile.compQuest.length === 0) {
              data.compQuest = [String(profile?.currentQuest)];
            }
            else if (!profile.compQuest.includes(String(profile?.currentQuest))) {
              data.compQuest = [...data.compQuest, String(profile?.currentQuest)];
            }
            return data;
          });
        }
        if(gameDisableOptionalReplays === 'false')
        {
          handleReplayButtonClick('optionalReplay')
          return false;
        }
        else
        {
          setCurrentScreenId(6);
          setType(null);
          setData(null);
          return false;
          }
      }
      else{
        if(gameDisableOptionalReplays === 'false')
          {
            handleReplayButtonClick('optionalReplay')
            return false;
          }
          else
          {
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
            }
      }
    }
    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.8,
          staggerChildren: 1,
        },
      },
    };
    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };
    return (
      <>
        <Box
          position="relative"
          maxW="100%"
          w={'100vw'}
          height="100vh"
          backgroundImage={preloadedAssets?.introBgImage}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          className="chapter_potrait"
        >
          <Grid
            templateColumns="repeat(1, 1fr)"
            gap={4}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="75%"
            placeItems={'center'}
          >
            <GridItem colSpan={1} position={'relative'}>
              <Img
                src={preloadedAssets.QueueBackground}
                h={'auto'}
                maxW={'100%'}
                loading="lazy"
              />
              <Box className="chapter_title">Quest</Box>
              <Box className={'chapters_list_box'}>
                <Box w={'90%'}>
                  <motion.div
                    className="container"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    <SimpleGrid columns={{ base: 3, sm: 3, md: 3 }} spacing={{ base: 7, md: 4, lg: 7 }}>
                      {gameInfo?.blocks &&
                        Object.keys(gameInfo?.blocks).map((it: any, num: number) => {
                          const questCondition = questState[it] === 'Started' || questState[it] === 'completed' || questState[it] === 'replayallowed';
                          const questwisescore = gameInfo?.completionQuestOptions?.filter((item: any) => item.gameQuestNo === parseInt(it))
                          return (
                            <motion.div
                              key={num}
                              className="item"
                              variants={item}
                            >
                              { gameInfo.gameQuest.some(
                                (row: any) => row.gameQuestNo == it,
                              )  &&  <Box
                                position={'relative'}
                                // onClick={() => profile?.completedLevels?.includes(it) ? handleChapter(it) : null}
                                onClick={() => {
                                  if (profile?.completedLevels?.includes(it)) {
                                    handleChapter(it);
                                    setHasClicked(true);
                                  }
                                }}
                                
                              >
                                <Img src={backgroundImg} width={'97%'} transform={'translate(2px, 1px)'} filter={questCondition ? 'none' : 'grayscale(1)'} />
                                <Img 
                                  className="queue-screen"
                                  position={'absolute'}
                                  left={'-2px'}
                                  top={'-2px'}
                                  src={questCondition ? preloadedAssets.QueueScreen : preloadedAssets.Lock}
                                  zIndex={999}
                                />
                                <Box w={'100%'} position={'absolute'} top={'0'}>
                                  {questCondition ?
                                    <Text
                                      textAlign={'center'}
                                      right={'65px'}
                                      fontFamily={'AtlantisText'}
                                      color={'#D9C7A2'}
                                      zIndex={999999}
                                      fontSize={'3vw'}
                                      className={'quest_title'}
                                      textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                    >
                                      Quest {num + 1}
                                    </Text> : null}
                                </Box>
                                <Box
                                  w={'100%'}
                                  position={'absolute'}
                                  bottom={'0'}
                                  color={'#D9C7A2'}
                                  fontFamily={'AtlantisText'}
                                  zIndex={999999}
                                  display={'flex'}
                                  justifyContent={'center'}
                                >
                                  {questCondition ?
                                    <>
                                      <Text
                                        className="amount-score"
                                        textAlign={'center'}
                                        
                                      >
                                        {questWisePlayerScore && questWisePlayerScore[it] ? questWisePlayerScore[it] : 0}
                                        /{questwisescore[0]?.gameQuestNo === parseInt(it) ? questwisescore[0].gameTotalScore : 0}
                                        {' '}
                                      </Text>
                                      <Img
                                      className="money"
                                        // h={'25px'}
                                        // w={'auto'}
                                        
                                        src={preloadedAssets.MoneyIcon}
                                        zIndex={5}
                                      /> </> : null}
                                </Box>
                                {profile?.completedLevels?.includes(it) ? (
                                  Object.entries(questState).map(
                                    ([questId, status], index) =>
                                      questId === it && status === 'completed' ? (
                                        <Box className={'completed_level'}>
                                          {' '}
                                          <Box
                                            position={'relative'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                          >
                                            {' '}
                                            <Img
                                              w={'40%'}
                                              h={'auto'}
                                              src={preloadedAssets?.Completed}
                                            />{' '}
                                          </Box>
                                        </Box>
                                      ) : questId === it &&
                                      
                                        status === 'replayallowed' 
                                        && profile?.completeBadgseShow?.includes(it)
                                        // && progressforBadgeInpercent == 100
                                         ? (
                                        <Box className={'completed_level'}>
                                          {' '}
                                          <Box
                                            position={'relative'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                          >
                                            {' '}
                                            <Img
                                            className='completedgoldicon'
                                              // w={'40%'}
                                              // h={'auto'}
                                              src={preloadedAssets?.Completed}
                                            />{' '}
                                          </Box>
                                        </Box>
                                      ) : questId === it &&
                                        status === 'locked' ? (
                                        <Img
                                          key={index}
                                          className="lock"
                                          width={'97%'}
                                          position={'absolute'}
                                          bg={'#2b2828d6'}
                                          top={'0'}
                                        />
                                      ) : questId === it &&
                                        status === 'Started' ? null : null,
                                  )
                                ) : (
                                  <Img
                                    className="lock"
                                    width={'97%'}
                                    position={'absolute'}
                                    bg={'#2b2828d6'}
                                    top={'0'}
                                  />
                                )}
                              </Box>}
                             
                            </motion.div>
                          );
                        })}
                    </SimpleGrid>
                  </motion.div>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>

      </>
    );
  };

export default ChapterPage;