// 'use client';

// import type React from 'react';
// import { useState, useEffect, useContext, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '../../../../components/ui/button';
// import { Badge } from '../../../../components/ui/badge';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import svgPaths from '../../../../imports/svg-knollny4nu';
// import {
//   CustomCoinIcon,
//   CustomHomeIcon,
//   CustomMapIcon,
//   CustomRankingIcon,
//   CustomSettingsIcon,
// } from '../../../../components/ui/CustomIcons';
// import imgBackground from '../../../../../src/assets/img/NewUI_Images/background.png';
// import topNav from '../../../../../src/assets/img/NewUI_Images/top-nav-bg.png';
// import { useColor } from '../../../../components/ui/ColorContext';
// import ColorPicker from '../../../../components/ui/ColorPicker';
// import { Slider } from '../../../../components/ui/slider';
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from '../../../../components/ui/dialog';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '../../../../components/ui/carousel';
// import { ScoreContext } from '../GamePreview';
// import { ProfileContext } from '../EntirePreview';
// import {
//   activityCreate,
//   activitygetlastblock,
//   getGameActId,
// } from 'utils/gameApplication/gameActivityService';
// import { useParams } from 'react-router-dom';

// interface QuestData {
//   id: number;
//   title: string;
//   progress: number;
//   maxProgress: number;
//   backgroundImage: string;
//   isCompleted: boolean;
// }

// const questsData: QuestData[] = [
//   {
//     id: 1,
//     title: 'Quest1',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=600&auto=format&fit=crop&crop=center',

//     isCompleted: false,
//   },
//   {
//     id: 2,
//     title: 'Quest2',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://images.unsplash.com/photo-1516472151647-6900f65d8975?w=600&auto=format&fit=crop&crop=center',
//     isCompleted: false,
//   },
//   {
//     id: 3,
//     title: 'Quest3',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://images.unsplash.com/photo-1590642151255-b86fb018e45a?w=600&auto=format&fit=crop&crop=center',
//     isCompleted: false,
//   },
//   {
//     id: 4,
//     title: 'Quest4',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://plus.unsplash.com/premium_photo-1673002094064-0d4dddd980d0?w=600&auto=format&fit=crop&crop=center',
//     isCompleted: false,
//   },
//   {
//     id: 5,
//     title: 'Quest5',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://images.unsplash.com/photo-1691404819847-dab7d769aca7?w=600&auto=format&fit=crop&crop=center',
//     isCompleted: false,
//   },
//   {
//     id: 6,
//     title: 'Quest6',
//     progress: 100,
//     maxProgress: 300,
//     backgroundImage:
//       'https://plus.unsplash.com/premium_photo-1661311950994-d263ea9681a1?w=600&auto=format&fit=crop&crop=center',
//     isCompleted: false,
//   },
// ];

// // Helper function to convert hex to RGB
// const hexToRgb = (hex: string): string => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   if (!result) return '0, 255, 187'; // fallback to default green
//   const r = Number.parseInt(result[1], 16);
//   const g = Number.parseInt(result[2], 16);
//   const b = Number.parseInt(result[3], 16);
//   return `${r}, ${g}, ${b}`;
// };

// const ChaptersFutureTheme: React.FC<{
//   questState: any;
//   setQuestState: any;
//   backgroundImg: any;
//   setCurrentScreenId: any;
//   setCurrentQuestNo?: any;
//   setData?: any;
//   setType?: any;
//   setOptions?: any;
//   setFeedbackList?: any;
//   preloadedAssets?: any;
//   currentScreenId: any;
//   profileData: any;
//   gameInfo: any;
//   setModalLoaded?: any;
//   modalLoaded?: any;
//   setLearnerPlayingDetails: any;
//   learnerPlayList: any;
//   setAssignId: any;
//   AssignId: any;
//   Activitydata: any;
//   setActivitydata: any;
//   setprevBlock: any;
//   prevBlock: any;
//   setNavi: any;
//   getData: any;
//   setFeed: any;
//   setRepeatSelectOption: any;
//   RepeatPrevOption: any;
//   setRepeatPrevOption: any;
//   setReplayState: any;
//   setReplayIsOpen: any;
//   setIsZoomComplete: any;
//   isZoomComplete: any;
//   handleReplayButtonClick: any;
//   scoreChapter: any;
//   setScoreChapter: any;
//   questWisePlayerScore: any;
//   setQuestWisePlayerScore: any;
//   checkCompletionBadge: any;
//   onNavigate?: (direction: 'left' | 'right') => void;
// }> = ({
//   handleReplayButtonClick,
//   setCurrentScreenId,
//   setCurrentQuestNo,
//   questState,
//   setQuestState,
//   setData,
//   setType,
//   setOptions,
//   setFeedbackList,
//   preloadedAssets,
//   currentScreenId,
//   profileData,
//   gameInfo,
//   backgroundImg,
//   modalLoaded,
//   setModalLoaded,
//   setLearnerPlayingDetails,
//   learnerPlayList,
//   AssignId,
//   setAssignId,
//   Activitydata,
//   setActivitydata,
//   prevBlock,
//   setprevBlock,
//   setNavi,
//   getData,
//   setFeed,
//   setRepeatSelectOption,
//   RepeatPrevOption,
//   setRepeatPrevOption,
//   setReplayIsOpen,
//   setReplayState,
//   setIsZoomComplete,
//   isZoomComplete,
//   scoreChapter,
//   setScoreChapter,
//   setQuestWisePlayerScore,
//   questWisePlayerScore,
//   checkCompletionBadge,
//   onNavigate,
// }) => {
//   const { primaryColor } = useColor();
//   const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
//   const { profile, setProfile } = useContext(ScoreContext);

//   // Calculate maxScoreByQuest
//   const maxScoreByQuest = useMemo(() => {
//     const maxScores: { [key: string]: number } = {};
//     if (profile?.score && gameInfo?.blocks) {
//       Object.keys(gameInfo.blocks).forEach((questId) => {
//         const questBlocks = gameInfo.blocks[questId];
//         let maxScore = 0;
//         if (Array.isArray(questBlocks)) {
//           questBlocks.forEach((block: any) => {
//             if (block.type === 'question') {
//               maxScore += block.points || 0;
//             }
//           });
//         }
//         maxScores[questId] = maxScore;
//       });
//     }
//     return maxScores;
//   }, [profile?.score, gameInfo?.blocks]);

//   // Calculate questWisePlayerScore
//   useEffect(() => {
//     if (profile?.score && gameInfo?.blocks) {
//       const scores: { [key: string]: number } = {};
//       Object.keys(gameInfo.blocks).forEach((questId) => {
//         const questBlocks = gameInfo.blocks[questId];
//         let totalScore = 0;
//         if (Array.isArray(questBlocks)) {
//           questBlocks.forEach((block: any) => {
//             if (block.type === 'question' && profile.score[block.id]) {
//               totalScore += profile.score[block.id] || 0;
//             }
//           });
//         }
//         scores[questId] = totalScore;
//       });
//       setQuestWisePlayerScore(scores);
//     }
//   }, [profile?.score, gameInfo?.blocks, setQuestWisePlayerScore]);

//   // Set questState based on completedLevels and scores
//   useEffect(() => {
//     if (profile?.completedLevels && gameInfo?.blocks) {
//       const state: { [key: string]: string } = {};
//       Object.keys(gameInfo.blocks).forEach((questId) => {
//         const isCompleted = profile.completedLevels.includes(questId);
//         const score = questWisePlayerScore?.[questId] || 0;
//         const maxScore = maxScoreByQuest[questId] || 0;
//         const isMinPass =
//           gameInfo.gameIsSetMinPassScore === 'true'
//             ? score >= (maxScore * (gameInfo.gameMinPassScore || 0)) / 100
//             : true;

