import {
  Box,
  Button,
  Img,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { getLeaderboardData } from 'utils/gameApplication/gamePlayService';
import React, { useEffect, useState, useContext, useMemo,useRef } from 'react';
import { ScoreContext } from '../GamePreview';
import { motion } from 'framer-motion';
import { ProfileContext } from '../EntirePreview';
import { useParams } from 'react-router-dom';

let names:any = [
 
]
interface TopMenuProps {
    isLeaderboardEnabled:boolean;
  setIsLeaderboardEnabled:(opt: boolean) => void;
  dontShowTopMenu: boolean;
  preloadedAssets: any;
  currentScreenId: number;
  setCurrentScreenId: (id: number) => void;
  isSettingOpen: boolean;
  setIsSettingOpen: (opt: boolean) => void;
  setHomeLeaderBoard: (id: number) => void;
  profileData: any;
  gameInfo: any;
  demoBlocks: any;
  data: any;
  setAudioObj: (obj: any) => void;
  audioObj: any;
  questState: any;
  EnumType: any;
  learnerPlayList:any;
  setLearnerPlayingDetails:any;
  handleMusicVolume:any;
    formData?: any;
  imageSrc?: any;
  getData?: any;

  homeLeaderBoard?: any;


  setPlayerTodayScore: any;
  playerTodayScore: any;
  setCurrentQuestNo: any;
  setFirstLoading: any;
questWisePlayerScore: any;
setQuestWisePlayerScore: any;
}

const TopMenuBar: React.FC<TopMenuProps> = ({
    setIsLeaderboardEnabled,
  isLeaderboardEnabled,
  dontShowTopMenu,
  preloadedAssets,
  currentScreenId,
  setCurrentScreenId,
  isSettingOpen,
  setIsSettingOpen,
  setHomeLeaderBoard,
  profileData,
  gameInfo,
  demoBlocks,
  data,
  setAudioObj,
  audioObj,
  questState,
  EnumType,
  learnerPlayList,
  setLearnerPlayingDetails,
  handleMusicVolume,
    imageSrc,
  formData,
  getData,
 
  homeLeaderBoard,
  
  setPlayerTodayScore,
  playerTodayScore,
  setCurrentQuestNo,
  setFirstLoading,
  setQuestWisePlayerScore,
  questWisePlayerScore
 
}) => {
//
    const useData = useContext(ProfileContext);
    const { learner_game_play_id } = useParams();
    const [shuffledUsers, setShuffledUsers] = useState<any[]>([]);
    const [allTimeClicked, setAllTimeClicked] = useState(false);
    const [newSortedUserss, setNewSortedUserss] = useState<any[]>([]);
    const [sortedUsers, setSortedUsers] = useState<any[]>([]);
    const playerInfo = useContext(ProfileContext);
    const contextValue = useContext(ScoreContext);
    const { profile, setProfile } = contextValue !== null ? contextValue : { profile: null, setProfile: null };
    const [sortAse, setSortAse] = useState({ daily: true, allTime: true });
    const [departmentLeaderboardData, setDepartmentLeaderboardData] = useState<any[]>([]);
    
    const [companyLeaderboardData, setCompanyLeaderboardData] = useState<any[]>([]);
   
    const [activeLeaderboard, setActiveLeaderboard] = useState<'department' | 'company'>('company'); // Track active leaderboard

   const [isIOS, setIsIOS] = useState(false);

useEffect(() => {
  const userAgent =
    window.navigator.userAgent || (window.navigator as any).vendor || '';

  // ✅ Detect iPhone or iPad (but not Mac or Android)
  if (/iPhone|iPad/i.test(userAgent) && !/Macintosh/i.test(userAgent)) {
    setIsIOS(true);
  }
}, []);


    useEffect(() => {
      const getAllLearnerScores = async () => {
        const getLeaderboardDatas = await getLeaderboardData(learner_game_play_id);
        if (getLeaderboardDatas?.departmentLeaderboardData) {
          setDepartmentLeaderboardData(getLeaderboardDatas?.departmentLeaderboardData);
        }
        if (getLeaderboardDatas?.companyLeaderboardData) {
          setCompanyLeaderboardData(getLeaderboardDatas?.companyLeaderboardData);
        }
      };
      getAllLearnerScores();
    }, [learner_game_play_id]);
    // useEffect(()=>{
    //   getAllLearnerSCores();
    // },[]);
useEffect(() => {
  if (!profile) return;

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

  // recompute daily scores
  const sums: Record<number, number> = {};
  profile?.score?.forEach((s: any) => {
    if (s.scoreEarnedDate === formattedDate) {
      sums[s.quest] = (sums[s.quest] || 0) + s.score;
    }
  });

  const replaySums: Record<number, number> = {};
  profile?.replayScore?.forEach((s: any) => {
    if (s.scoreEarnedDate === formattedDate) {
      replaySums[s.quest] = (replaySums[s.quest] || 0) + s.score;
    }
  });

  const todayTotal = Object.entries(sums).reduce((tot, [quest, score]) => {
    const q = Number(quest);
    if (replaySums[q]) {
      return tot + Math.max(replaySums[q], score);
    }
    return tot + score;
  }, 0);

  setPlayerTodayScore(todayTotal);

}, [profile?.score, profile?.replayScore, names]);

 
    useEffect(() => {
      const currentDate = new Date();
      // Get day, month, and year
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = currentDate.getFullYear();
      // Format date as DD-MM-YYYY
      const formattedDate = `${day}-${month}-${year}`;

      const scores = profile?.score;
      const sums: any = {};
      scores?.forEach((score: any) => {
        const quest = score.quest;
        if (!sums[quest]) {
          sums[quest] = 0;
        }
        if (score.scoreEarnedDate === formattedDate) {
          sums[quest] += score.score;
        }

      });
      let getFinalscores = {};
      Object.entries(sums).forEach(([quest, score]) => {
        const IntQuest = parseInt(quest);
        const newQuest = { ...getFinalscores, [IntQuest]: score };
        getFinalscores = { ...newQuest };

      });
      // const TodayTotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
      //     tot += acc[1];
      //   return tot;
      // }, 0);
      // setPlayerTodayScore(TodayTotalScore);
      const Replayscores = profile?.replayScore.length > 0 ? profile?.replayScore : null;
      const Replaysums: { [key: number]: number } = {};
      Replayscores?.forEach((score: any) => {
        const quest = score.quest;
        if (!Replaysums[quest]) {
          Replaysums[quest] = 0;
        }
        if (score.scoreEarnedDate === formattedDate) {
          Replaysums[quest] += score.score;
        }
      });

      let getReplayFinalscores: { [key: number]: number } = {};
      Object.entries(Replaysums).forEach(([quest, score]) => {
        const IntQuest = parseInt(quest);
        getReplayFinalscores = { ...getReplayFinalscores, [IntQuest]: score };
      });

      const TodayTotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
        let questNo = acc[0];
        let questHasReplay = Object.keys(getReplayFinalscores).some((quest) => quest === questNo);
        if (questHasReplay) {

          getReplayFinalscores[questNo] > acc[1] ? (tot += getReplayFinalscores[questNo]) : (tot += acc[1])
        }
        else {
          tot += acc[1];
        }
        return tot;
      }, 0);
      setPlayerTodayScore(TodayTotalScore);
      const mergedUsersPlayers = names.sort((a:any, b:any) => {
        // Sort by allTimeScore in descending order

        if (b.allTimeScore !== a.allTimeScore) {
          return b.allTimeScore - a.allTimeScore;
        }
        // If allTimeScores are equal, sort alphabetically by name
        return a.name.localeCompare(b.name);
      });
      //Sorted Using Score-starts for score position      
      let sortedUsingScore = [...mergedUsersPlayers].sort((a, b) => {
        // Sort by daily score in descending order
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // If scores are equal, sort alphabetically by name
        return a.name.localeCompare(b.name);
      });
      let dailyPositionIndex = -1;
      sortedUsingScore = sortedUsingScore.map((usrScore: any, index: number) => {
        dailyPositionIndex = index + 1;
        let alltimePositionIndex = -1;
        let alltimePosition = mergedUsersPlayers.find((userDetail: any, indexvalue: number) => {
          if (userDetail.name == usrScore.name && userDetail.score == usrScore.score && userDetail.allTimeScore == usrScore.allTimeScore) {
            alltimePositionIndex = indexvalue + 1;
            return true;
          }
        });
        return ({ ...usrScore, dailyPosition: dailyPositionIndex, alltimePosition: alltimePositionIndex });
      });
      let playerIndex: any;
        playerIndex = sortedUsingScore.findIndex(x => x.name === (learnerPlayList?.LearnerProfile?.nickName ?? learnerPlayList?.LearnerProfile?.name));
        // playerIndex = sortedUsingScore.findIndex(x => x.name === 'Player');
      
      if (playerIndex !== -1) {
        // Remove it from its current position
        
        const unShiftedPlayer = sortedUsingScore.splice(playerIndex, 1)[0];
        
        // Add it to the beginning of the array
        sortedUsingScore.unshift(unShiftedPlayer);
        
        setShuffledUsers(sortedUsingScore);
      }
    }, [playerTodayScore ,names]);

    const handleHome = () => {
      if (homeLeaderBoard) {
        setCurrentScreenId(homeLeaderBoard);
        setHomeLeaderBoard(null);
      } else {
        if (gameInfo) {
          if (
            gameInfo?.gameData?.gameIsShowReflectionScreen === 'true' &&
            gameInfo?.reflectionQuestions.length > 0
          ) {
            setCurrentScreenId(3); // Navigate to Reflection screen
          } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
            setCurrentScreenId(7); // Navigate to Takeaway screen
          } else {
            setCurrentScreenId(5); // Navigate to Thank you screen
          }
        }
      }
    };

    const handleNext = () => {
      setFirstLoading(true)
      useData?.setMotionEffect(true)
      setTimeout(() => {
        getData(data)
      }, 300)
    }


    const handleAllTimeClick = async (type: string) => {
      let newSortedUsers = [...shuffledUsers];
      if (type === 'daily') {
        setSortAse((prev: any) => ({ ...prev, daily: !prev.daily }))

        newSortedUsers = [...shuffledUsers].sort((a: any, b: any) => {
          if (sortAse.daily) {
            if (a.score !== b.score) {
              return a.score - b.score;
            } else {
              return b.name.localeCompare(a.name);
            }
          } else {
            // Sort by score in descending order
            if (b.score !== a.score) {
              return b.score - a.score;
            } else {
              return a.name.localeCompare(b.name);
            }
          }
        });
        newSortedUsers = newSortedUsers.map((row: any, index: number) => ({
          ...row,
        }));

      } else if (type === 'alltime') {
        setSortAse((prev: any) => ({ ...prev, allTime: !prev.allTime }))
        // Sort the users by all-time score
        newSortedUsers = [...shuffledUsers].sort((a: any, b: any) => {
          if (sortAse.allTime) {
            if (b.allTimeScore !== a.allTimeScore) {
              return b.allTimeScore - a.allTimeScore;
            } else {
              return a.name.localeCompare(b.name);
            }
          } else {
            // Sort by allTimeScore in descending order
            if (a.allTimeScore !== b.allTimeScore) {
              return a.allTimeScore - b.allTimeScore;
            } else {
              return b.name.localeCompare(a.name);
            }
          }
        });
        newSortedUsers = newSortedUsers.map((row: any, index: number) => ({
          ...row,
        }));
      }

      // If playerData exists, move it to the first position
      const playerData = newSortedUsers.find(user => user.name === playerInfo?.profileData?.name);
      if (playerData) {
        const playerIndex = newSortedUsers.findIndex(x => x.name === playerInfo?.profileData?.name);

        if (playerIndex !== -1) {
          // Remove it from its current position
          const unShiftedPlayer = newSortedUsers.splice(playerIndex, 1)[0];
          // Add it to the beginning of the array
          newSortedUsers.unshift(unShiftedPlayer);
        }
      }
      // Update the state with the new sorted users
      setShuffledUsers(newSortedUsers);
    }

    const containerRef = useRef<any>(null);
    let lastScrollTop = 0;

  
    useEffect(() => {

      const container = containerRef?.current;
      if (!container) return; // Early return if container is not available
      const handleScroll = () => {
        let currentScrollTop = container?.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          container.classList.add('scrollbar-down');
        } else {
          // Scrolling up
          container.classList.remove('scrollbar-down');
          // container.classList.remove('content-box');
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
      };

      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const previousNavigation = async () => {
      const LastquestNo = parseInt(profile.currentQuest);
      setCurrentQuestNo(LastquestNo);
      setCurrentScreenId(6);
    }
    const isDepartmentEmpty = departmentLeaderboardData.length === 0;

    const handleDepartmentClick = () => {
      if (!isDepartmentEmpty) {
        setActiveLeaderboard('department');
      }
    };

    // const handleDepartmentClick = () => {
    //   setActiveLeaderboard('department');
    // };
  
    // Handle click on "Overall" button
    const handleOverallClick = () => {
      setActiveLeaderboard('company');
    };



  const [geFinalscorequest, SetFinalscore] = useState(null);
 
  const [progressPercent, setProgressPercent] = useState<any>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const [showIsLeaderboardEnabled, showSetIsLeaderboardEnabled] = useState<boolean>(null);

   

  
      const[progressShow,setProgressShow]=useState(null)
  useEffect(() => {
  const fetchLeaderboard = async () => {
    const getLeaderboardDatas = await getLeaderboardData(learner_game_play_id);
    if (getLeaderboardDatas?.departmentLeaderboardData) {
      setDepartmentLeaderboardData(getLeaderboardDatas.departmentLeaderboardData);
    }
    if (getLeaderboardDatas?.companyLeaderboardData) {
      setCompanyLeaderboardData(getLeaderboardDatas.companyLeaderboardData);
    }
  };

  if (profile) {
    fetchLeaderboard();
  }
}, [learner_game_play_id, profile]);

      // useEffect(() => {
      //   const getAllLearnerScores = async () => {
      //     const getLeaderboardDatas = await getLeaderboardData(learner_game_play_id);
      //     if (getLeaderboardDatas?.departmentLeaderboardData) {
      //       setDepartmentLeaderboardData(getLeaderboardDatas?.departmentLeaderboardData);
      //     }
      //     if (getLeaderboardDatas?.companyLeaderboardData) {
      //       setCompanyLeaderboardData(getLeaderboardDatas?.companyLeaderboardData);
      //     }
      //   };
      //   getAllLearnerScores();
      // }, [learner_game_play_id]);
      // useEffect(()=>{
      //   getAllLearnerSCores();
      // },[]);
  
   
      useEffect(() => {
        const currentDate = new Date();
        // Get day, month, and year
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = currentDate.getFullYear();
        // Format date as DD-MM-YYYY
        const formattedDate = `${day}-${month}-${year}`;
  
        const scores = profile?.score;
        const sums: any = {};
        scores?.forEach((score: any) => {
          const quest = score.quest;
          if (!sums[quest]) {
            sums[quest] = 0;
          }
          if (score.scoreEarnedDate === formattedDate) {
            sums[quest] += score.score;
          }
  
        });
        let getFinalscores = {};
        Object.entries(sums).forEach(([quest, score]) => {
          const IntQuest = parseInt(quest);
          const newQuest = { ...getFinalscores, [IntQuest]: score };
          getFinalscores = { ...newQuest };
  
        });
   
        const Replayscores = profile?.replayScore.length > 0 ? profile?.replayScore : null;
        const Replaysums: { [key: number]: number } = {};
        Replayscores?.forEach((score: any) => {
          const quest = score.quest;
          if (!Replaysums[quest]) {
            Replaysums[quest] = 0;
          }
          if (score.scoreEarnedDate === formattedDate) {
            Replaysums[quest] += score.score;
          }
        });
  
        let getReplayFinalscores: { [key: number]: number } = {};
        Object.entries(Replaysums).forEach(([quest, score]) => {
          const IntQuest = parseInt(quest);
          getReplayFinalscores = { ...getReplayFinalscores, [IntQuest]: score };
        });
  
        const TodayTotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
          let questNo = acc[0];
          let questHasReplay = Object.keys(getReplayFinalscores).some((quest) => quest === questNo);
          if (questHasReplay) {
  
            getReplayFinalscores[questNo] > acc[1] ? (tot += getReplayFinalscores[questNo]) : (tot += acc[1])
          }
          else {
            tot += acc[1];
          }
          return tot;
        }, 0);
        setPlayerTodayScore(TodayTotalScore);
        const mergedUsersPlayers = names.sort((a:any, b:any) => {
          // Sort by allTimeScore in descending order
  
          if (b.allTimeScore !== a.allTimeScore) {
            return b.allTimeScore - a.allTimeScore;
          }
          // If allTimeScores are equal, sort alphabetically by name
          return a.name.localeCompare(b.name);
        });
        //Sorted Using Score-starts for score position      
        let sortedUsingScore = [...mergedUsersPlayers].sort((a, b) => {
          // Sort by daily score in descending order
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // If scores are equal, sort alphabetically by name
          return a.name.localeCompare(b.name);
        });
        let dailyPositionIndex = -1;
        sortedUsingScore = sortedUsingScore.map((usrScore: any, index: number) => {
          dailyPositionIndex = index + 1;
          let alltimePositionIndex = -1;
          let alltimePosition = mergedUsersPlayers.find((userDetail: any, indexvalue: number) => {
            if (userDetail.name == usrScore.name && userDetail.score == usrScore.score && userDetail.allTimeScore == usrScore.allTimeScore) {
              alltimePositionIndex = indexvalue + 1;
              return true;
            }
          });
          return ({ ...usrScore, dailyPosition: dailyPositionIndex, alltimePosition: alltimePositionIndex });
        });
        let playerIndex: any;
          playerIndex = sortedUsingScore.findIndex(x => x.name === (learnerPlayList?.LearnerProfile?.nickName ?? learnerPlayList?.LearnerProfile?.name));
          // playerIndex = sortedUsingScore.findIndex(x => x.name === 'Player');
        
        if (playerIndex !== -1) {
          // Remove it from its current position
          
          const unShiftedPlayer = sortedUsingScore.splice(playerIndex, 1)[0];
          
          // Add it to the beginning of the array
          sortedUsingScore.unshift(unShiftedPlayer);
          
          setShuffledUsers(sortedUsingScore);
        }
      }, [playerTodayScore ,names]);
  

  
    
      useEffect(() => {
  
        const container = containerRef?.current;
        if (!container) return; // Early return if container is not available
        const handleScroll = () => {
          let currentScrollTop = container?.scrollTop;
  
          if (currentScrollTop > lastScrollTop) {
            container.classList.add('scrollbar-down');
          } else {
            // Scrolling up
            container.classList.remove('scrollbar-down');
            // container.classList.remove('content-box');
          }
  
          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        };
  
        container.addEventListener('scroll', handleScroll);
  
        return () => {
          container.removeEventListener('scroll', handleScroll);
        };
      }, []);
  

  
 
  
  useEffect(() => {
    const scores = profile?.score;
    if (scores && scores.length > 0) {
      const sums = scores?.reduce(
        (accumulator: { [key: string]: number }, score: any) => {
          const quest = score.quest;
          if (accumulator?.[quest] != undefined) {
            accumulator[quest] = (accumulator[quest] || 0) + score.score;
            return accumulator;
          }
        },
        0,
      );
      SetFinalscore(sums);
    }
  }, []);

  const handleOverView = () => {
    setHomeLeaderBoard(currentScreenId);
    setCurrentScreenId(4);
  };
  useEffect(() => {
      let progressBarRatioforquest:any;
    const progressResult = () => {  

      //calculate Progress based on screen, Need to show different progress for current screen is in story, progress of the current quest, unless  show the entire game progress
      if (currentScreenId === 2) {
        const currentQuestBlocks = demoBlocks[profile?.currentQuest];
        const totalblockCount = currentQuestBlocks && Object.keys(currentQuestBlocks).length;
        const keyWithValueOfCurrentBlock = currentQuestBlocks && Object.keys(currentQuestBlocks).find(
          (key: any) => {
            const obj = currentQuestBlocks[key];
            const blockPrimarySequence = obj?.blockPrimarySequence;
            if (blockPrimarySequence) {
              const hasMatchingSequence =
                blockPrimarySequence.trim() ===
                (data?.blockPrimarySequence || '').trim();
              return hasMatchingSequence;
            }
            return false;
          },
        );
        const progressBarRatio: any =
          keyWithValueOfCurrentBlock &&
          (parseInt(keyWithValueOfCurrentBlock) > 0
            ? (parseInt(keyWithValueOfCurrentBlock) - 1) / totalblockCount
            : 0);
        setProgressPercent(
          progressBarRatio && progressBarRatio > 0 ? progressBarRatio : 0,
        );
        if (questState[parseInt(profile?.currentQuest)] === 'Started'){
          setLearnerPlayingDetails((prev:any) => ({
            ...prev,
          
              progress: progressBarRatio,
           
          }));
        }
         setProgressShow(progressBarRatioforquest)
      } else {
        const uniqueQuestIds = [...new Set(profile?.completedLevels)]; //returns ['1', '2', '3'] if it has ['1','2','2','3']

        //collect the actually completed quest list to show the the progress
        const completedQuestList = uniqueQuestIds.filter((quest: any) => {
          const isCurrentQuestCompleted = Object.entries(questState).some(
            ([key, value]: [any, any]) => {
              return (
                key === quest && ['replayallowed', 'completed'].includes(value)
              );
            },
          );
          console.log("isCurrentQuestCompleted",isCurrentQuestCompleted)
          console.log("isCurrentQuestCompleted-uniqueQuestIds",uniqueQuestIds)
          return isCurrentQuestCompleted;
        });

        const completedQuest = completedQuestList.length;
        let gameProgress = 0;
        if (completedQuest > 0) {
           gameProgress = completedQuest / gameInfo?.gameQuest?.length;
          //   if(completedQuest===1)
          // {
          //   console.log("completedQuest--111")
          //   gameProgress =progressShow
          // }else
          // {
          //               console.log("completedQuest-22")

          // gameProgress = completedQuest / gameInfo?.gameQuest?.length;

          // }
          if ( currentScreenId===6){
            setLearnerPlayingDetails((prev:any) => ({
              ...prev,
            
                progress: gameProgress,
             
            }));
          }
        }
        setProgressPercent(gameProgress && gameProgress > 0 ? gameProgress : 0);

      
      }
    };

    progressResult();
  }, [data, currentScreenId, questState]);
  useEffect(() => {
    if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
      showSetIsLeaderboardEnabled(true);
    }
    else {
      showSetIsLeaderboardEnabled(false);
    }
  }, [gameInfo?.gameData?.gameIsShowLeaderboard])


  const handleMusicVolume1 = (sliderValue: number, type: string) => {
    console.log("type----handleMusicVolume",type)
    if (!isNaN(sliderValue) && isFinite(sliderValue)) {
      const newVolume = sliderValue / 100;
        setLearnerPlayingDetails((prev: any) => ({
          ...prev,
          // audioVolumeValue: { bgmVolume: prev.audioVolumeValue.bgmVolume, voiceVolume: newVoiceVolume }
          audioVolumeValue: { bgmVolume: type === EnumType.BGM ? newVolume.toString() : learnerPlayList.audioVolumeValue.bgmVolume, 
            voiceVolume: type === EnumType.VOICE ? newVolume.toString():learnerPlayList.audioVolumeValue.voiceVolume}
        }));
        setAudioObj((prev: any) => ({
          ...prev,
          type: type === EnumType.BGM ? EnumType.BGM : EnumType.VOICE, // Update type based on parameter
          Voicevolume: type === EnumType.VOICE ? newVolume.toString() : learnerPlayList?.audioVolumeValue?.voiceVolume ? learnerPlayList?.audioVolumeValue?.voiceVolume : 0.5,
          BGMvolume: type === EnumType.BGM ? newVolume.toString() : learnerPlayList?.audioVolumeValue?.bgmVolume ? learnerPlayList?.audioVolumeValue?.bgmVolume : 0.5,
        }));
    }
  };




  const totalPoints = useMemo(() => {
    let total: number = 0;
    let TotalScore: number = 0;
    if ([2, 4, 6, 8, 9, 14, 15].includes(currentScreenId)) {
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
        
      if (scoreArray?.length > 0) {
        total = scoreArray.reduce((acc: number, cur: any) => {
          if (cur.quest === parseInt(profile.currentQuest)) {
            return acc + cur.score;
          } else {
            return acc;
          }
        }, 0);
        

      }
      if ([4, 6, 8, 9, 14].includes(currentScreenId)) {
        TotalScore = profile?.score?.reduce((acc: number, cur: any) => {
          if (cur.quest === parseInt(profile.currentQuest)) {
            return acc + (cur.score || 0);
          } else {
            return acc;
          }
        }, 0);
    


      }
          return isNaN(total) || total === 0 ? TotalScore : total;

    } 
    else {
          const scoreArray =
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
      const scores = scoreArray;
      const sums: any = {};
      scores?.forEach((score: any) => {
        const quest = score.quest;
        if (!sums[quest]) {
          sums[quest] = 0;
        }
        sums[quest] += score.score;
      });

      let getFinalscores = {};
      Object.entries(sums).forEach(([quest, score]) => {
        const IntQuest = parseInt(quest);
        const newQuest = { ...getFinalscores, [IntQuest]: score };
        getFinalscores = { ...newQuest };
      });

      const Replayscores = profile?.replayScore?.length > 0 ? profile?.replayScore : null;
      const Replaysums: { [key: number]: number } = {};
      Replayscores?.forEach((score: any) => {
        const quest = score.quest;
        if (!Replaysums[quest]) {
          Replaysums[quest] = 0;
        }
        Replaysums[quest] += score.score || 0;
      });

      let getReplayFinalscores: { [key: number]: number } = {};
      Object.entries(Replaysums).forEach(([quest, score]) => {
        const IntQuest = parseInt(quest);
        getReplayFinalscores = { ...getReplayFinalscores, [IntQuest]: score };
      });

      total = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
        let newTotal = tot;
        let questNo = acc[0];
        let questHasReplay = Object.keys(getReplayFinalscores).some((quest) => quest === questNo);
        if (questHasReplay) {
          getReplayFinalscores[questNo] > acc[1] ? (tot += getReplayFinalscores[questNo]) : (tot += acc[1])
        }
        else {
          tot += acc[1];
        }
        return tot;
      }, 0);
    }
              return isNaN(total) || total === 0 ? TotalScore : total;

  }, [profile?.score?.length, profile?.replayScore?.length, currentScreenId,profile?.score,profile?.replayScore,]);

   const leaderboardToRender = useMemo(() => {
    const currentBoard = activeLeaderboard === 'department' ? departmentLeaderboardData : companyLeaderboardData;
    const data = Array.isArray(currentBoard) ? currentBoard.slice() : [];
  
    // Map scores to positions (daily)
    const dailySorted = data.slice().sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const dailyPos = new Map<number | string, number>();
    dailySorted.forEach((item, idx) => {
      const key = item.learnerId ?? item.name ?? idx;
      dailyPos.set(key, idx + 1);
    });
  
    // Map allTimeScore to positions (all time)
    const alltimeSorted = data.slice().sort((a, b) => (b.allTimeScore ?? 0) - (a.allTimeScore ?? 0));
    const alltimePos = new Map<number | string, number>();
    alltimeSorted.forEach((item, idx) => {
      const key = item.learnerId ?? item.name ?? idx;
      alltimePos.set(key, idx + 1);
    });
  
    // Attach positions
    const augmented = data.map((item, idx) => {
      const key = item.learnerId ?? item.name ?? idx;
      return {
        ...item,
        dailyPosition: dailyPos.get(key) ?? idx + 1,
        alltimePosition: alltimePos.get(key) ?? idx + 1,
      };
    });
  
    // Order by daily score for display (highest first)
    const ordered = augmented.slice().sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  
    // If you want the currently-playing user to appear visually at the top,
    // find them and move their row to index 0 (positions remain unchanged).
    const playerName = learnerPlayList?.LearnerProfile?.nickName ?? learnerPlayList?.LearnerProfile?.name;
    if (playerName) {
      const playerIndex = ordered.findIndex(it => it.name === playerName);
      if (playerIndex > -1) {
        const [playerRow] = ordered.splice(playerIndex, 1);
        ordered.unshift(playerRow);
      }
    }
  
    return ordered;
  }, [activeLeaderboard, departmentLeaderboardData, companyLeaderboardData, learnerPlayList]);

  // questWisePlayerScore
  const handleNavigate10 = () => {
    useData?.setMotionEffect(true);
    setTimeout(()=> {
      setCurrentScreenId(10)
    },300)
  }
  const handleNavigate13 = () => {
    if(currentScreenId === 13) {
      return false;
    } 
    else {
      useData?.setMotionEffect(true);
      setTimeout(()=> {
        setCurrentScreenId(13)
      },300)
    }
  } 
 
  return (
    <Box className="top-menu-home-section">
      {dontShowTopMenu && !isSettingOpen && !isLeaderboardEnabled  ? (
        <>
          <Box w="100%" h="auto" position={'relative'}>
            <Img
              src={preloadedAssets.TopMenu}
              className="top-menu-img"
              h={'auto !important'}
            />
            <Box className="new-top-menu">
              <Box
                w={'10%'}
                h={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Tooltip
                  label="Home"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  background={'transparent'}
                  boxShadow={'unset'}
                  backgroundImage={preloadedAssets.TooltipImg}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'contain'}
                  backgroundPosition={'center'}
                  filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                  padding={'10px'}
                  height={'70px'}
                  w={'150px'}
                  fontSize={'29px'}
                  fontFamily={'AtlantisText'}
                  color={'#000'}
                  overflow={'hidden'}
                  lineHeight={'25px'}
                >
                  <Img
                    src={preloadedAssets.home}
                    width={'auto'}
                    height={'70%'}
                    position={'relative'}
                    zIndex={9999}
                    onClick={() => handleNavigate10()}
                  />
                </Tooltip>
                <Tooltip
                  label="Quest"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  background={'transparent'}
                  boxShadow={'unset'}
                  backgroundImage={preloadedAssets.TooltipImg}
                  backgroundRepeat={'no-repeat'}
                  backgroundSize={'contain'}
                  backgroundPosition={'center'}
                  filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                  padding={'10px'}
                  height={'70px'}
                  w={'150px'}
                  fontSize={'29px'}
                  fontFamily={'AtlantisText'}
                  color={'#000'}
                  overflow={'hidden'}
                  lineHeight={'25px'}
                >
                  <Img
                    src={preloadedAssets.mapBtn}
                    width={'auto'}
                    height={'70%'}
                    position={'relative'}
                    zIndex={9999}
                    onClick={() => handleNavigate13()}
                  />
                </Tooltip>
              </Box>
              <Box w={'42.5%'}>
                <Box
                  w="90%"
                  h={'100%'}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Tooltip
                    label="Progress"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'AtlantisText'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Box
                      h={'70%'}
                      w={'auto'}
                      position={'relative'}
                      zIndex={9999}
                    >
                      <Img
                        src={preloadedAssets?.ProgressBar}
                        h={'100%'}
                        width={'auto'}
                      />
                      <Box
                        position={'absolute'}
                        display={'flex'}
                        top={0}
                        left={'4%'}
                        w={'90%'}
                        h={'100%'}
                      >
                        <Box
                          w={'28.5%'}
                          display={'flex'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          h={'100%'}
                        >
                          <Text
                            textAlign={'center'}
                            className="progress_percentage"
                          >
                            {Math.floor(progressPercent * 100)}%
                          </Text>
                        </Box>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          w={'70%'}
                          h={'100%'}
                        >
                          {Array.from(
                            {
                              length: Math.floor((progressPercent * 100) / 10),
                            },
                            (_, index) => (
                              <Box
                                w={'9%'}
                                h={'40%'}
                                ml={'1%'}
                                background={
                                  'linear-gradient(to bottom, #009400, #00000000)'
                                }
                                key={index}
                              ></Box>
                            ),
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Tooltip>
                  <Tooltip
                    label="Score"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'AtlantisText'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Box
                      h={'70%'}
                      w={'auto'}
                      position={'relative'}
                      zIndex={9999}
                    >
                      <Img
                        src={preloadedAssets?.Scorebox}
                        h={'100%'}
                        width={'auto'}
                      />
                      <Box
                        position={'absolute'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        top={0}
                        left={'26%'}
                        w={'68%'}
                        h={'100%'}
                      >
                        <Text className="score_text">{totalPoints}</Text>
                      </Box>
                    </Box>
                  </Tooltip>
{gameInfo?.gameData?.gameIsShowLeaderboard === 'true' && (
                  <Tooltip
                    label={'LeaderBoard'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'AtlantisText'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >

                    <Img
                      src={preloadedAssets.leadBtn}
                      // onClick={handleOverView}
                      onClick={() => {
    setIsLeaderboardEnabled(true);
  }}
                      width={'auto'}
                      height={'70%'}
                      position={'relative'}
                      zIndex={9999}
                      pointerEvents={isButtonDisabled ? 'none' : 'auto'}
                    />
                  </Tooltip>
)}
                  <Tooltip
                    label="Settings"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    background={'transparent'}
                    boxShadow={'unset'}
                    backgroundImage={preloadedAssets.TooltipImg}
                    backgroundRepeat={'no-repeat'}
                    backgroundSize={'contain'}
                    backgroundPosition={'center'}
                    filter={'drop-shadow(0px 2px 5px #1b1a1ab5)'}
                    padding={'10px'}
                    height={'70px'}
                    w={'150px'}
                    fontSize={'29px'}
                    fontFamily={'AtlantisText'}
                    color={'#000'}
                    overflow={'hidden'}
                    lineHeight={'25px'}
                  >
                    <Img
                      src={preloadedAssets.Setting}
                      onClick={() => setIsSettingOpen(true)}
                      width={'auto'}
                      height={'70%'}
                      position={'relative'}
                      zIndex={9999}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}

      {isSettingOpen ? (
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
           
          
{isIOS ? (
  <>
    <Img src={preloadedAssets.SettingPad_IOS} className="setting-pad" />
  <Box
  className='settingpad_ios'
    textAlign="center"
    fontSize="lg"
    fontWeight="bold"
    width='25%'
   
    position="absolute"
  >
    Please adjust the volume using your device’s volume buttons.
  </Box>
  </>
) : (
  <>
   <Img src={preloadedAssets.SettingPad} className="setting-pad" />
            <Box className="music-volume volumes">
              <Slider
                aria-label="slider-ex-4"
                name="musicVolume"
                defaultValue={
                 learnerPlayList?.audioVolumeValue?.bgmVolume ? learnerPlayList?.audioVolumeValue?.bgmVolume * 100 : audioObj?.BGMvolume * 100 
                }
                onChangeEnd={(value) => (currentScreenId===2 || currentScreenId===14 ) ? null :handleMusicVolume(value, EnumType.BGM)}
              >
                <SliderTrack
                  className="slider-track"
                  height="15px"
                  borderRadius="80px"
                >
                  <Box position="relative">
                    <Img
                      w={'100%'}
                      h={'auto'}
                      src={preloadedAssets.VolumeTrack}
                      alt="Volume Track"
                    />
                    <Box
                      position="absolute"
                      top="47%"
                      left="45%"
                      transform="translate(-50%, -50%)"
                      width="86%"
                    >
                      <SliderFilledTrack className="filled-volume" bg="pink.500" />
                      <SliderThumb
                        boxSize={10}
                        background={'transparent'}
                      // left={'calc(100% - 30%)'}
                      >
                        <Img className='slider_thumb' src={preloadedAssets.SliderPointer} />
                      </SliderThumb>
                    </Box>
                  </Box>
                </SliderTrack>
              </Slider>
            </Box>

            <Box className="voice-volume volumes">
              <Slider
                aria-label="slider-ex-4"
                defaultValue={
                 learnerPlayList?.audioVolumeValue?.voiceVolume ? learnerPlayList?.audioVolumeValue?.voiceVolume * 100 : audioObj?.Voicevolume * 100
                }
                onChangeEnd={(value) =>
                  handleMusicVolume(value, EnumType.VOICE)
                }
              >
                <SliderTrack
                  className="slider-track"
                  height="15px"
                  borderRadius="80px"
                >
                  <Box position="relative">
                    <Img
                      w={'100%'}
                      h={'auto'}
                      src={preloadedAssets.VolumeTrack}
                      alt="Volume Track"
                    />
                    <Box
                      position="absolute"
                      top="47%"
                      left="45%"
                      transform="translate(-50%, -50%)"
                      width="86%"
                    >
                      <SliderFilledTrack className="filled-volume" bg="pink.500" />
                      <SliderThumb boxSize={10} background={'transparent'} >
                        <Img className='slider_thumb' src={preloadedAssets.SliderPointer} />
                      </SliderThumb>
                    </Box>
                  </Box>
                </SliderTrack>
              </Slider>
            </Box>
            </>
)}
            <Box className="btns">
              <Button
                className="okay-btn btn"
                onClick={() => setIsSettingOpen(false)}
              >
                <Img src={preloadedAssets.OkayBtn} />
              </Button>
            </Box>
          </motion.div>
        </Box>
              
      ) : null}



         { isLeaderboardEnabled === true && (
                 <Box className="modal-leaderboard">
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
          
                               
                                  <Img src={imageSrc} className="modal-pad" />
                                  <Text className='new-content'>LeaderBoard</Text>
                                  <Box className="content-boxnew" id='leaderboard_idnew' ref={containerRef}>
                                    <Box className="table-headingnew"
                                      fontFamily={'AtlantisText'}
                                      display={'flex'}
                                    >
                                      <Box
                                        w={'200px'}
                                        h={'50px'}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                      >
                                        <Text
                                          color={'#D9C7A2'}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          Player Name
                                        </Text>
                                      </Box>
                                      <Img
                                        src={preloadedAssets.Separator}
                                        className="dot-imgnew"
                                        w={'10px'}
                                        h={'65px'}
                                        position={'relative'}
                                      />
                                      <Box w={'200px'} h={'50px'}>
                                        <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                                          <Text color={'#D9C7A2'}
                                          // onClick={() => {
                                          //   handleAllTimeClick('daily');
                                          //   setAllTimeClicked(true);
                                          // }}
                                          >Daily</Text>
                                        </Box>
                                        <Box
                                          w={'100%'}
                                          display={'flex'}
                                          justifyContent={'space-between'}
                                        >
                                          <Text textAlign={'center'} color={'#D9C7A2'}>
                                            Position
                                          </Text>
                                          <Text textAlign={'center'} color={'#D9C7A2'}>
                                            Score
                                          </Text>
                                        </Box>
                                      </Box>
                                      <Img
                                        src={preloadedAssets.Separator}
                                        className="dot-imgnew"
                                        w={'10px'}
                                        h={'65px'}
                                        position={'relative'}
                                      />
                                      <Box w={'200px'} h={'50px'}>
                                        <Box w={'100%'} display={'flex'} justifyContent={'center'} >
                                          <Text
                                            color={'#D9C7A2'}
                                            // onClick={() => {
                                            //   handleAllTimeClick('alltime');
                                            //   setAllTimeClicked(false);
                                            // }}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            All Time
                                          </Text>
                                        </Box>
                                        <Box
                                          w={'100%'}
                                          display={'flex'}
                                          justifyContent={'space-between'}
                                        >
                                          <Text textAlign={'center'} color={'#D9C7A2'}>
                                            Position
                                          </Text>
                                          <Text textAlign={'center'} color={'#D9C7A2'}>
                                            Score
                                          </Text>
                                        </Box>
                                      </Box>
                                    </Box>
                                    {/* {(activeLeaderboard === 'department' ? departmentLeaderboardData : companyLeaderboardData).map((item, index) => (  
                                                           */}
                                    {leaderboardToRender.map((item, index) => (
                                            <Box
                                          className="content-leadnew"
                                          key={index}
                                          _hover={{
                                            filter: 'grayscale(50%)',
                                            transform: 'scale(1.0)',
                                            transition: 'transform 0.3s ease-in-out',
                                            opacity: '0.8',
                                          }}
                                        >
                                          <>
                                            <Img
                                              src={preloadedAssets.Entry}
                                              className={'list-padnew'}
                                              _hover={{ filter: 'grayscale(0%)' }}
                                              filter={index === 0 ? 'grayscale(0%)' : 'grayscale(50%)'}
                                            />
                                            <Box
                                              className={'list-wrappernew'}
                                              _hover={{ filter: 'grayscale(0%)' }}
                                              filter={index === 0 ? 'grayscale(0%)' : 'grayscale(50%)'}
                                            >
                                              <Box w={'30%'}>
                                                <Text
                                                  textAlign={'center'}
                                                  color={'#161313'}
                                                  letterSpacing={'1px'}
                                                >
                                                  {item.name ? item.name : 'Guest'}
                                                </Text>
                                              </Box>
                                              <Box
                                                w={'30%'}
                                                display={'flex'}
                                                justifyContent={'space-between'}
                                              >
                                                <Text textAlign={'center'} color={'#161313'}
                                                  letterSpacing={'1px'}>
                                                  {item.dailyPosition !== undefined ? item.dailyPosition : index + 1}
                                                </Text>
                                                <Text textAlign={'center'} color={'#161313'}
                                                  letterSpacing={'1px'}>
                                                  {item.score ? item.score : 0}
                                                </Text>
                                              </Box>
                                              <Box
                                                w={'30%'}
                                                display={'flex'}
                                                justifyContent={'space-between'}
                                              >
                                                <Text textAlign={'center'} color={'#161313'}
                                                  letterSpacing={'1px'}>
                                                  {item.alltimePosition !== undefined ? item.alltimePosition : index + 1}
                                                </Text>
                                                <Text textAlign={'center'} color={'#161313'}
                                                  letterSpacing={'1px'} >
                                                  {item.allTimeScore ? item.allTimeScore : 0}
                                                </Text>
                                              </Box>
                                            </Box>
                                          </>
                                        </Box>
                                      ))}
                
                                   
                                  </Box>
                                  <Box className='top-barnew'>
                                    <Box className='list-wrappertop'
                                    >
                                      <Box className='heading-boxnew'>
                                        <Img
                                          src={preloadedAssets.Label}
                                          className="heading-box-imgnew"
                                          w={'200px'}
                                          h={'60px'}
                                          position={'relative'}
                                        />{' '}
                                        <Box className='heading-box-contentnew'
                                          top={'0'}
                                          fontFamily={'AtlantisText'}
                                          fontSize={'x-large'}
                                          position={'absolute'}
                                          display={'flex'}
                                          justifyContent={'center'}
                                          width={'200px'}
                                          mt={'3px'}
                                          // onClick={() => {
                                          //   handleAllTimeClick('daily');
                                          //   setAllTimeClicked(true);
                                          // }}
                                          onClick={handleOverallClick}
                                        >
                                          <Text>Overall</Text>
                                        </Box>
                                      </Box>
                                      <Box className='heading-boxnew'>
                                        <Img
                                          src={preloadedAssets.Label}
                                          className="heading-box-imgnew"
                                          w={'200px'}
                                          h={'60px'}
                                          position={'relative'}
                                        />{' '}
                                        <Box className='heading-box-contentnew'
                                          top={'0'}
                                          fontFamily={'AtlantisText'}
                                          fontSize={'x-large'}
                                          position={'absolute'}
                                          display={'flex'}
                                          justifyContent={'center'}
                                          width={'200px'}
                                          mt={'3px'}
                                          // onClick={() => {
                                          //   handleAllTimeClick('alltime');
                                          //   setAllTimeClicked(false);
                                          // }}
                                          onClick={handleDepartmentClick}
                                          style={{
                                            opacity: isDepartmentEmpty ? 0.5 : 1,
                                            cursor: isDepartmentEmpty ? 'not-allowed' : '',
                                          }}
                                        >
                                          <Text>Department</Text>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box className={'lead_btnsnew'} justifyContent={'center'}>
                                    
                                    <Img
                                      src={ preloadedAssets?.closeBtn}
                                      className={'interaction_buttonnew'}
                                      onClick={() => setIsLeaderboardEnabled(false)}
                                    />
                                  </Box>
                                
                               </motion.div>
                             
                            </Box>
                   )}
    </Box>
  );
};

export default TopMenuBar;
