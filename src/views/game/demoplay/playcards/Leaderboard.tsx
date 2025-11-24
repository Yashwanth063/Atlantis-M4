import { Img, Text, SimpleGrid, Box } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useContext, useState, useEffect,useMemo } from 'react';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';
import { motion } from 'framer-motion';
import { getLeaderboardData } from 'utils/gameApplication/gamePlayService';
import { useParams } from 'react-router-dom';
/** Temporary user Data to list */
let names:any = [
 
]


const LeaderBoard: React.FC<{
  formData?: any;
  imageSrc?: any;
  getData?: any;
  data?: any;
  homeLeaderBoard?: any;
  setHomeLeaderBoard?: any;
  setCurrentScreenId?: any;
  gameInfo?: any;
  preloadedAssets: any;
  setPlayerTodayScore: any;
  playerTodayScore: any;
  setCurrentQuestNo: any;
  setFirstLoading: any;
  learnerPlayList:any;
}> = ({
  imageSrc,
  formData,
  getData,
  data,
  setCurrentScreenId,
  homeLeaderBoard,
  setHomeLeaderBoard,
  gameInfo,
  preloadedAssets,
  setPlayerTodayScore,
  playerTodayScore,
  setCurrentQuestNo,
  setFirstLoading,
  learnerPlayList,
}) => {
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

    return (
      <>
        {imageSrc && (
          <motion.div initial={{ rotateY: 180, y: -100 }} animate={{ rotateY: 0, y: 0 }} transition={{ type: 'spring', duration: 1 }}>
            <Box className="Leaderboard-screen">
              {formData?.gameIsShowLeaderboard === 'true' ?
                <>
                  <Img src={imageSrc} className="leaderboard-img" />
                  <Text className='title'>LeaderBoard</Text>
                  <Box className="content-box" id='leaderboard_id' ref={containerRef}>
                    <Box className="table-heading"
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
                        className="dot-img"
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
                        className="dot-img"
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
                          className="content-lead"
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
                              className={'list-pad'}
                              _hover={{ filter: 'grayscale(0%)' }}
                              filter={index === 0 ? 'grayscale(0%)' : 'grayscale(50%)'}
                            />
                            <Box
                              className={'list-wrapper'}
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
                  <Box className='top-bar'>
                    <Box className='list-wrapper'
                    >
                      <Box className='heading-box'>
                        <Img
                          src={preloadedAssets.Label}
                          className="heading-box-img"
                          w={'200px'}
                          h={'60px'}
                          position={'relative'}
                        />{' '}
                        <Box className='heading-box-content'
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
                      <Box className='heading-box'>
                        <Img
                          src={preloadedAssets.Label}
                          className="heading-box-img"
                          w={'200px'}
                          h={'60px'}
                          position={'relative'}
                        />{' '}
                        <Box className='heading-box-content'
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
                  <Box className={'lead_btns'} justifyContent={(homeLeaderBoard) ? 'center' : 'space-between'}>
                    {(!homeLeaderBoard) && <Img src={preloadedAssets.left}
                      className={'interaction_button'}
                      onClick={() => previousNavigation()}
                    />}
                    <Img
                      src={(homeLeaderBoard) ? preloadedAssets?.closeBtn : preloadedAssets?.right}
                      className={'interaction_button'}
                      onClick={() => homeLeaderBoard ? handleHome() : handleNext()}
                    />
                  </Box>
                </>
                :



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
                        <Text textAlign={'center'} className="No_preview" mt={12}>
                          The "Show Leaderboard" option is currently disabled. Please enable it if you want to use this feature.</Text>
                        <Box
                          w={'100%'}
                          display={'flex'}
                          justifyContent={'center'}
                          position={'absolute'}
                          bottom={'0'}
                          className='left-right-btn'
                        >
                          <Box w={'80%'} display={'flex'} justifyContent={'space-between'}>
                            <Img src={preloadedAssets.left} className={'interaction_button'} cursor={'pointer'} h={'60px'}onClick={() => homeLeaderBoard ? handleHome() : previousNavigation()} />
                            <Img
                              src={preloadedAssets.right}
                              // w={'50px'}
                              // h={'50px'}
                              h={'60px'}
                              className={'interaction_button'}
                              cursor={'pointer'}
                              onClick={() => handleHome()}
                            />
                          </Box>
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Box>

              }
             
            </Box>
          </motion.div>
        )}
      </>
    );
  };
export default LeaderBoard;