//         if (isCompleted && isMinPass) {
//           state[questId] = 'Complete';
//         } else if (isCompleted && !isMinPass) {
//           state[questId] = 'Replay Point';
//         } else if (
//           profile.completedLevels.some((level: string) =>
//             level.startsWith(questId),
//           )
//         ) {
//           state[questId] = 'Repeat Question';
//         } else {
//           state[questId] = 'Locked';
//         }
//       });
//       setQuestState(state);
//     }
//   }, [
//     profile?.completedLevels,
//     questWisePlayerScore,
//     maxScoreByQuest,
//     gameInfo,
//     setQuestState,
//   ]);

//   const progressforBadge=learnerPlayList.progress;
//   const progressforBadgeInpercent=Math.floor(progressforBadge * 100);
//   // console.log("progressforBadgeInpercent",progressforBadgeInpercent)
//       const [questScores, setQuestScores] = useState(null);
//       // const [questWisePlayerScore, setQuestWisePlayerScore] = useState(null);
  
//       const [AllowedReplayOption, setAllowedReplayOption] = useState(null);
//       const [hasClicked, setHasClicked] = useState(false);
//       const { learner_game_play_id } = useParams();
//       const useData = useContext(ProfileContext);
//       useEffect(() => {
//         let GrandMaximumscore: any = {};
//         let currentScores: any[];
//         let getquest: any[];
//         let maxScoreByQuest: { key: string; value: number }[] = [];
//         profile?.score.map((profileQuest: any) => {
//           if (!getquest?.includes(profileQuest?.quest)) {
//             const scores = profile?.score;
//             const sums: any = {};
//             scores.forEach((score: any) => {
//               const quest = score.quest;
//               if (!sums[quest]) {
//                 sums[quest] = 0;
//               }
//               sums[quest] += score.score;
//             });
//             const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
//               quest,
//               score,
//             }));
//             getquest = getFinalscores;
//           }
//         })
//         const scores = profile?.score;
//         const sums: any = {};
//         scores?.forEach((score: any) => {
//           const quest = score.quest;
//           if (!sums[quest]) {
//             sums[quest] = 0;
//           }
//           sums[quest] += score.score;
//         });
//         getquest?.map((profileQuest: any) => {
//           if (sums[profileQuest?.quest] !== undefined) {
//             currentScores = profile?.score
//           }
//           const currentQuestseqId = Array.isArray(currentScores)
//             ? currentScores.map((item) => item.seqId)
//             : [];
//           if (Array.isArray(currentScores) && currentScores.length > 0) {
//             // Map currentScores to extract scores
//             const scores = currentScores.map((item) => item.score);
  
//             const result = currentQuestseqId?.map((seqId) => {
//               const QuestNo = seqId.split('.')[0];
//               if (QuestNo == profileQuest?.quest) {
//                 const filteredOptions = gameInfo?.questOptions?.filter(
//                   (option: any) => option.qpSequence == seqId,
//                 );
//                 const qpScoresOption = filteredOptions.map((option: any) =>
//                   parseInt(option.qpScore),
//                 );
//                 qpScoresOption.sort((a: any, b: any) => b - a);
//                 if (!GrandMaximumscore[profileQuest?.quest]) {
//                   GrandMaximumscore[profileQuest?.quest] = 0;
//                 }
//                 GrandMaximumscore[profileQuest?.quest] += qpScoresOption[0];
//               }
//               maxScoreByQuest = { ...maxScoreByQuest, ...GrandMaximumscore }
//             });
//           } else {
           
//           }
//         })
//         setQuestScores(maxScoreByQuest);
//         const getQuestwisePlayerScore = async () => {
//           let result: { [key: number]: number } = {};
//           if (gameInfo?.blocks) {
  
//             Object.keys(gameInfo?.blocks).forEach((it: any, num: number) => {
//               // const scores = profile?.score;
//                 const scores =
//           Object.entries(questState).length > 0 ?
//             questState[parseInt(profile?.currentQuest)] === 'Started'
//               ?
//               profile?.score
//               :
//               Object.entries(questState).length > 0 ?
//                 (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
//                   profile?.replayScore.length > 0 ? profile?.replayScore : profile?.score
//                   :
//                   profile?.score
//                 :
//                 profile?.score
//             :
//             profile?.score
//           ;
//               const sums: any = {};
//               scores?.forEach((score: any) => {
//                 const quest = score.quest;
//                 if (!sums[quest]) {
//                   sums[quest] = 0;
//                 }
//                 sums[quest] += score.score;
//               });
  
//               let getFinalscores: any = {};
//               Object.entries(sums).forEach(([quest, score]) => {
//                 const IntQuest = parseInt(quest);
//                 const newQuest = { ...getFinalscores, [IntQuest]: score };
//                 getFinalscores = { ...newQuest };
  
//               });
//               const TotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
//                 if (it == acc[0]) {
//                     tot = acc[1];
//                   return tot;
//                 }
//               }, 0);
//               result = { ...result, [parseInt(it)]: TotalScore ? TotalScore : getFinalscores[it] };
//             })
//           }
//           return result;
//         }
        
//         getQuestwisePlayerScore().then((score: any) => {
//           setQuestWisePlayerScore(score);
          
//         });
//       }, []);
  
//       const { profile, setProfile } = useContext(ScoreContext);
//       console.log(profile,'profilenew')
//       console.log('lastBlockresult-gameInfo',gameInfo)
//       useEffect(() => {
//         const currentQuest = profile?.currentQuest;
//         gameInfo?.gameQuest.map((item: any, index: number) => {
//           const questNoAsString = item.gameQuestNo.toString();
//           if (profile?.completedLevels?.includes(questNoAsString)) {
//             const scores = profile?.score;
//             if (scores !== undefined) {
//               const sums: any = {};
//               scores.forEach((score: any) => {
//                 const quest = score.quest;
//                 if (!sums[quest]) {
//                   sums[quest] = 0;
//                 }
//                 sums[quest] += score.score;
//               });
//               const getFinalscores = Object.entries(sums).map(([quest, score]) => ({
//                 quest,
//                 score,
//               }));
  
//               const getscores = getFinalscores.find(
//                 (row: any) => row.quest == item.gameQuestNo,
//               );
//               const finalscore = getscores?.score ?? 0;
//               console.log("profile -questNoAsString",questNoAsString,"......","scores",scores,"getFinalscores",getFinalscores,"getscores",getscores,"finalscore",finalscore,)
//               if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false') {
//                 console.log("profile inchapter-1")
//                 if (item?.gameIsSetMinPassScore === 'true') {
//                      console.log("profile inchapter-2")
//                   const getminpassscore = item?.gameMinScore;
//                   if (
//                     finalscore >= getminpassscore &&
//                     finalscore < item?.gameTotalScore
//                   ) {
//                        console.log("profile inchapter-3")
//                     if(Object.entries(questState).length === 0)
//                     {
//      console.log("profile inchapter-4")
//                         setQuestState((prevquestdataList: any) => ({
//                       ...prevquestdataList,
//                       [item.gameQuestNo]: 'Started',
//                     }));
//                     }
//                   } else {
//                        console.log("profile inchapter-5")
//                     if (finalscore !== undefined) {
//                       const status = gameInfo?.gameData?.gameDisableOptionalReplays === 'false' ? "replayallowed" : "completed";
//      console.log("profile inchapter-6")
//                       if(Object.entries(questState).length === 0)
//                         {
//                              console.log("profile inchapter-7")
//                             setQuestState((prevquestdataList: any) => ({
//                           ...prevquestdataList,
//                           [item.gameQuestNo]: 'Started',
//                         }));
//                         }
  
//                     } else {
//                          console.log("profile inchapter-8")
//                       setQuestState((prevquestdataList: any) => ({
//                         ...prevquestdataList,
//                         [item.gameQuestNo]: 'Started',
//                       }));
//                     }
  
//                   }
//                 } else {
//                      console.log("profile inchapter-9")
//                   if (finalscore !== undefined) {
//                      console.log("Object.entries(questState)-1",Object.entries(questState))
//                      console.log("Object.entries(questState)-1-length",Object.entries(questState).length)
//                     if(Object.entries(questState).length === 0)
//                       {
//                            console.log("profile inchapter-10")
//                           setQuestState((prevquestdataList: any) => ({
//                         ...prevquestdataList,
//                         [item.gameQuestNo]: 'Started',
//                       }));
//                       }
//                   } 
                  
//                     else {
//                          console.log("profile inchapter-11")
//                       const scores = profile?.playerGrandTotal?.questScores[currentQuest];
//                       if(scores=== 0)
//                       {
//                            console.log("profile inchapter-12")
//                         const status = gameInfo?.gameData?.gameDisableOptionalReplays === 'false' ? "replayallowed" : "completed";
//                         const finalscore = 0;
//                         if(finalscore===0 && profile.compQuest.includes(questNoAsString))
//                           {
//                             if(item?.gameIsSetMinPassScore === 'false')
//                             {
//                                  console.log("profile inchapter-13")
//                               setQuestState((prevquestdataList: any) => ({
//                                 ...prevquestdataList,
//                                 [item.gameQuestNo]: status,
//                               }));
//                             }
//                           }
//                       }
//                      else{
//                          console.log("profile inchapter-14")
//                         setQuestState((prevquestdataList: any) => ({
//                           ...prevquestdataList,
//                           [item.gameQuestNo]: 'Started',
//                         }));
//                       }
//                       }
//                 }
//               } else {
//                 if (finalscore !== undefined) {
//                      console.log("profile inchapter-15")
//                   if(Object.entries(questState).length === 0)
//                     {
//                         setQuestState((prevquestdataList: any) => ({
//                       ...prevquestdataList,
//                       [item.gameQuestNo]: 'Started',
//                     }));
//                     }
//                     else if(questState[item.gameQuestNo] === 'locked')
//                     {
//                          console.log("profile inchapter-16")
//                       setQuestState((prevquestdataList: any) => ({
//                         ...prevquestdataList,
//                         [item.gameQuestNo]: 'Started',
//                       }));
//                     }
  
//                 } 
                
//                 else {
//                      console.log("profile inchapter-17")
//                   if(Object.entries(questState).length === 0) {
//                     setQuestState((prevquestdataList: any) => ({
//                       ...prevquestdataList,
//                       [item.gameQuestNo]: 'Started',
//                     }));
//                   }
                 
//                 }
//               }
//             }
  
//           } 
//           else {
//               setQuestState((prevquestdataList: any) => ({
//                 ...prevquestdataList,
//                 [item.gameQuestNo]: 'locked',
//               }));
//           }
//         });
//       }, [profile]);
  
  
//       const handleChapter = async(it: any) => {
//         if (hasClicked) return; // Prevent multiple executions
//         setHasClicked(true);
//         if(isZoomComplete){
//           setIsZoomComplete(false);
//         }
        
//           setProfile((prev: any) => ({
//             ...prev,
//             currentQuest: it.toString(),
//           }));
        
//         const checkdata = {
//           gameId: learner_game_play_id,
//           questNo: parseInt(it),
//         }
//         const datas = JSON.stringify(checkdata);
//         const lastBlockresult = await activitygetlastblock(datas);
//         if(lastBlockresult.status !== 'Success')
//         {
//            console.log("lastBlockresult-1",lastBlockresult)
//           setHasClicked(false); 
//           return false;
//         }
//         else if (gameInfo?.gameData?.gameDisableOptionalReplays === 'true' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
//            console.log("lastBlockresult-2",lastBlockresult)
//           if (questState[parseInt(it)] === 'replayallowed') {
//             setQuestState((prevquestdataList: any) => ({
//               ...prevquestdataList,
//               [it]: 'completed',
//             }));
//           }
//           setActivitydata(lastBlockresult?.data[0]?.galId);
//           console.log(Activitydata,'activitydatainchapters')
//           setCurrentQuestNo(parseInt(it));
//           setCurrentScreenId(6);
//           return false;
//         }
//         else{
//            console.log("lastBlockresult-3",lastBlockresult)
//           if (lastBlockresult.data.length !== 0) {
//              console.log("lastBlockresult-4",)
//               if (lastBlockresult.data[0]?.galBlockId !== null) {
//                  console.log("lastBlockresult-5",)
//                 if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
//                    console.log("lastBlockresult-6",)
//                   if (questState[parseInt(it)] === 'completed') {
//                     setQuestState((prevquestdataList: any) => ({
//                       ...prevquestdataList,
//                       [it]: 'replayallowed',
//                     }));
//                   }
                 
//                 }
//                 const Blockidcontinue = lastBlockresult.data[0].galBlockId;
//                                console.log("lastBlockresult-7-Blockidcontinue",Blockidcontinue)
  
//                 setActivitydata(lastBlockresult.data[0].galId);
//                 const selectedFindNext:any = Object.values(gameInfo?.blocks[it])?.filter((item: any) => item?.blockSecondaryId == Blockidcontinue);
//                                console.log("lastBlockresult-8-selectedFindNext",selectedFindNext)
  
//                 setCurrentQuestNo(it);
//                 let selectedNext:any;
//                 if (selectedFindNext.length > 0) {
//                   const getLeadsto = selectedFindNext[0]?.blockChoosen === 'Interaction' ? await getInteractionNavi(selectedFindNext[0],it)  :selectedFindNext[0]?.blockLeadTo;
//                                  console.log("lastBlockresult-9-getLeadsto",getLeadsto)
  
//                   const condition = ['Complete','Replay Point','Repeat Question'];
//                   if(getLeadsto && !condition.includes(getLeadsto))
//                   {
//                     selectedNext = Object.keys(gameInfo?.blocks[it])
//                     .filter((item: any) => {
//                       return (
//                         gameInfo?.blocks[it][item]?.blockSecondaryId ===
//                         parseInt(getLeadsto)
//                       );
//                     })
//                     .map((item: any) => {
//                       return gameInfo?.blocks[it][item];
//                     });
//                   }
//                   else{
//                      checkFunction(getLeadsto,selectedFindNext[0],it,gameInfo?.gameData?.gameDisableOptionalReplays);
//                     //  checkCompletionBadge();
//                      return false;
//                   }
//                   if (selectedNext[0]?.blockChoosen === 'Interaction') {
//                     const optionsFiltered = [];
    
//                     for (const option of gameInfo?.questOptions) {
//                       if (profileData?.Audiogetlanguage.length > 0) {
//                         if (
//                           option?.qpSequence === selectedNext[0]?.blockPrimarySequence
//                         ) {
//                           const profilesetlan = profileData?.Audiogetlanguage.find(
//                             (key: any) => key?.textId === option.qpOptionId,
//                           );
    
//                           if (profilesetlan) {
//                             const languagecont = {
//                               ...option,
//                               qpOptionText: profilesetlan.content,
//                             };
//                             optionsFiltered.push(languagecont);
//                           } else {
//                             optionsFiltered.push(option);
//                           }
//                         }
//                       } else {
//                         if (
//                           option?.qpSequence === selectedNext[0]?.blockPrimarySequence
//                         ) {
//                           optionsFiltered.push(option);
//                         }
//                       }
//                     }
//                     if (gameInfo?.gameData?.gameShuffle === 'true') {
//                       for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                         const j = Math.floor(Math.random() * (i + 1));
//                         [optionsFiltered[i], optionsFiltered[j]] = [
//                           optionsFiltered[j],
//                           optionsFiltered[i],
//                         ];
//                       }
//                     }
//                     setOptions(optionsFiltered);
//                     setData(selectedNext[0]);
//                     setType(selectedNext[0]?.blockChoosen);
//                     const AllSeq =learnerPlayList?.Prevquestseq[it];
//                     if (AllSeq && AllSeq.length > 0) {
//                       AllSeq.pop();
//                       if (AllSeq && prevBlock.length === 0) {
//                         setprevBlock(AllSeq);
//                       }
//                     }
//                     setCurrentScreenId(2);
//                     return false;
//                   }
//                   else{
//                     setData(selectedNext[0]);
//                     setType(selectedNext[0]?.blockChoosen);
//                     const AllSeq =learnerPlayList?.Prevquestseq[it];
//                     if (AllSeq && AllSeq.length > 0) {
//                       AllSeq.pop();
//                       if (AllSeq && prevBlock.length === 0) {
//                         setprevBlock(AllSeq);
//                       }
//                     }
//                     setCurrentScreenId(2);
//                     return false;
//                   }
                  
//                 }
//                 else
//                 {
//                   setLearnerPlayingDetails((prev: any) => {
//                     const updatedPrevquestseq = { ...prev.Prevquestseq };
//                     if (updatedPrevquestseq[it]) {
//                       delete updatedPrevquestseq[it];
//                     }
//                     return {
//                       ...prev,
//                       Prevquestseq: updatedPrevquestseq
//                     };
//                   });
//                   setprevBlock([]);
                  
//                   if (profile?.completedLevels?.includes(it)) {
//                     setType(gameInfo?.blocks[it]['1']?.blockChoosen);
//                     setData(gameInfo?.blocks[it]['1']);
//                     if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
//                       const optionsFiltered = [];
//                       const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
//                       for (const option of gameInfo?.questOptions) {
//                         if (profileData?.Audiogetlanguage.length > 0) {
//                           if (option?.qpSequence === primarySequence) {
//                             const profilesetlan = profileData?.Audiogetlanguage.find(
//                               (key: any) => key?.textId === option.qpOptionId,
//                             );
//                             if (profilesetlan) {
//                               const languagecont = {
//                                 ...option,
//                                 qpOptionText: profilesetlan.content,
//                               };
//                               optionsFiltered.push(languagecont);
//                             } else {
//                               optionsFiltered.push(option);
//                             }
//                           }
//                         } else {
//                           if (option?.qpSequence === primarySequence) {
//                             optionsFiltered.push(option);
//                           }
//                         }
//                       }
//                       if (gameInfo?.gameData?.gameShuffle === 'true') {
//                         for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                           const j = Math.floor(Math.random() * (i + 1));
//                           [optionsFiltered[i], optionsFiltered[j]] = [
//                             optionsFiltered[j],
//                             optionsFiltered[i],
//                           ];
//                         }
//                       }
//                       setOptions(optionsFiltered);
//                     }
//                     setProfile((prev: any) => {
//                       // const updatedscore = profile?.score.length > 0 ? profile?.score?.filter((item: any) => item.quest != it) : prev.score;
                      
//                       const data = { ...prev }; 
//                       if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
//                       {
//                         data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                       }
//                       // else if(questState[parseInt(it)] === 'replayallowed')
//                       // {
//                       //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                       // }
//                       if(profile.completedLevels.length === 0)
//                         {
//                           data.completedLevels = [String(it)];
//                         }
//                         else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
//                         {
//                           data.completedLevels = [...data.completedLevels, String(it)];
//                         }
//                       return data;
//                     });
//                     setCurrentScreenId(2);
//                   }
//                   return false;
//                 }
  
//               }
//               else {
//                 setLearnerPlayingDetails((prev: any) => {
//                   const updatedPrevquestseq = { ...prev.Prevquestseq };
//                   if (updatedPrevquestseq[it]) {
//                     delete updatedPrevquestseq[it]; 
//                   }
//                   return {
//                     ...prev,
//                     Prevquestseq: updatedPrevquestseq 
//                   };
//                 });
//                 setprevBlock([]);
//                 if (profile?.score.length > 0) {
//                   // const updatedscore = profile?.score?.filter((item: any) => item.quest != it);
//                   // setProfile((prev: any) => ({
//                   //   ...prev,
//                   //   score: updatedscore,
//                   // }));
//                   setProfile((prev: any) => {
//                     const data = { ...prev }; 
//                     if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
//                       {
//                         data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                       }
//                     // else if(questState[parseInt(it)] === 'replayallowed')
//                     // {
//                     //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                     // }
//                     return data;
//                   });
//                 }
//                 const data = {
//                   gameId: learner_game_play_id,
//                   questNo: parseInt(it),
//                   galBlockId: '',
//                   averageScore: 0,
//                   galAssignedId:AssignId,
//                 }
//                 const getdata = JSON.stringify(data)
                
//                 const result = await activityCreate(getdata);
//                 if (result.status !== 'Success') {
//                   return false;
//                 } else {
//                   if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
//                     if (questState[parseInt(it)] === 'completed') {
//                       setQuestState((prevquestdataList: any) => ({
//                         ...prevquestdataList,
//                         [it]: 'replayallowed',
//                       }));
//                     }
//                   }
//                   if (profile?.score.length > 0) {
//                     // const updatedscore = profile?.score?.filter((item: any) => parseInt(item.quest) !== parseInt(it));
//                     // setProfile((prev: any) => ({
//                     //   ...prev,
//                     //   score: updatedscore,
//                     // }));
//                     setProfile((prev: any) => {
//                       const data = { ...prev }; 
//                       if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
//                         {
//                           data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                         }
//                       // else if(questState[parseInt(it)] === 'replayallowed')
//                       // {
//                       //   data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                       // }
//                       return data;
//                     });
//                   }
//                   setCurrentQuestNo(it)
//                   setActivitydata(result.data);
//                   if (profile?.completedLevels?.includes(it)) {
//                     setType(gameInfo?.blocks[it]['1']?.blockChoosen);
//                     setData(gameInfo?.blocks[it]['1']);
//                     if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
//                       const optionsFiltered = [];
//                       const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
//                       for (const option of gameInfo?.questOptions) {
//                         if (profileData?.Audiogetlanguage.length > 0) {
//                           if (option?.qpSequence === primarySequence) {
//                             const profilesetlan = profileData?.Audiogetlanguage.find(
//                               (key: any) => key?.textId === option.qpOptionId,
//                             );
//                             if (profilesetlan) {
//                               const languagecont = {
//                                 ...option,
//                                 qpOptionText: profilesetlan.content,
//                               };
//                               optionsFiltered.push(languagecont);
//                             } else {
//                               optionsFiltered.push(option);
//                             }
//                           }
//                         } else {
//                           if (option?.qpSequence === primarySequence) {
//                             optionsFiltered.push(option);
//                           }
//                         }
//                       }
//                       if (gameInfo?.gameData?.gameShuffle === 'true') {
//                         for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                           const j = Math.floor(Math.random() * (i + 1));
//                           [optionsFiltered[i], optionsFiltered[j]] = [
//                             optionsFiltered[j],
//                             optionsFiltered[i],
//                           ];
//                         }
//                       }
//                       setOptions(optionsFiltered);
//                     }
//                     setProfile((prev: any) => {
//                       const data = { ...prev };
//                       if(profile.completedLevels.length === 0)
//                         {
//                           data.completedLevels = [String(it)];
//                         }
//                         else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
//                         {
//                           data.completedLevels = [...data.completedLevels, String(it)];
//                         }
//                       return data;
//                     });
//                     setCurrentScreenId(2);
//                   }
//                   return false;
//                 }
  
                
//               }
//             }
//           else{
//             setLearnerPlayingDetails((prev: any) => {
//               const updatedPrevquestseq = { ...prev.Prevquestseq };
//               if (updatedPrevquestseq[it]) {
//                 delete updatedPrevquestseq[it];
//               }
//               return {
//                 ...prev,
//                 Prevquestseq: updatedPrevquestseq
//               };
//             });
//             setprevBlock([]);
//             if (profile?.score.length > 0) {
//               // const updatedscore = profile?.score?.filter((item: any) => item.quest != it);
//               // setProfile((prev: any) => ({
//               //   ...prev,
//               //   score: updatedscore,
//               // }));
//               setProfile((prev: any) => {
//                 const data = { ...prev }; 
//                 if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
//                   {
//                     data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                   }
//                   // else if(questState[parseInt(it)] === 'replayallowed')
//                   //     {
//                   //       data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                   //     }
//                       return data;
//               });
//             }
//             const data = {
//               gameId: learner_game_play_id,
//               questNo: parseInt(it),
//               galBlockId: '',
//               averageScore: 0,
//               galAssignedId:AssignId,
//             }
//             const datas = JSON.stringify(data)
            
//             const result = await activityCreate(datas);
//             if (result.status !== 'Success') {
//               return false;
//             } 
//            else if (gameInfo?.gameData?.gameDisableOptionalReplays === 'false' && (questState[parseInt(it)] === 'completed' || questState[parseInt(it)] === 'replayallowed')) {
//                       if (questState[parseInt(it)] === 'completed') {
//                         setQuestState((prevquestdataList: any) => ({
//                           ...prevquestdataList,
//                           [it]: 'replayallowed',
//                         }));
//                       }
//                     }
//             if (profile?.score.length > 0) {
//               // const updatedscore = profile?.score?.filter((item: any) => parseInt(item.quest) !== parseInt(it));
//               // setProfile((prev: any) => ({
//               //   ...prev,
//               //   score: updatedscore,
//               // }));
//               setProfile((prev: any) => {
//                 const data = { ...prev }; 
//                 if(questState[parseInt(it)] !== 'replayallowed' && profile?.score.length > 0)
//                   {
//                     data.score= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                   }
//                 // else if(questState[parseInt(it)] === 'replayallowed')
//                 //       {
//                 //         data.replayScore= profile?.score?.filter((item:any) => item.quest !== parseInt(it));
//                 //       }
//                       return data;
//               });
//             }
//             setCurrentQuestNo(it)
//             setActivitydata(result.data);
//             if (profile?.completedLevels?.includes(it)) {
//               setType(gameInfo?.blocks[it]['1']?.blockChoosen);
//               setData(gameInfo?.blocks[it]['1']);
//               if (gameInfo?.blocks[it]['1']?.blockChoosen === 'Interaction') {
//                 const optionsFiltered = [];
//                 const primarySequence = gameInfo?.blocks[it]['1'].blockPrimarySequence;
//                 for (const option of gameInfo?.questOptions) {
//                   if (profileData?.Audiogetlanguage.length > 0) {
//                     if (option?.qpSequence === primarySequence) {
//                       const profilesetlan = profileData?.Audiogetlanguage.find(
//                         (key: any) => key?.textId === option.qpOptionId,
//                       );
//                       if (profilesetlan) {
//                         const languagecont = {
//                           ...option,
//                           qpOptionText: profilesetlan.content,
//                         };
//                         optionsFiltered.push(languagecont);
//                       } else {
//                         optionsFiltered.push(option);
//                       }
//                     }
//                   } else {
//                     if (option?.qpSequence === primarySequence) {
//                       optionsFiltered.push(option);
//                     }
//                   }
//                 }
//                 if (gameInfo?.gameData?.gameShuffle === 'true') {
//                   for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                     const j = Math.floor(Math.random() * (i + 1));
//                     [optionsFiltered[i], optionsFiltered[j]] = [
//                       optionsFiltered[j],
//                       optionsFiltered[i],
//                     ];
//                   }
//                 }
//                 setOptions(optionsFiltered);
//               }
//               setProfile((prev: any) => {
//                 const data = { ...prev };
//                 if(profile.completedLevels.length === 0)
//                   {
//                     data.completedLevels = [String(it)];
//                   }
//                   else if(!profile.completedLevels.includes(String(it)) && profile.completedLevels.length !== 0)
//                   {
//                     data.completedLevels = [...data.completedLevels, String(it)];
//                   }
//                 return data;
//               });
//               setCurrentScreenId(2);
//             }
//           }
//         }
//         for (let values in questState) {
//           if (values === it) {
//             if (questState[it] !== 'Locked') {
//               useData?.setMotionEffect(true);
//             }
//             else {
//               useData?.setMotionEffect(false);
//             }
//           }
//         }
  
  
//         setTimeout(() => setHasClicked(false), 10000); // Reset after 3s if needed
//       };
      
  
//       const getPrevSelectedOption =(selectedFindNext:any)=>
//       {
//         const scores =
//           Object.entries(questState).length > 0 ?
//             questState[parseInt(profile?.currentQuest)] === 'Started'
//               ?
//               profile?.score
//               :
//               Object.entries(questState).length > 0 ?
//                 (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
//                   profile?.replayScore.length > 0 ? profile?.replayScore : profile?.score
//                   :
//                   profile?.score
//                 :
//                 profile?.score
//             :
//             profile?.score
//           ;
//         const foundNavi = scores?.filter((item:any) => item.seqId == selectedFindNext?.blockPrimarySequence);
//           if(foundNavi.length > 0)
//           {
//             return foundNavi[0]?.choosedoption;
//           }
//           else{
//             return null;
//           }
//       }
//       const getInteractionNavi = (getBlocks:any,Quest:any)=>
//       {
//          const scoreArray =
//           Object.entries(questState).length > 0 ?
//             questState[parseInt(profile?.currentQuest)] === 'Started'
//               ?
//               profile?.score
//               :
//               Object.entries(questState).length > 0 ?
//                 (questState[parseInt(profile?.currentQuest)] === 'replayallowed' || questState[parseInt(profile?.currentQuest)] === 'completed' )?
//                   profile?.replayScore
//                   :
//                   profile?.score
//                 :
//                 profile?.score
//             :
//             profile?.score
//           ;
//           const foundNavi = scoreArray?.filter((item:any) => item.seqId == getBlocks?.blockPrimarySequence);
//           if(foundNavi.length > 0)
//           {
//             const optionsFiltered = [];
    
//             for (const option of gameInfo?.questOptions) {
//                 if (
//                   option?.qpSequence === getBlocks?.blockPrimarySequence
//                 ) {
//                   optionsFiltered.push(option);
//                 }
//             }
//             // item?.qpNextOption
//             if(optionsFiltered)
//             {
//                const getFilterOption = optionsFiltered.filter((item:any)=>item?.qpOptions === foundNavi[0]?.choosedoption);
//                if(getFilterOption)
//                {
//                   return getFilterOption[0]?.qpNextOption;
//                }
//                else{
//                 return null;
//                }
//             }
//             else{
//                 return null;
//             }
//           }
//           else{
//             return null;
//           }
  
//       }
//       console.log(gameInfo,'gameinfo')
//       const checkFunction = async(getLeadsto:any,selectedFindNext:any,Quest:any,gameDisableOptionalReplays:any)=>
//       {
       
//         const nextLevel = parseInt(Quest) + 1 || null;
//         if(getLeadsto === 'Repeat Question' && selectedFindNext?.blockChoosen === 'Interaction'){
             
//            setFeed('');
//               setRepeatSelectOption(true);
//               const getOption = await getPrevSelectedOption(selectedFindNext);
//               if(getOption)
//               {
//                 RepeatPrevOption.push(getOption);
//               }
//               setRepeatPrevOption(RepeatPrevOption);
//               setType(selectedFindNext?.blockChoosen);
//               setData(selectedFindNext);
//               if (selectedFindNext?.blockChoosen === 'Interaction') {
//                 const optionsFiltered = [];
//                 for (const option of gameInfo.questOptions) {
//                   if (profileData?.Audiogetlanguage.length > 0) {
//                     if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
//                       const profilesetlan = profileData?.Audiogetlanguage.find(
//                         (key: any) => key?.textId === option.qpOptionId,
//                       );
//                       if (profilesetlan) {
//                         const languagecont = {
//                           ...option,
//                           qpOptionText: profilesetlan.content,
//                         };
//                         optionsFiltered.push(languagecont);
//                       } else {
//                         optionsFiltered.push(option);
//                       }
//                     }
//                   } else {
//                     if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
//                       optionsFiltered.push(option);
//                     }
//                   }
//                 }
//                 if (gameInfo?.gameData?.gameShuffle === 'true') {
//                   for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                     const j = Math.floor(Math.random() * (i + 1));
//                     [optionsFiltered[i], optionsFiltered[j]] = [
//                       optionsFiltered[j],
//                       optionsFiltered[i],
//                     ];
//                   }
//                 }
//                 setOptions(optionsFiltered);
//               }
//               setCurrentScreenId(2);
//               return false;
//         }
//         else if(getLeadsto === 'Repeat Question' && selectedFindNext?.blockChoosen !== 'Interaction')
//         {
          
//             if (selectedFindNext?.blockChoosen === 'Interaction') {
//               const optionsFiltered = [];
//               for (const option of gameInfo.questOptions) {
//                 if (profileData?.Audiogetlanguage.length > 0) {
//                   if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
//                     const profilesetlan = profileData?.Audiogetlanguage.find(
//                       (key: any) => key?.textId === option.qpOptionId,
//                     );
//                     if (profilesetlan) {
//                       const languagecont = {
//                         ...option,
//                         qpOptionText: profilesetlan.content,
//                       };
//                       optionsFiltered.push(languagecont);
//                     } else {
//                       optionsFiltered.push(option);
//                     }
//                   }
//                 } else {
//                   if (option?.qpSequence === selectedFindNext?.blockPrimarySequence) {
//                     optionsFiltered.push(option);
//                   }
//                 }
//               }
//               if (gameInfo?.gameData?.gameShuffle === 'true') {
//                 for (let i = optionsFiltered.length - 1; i > 0; i--) {
//                   const j = Math.floor(Math.random() * (i + 1));
//                   [optionsFiltered[i], optionsFiltered[j]] = [
//                     optionsFiltered[j],
//                     optionsFiltered[i],
//                   ];
//                 }
//               }
//               setOptions(optionsFiltered);
//             }
//           setType(selectedFindNext?.blockChoosen);
//           setData(selectedFindNext);
//           setCurrentScreenId(2);
//           return false;
//         }
//         else if(getLeadsto === 'Replay Point'){
       
//             // setReplayState('replayPointPrompt');
//             // setReplayIsOpen(true);
//               handleReplayButtonClick("replayPointPrompt")
//             setCurrentQuestNo(Quest);
//             setCurrentScreenId(2);
//             return false;
//           }
//         else if(getLeadsto === 'Complete') {
//         checkCompletionBadge();
//           if (gameInfo?.blocks.hasOwnProperty(nextLevel)) {
//             setProfile((prev: any) => {
//               const data = { ...prev };
//               if (profile.compQuest.length === 0) {
//                 data.compQuest = [String(profile?.currentQuest)];
//               }
//               else if (!profile.compQuest.includes(String(profile?.currentQuest))) {
//                 data.compQuest = [...data.compQuest, String(profile?.currentQuest)];
//               }
//               if (!profile.completedLevels.includes(String(nextLevel))) {
//                 data.completedLevels = [...data.completedLevels, String(nextLevel)];
//               }
//               return data;
//             });
//           }
//           else {
//             setProfile((prev: any) => {
//               const data = { ...prev };
//               if (profile.compQuest.length === 0) {
//                 data.compQuest = [String(profile?.currentQuest)];
//               }
//               else if (!profile.compQuest.includes(String(profile?.currentQuest))) {
//                 data.compQuest = [...data.compQuest, String(profile?.currentQuest)];
//               }
//               return data;
//             });
//           }
//           if(gameDisableOptionalReplays === 'false')
//           {
//             handleReplayButtonClick('optionalReplay')
//             //  setCurrentScreenId(6);
//             // setType(null);
//             // setData(null);
//             return false;
//           }
//           else
//           {
//             setCurrentScreenId(6);
//             setType(null);
//             setData(null);
//             return false;
//             }
//         }
//         else{
//           if(gameDisableOptionalReplays === 'false')
//             {
//               handleReplayButtonClick('optionalReplay')
//             //    setCurrentScreenId(6);
//             // setType(null);
//             // setData(null);
//             return false;
//             }
//             else
//             {
//               setCurrentScreenId(6);
//               setType(null);
//               setData(null);
//               return false;
//               }
//         }
//       }
//   const QuestCard: React.FC<{ quest: QuestData; index: number }> = ({
//     quest,
//   }) => {
//     const isSelected = selectedQuest === quest.id;

//     return (
//       <div
//         className="relative cursor-pointer overflow-hidden rounded-[1.25rem] transition-all duration-300 hover:scale-105"
//         style={{
//           background: `rgba(${hexToRgb(primaryColor)}, 0.02)`,
//           backgroundImage: `linear-gradient(to bottom, rgba(${hexToRgb(
//             primaryColor,
//           )}, 0.08) 3%, rgba(${hexToRgb(primaryColor)}, 0) 100%)`,
//           filter: isSelected
//             ? `drop-shadow(0px 0px 20px ${primaryColor})`
//             : 'none',
//         }}
//         onClick={() => {
//           setSelectedQuest(isSelected ? null : quest.id);
//           onNavigate?.('right');
//         }}
//       >
//         {/* Quest Card Content */}
//         <div className="relative flex h-full w-full flex-row items-center overflow-hidden">
//           <div className="relative box-border flex h-full w-full flex-row items-center justify-start gap-2 p-4">
//             {/* Inner Quest Frame */}
//             <div
//               className="relative h-full min-h-[10.5rem] flex-1 overflow-hidden rounded-[0.75rem]"
//               style={{
//                 backgroundImage: `url('${quest.backgroundImage}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             >
//               <div className="relative flex h-full w-full flex-col items-center">
//                 <div className="relative box-border flex h-full w-full flex-col items-center justify-start gap-0.5 p-4">
//                   {/* Quest Title Section */}
//                   <div
//                     className="mt-5 flex flex-row items-center justify-start gap-1.5 text-center text-white"
//                     style={{
//                       textShadow: `rgba(${hexToRgb(
//                         primaryColor,
//                       )}, 0.46) 0px 9px 22px`,
//                       filter: `drop-shadow(0px 1px 5px rgba(${hexToRgb(
//                         primaryColor,
//                       )}, 0.25))`,
//                     }}
//                   >
//                     <p className="block whitespace-pre text-3xl font-medium leading-normal tracking-[0.005rem]">
//                       {quest.title.replace(/(\d+)$/, '')}
//                     </p>
//                     <p className="text-3xl font-medium tracking-[-0.007rem]">
//                       {quest.id}
//                     </p>
//                   </div>

//                   {/* Progress Bar Section */}
//                   <div className="flex items-center">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="relative h-11 w-11 rounded-xl !px-0 py-0"
//                       style={{
//                         boxShadow: `0px 0px 23.386px 0px rgba(${hexToRgb(
//                           primaryColor,
//                         )}, 0.50)`,
//                         background: `linear-gradient(2.477deg, rgba(${hexToRgb(
//                           primaryColor,
//                         )}, 0.8), rgb(0, 0, 0))`,
//                       }}
//                     >
//                       <div
//                         className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-xl"
//                         style={{
//                           background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//                             primaryColor,
//                           )}, 0.5) 188.68%)`,
//                           zIndex: 1,
//                         }}
//                       >
//                         <CustomCoinIcon
//                           color={primaryColor}
//                           className="!h-12 !w-12"
//                         />
//                       </div>
//                     </Button>
//                     <Badge
//                       variant="secondary"
//                       className="font-rubik -ml-1.5 flex h-9 min-w-24 items-center rounded-[0.625rem] px-4"
//                       style={{
//                         background: `linear-gradient(170.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//                           primaryColor,
//                         )}, 0.5) 188.68%)`,
//                         border: `1px solid rgba(${hexToRgb(
//                           primaryColor,
//                         )}, 0.5)`,
//                         boxShadow: `0px 0px 23.3864px 0px rgba(${hexToRgb(
//                           primaryColor,
//                         )}, 0.5)`,
//                       }}
//                     >
//                       <div className="text-sm font-medium text-white">
//                         {quest.progress}/
//                         <span style={{ color: primaryColor }}>
//                           {quest.maxProgress}
//                         </span>
//                       </div>
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Card Border */}
//         <div
//           className="pointer-events-none absolute inset-0 rounded-[1.25rem]"
//           style={{
//             border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.1)`,
//           }}
//         />
//       </div>
//     );
//   };

//   const NavigationArrow: React.FC<{
//     direction: 'left' | 'right';
//     onClick: () => void;
//   }> = ({ direction, onClick }) => {
//     return (
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={onClick}
//         className="rounded-3xl h-[2.125rem] w-[3.125rem] px-4 py-2 transition-all duration-200 hover:scale-110"
//         style={{
//           background: `linear-gradient(${
//             direction === 'left' ? '275.041deg' : '90deg'
//           },
//         rgba(${hexToRgb(primaryColor)}, 0.6) 7.25%, rgba(${hexToRgb(
//             primaryColor,
//           )}, 0.15) 84.803%)`,
//           border: `1px solid ${primaryColor}`,
//           boxShadow: `0px 0px 15.9542px 0px rgba(${hexToRgb(
//             primaryColor,
//           )}, 0.3)`,
//         }}
//       >
//         {direction === 'left' ? (
//           <ChevronLeft className="!h-4 !w-4 text-white" />
//         ) : (
//           <ChevronRight className="!h-4 !w-4 text-white" />
//         )}
//       </Button>
//     );
//   };

//   return (
//     <div
//       className="relative h-screen w-full overflow-hidden bg-black/90 bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url('${imgBackground}')` }}
//     >
//       <div
//         // style={{ backgroundImage: `url('${topNav}')` }}
//        className="relative flex h-full w-full px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
//         {/* Top Navigation Bar */}
//         <div className="absolute left-0 right-0 top-0 flex h-[5.5rem] items-center justify-between  bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-6">
//             <TopNavButton icon="home" />
//             <TopNavButton icon="map" />
//           </div>
//           <div className="flex items-center gap-4">
//             <StatusBar label="50" icon="progress" />
//             <StatusBar label="100" icon="coin" />
//             <TopNavButton icon="ranking" />
//             <Dialog>
//               <DialogTrigger asChild>
//                 <div className="translate-y-1">
//                   <TopNavButton icon="settings" />
//                 </div>
//               </DialogTrigger>
//               <DialogContent
//                 className="rounded-[2rem] border-none px-7 py-6 shadow-lg sm:max-w-2xl"
//                 style={{
//                   background: `linear-gradient(151.477deg, rgb(0,0,0) 17.606%, rgba(${hexToRgb(
//                     primaryColor,
//                   )}, 0.6) 218.68%)`,
//                   border: `1px solid linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//                     primaryColor,
//                   )}, 0.4) 188.68%)`,
//                   boxShadow: '0px 0px 23.4px 0px rgba(0, 0, 0, 0.50)',
//                 }}
//               >
//                 <h2
//                   className="py-1 text-center text-3xl font-medium"
//                   style={{
//                     color: primaryColor,
//                     textShadow: `0 0 9px rgba(${hexToRgb(primaryColor)}, 0.49)`,
//                   }}
//                 >
//                   Settings
//                 </h2>

//                 {/* Decorative Line */}
//                 <div className="relative flex w-full items-center justify-center">
//                   <div className="w-full">
//                     <div className="relative h-[1px] w-full">
//                       <div
//                         className="absolute inset-0"
//                         style={{
//                           background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 48%, transparent 100%)`,
//                           opacity: 0.995,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mx-auto mb-2 mt-3 flex w-full max-w-md flex-col gap-8 pb-3 pt-5">
//                   <div className="flex flex-col gap-10">
//                     {/* Music Volume */}
//                     <div className="flex flex-col items-center gap-1">
//                       <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
//                         Music Volume
//                       </label>
//                       <Slider
//                         defaultValue={[40]}
//                         max={100}
//                         step={1}
//                         className="w-full"
//                         // trackClassName="bg-white/70"
//                         // thumbClassName="bg-white border border-gray-300 shadow-sm"
//                       />
//                     </div>
//                     {/* Voice Over Volume */}
//                     <div className="flex flex-col items-center gap-1">
//                       <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
//                         Voice over volume
//                       </label>
//                       <Slider
//                         defaultValue={[20]}
//                         max={100}
//                         step={1}
//                         className="w-full"
//                         // trackClassName="bg-white/70"
//                         // thumbClassName="bg-white border border-gray-300 shadow-sm"
//                       />
//                     </div>
//                     {/* Color Picker */}
//                     <div className="flex flex-col items-center gap-1">
//                       <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
//                         Set Theme
//                       </label>
//                       <ColorPicker />
//                     </div>
//                   </div>

//                   {/* Okay button */}
//                   <DialogTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="rounded-3xl mx-auto h-11 w-[5.75rem] px-4 py-2 text-lg text-white transition-all duration-200 hover:scale-110 hover:text-white"
//                       style={{
//                         background: `linear-gradient(275.041deg
//                               ,
//                                 rgba(${hexToRgb(
//                                   primaryColor,
//                                 )}, 0.7) 7.25%, rgba(0, 0, 0, 0.8) 84.803%)`,
//                         border: `1px solid ${primaryColor}`,
//                         boxShadow: `0px 0px 15.9542px 0px rgba(3, 51, 38, 0.8)`,
//                       }}
//                     >
//                       Okay
//                     </Button>
//                   </DialogTrigger>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Quest Content */}
//         <div className="flex-grow flex h-full flex-col items-center justify-center pt-5">
//           <div
//             className="lg:min-h-[34.5rem] lg:max-w-[76rem] relative flex h-full max-h-fit w-full max-w-[92vw] flex-col items-center justify-start gap-5 rounded-3xl px-10 pb-4 pt-5"
//             style={{
//               background: `linear-gradient(21deg, rgba(0, 0, 0, 0.80) -10.76%, rgba(${hexToRgb(
//                 primaryColor,
//               )}, 0.1) 20%, rgba(10, 10, 10, 0.85) 197.18%)`,
//             }}
//           >
//             {/* Quest Title */}
//             <div className="relative">
//               <h1
//                 className="text-center text-4xl font-normal tracking-[0.005rem]"
//                 style={{
//                   color: primaryColor,
//                   textShadow: `rgba(${hexToRgb(
//                     primaryColor,
//                   )}, 0.5) 0px 0px 9px`,
//                 }}
//               >
//                 Quest
//               </h1>
//             </div>

//             {/* Decorative Line */}
//             <div className="relative flex w-full items-center justify-center">
//               <div className="w-full">
//                 <div className="relative h-[1px] w-full">
//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 48%, transparent 100%)`,
//                       opacity: 0.995,
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Quest Cards Grid */}
//             <div className="max-lg:hidden w-full flex-1">
//               <div className="flex h-full w-full flex-col gap-5">
//                 <div className="grid w-full grid-cols-3 gap-5">
//                   {questsData.slice(0, 3).map((quest, index) => (
//                     <div key={quest.id} className="flex-1">
//                       <QuestCard quest={quest} index={index} />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid w-full grid-cols-3 gap-5">
//                   {questsData.slice(3, 6).map((quest, index) => (
//                     <div key={quest.id} className="flex-1">
//                       <QuestCard quest={quest} index={index + 3} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="relative w-full px-10">
//               <Carousel
//                 opts={{
//                   align: 'start',
//                 }}
//                 className="lg:hidden w-full"
//               >
//                 <CarouselContent>
//                   {questsData.map((quest, index) => (
//                     <CarouselItem key={quest.id} className="basis-1/3">
//                       <QuestCard quest={quest} index={index} />
//                     </CarouselItem>
//                   ))}
//                 </CarouselContent>
//                 <CarouselNext className="bg-background/80" />
//                 <CarouselPrevious className="bg-background/80" />
//               </Carousel>
//             </div>

//             {/* Inset Shadow Border */}
//             <div
//               className="pointer-events-none absolute inset-0 rounded-3xl"
//               style={{
//                 boxShadow: `0px 0px 11px 0px inset ${primaryColor}`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="absolute bottom-16 left-12 right-12 flex items-center justify-between">
//           <NavigationArrow
//             direction="left"
//             onClick={() => onNavigate?.('left')}
//           />
//           {/* <NavigationArrow
//             direction="right"
//             onClick={() => onNavigate?.("right")}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components (Reused from CharacterSelection)
// const TopNavButton: React.FC<{ icon: string }> = ({ icon }) => {
//   const { primaryColor } = useColor();
//   const IconElement = () => {
//     switch (icon) {
//       case 'home':
//         return <CustomHomeIcon color={primaryColor} size={20} />;
//       case 'map':
//         return <CustomMapIcon color={primaryColor} size={20} />;
//       case 'ranking':
//         return <CustomRankingIcon color={primaryColor} size={20} />;
//       case 'settings':
//         return <CustomSettingsIcon color={primaryColor} size={20} />;
//       default:
//         return <IconComponent type={icon} color={primaryColor} />;
//     }
//   };

//   return (
//     <Button
//       variant="ghost"
//       size="sm"
//       className="group relative h-12 w-12 rounded-2xl !px-0 py-0 transition-transform duration-300 hover:scale-110"
//       style={{
//         borderRadius: '16px',
//         boxShadow: '0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)',
//         background: `linear-gradient(151.477deg, rgba(${hexToRgb(
//           primaryColor,
//         )}, 0.3), rgb(0, 0, 0))`,
//       }}
//     >
//       <div
//         className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-2xl"
//         style={{
//           background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//             primaryColor,
//           )}, 0.5) 188.68%)`,
//           borderRadius: '16px',
//           zIndex: 1,
//         }}
//       >
//         {icon === 'ranking' ? (
//           <CustomRankingIcon color={primaryColor} className="!h-10 !w-10" />
//         ) : icon === 'settings' ? (
//           <CustomSettingsIcon color={primaryColor} className="-mb-1 !h-10 !w-10" />
//         ) : (
//           <IconElement />
//         )}
//       </div>
//     </Button>
//   );
// };

// const StatusBar: React.FC<{ label: string; icon?: string }> = ({
//   label,
//   icon,
// }) => {
//   const { primaryColor } = useColor();
//   return (
//     <div className="flex items-center">
//       {icon && (
//         <Button
//           variant="ghost"
//           size="sm"
//           className="relative h-12 w-12 rounded-2xl !px-0 py-0"
//           style={{
//             borderRadius: '16px',
//             boxShadow: '0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)',
//             background: `linear-gradient(151.477deg, rgba(${hexToRgb(
//               primaryColor,
//             )}, 0.3), rgb(0, 0, 0))`,
//           }}
//         >
//           <div
//             className="backdrop-blur-xs absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-2xl"
//             style={{
//               background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//                 primaryColor,
//               )}, 0.5) 188.68%)`,
//               borderRadius: '16px',
//               zIndex: 1,
//             }}
//           >
//             {icon === 'coin' ? (
//               <CustomCoinIcon color={primaryColor} className="!h-12 !w-12" />
//             ) : icon === 'progress' ? (
//               <span
//                 className="font-rubik text-shadow-[0px_2.867px_8.6px_rgba(0,_255,_187,_0.30)] text-[0.813rem] font-medium -tracking-[0.007rem] text-white"
//                 style={{ color: primaryColor }}
//               >
//                 {label}%
//               </span>
//             ) : (
//               <IconComponent type={icon} color={primaryColor} />
//             )}
//           </div>
//         </Button>
//       )}
//       {label === '50' ? (
//         <div className="relative -ml-2.5 min-w-24 flex-1">
//           <div
//             className="h-8 w-full overflow-hidden rounded-[0.625rem]"
//             style={{
//               background: `linear-gradient(179.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//                 primaryColor,
//               )}, 0.4) 188.68%)`,
//               border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.1)`,
//               boxShadow: '0px 0px 15.3543px 0px rgba(0,0,0,0.5)',
//             }}
//           >
//             <div
//               className="h-full rounded-[0.625rem] shadow-[0px_0px_2.378px_0px_rgba(0,_255,_187,_0.30)_inset,_0px_2.867px_8.6px_0px_rgba(0,_255,_187,_0.60)] transition-all duration-500 ease-out"
//               style={{
//                 width: `${(Number(label) / 100) * 100}%`,
//                 backgroundColor: primaryColor,
//                 boxShadow: `0px 0px 9.93511px 0px rgba(184,184,184,0.2)`,
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         <Badge
//           variant="secondary"
//           className="font-rubik -ml-1.5 flex h-8 min-w-24 items-center rounded-[0.625rem] px-4"
//           style={{
//             background: `linear-gradient(170.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
//               primaryColor,
//             )}, 0.4) 188.68%)`,
//             border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.2)`,
//             boxShadow: '0px 0px 23.3864px 0px rgba(0,0,0,0.5)',
//           }}
//         >
//           <span className="text-[0.813rem] font-medium text-white">
//             {label}
//           </span>
//         </Badge>
//       )}
//     </div>
//   );
// };

// const IconComponent: React.FC<{ type: string; color: string }> = ({
//   type,
//   color,
// }) => {
//   const getIconPath = () => {
//     switch (type) {
//       case 'ranking':
//         return svgPaths.p1a822c00;
//       case 'home':
//         return svgPaths.p3bf15400;
//       case 'map':
//         return svgPaths.p285e4100;
//       case 'settings':
//         return svgPaths.p2037cc80;
//       case 'coin':
//         return svgPaths.p1444db00;
//       default:
//         return svgPaths.p1444db00;
//     }
//   };

//   return (
//     <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
//       <path d={getIconPath()} fill={color} />
//     </svg>
//   );
// };

// export default ChaptersFutureTheme;
