import {
  Box,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { startTransition,useEffect, useRef, useState, createContext, useContext, lazy, } from 'react';
import { activityUpdate, activityCreate, createGamePlayHistory,activitygetlastblock } from "utils/gameApplication/gameActivityService";
import { getGameLanguages, getContentRelatedLanguage,getTimespent } from 'utils/game/gameService';
import { updateGameRecentlyPlayed } from 'utils/game/gameService';

import { updateLearnerDetails } from 'utils/gameApplication/gamePlayService';
import { ScoreContext } from './GamePreview';
import { useParams } from 'react-router-dom';
import { ProfileType } from "./GamePreview";
import ReplayScore from './playcards/ReplayScore';
import Story from './playcards/Story';
import Welcome from './playcards/Welcome';
import Welcome1 from './playcards/welcome1'
import ThankYou from './playcards/Thankyou';
import Reflection from './playcards/Reflection';
import Takeway from './playcards/Takeaway';
import Completion from './playcards/Completion';
import ReplayGame from './playcards/ReplayGame';
import PlayInfo from './playcards/playinfo';
import LeaderBoard from './playcards/Leaderboard';
import Characterspage from './playcards/CharacterSelection';
import ChapterPage from './playcards/Chapters';
import FeedBackScreen from './playcards/FeedBackScreen';
import TopMenuBar from './playcards/TopMenuBar';
import GameIntroScreen from './playcards/GameIntroScreen';
import GameIntroScreenFutureTheme from './FutureTheme/GameIntroScreenFutureTheme';
import Player from './playcards/Player';
import ModelPlayer from './playcards/Model';

import ReflectionFutureTheme from './FutureTheme/ReflectionFutureTheme';
import ThankyouFutureTheme from './FutureTheme/ThankyouFutureTheme';
// import GameIntroScreenFutureTheme from './FutureTheme/GameIntroFutureTheme';
import TakeawayFutureTheme from './FutureTheme/TakeawayFutureTheme';
// import ChaptersFutureTheme from './FutureTheme/ChaptersFutureTheme';
import WelcomeFutureTheme from './FutureTheme/WelcomeFutureTheme'

// import BackgroundGLB from './playcards/BackgroundFeedback';

import { checkIsMandatoryReplayPromptRequired, isOptionalReplayAllow, getPlayerFinalScore, getPlayerFinalScoreCompletion } from './HelperFunctions';
import CharacterSelectionFutureTheme from './FutureTheme/ChararcterSelectionFutureTheme';
const BackgroundGLB = lazy(() => import('./playcards/BackgroundFeedback'));
const Emporium = lazy(() => import('./playcards/Emporium'));
const FurturisticCity = lazy(() => import('./playcards/furturisticCity'));
const FuturistiLab = lazy(() => import('./playcards/futuristiLab'));
const FuturisticOffice = lazy(() => import('./playcards/futuristicOffice'));
const Castle = lazy(() => import('./playcards/castle'));
const Office = lazy(() => import('./playcards/office'));
const Underground = lazy(() => import('./playcards/underground'));
const RealisticOffice = lazy(() => import('./playcards/RealisticOffice'));
const RealFactory = lazy(() => import('./playcards/RealFactory'));
const RealWorkplace = lazy(() => import('./playcards/RealWorkplace'));
const MagicalGarden = lazy(() => import('./playcards/MagicalGarden'));
interface ShowPreviewProps {
  gameInfo: any;
  preloadedAssets: any;
  InitialScreenId: number;
  setIsAuthFailed: any;
  isAuthFailed: any;
  isLoading: any;
  glbName: any;
  timer: any;
  setTimer: any;
  seconds: any;
setSeconds: any;
selectedBackground: any;
assignedData: any;
}
interface PrevLogData {
  previewLogId: string;
  playerId: string;
  playerType: string;
  previewGameId: string;
  nevigatedSeq: any[];
  screenIdSeq: any[];
  lastActiveBlockSeq: any;
  selectedOptions: any;
  previewProfile: any;
  lastModifiedBlockSeq: string;
  lastBlockModifiedDate: string;
  updatedAt: string;
  playerInputs: any;
  audioVolumeValue: any | null;
  previewScore: ProfileType;
  questState: any;

}

interface ProfileDataType {
  name?: string;
  gender?: string;
  selectedplayer?: string;
  language?: any;
  score?: any;
  allTimeScore?: any;
  content?: any;
  audioUrls?: any;
  textId?: any;
  fieldName?: any;
  [x: string]: any;
}
export const ProfileContext = createContext<ProfileDataType>({
  name: '',
  gender: '',
  selectedplayer: '',
  language: '',
  score: 350,
  allTimeScore: 950,
});
type QuestWiseMaxTotal = { [key: number]: number };
const EntirePreview: React.FC<ShowPreviewProps> = ({
  gameInfo,
  preloadedAssets,
  InitialScreenId,
  setIsAuthFailed,
  isAuthFailed,
  isLoading,
  glbName,
  timer,
  setTimer,
  seconds,
  setSeconds,
  selectedBackground,
  assignedData
  
}) => {
  const user: any = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const { learner_game_play_id } = useParams();
  const Gameid = id ? id : null;
  const audioRef = React.useRef(null);
  const [data, setData] = useState(null);
  const [type, setType] = useState<string>('');
  const [resMsg, setResMsg] = useState<string>('');
  const [feed, setFeed] = useState<string>('');
  const [navi, setNavi] = useState<string>('');
  const [options, setOptions] = useState(null);
  const [optionNavigation, setOptionNavigation] = useState(null);
  const [getSelectedOptions, SetgetSelectedOptions] = useState<any>({});
  console.log(getSelectedOptions,'getSelectedOptions')
  console.log(options,'optionsinetnirepreview')
  const [FeedbackcurrentPosition, setFeedbackCurrentPosition] = useState(0);
  const [interactionBlockArray, setInterActionBlockArray] = useState<any | []>(
    [],
  );
  const [FeedbackremainingSentences, setFeedbackRemainingSentences] = useState<any[]>([]);
  const [InterActionScore, setInterActionScore] = useState<any[]>([]);
  const [FeedbackNavigatenext, setFeedbackNavigateNext] = useState<any>(false);
  const [isScreenshot, setisScreenshot] = useState<any>(false);
  const [FeedBackoptionData, setFeedBackoptionData] = useState(null);
  const [FeedBackselectedoptionData, setFeedBackSelectedoptionData] =
    useState(null);
  const [isOptionalReplay, setisOptionalReplay] = useState<any>(false);
  const [isReplay, setisReplay] = useState<any>(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [audio, setAudio] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [demoBlocks, setDemoBlocks] = useState(null);
  const [currentQuestNo, setCurrentQuestNo] = useState(1);
  const [homeLeaderBoard, setHomeLeaderBoard] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
  const [replayIsOpen, setReplayIsOpen] = useState(null);
  const scoreComp = profile?.score !== undefined ? profile?.score?.length > 0 ? profile?.score[0]?.score : 0 : 0;
  const [OptionSelectId, setOptionSelectId] = useState(null);
 
  const [playerTodayScore, setPlayerTodayScore] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [backgroundtheme,setBackgroundTheme]=useState(gameInfo?.assets);
  
  const [profileData, setProfileData] = useState<ProfileDataType>({
    name: '',
    gender: '',
    selectedplayer: '',
    language: '',
    score: '',
    allTimeScore: 250,
    content: '',
    audioUrls: '',
    textId: '',
    fieldName: '',
    Audiogetlanguage: [],
  });
  const [replayState, setReplayState] = useState<string>(null);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [profilescore, Setprofilescore] = useState(null);
  const [voiceIds, setVoiceIds] = useState<any>();
  const [feedbackList, setFeedbackList] = useState([]);
  const [navTrack, setNavTrack] = useState([]);
  const [currentScreenId, setCurrentScreenId] =
    useState<number>(InitialScreenId);
  const [modalLoaded, setModalLoaded] = useState<any>(false);

  const [hasMulitLanguages, setHasMulitLanguages] = useState<boolean>(false);
  const [gameLanguages, setGameLanguages] = useState([]);
  const [RepeatSelectOption, setRepeatSelectOption] = useState<boolean>(false);
  const [RepeatPrevOption, setRepeatPrevOption] = useState<any>([]);
  const [modelScreen, setModelScreen] = useState<Boolean>(false);
  const [isInitialLoadScreenWelcome, setIsInitialLoadScreenWelcome] = useState<boolean>(false);
  const [questState, setQuestState] = useState<any>({});
  const [AssignId, setAssignId] = useState<any>(0);
  const [Activitydata, setActivitydata] = useState<any>([]);
  const [prevBlock, setprevBlock] = useState<any>([]);
  const EnumType = {
    BGM: 'bgm',
    VOICE: 'voice',
  };
  const backgroundBgmRef = useRef<HTMLAudioElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const timeRef = useRef<number | null>(null);

  const [totalTimeSpended, setTotalTimeSpended] = useState("0:00");
  
  const [learnerPlayList, setLearnerPlayingDetails] = useState<any>({
    playerId: user?.data?.id,
    playerType: user?.data?.role,
    GameId: parseInt(learner_game_play_id),
    screenIdSeq: [],
    LearnerProfile: {
      name: gameInfo?.learnerDetails?.lenUserName ?? '',
      age: gameInfo?.learnerDetails?.lenAge ?? '',
      companyId: gameInfo?.learnerDetails?.lenCompanyId ?? '',
      CountryId: gameInfo?.learnerDetails?.lenCountryId ?? '',
      gender: gameInfo?.learnerDetails?.lenGender ?? '',
      Department: gameInfo?.learnerDetails?.lenDepartment ?? '',
      language: 1,
      education: gameInfo?.learnerDetails?.lenEducation ?? '',
      mailId: gameInfo?.learnerDetails?.lenMail ?? '',
      score: '',
      nickName: gameInfo?.learnerDetails?.lenNickName ?? '',
      region: gameInfo?.learnerDetails?.lenRegion ?? '',
      allTimeScore: '',
    },
   CurrentBlock:'',

    player_gender: assignedData?.player_gender?  assignedData?.player_gender :"",
    selectedplayer_charcter:assignedData?.selectedplayer_charcter ? assignedData?.selectedplayer_charcter :"",
    playerInputs: [],
    audioVolumeValue: { bgmVolume: 0.5, voiceVolume: 0.5 },
    PlayerScore_Level: {
      completedLevels: ['1'], 
      currentQuest: 1,
      compQuest: ['1'], 
      score: [],
      completeBadgseShow: []
    },
    firstTryScore:[],
    totalTimeSpent:totalTimeSpended? totalTimeSpended :0,
    questWisePlayerScore:0,
    progress:0,
    feedbackList: [],
    Prevquestseq: [],
    questState: {},
    timeAlready:totalTimeSpended ?totalTimeSpended :0,
    characterGender:''
  });

// console.log("learnerPlayList.progress in entire",learnerPlayList.progress)
  const [audioObj, setAudioObj] = useState<{
    url: string;
    type: string;
    Voicevolume: any;
    BGMvolume: any;
    loop: boolean;
    autoplay: boolean;
  }>({
    url: '',
    type: EnumType.BGM,
    Voicevolume: learnerPlayList?.audioVolumeValue?.voiceVolume ?? 0.5,
    BGMvolume: learnerPlayList?.audioVolumeValue?.bgmVolume ?? 0.5,
    loop: true, 
    autoplay: true,
  });
  console.log(audioObj,'audioObjurlinentrirepreview')
      const [isLeaderboardEnabled, setIsLeaderboardEnabled] = useState(false);
  // const [currentBlock,setCurrentBlock] = useState(gameInfo?.questOptions?.[0]?.qpNavigateShow)
  const [currentBlock, setCurrentBlock] = useState('');

  const [NonPlayerNameLanguage, setNonPlayerNameLanguage] = useState(gameInfo?.gameData?.gameNonPlayerName);
  const [NonPlayerNameLanguageId, setNonPlayerNameLanguageId] = useState(gameInfo?.gameData?.gameNonPlayingCharacterId);
 
  const [PlayerNameLanguage, setPlayerNameLanguage] = useState(profileData?.selectedplayer);
  // const [PlayerNameLanguage, setPlayerNameLanguage] = useState(learnerPlayList?.selectedplayer_charcter ? learnerPlayList?.selectedplayer_charcter : profileData?.selectedplayer);
 const [questWisePlayerScore, setQuestWisePlayerScore] = useState(null);
  useEffect(() => {
  if (gameInfo?.questOptions?.[0]) {
    setCurrentBlock(gameInfo.questOptions[0].qpNavigateShow);
  }
}, [gameInfo]);


useEffect(() => {
  if (!OptionSelectId || !gameInfo?.questOptions) return;

  const selected = gameInfo.questOptions.find((opt: any) => opt.qpOptionId === OptionSelectId);

  setCurrentBlock(selected?.qpNavigateShow ?? '');

  setLearnerPlayingDetails((prev: any) => ({
    ...prev,
    CurrentBlock: selected?.qpNavigateShow ?? '',
  
  }));
}, [OptionSelectId, gameInfo]);


useEffect(() => {

  // const playerselected=learnerPlayList?.selectedplayer_charcter  ?  profileData?.selectedplayer;
  const playerselected = learnerPlayList?.selectedplayer_charcter 
  ?? profileData?.selectedplayer;
 console.log("playerselected",playerselected)
  setPlayerNameLanguage(playerselected);
}, [profileData?.selectedplayer,learnerPlayList?.selectedplayer_charcter]);

  const [AudioOptions, SetAudioOptions] = useState({ qpOptionId: '' });
  console.log(AudioOptions,'AudioOptions')
  const [score, setScore] = useState(null);
  const [upComingBlockChoosen, setUpComingBlockChoosen] = useState<any>(null);
  const [motionEffect, setMotionEffect] = useState<any>(false);
  const [isZoomComplete, setIsZoomComplete] = useState(false);
  const [scoreChapter, setScoreChapter] = useState<any>();
 

  const [GlbPlayindDetails,SetGlbPlayingDetails] = useState<{
    audioduration :any;
    characteraction:string,
    whospeak:string,
    
  }>({
    audioduration :0,
    characteraction:'',
    whospeak:'',
   
  });

 
  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    setCurrentScreenId(InitialScreenId);
  }, [InitialScreenId]);

  useEffect(() => {
        const stopTimer = () => {
          if (timeRef.current !== null) {
            clearInterval(timeRef.current);
            timeRef.current = null;
          }
        };

    // Call the async cleanup function
    return () => {
      stopTimer();
      
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        totalTimeSpent: formatTime(seconds),
       
      }));
      

    };
  }, []);

  useEffect(() => {

   
      // UpdateLearnerData();

setLearnerPlayingDetails((prev: any) => ({
  ...prev,
  totalTimeSpent: formatTime(seconds),
 
}));


    
  }, [currentScreenId, profile, learnerPlayList?.Prevquestseq,learnerPlayList?.feedbackList]) 
useEffect(() => {

  if (learner_game_play_id && (![10, 1].includes(currentScreenId))) {
    UpdateLearnerData();

  }
}, [currentScreenId, profile,learnerPlayList?.questState, learnerPlayList?.Prevquestseq,learnerPlayList?.feedbackList,audioObj.Voicevolume,audioObj.BGMvolume]) 



  useEffect(() => {
    const tabAllowed = [10, 8, 14,  0, 6, 4];
    setLearnerPlayingDetails((prev: any) => ({
      ...prev,
      PlayerScore_Level: profile,
      questState: questState,
      feedbackList: feedbackList,
      screenIdSeq: !tabAllowed.includes(currentScreenId) ? [currentScreenId] : prev.screenIdSeq,
    }));

  }, [profile, questState, currentScreenId, feedbackList])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' || document.hasFocus()) {
        if (voiceRef.current && !voiceRef.current?.ended && !voiceRef.current?.paused) {
          voiceRef.current.pause();
          
        }
        if (backgroundBgmRef.current && !backgroundBgmRef.current?.ended && !backgroundBgmRef.current?.paused) {
          backgroundBgmRef.current.pause();
        
        }
      }

      else if (document.visibilityState === 'visible') {
        if (currentScreenId) {
          if (voiceRef.current && voiceRef.current?.paused && !voiceRef.current?.ended && currentScreenId === 2 && voiceRef.current?.src !== '' && voiceRef.current?.src !== null && voiceRef.current?.src !== undefined ) {
            try {
              voiceRef.current.play().catch((error) => {
              
              });
            } catch (error) {
              console.error('Background BGM ref is not available.', error);
            }
          }
          if (backgroundBgmRef?.current && backgroundBgmRef?.current?.paused && ![2, , 6, 4].includes(currentScreenId) && backgroundBgmRef.current?.src !== '' && backgroundBgmRef.current?.src !== null && backgroundBgmRef.current?.src !== undefined) {
            try {
              backgroundBgmRef.current?.play().catch((error) => {
               
              });
            } catch (error) {
              console.error('Background BGM ref is not available.', error);
            }
          }
        }
        else if (backgroundBgmRef.current && !backgroundBgmRef.current?.ended && !backgroundBgmRef.current?.paused && currentScreenId !== 2) {
          backgroundBgmRef.current.pause();
           
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if ([2, 10,6,4].includes(currentScreenId) && backgroundBgmRef.current && !backgroundBgmRef.current?.ended && !backgroundBgmRef.current?.paused) {
      backgroundBgmRef.current.pause();
      
    }
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentScreenId]);
  const UpdateLearnerData = async () => {
    const data =
    {
      learnerPlayList: learnerPlayList,
    }
    const dataString = JSON.stringify(data);
    const UpdateLearnerDetails = await updateLearnerDetails(dataString);
    setAudioObj((prev) => ({
      ...prev,
      Voicevolume: learnerPlayList?.audioVolumeValue?.voiceVolume ?? 0.5,
      BGMvolume: learnerPlayList?.audioVolumeValue?.bgmVolume ?? 0.5,
    }));
  }
  useEffect(() => {
    setProfileData((prev: any) => ({ ...prev, score: scoreComp }));
  }, [scoreComp]);

  useEffect(() => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
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
    const TodayTotalScore = Object.entries(getFinalscores).reduce((tot: number, acc: any) => {
      tot += acc[1];
      return tot;
    }, 0);
    setPlayerTodayScore(TodayTotalScore);
  }, [profile?.score]);



  useEffect(() => {
    if (profile?.language) {
      setProfileData((prev: any) => ({ ...prev, language: profile.language }));
    }
  }, [profile?.language]);
  useEffect(() => {
    const fetchGameContent = async () => {
      const languageId = learnerPlayList?.LearnerProfile?.language;
      if (learnerPlayList?.LearnerProfile?.language) {
        setProfileData((prev: any) => ({
          ...prev,
          language: learnerPlayList?.LearnerProfile?.language,
        }));
      }
      const gameContentResult = await getContentRelatedLanguage(
        gameInfo?.gameData.gameId,
        languageId,
      );
      if (gameContentResult?.status === 'Success') {
        const data = gameContentResult.data;
        setProfileData((prev: any) => ({
          ...prev,
          Audiogetlanguage: data.map((x: any) => ({
            content: x.content,
            audioUrls: x.audioUrls,
            textId: x.textId,
            fieldName: x.fieldName,
          })),
        }));
      }
    };
    if (profileData.language !== '') {
      fetchGameContent();
    }
  }, [profileData?.language]);
  useEffect(() => {
    setDemoBlocks(gameInfo?.blocks);
    if (data === null && profile.currentQuest) {
      setType(gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen);
      setData(gameInfo?.blocks[profile?.currentQuest]['1']);
      if (
        gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen ===
        'Interaction'
      ) {
        const optionsFiltered = [];
        const primarySequence =
          gameInfo.blocks[profile.currentQuest]['1'].blockPrimarySequence;

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
    }
  }, [profile?.currentQuest]);
  const calculatePlayerGrandTotal = async () => {
    const questScores: any = {};
    const scoreArray =  questState[parseInt(profile?.currentQuest)] == 'Started'
      ? profile?.score
      : profile?.replayScore;
      if (scoreArray?.length > 0) {
        scoreArray.forEach((score: any) => {
          if (questScores[score.quest]) {
            questScores[score.quest] += score.score;
          } else {
            questScores[score.quest] = score.score;
          }
        });
        setProfile((prev: any) => ({
          ...prev,
          playerGrandTotal: {
            ...prev?.playerGrandTotal,
            questScores,
          },
        }));
      }
    return;
  };
  useEffect(()=>{
    
  },[profile?.playerGrandTotal])
  useEffect(() => {
    const calculateQuestGrandTotal = async () => {
      let GrandMaximumscore: any = null;
      if (options) {
        let currentScores;
        const questStatus = questState[profile?.currentQuest];
        if (questStatus === 'completed') {
          if (profile?.score !== null) {
            currentScores = profile.score;
          } else {
            console.warn('*****Invalid score or replayScore provided for completed quest.');
            return;
          }
        } else if (questStatus === 'Started') {
          if (questStatus === 'Started') {
            currentScores = profile?.score !== null || profile.score !== undefined ? profile.score : null; 
          } else {
            console.warn('*****Invalid score provided for started quest.');
            return;
          }
        }
        const currentQuestseqId = Array.isArray(currentScores)
          ? currentScores.map((item) => item.seqId)
          : [];
        if (Array.isArray(currentScores) && currentScores.length > 0) {
          const result = currentQuestseqId.map((seqId) => {
            const QuestNo = seqId.split('.')[0];
            if (QuestNo == profile.currentQuest) {
              const filteredOptions = gameInfo?.questOptions?.filter(
                (option: any) => option.qpSequence == seqId,
              );

              const qpScoresOption = filteredOptions.map((option: any) =>
                parseInt(option.qpScore),
              );
              qpScoresOption.sort((a: any, b: any) => b - a);
              GrandMaximumscore += qpScoresOption[0];
            }
          });
        } else {
          console.warn('*****Options are not provided.');
        }
        return GrandMaximumscore;
      }
    };
    calculateQuestGrandTotal();
    if(currentScreenId===2)
      {
        calculatePlayerGrandTotal();
      }
  }, [profile?.score,profile?.replayScore, currentScreenId]);
  useEffect(() => {
    if (!gameInfo?.gameData?.gameIntroMusicName && !gameInfo?.gameData?.gameIntroMusic) {
      // fetchDefaultBgMusic();
    } else if (gameInfo?.gameData?.gameIntroMusicName && gameInfo?.gameData?.gameIntroMusic) {
      const screens = [1,12, 13];
      if (
        screens.includes(currentScreenId) &&
        ![2, 3, 4, 5, 6, 7, 0,  14].includes(currentScreenId)
      ) {
        setAudioObj((prev) => ({
          ...prev,
          url: gameInfo?.gameData?.gameIntroMusicName,
          type: EnumType.BGM,
          loop: false,
          autoplay: true,
        }));
      }
    }
  }, [gameInfo]);

  useEffect(() => {

    if (audio !== '') {
      if (![2, 3, 4, 5, 6, 7, 0, 14].includes(currentScreenId)) {
        setAudioObj((prev) => ({
          ...prev,
          url: audio,
          type: EnumType.BGM,
          loop: false, 
          autoplay: true,
        }));
      }
    }
  }, [audio]);
  const prevTypeRef = useRef<string>();
//   useEffect(() => {
//     if (voiceRef.current) {
//       voiceRef.current.pause();
    

//     }
//     const handleAudio = (

//       audioRef: React.RefObject<HTMLAudioElement>,
//       audio: any,
//     ) => {
//       console.log("type---audioObj",audioObj)
//       if (audioRef.current) {
// const currentSrc = audioRef.current.src;
//     const isSameSrc = (() => {
//       try {
//         return new URL(currentSrc).href === new URL(audio.url).href;
//       } catch {
//         return currentSrc === audio.url;
//       }
//     })();

//     if (!isSameSrc) {
//       audioRef.current.src = audio.url;
//     }
//         if ([2, 15, 14].includes(currentScreenId)  && document.visibilityState === 'visible') {
       

//           audioRef.current.volume = parseFloat(audio.Voicevolume);

//         }
//         else {
//           audioRef.current.volume = parseFloat(audio.BGMvolume);
//         }
//         audioRef.current.loop = audio.loop;
//         audioRef.current.autoplay = audio.autoplay;
//         if (audioObj.autoplay) {
//           if (audioObj.type === EnumType.BGM && backgroundBgmRef.current && (![2, 3, 4, 5, 6, 7, 10, 0, 14].includes(currentScreenId))
//           ) {
//             try {
//               backgroundBgmRef.current?.play().catch((error) => {
                 
//               });
//             } catch (error) {
//               console.error('Background BGM ref is not available.', error);
//             }
//           } else if (audioObj.type === EnumType.VOICE && voiceRef.current &&
//             document.visibilityState === 'visible' &&  (![ 3, 4, 5, 6, 7, 10, 0, 14].includes(currentScreenId))) {
//             try {
//               voiceRef?.current?.play().catch((error) => {
                
//                 console.error('Error playing voice:', error);
//               });
//             } catch (error) {
//               console.error('Error playing voice:', error);
//             }
//           }
//         } 
//         else {
//           if (audioObj.type === EnumType.BGM && backgroundBgmRef.current) {
//             if (!backgroundBgmRef?.current?.paused) {
//               backgroundBgmRef?.current?.pause();
              
//             }
//           } else if (audioObj.type === EnumType.VOICE && voiceRef.current) {
//             if (!voiceRef?.current?.paused) {
//               voiceRef?.current?.pause();
              
//             }
//           }
//         }
//       }
//     };

//     if (audioObj.type === EnumType.BGM && document.visibilityState === 'visible') {
//       handleAudio(backgroundBgmRef, audioObj);
//     } else if (audioObj.type === EnumType.VOICE && document.visibilityState === 'visible') {
//       handleAudio(voiceRef, audioObj);
//     }
//   }, [audioObj, document.visibilityState]);
useEffect(() => {
  const handleAudio = (audioRef: React.RefObject<HTMLAudioElement>, audio: any) => {
    if (!audioRef.current) return;

    // Only update source if it's different
    const currentSrc = audioRef.current.src;
    const isSameSrc = (() => {
      try {
        return new URL(currentSrc).href === new URL(audio.url).href;
      } catch {
        return currentSrc === audio.url;
      }
    })();

    if (!isSameSrc) {
      audioRef.current.src = audio.url;
    }

    // Update volume without stopping playback
    audioRef.current.volume = parseFloat(
      [2, 15, 14].includes(currentScreenId) && document.visibilityState === 'visible'
        ? audio.Voicevolume
        : audio.BGMvolume
    );

    // Handle play/pause only if the autoplay flag changed
    if (audio.autoplay) {
      if (audio.type === EnumType.BGM && backgroundBgmRef.current) {
        if (audioRef.current.paused && ![2, 3, 4, 5, 6, 7, 0, 14].includes(currentScreenId)) {
          audioRef.current.play().catch(console.error);
        }
      } else if (audio.type === EnumType.VOICE && voiceRef.current) {
        if (audioRef.current.paused && document.visibilityState === 'visible' && 
            ![3, 4, 5, 6, 7, 0].includes(currentScreenId)) {
          audioRef.current.play().catch(console.error);
        }
      }
    } else {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  };

  // Only pause if we're changing audio type (not just volume)
  if (audioObj.type === EnumType.BGM && prevTypeRef.current === EnumType.VOICE) {
    voiceRef.current?.pause();
  } else if (audioObj.type === EnumType.VOICE && prevTypeRef.current === EnumType.BGM) {
    backgroundBgmRef.current?.pause();
  }

  if (document.visibilityState === 'visible') {
    if (audioObj.type === EnumType.BGM) {
      handleAudio(backgroundBgmRef, audioObj);
    } else if (audioObj.type === EnumType.VOICE) {
      handleAudio(voiceRef, audioObj);
    }
  }

  prevTypeRef.current = audioObj.type;
}, [audioObj, document.visibilityState]);

const handleMusicVolume = (sliderValue: number, type: string) => {
  if (!isNaN(sliderValue) && isFinite(sliderValue)) {
    const newVolume = sliderValue / 100;
    
    // Update the ref immediately for responsive feedback
    if (type === EnumType.BGM && backgroundBgmRef.current) {
      backgroundBgmRef.current.volume = newVolume;
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
    } else if (voiceRef.current) {
      voiceRef.current.volume = newVolume;
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
   
    
    // Update state for persistence
    setAudioObj(prev => ({
      ...prev,
      [type === EnumType.BGM ? EnumType.BGM : EnumType.VOICE]: newVolume.toString()
    }));
  }
};
 
// const audioCtxRef = useRef<AudioContext | null>(null);
// const gainNodeRef = useRef<GainNode | null>(null);
// const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

// const initAudioContext = () => {
//   if (!audioCtxRef.current) {
//     audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
//   }
//   if (backgroundBgmRef.current && !sourceRef.current) {
//     sourceRef.current = audioCtxRef.current.createMediaElementSource(backgroundBgmRef.current);
//     gainNodeRef.current = audioCtxRef.current.createGain();
//     sourceRef.current.connect(gainNodeRef.current).connect(audioCtxRef.current.destination);
//   }
// };

// const handleMusicVolume = (sliderValue: number, type: string) => {
//   if (!isNaN(sliderValue) && isFinite(sliderValue)) {
//     const newVolume = sliderValue / 100;
//     initAudioContext();
//     if (type === EnumType.BGM && gainNodeRef.current) {
//       gainNodeRef.current.gain.value = newVolume; // 🎵 works on iOS
//     }
//   }
// };
// Refs for Web Audio API


// const audioCtxRef = useRef<AudioContext | null>(null);
// const bgmGainRef = useRef<GainNode | null>(null);
// const voiceGainRef = useRef<GainNode | null>(null);
// const bgmSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
// const voiceSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

// const initAudioContext = () => {
//   if (!audioCtxRef.current) {
//     audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
//   }

//   if (backgroundBgmRef.current && !bgmSourceRef.current) {
//     bgmSourceRef.current = audioCtxRef.current.createMediaElementSource(backgroundBgmRef.current);
//     bgmGainRef.current = audioCtxRef.current.createGain();
//     bgmSourceRef.current.connect(bgmGainRef.current).connect(audioCtxRef.current.destination);
//   }

//   if (voiceRef.current && !voiceSourceRef.current) {
//     voiceSourceRef.current = audioCtxRef.current.createMediaElementSource(voiceRef.current);
//     voiceGainRef.current = audioCtxRef.current.createGain();
//     voiceSourceRef.current.connect(voiceGainRef.current).connect(audioCtxRef.current.destination);
//   }
// };

// const handleMusicVolume = (sliderValue: number, type: string) => {
//   if (!isNaN(sliderValue) && isFinite(sliderValue)) {
//     const newVolume = sliderValue / 100;

//     // ✅ Initialize context only after user interaction
//     initAudioContext();

//     // Update the ref immediately for responsive feedback
//     if (type === EnumType.BGM && backgroundBgmRef.current) {
//       // Normal volume assignment (works on Android/Windows)
//       backgroundBgmRef.current.volume = newVolume;

//       // iOS fix with Web Audio API
//       if (bgmGainRef.current) {
//         bgmGainRef.current.gain.value = newVolume;
//       }

//       setLearnerPlayingDetails((prev: any) => ({
//         ...prev,
//         audioVolumeValue: {
//           bgmVolume: type === EnumType.BGM ? newVolume.toString() : learnerPlayList.audioVolumeValue.bgmVolume,
//           voiceVolume: type === EnumType.VOICE ? newVolume.toString() : learnerPlayList.audioVolumeValue.voiceVolume,
//         },
//       }));
//       setAudioObj((prev: any) => ({
//         ...prev,
//         type: type === EnumType.BGM ? EnumType.BGM : EnumType.VOICE,
//         Voicevolume:
//           type === EnumType.VOICE
//             ? newVolume.toString()
//             : learnerPlayList?.audioVolumeValue?.voiceVolume
//             ? learnerPlayList?.audioVolumeValue?.voiceVolume
//             : 0.5,
//         BGMvolume:
//           type === EnumType.BGM
//             ? newVolume.toString()
//             : learnerPlayList?.audioVolumeValue?.bgmVolume
//             ? learnerPlayList?.audioVolumeValue?.bgmVolume
//             : 0.5,
//       }));
//     } else if (voiceRef.current) {
//       // Normal volume assignment
//       voiceRef.current.volume = newVolume;

//       // iOS fix with Web Audio API
//       if (voiceGainRef.current) {
//         voiceGainRef.current.gain.value = newVolume;
//       }

//       setLearnerPlayingDetails((prev: any) => ({
//         ...prev,
//         audioVolumeValue: {
//           bgmVolume: type === EnumType.BGM ? newVolume.toString() : learnerPlayList.audioVolumeValue.bgmVolume,
//           voiceVolume: type === EnumType.VOICE ? newVolume.toString() : learnerPlayList.audioVolumeValue.voiceVolume,
//         },
//       }));
//       setAudioObj((prev: any) => ({
//         ...prev,
//         type: type === EnumType.BGM ? EnumType.BGM : EnumType.VOICE,
//         Voicevolume:
//           type === EnumType.VOICE
//             ? newVolume.toString()
//             : learnerPlayList?.audioVolumeValue?.voiceVolume
//             ? learnerPlayList?.audioVolumeValue?.voiceVolume
//             : 0.5,
//         BGMvolume:
//           type === EnumType.BGM
//             ? newVolume.toString()
//             : learnerPlayList?.audioVolumeValue?.bgmVolume
//             ? learnerPlayList?.audioVolumeValue?.bgmVolume
//             : 0.5,
//       }));
//     }

//     // Update state for persistence
//     setAudioObj((prev) => ({
//       ...prev,
//       [type === EnumType.BGM ? EnumType.BGM : EnumType.VOICE]: newVolume.toString(),
//     }));
//   }
// };

useEffect(() => {
    if (gameInfo) {
      setVoiceIds({
        narrator:
          gameInfo?.gameData?.gameNarratorVoice ?? 'D38z5RcWu1voky8WS1ja',
        playerMale:
          gameInfo?.gameData?.gamePlayerMaleVoice ?? '2EiwWnXFnvU5JabPnv8n',
        playerFemale:
          gameInfo?.gameData?.gamePlayerFemaleVoice ?? '21m00Tcm4TlvDq8ikWAM',
        NPC: gameInfo?.gameData?.gameNonPlayerVoice ?? '5Q0t7uMcjvnagumLfvZi',
        Intro: '',
      });

    }
  }, [gameInfo?.gameData]);
  useEffect(() => {
    if (![2, 3, 4, 5, 6, 7, 0, 14].includes(currentScreenId)) {
      if (!gameInfo?.gameData?.gameIntroMusicName && !gameInfo?.gameData?.gameIntroMusic) {
        setAudio('');
        setAudioObj((prev) => ({
          ...prev,
          url: '',
          type: EnumType.BGM,
          loop: false, 
          autoplay: true,
        }));
      }
      else {
        if (gameInfo?.gameData?.gameIntroMusicName && gameInfo?.gameData?.gameIntroMusic) {
          setAudio(gameInfo?.gameData?.gameIntroMusicName)
        }
      }
    }

  }, [currentScreenId, gameInfo]);



const LastModiPrevData = async(current: any = null) => {
     let NextSeqBlock: any;
     console.log('profile test=>',profile)
    setSelectedOption(null); 
        setRepeatPrevOption([]);
        setRepeatSelectOption(false);
     
    
    if (type !== 'Interaction') {
      
      if (type === 'response' && resMsg !== '') {
        setType(current?.blockChoosen);
        setData(current);
        if (current?.blockChoosen === 'Interaction') {
          const optionsFiltered = [];
           setType(current?.blockChoosen);
          for (const option of gameInfo.questOptions) {
            if (profileData?.Audiogetlanguage.length > 0) {
              if (option?.qpSequence === current?.blockPrimarySequence) {
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
              if (option?.qpSequence === current?.blockPrimarySequence) {
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
          
          return false;
        }
        return false;
      }
      if (type === 'feedback' && feed !== '' && resMsg !== '') {
        setType('response');
        setData(current);
        const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === OptionSelectId,
        );
        if (optionAudioFiltered.length > 0) {
          const responseAudioFiltered = optionAudioFiltered.filter(
            (key: any) => key?.fieldName === 'qpResponse',
          );
          const FilteredResponsecontent = responseAudioFiltered[0].content;
          setResMsg(FilteredResponsecontent);
        }
        else {
          setResMsg(resMsg);
        }
        return false;
      }
      if (type === 'feedback' && feed !== '' && resMsg === '') {
        setType(current?.blockChoosen);
        setData(current);
        if (current?.blockChoosen === 'Interaction') {
  
  
          const optionsFiltered = [];
          for (const option of gameInfo.questOptions) {
            if (profileData?.Audiogetlanguage.length > 0) {
              if (option?.qpSequence === current?.blockPrimarySequence) {
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
              if (option?.qpSequence === current?.blockPrimarySequence) {
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
          return false;
        }
        return false;
      }
    }
    // else
    // {
    //       // handlePreviousBlock(current?.blockSecondaryId, current?.blockQuestNo,NextSeqBlock);

    // }
      let total = 0;
      let updatedscore:any = [];
      if (questState[parseInt(profile?.currentQuest)] === 'Started') {
        // Remove matching object from profile?.score
        updatedscore = profile?.score;
    
      }
      else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
        // Remove matching object from profile?.replayScore
        updatedscore = profile?.replayScore;
      }
      else{
        updatedscore = profile?.score;
      }
      const scoreArray = updatedscore;
      if (scoreArray?.length > 0) {
        total = scoreArray?.reduce((acc: number, cur: any) => {
          if (cur.quest === parseInt(current?.blockQuestNo)) {
            return acc + cur.score;
          } else {
            return acc;
          }
        }, 0);
      }
      const conditionTypes = ['Interaction', 'response', 'feedback']
      const data = {
        blockname: type,
        galAverageScore: total,
        galBlockId: current?.blockSecondaryId,
        gameId: learner_game_play_id,
        galTimeSpent: formatTime(seconds),
        navigateId: (!conditionTypes.includes(type)) ? current?.blockShowNavigate : navi
      }
      const actId1 = Activitydata;
      const datas = JSON.stringify(data)
      const result = await activityUpdate(datas, actId1);
     
      if (result.status !== 'Success') {
        return false;
      }
      const valuesArray = demoBlocks && demoBlocks[current?.blockQuestNo] ? Object.values(demoBlocks[current?.blockQuestNo]) : null;
      const currentIndex = valuesArray ? valuesArray?.findIndex((item: any) => item.blockPrimarySequence === current?.blockPrimarySequence) : 0;
     
      if (currentIndex > 0) {
        NextSeqBlock = valuesArray[currentIndex - 1];
      } else {
        NextSeqBlock = null; 
      }
    handlePreviousBlock(current?.blockSecondaryId, current?.blockQuestNo,NextSeqBlock);
  }



  const setInteractionOptions = (gameInfo: any, currentBlock: any) => {
    const optionsFiltered = [];
    for (const option of gameInfo.questOptions) {
      if (profileData?.Audiogetlanguage.length > 0) {
        if (option?.qpSequence === currentBlock?.blockPrimarySequence) {
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
        if (option?.qpSequence === currentBlock?.blockPrimarySequence) {
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
      setOptions(optionsFiltered);
    }
  };
  const BlockSeqNextPreviousNotes = async (inputId?: any, questNo?: any,) => {
   
    if (inputId !== null) {
      const currentQuest = questNo;
      const founditem: any = Object.values(demoBlocks[questNo])?.filter((item: any) => item?.blockSecondaryId === inputId);
      const foundNavi = profile?.score?.filter((item:any) => item.seqId == founditem[0]?.blockPrimarySequence);
      const getOption = foundNavi[0]?.choosedoption ?? null;
      if(getOption)
      {
        const optionsFiltered = [];
  
        for (const option of gameInfo?.questOptions) {
            if ( option?.qpSequence === founditem[0]?.blockPrimarySequence ) {
              optionsFiltered.push(option);
            }
        }
        if(optionsFiltered)
        {
           const getFilterOption = optionsFiltered.filter((item:any)=>item?.qpOptions === getOption);
           if(getFilterOption)
           {
            if(getFilterOption[0]?.qpNextOption === 'Repeat Question')
            {
              setFeed('');
              setRepeatSelectOption(true);
              RepeatPrevOption.push(getOption);
              setRepeatPrevOption(RepeatPrevOption);
            }
           }
        }
       
      }
      if (learnerPlayList?.Prevquestseq) {
        if (learnerPlayList?.Prevquestseq[currentQuest]) {
          if (
            !learnerPlayList?.Prevquestseq[currentQuest].includes(
              founditem[0]?.blockPrimarySequence,
            )
          ) {
            setLearnerPlayingDetails((prev: any) => ({
              ...prev,
              Prevquestseq: {
                ...prev.Prevquestseq,
                [currentQuest]: [
                  ...(prev.Prevquestseq[currentQuest] || []),
                  founditem[0]?.blockPrimarySequence,
                ],
              },
            }));
          }
        } else {
          setLearnerPlayingDetails((prev: any) => ({
            ...prev,
            Prevquestseq: {
              ...prev.Prevquestseq,
              [currentQuest]: [founditem[0]?.blockPrimarySequence],
            },
          }));
        }
      }
      else {
        setLearnerPlayingDetails((prev: any) => ({
          ...prev,
          Prevquestseq: {
            [currentQuest]: [founditem[0]?.blockPrimarySequence],
          },
        }));
      }
      const existsInPrevBlock = prevBlock && prevBlock.some((block: any) => block === founditem[0]?.blockPrimarySequence);
      if (!existsInPrevBlock) {
        setprevBlock((prev: any) => [...prev, founditem[0]?.blockPrimarySequence]);
      }
    }
  }

  const handlePreviousBlock = async (inputid?: any, questNo?: any,PrevNaviSeqBlock?:any) => {

    const founditem: any = Object.keys(demoBlocks[questNo]).filter((item: any) => {
      return (
        demoBlocks[questNo][item]?.blockSecondaryId === parseInt(inputid)
      );
    }).map((item: any) => {
      return demoBlocks[questNo][item];
    });
    const lastSeq = learnerPlayList?.Prevquestseq[questNo];
    const secondLastSeq = lastSeq ? lastSeq[lastSeq.length - 2] : null;
    if(learnerPlayList?.Prevquestseq[questNo])
    {
      let updateNavigateSeq: any = [...learnerPlayList?.Prevquestseq[questNo]];
      updateNavigateSeq.pop();
      if (secondLastSeq != updateNavigateSeq[updateNavigateSeq.length - 1]) {
        updateNavigateSeq.push(founditem[0]?.blockPrimarySequence);
      }
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        Prevquestseq: { ...prev.Prevquestseq, [questNo]: updateNavigateSeq }
      }));
    }
    let prev = prevBlock[prevBlock?.length - 1];
   
    let getBlocks:any;
    if(prev)
    {
       getBlocks = Object.values(demoBlocks[questNo]).filter((item: any) => item?.blockPrimarySequence === prev);
      prevBlock.pop();
    }
    else{
      getBlocks = Object.values(demoBlocks[questNo]).filter((item: any) => item?.blockPrimarySequence === PrevNaviSeqBlock?.blockPrimarySequence);
    }

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
   
  }
 
  const storage = JSON.parse(localStorage.getItem('user'));
  
  useEffect(()=>{
    const fetchgetTimespent = async ()=>{
      try {
        let datatoSend={
          gameid:learner_game_play_id,
          learnerId:storage?.data?.id
        }
         const response = await getTimespent(JSON.stringify(datatoSend));
        
        // setTotalTimeSpended(response?.data); 
      } catch (error) {
        console.error("Error fetching totalTimeSpent:", error);
        // setTotalTimeSpent("0:00"); 
    
      }
    
    }
    fetchgetTimespent();
    },[])



  // const CompletionScreenFunction = (next?: any) => {
  //   const { currentGameData, nextLevel } = calScore();
  //   if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
  //     setCurrentScreenId(4); //Navigate to leaderboard
  //     return false;
  //   }
  //   else {
  //     checkAndUpdateScores();
  //     (async () => {
  //       const finalscore = await getPlayerFinalScore(profile?.score, currentGameData);
  //       const isMandatoryReplayPromptRequired = await checkIsMandatoryReplayPromptRequired(Number(finalscore), currentGameData);
  //       const isOptionalReplayAllowed = await isOptionalReplayAllow(Number(finalscore), currentGameData, gameInfo.gameData?.gameDisableOptionalReplays);
  //       if (feedbackList?.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
  //         if (demoBlocks.hasOwnProperty(nextLevel)) {
  //           setProfile((prev: any) => {
  //             const data = { ...prev };
  //             if (!profile.completedLevels.includes(String(nextLevel))) {
  //               data.completedLevels = [...data.completedLevels, String(nextLevel)];
  //             }
  //             return data;
  //           });
  //         }
  //         if (feedbackList?.length !== 0 && feedbackList?.find((item: any) => item?.quest == profile?.currentQuest)) {
  //           getFeedbackData(next);
  //           setFeedbackNavigateNext(false);
  //           setCurrentScreenId(14);
  //           return false;
  //         }
  //         else {
  //           if (demoBlocks.hasOwnProperty(nextLevel)) {
  //             setProfile((prev: any) => {
  //               const data = { ...prev };
  //               if (!profile.completedLevels.includes(String(nextLevel))) {
  //                 data.completedLevels = [...data.completedLevels, String(nextLevel)];
  //               }
  //               return data;
  //             });

  //             setType(demoBlocks[nextLevel]['1']?.blockChoosen);
  //             setData(demoBlocks[nextLevel]['1']);
  //             setMotionEffect(true);
  //             setCurrentScreenId(13);
  //             return false;
  //           }

  //           else {
  //             if (gameInfo.gameData?.gameIsShowReflectionScreen === 'true') {
  //               setCurrentScreenId(3); //Navigate to Reflection screen
  //               return false;
  //             } else if (gameInfo.gameData?.gameIsShowTakeaway === 'true') {
  //               setCurrentScreenId(7); //Navigate to takeaway screen
  //               return false;
  //             } else {
  //               setType(null);
  //               setData(null);
  //               setCurrentScreenId(5);
  //               return false;
  //             }
  //           }
  //         }
  //       }
  //       else if (isMandatoryReplayPromptRequired) {
  //         Setprofilescore(finalscore);
  //         setReplayState('mandatoryReplay');
  //         setReplayIsOpen(true);
  //       }
  //       else if (isOptionalReplayAllowed) {
  //         setReplayState('optionalReplay');
  //         setReplayIsOpen(true);
  //         return;
  //       }
  //       else if (demoBlocks.hasOwnProperty(nextLevel)) {
  //         setProfile((prev: any) => {
  //           const data = { ...prev };
  //           if (!profile.completedLevels.includes(String(nextLevel))) {
  //             data.completedLevels = [...data.completedLevels, String(nextLevel)];
  //           }
  //           return data;
  //         });
  //         setType(demoBlocks[nextLevel]['1']?.blockChoosen);
  //         setData(demoBlocks[nextLevel]['1']);
  //         setMotionEffect(true);
  //         setCurrentScreenId(13);
  //         return false;
  //       }
  //       else if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
  //         setCurrentScreenId(3); //reflection screen
  //         return false;
  //       }
  //       else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
  //         setCurrentScreenId(7); //takeaway
  //         return false;
  //       }
  //       else if (isMandatoryReplayPromptRequired) {
  //         Setprofilescore(finalscore);
  //         setReplayState('mandatoryReplay');
  //         setReplayIsOpen(true);
  //         return false;
  //       }
  //       else {

  //         setType(null);
  //         setData(null);
  //         setCurrentScreenId(5); //thank you screen
  //         return false;
  //       }
  //     })();
  //   }
  // }
  const [isInteractionButtonDisabled, setIsInteractionButtonDisabled] = useState(false); 
  const handleInteractionBackClick = (data: any) => {
  if (isInteractionButtonDisabled) return;
  setIsInteractionButtonDisabled(true);

  const valuesArray =
    demoBlocks && demoBlocks[data?.blockQuestNo]
      ? (Object.values(demoBlocks[data.blockQuestNo]) as any[])
      : [];

  const currentIndex = valuesArray.findIndex(
    (item: any) => item.blockPrimarySequence === data?.blockPrimarySequence
  );

  const currentBlock = valuesArray[currentIndex];
  const seqIdToClear = currentBlock?.blockPrimarySequence ?? null;

  if (seqIdToClear) {
    // ✅ Only clear if NO score saved yet
    const hasScore =
      profile?.score?.some((s: any) => s.seqId === seqIdToClear) ||
      profile?.replayScore?.some((s: any) => s.seqId === seqIdToClear);

    if (!hasScore) {
      setProfile((prev: any) => {
        const newScore = Array.isArray(prev.score)
          ? prev.score.filter((s: any) => s.seqId !== seqIdToClear)
          : prev.score;
        const newReplay = Array.isArray(prev.replayScore)
          ? prev.replayScore.filter((s: any) => s.seqId !== seqIdToClear)
          : prev.replayScore;
        return { ...prev, score: newScore, replayScore: newReplay };
      });

      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`clearedSeq_${seqIdToClear}`, "1");
        }
      } catch (e) {}
    }

    // ⚙️ Don’t reset everything globally — only local UI state
    if (typeof setScore === "function") setScore(null);
    if (typeof setSelectedOption === "function") setSelectedOption(null);
    if (typeof setRepeatPrevOption === "function") setRepeatPrevOption([]);
    if (typeof setRepeatSelectOption === "function") setRepeatSelectOption(false);

    console.log(
      hasScore
        ? `[Back] preserved block ${seqIdToClear} (has saved score)`
        : `[Back] cleared unsaved block ${seqIdToClear}`
    );
  }

  LastModiPrevData(data);
  setTimeout(() => setIsInteractionButtonDisabled(false), 2000);
};
   const CompletionScreenFunction = (next?: any) => {
    const { currentGameData, nextLevel } = calScore();
    if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
      setCurrentScreenId(4); //Navigate to leaderboard
      return false;
    }
    else {
      LeaderBoardFunc(next);
    }
  }

  const AfterCompletionFeedBackFunc = () => {
    const { currentGameData, nextLevel } = calScore();
    (async () => {
      const finalscore = await getPlayerFinalScore(profile?.score, currentGameData);

      const isMandatoryReplayPromptRequired = await checkIsMandatoryReplayPromptRequired(Number(finalscore), currentGameData);

      const isOptionalReplayAllowed = await isOptionalReplayAllow(Number(finalscore), currentGameData, gameInfo.gameData?.gameDisableOptionalReplays);
      if (isMandatoryReplayPromptRequired) {

        Setprofilescore(finalscore);
        setReplayState('mandatoryReplay');
        setReplayIsOpen(true);
        return;
      }
      else if (isOptionalReplayAllowed) {


        setReplayState('optionalReplay');
        setReplayIsOpen(true);
        return;
      }
      else if (demoBlocks.hasOwnProperty(nextLevel)) {
        setProfile((prev: any) => {
          const data = { ...prev };
          if (!profile.completedLevels.includes(String(nextLevel))) {
            data.completedLevels = [...data.completedLevels, String(nextLevel)];
          }
          return data;
        });

        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        setMotionEffect(true);
        setCurrentScreenId(13);
        return false;
      } else if (
        gameInfo?.gameData?.gameIsShowReflectionScreen === 'true'
      ) {
        setCurrentScreenId(3); //reflection screen
        return false;
      } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7); //takeaway
        return false;
      } else {

        setType(null);
        setData(null);
        setCurrentScreenId(5); //thank you screen
        return false;
      }
    })();
  }
  const ReplayGameFunc = () => {
    if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
      setCurrentScreenId(4);
      return false;
    } else if (gameInfo?.gameData?.gameIsShowReflectionScreen === 'true') {
      setCurrentScreenId(3);
      return false;
    } else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
      setCurrentScreenId(7);
      return false;
    } else {
      if (data && type) {
        setCurrentScreenId(2);
        return false;
      } else {
        setType(null);
        setData(null);
        setCurrentScreenId(5);
        return false;
      }
    }
  }
  const LeaderBoardFunc = (nextLevel?: any) => {
    checkAndUpdateScores();
    const Nextcurrentquest = profile?.currentQuest;
    const getgameinfoquest = gameInfo?.gameQuest.find(
      (row: any) => row.gameQuestNo == Nextcurrentquest,
    );
    (async () => {
      const finalscore = await getPlayerFinalScore(profile?.score, getgameinfoquest);
      const isMandatoryReplayPromptRequired = await checkIsMandatoryReplayPromptRequired(Number(finalscore), getgameinfoquest);
      const isOptionalReplayAllowed = await isOptionalReplayAllow(Number(finalscore), getgameinfoquest, gameInfo.gameData?.gameDisableOptionalReplays);
      if (gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
        if (feedbackList?.length !== 0 && feedbackList?.find((item: any) => item.quest == profile?.currentQuest)) {
          getFeedbackData(data);  
          // setFeedbackNavigateNext(false);
          // setCurrentScreenId(14);
          startTransition(() => {
            setFeedbackNavigateNext(false);
            setCurrentScreenId(14);  // <-- likely causing Suspense
          });
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(String(nextLevel))) {
                data.completedLevels = [...data.completedLevels, String(nextLevel)];
              }
              return data;
            });
          }
          return false;
        }
        else if (isMandatoryReplayPromptRequired) {
          Setprofilescore(finalscore);
          setReplayState('mandatoryReplay');
          setReplayIsOpen(true);
          return;
        }
        else if (isOptionalReplayAllowed) {
          setReplayState('optionalReplay');
          setReplayIsOpen(true);
          return;
        }
        else {
          if (demoBlocks.hasOwnProperty(nextLevel)) {
            setFeedbackNavigateNext(false);
            setProfile((prev: any) => {
              const data = { ...prev };
              if (!profile.completedLevels.includes(String(nextLevel))) {
                data.completedLevels = [...data.completedLevels, String(nextLevel)];
              }
              return data;
            });
            setType(demoBlocks[nextLevel]['1']?.blockChoosen);
            setData(demoBlocks[nextLevel]['1']);
            setMotionEffect(true);
            setCurrentScreenId(13);
            return false;
          }
          else if (
            gameInfo?.gameData?.gameIsShowReflectionScreen === 'true'
          ) {
            setCurrentScreenId(3);
            return false;
          }
          else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
            setCurrentScreenId(7);
            return false;
          }
          else {
            setType(null);
            setData(null);
            setCurrentScreenId(5);
            return false;
          }
        }
      }
      else if (isMandatoryReplayPromptRequired) {
        Setprofilescore(finalscore);
        setReplayState('mandatoryReplay');
        setReplayIsOpen(true);
        return;
      }
      else if (isOptionalReplayAllowed) {
        setReplayState('optionalReplay');
        setReplayIsOpen(true);
        return;
      }
      else if (demoBlocks.hasOwnProperty(nextLevel)) {
        setFeedbackNavigateNext(false);
        setProfile((prev: any) => {
          const data = { ...prev };
          if (!profile.completedLevels.includes(String(nextLevel))) {
            data.completedLevels = [...data.completedLevels, String(nextLevel)];
          }
          return data;
        });
        setType(demoBlocks[nextLevel]['1']?.blockChoosen);
        setData(demoBlocks[nextLevel]['1']);
        setMotionEffect(true);
        setCurrentScreenId(13);
        return false;
      }
      else if (
        gameInfo?.gameData?.gameIsShowReflectionScreen === 'true'
      ) {
        setCurrentScreenId(3);
        return false;
      }
      else if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      }
      else {
        setType(null);
        setData(null);
        setCurrentScreenId(5);
        return false;
      }
    })();
  }
  const calcQuestGrandTotal = async (
    scores: any,
    currentQuestNo: any = null,
  ) => {
    if (scores?.length <= 0) {
      return 0;
    }

    if (currentQuestNo != null) {
      // Sum score of a quest
      const totalScore = scores.reduce((total: number, sc: any) => {
        if (sc.quest == currentQuestNo) {
          return total + sc.score;
        } else {
          return total;
        }
      }, 0);
      return totalScore; // Return the total score
    } else {
      //Sum up all the scores
      return scores.reduce((total: number, sc: any) => total + sc.score, 0);
    }
  };

  const originalScore=async () =>
  {
    const currentQuest = profile.currentQuest;
    const scoreTotal = await calcQuestGrandTotal(
      profile.score,
      profile.currentQuest,
    );
    
    if (questState[profile?.currentQuest] === 'Started') {
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        firstTryScore: [...prev.firstTryScore, { quest: currentQuest, score: scoreTotal }],
      }));
    } 
    
  }
  const checkAndUpdateScores = async () => {
    const currentQuest = profile.currentQuest;
    // if (questState[currentQuest] !== 'Started') {
    const scoreTotal = await calcQuestGrandTotal(
      profile.score,
      profile.currentQuest,
    );
    
   
    
 
    const replayScoreTotal = await calcQuestGrandTotal(
      profile.replayScore,
      profile.currentQuest,
    );

    if (scoreTotal <= replayScoreTotal) {
      const currentQuestRemovedScoreArr = profile.score.filter(
        (item: any) => item.quest != profile.currentQuest,
      );
      let concatenatedScoreArr: any[] = [];
      if (profile.replayScore.length > 0) {
        concatenatedScoreArr = profile.replayScore.filter(
          (item: any) => item.quest == profile.currentQuest,
        );
      }
      if (currentQuestRemovedScoreArr.length > 0) {
        concatenatedScoreArr = [
          ...concatenatedScoreArr,
          ...currentQuestRemovedScoreArr,
        ];
      }
      const currentQuestRemovedReplayScoreArr = profile.replayScore.filter(
        (item: any) => item.quest != profile.currentQuest,
      );
// const getScore = concatenatedScoreArr.length > 0 ? concatenatedScoreArr : profile.score;
      setProfile((prev: any) => ({
        ...prev,
        score: concatenatedScoreArr,
        replayScore: currentQuestRemovedReplayScoreArr,
      }));
    } else {
      const currentQuestRemovedReplayScoreArr = profile.replayScore.filter(
        (item: any) => item.quest != profile.currentQuest,
      );
      setProfile((prev: any) => ({
        ...prev,
        replayScore: currentQuestRemovedReplayScoreArr,
      }));
    }
  };

//     const checkCompletionBadge = () => {
//   setProfile((prev: any) => {
//     const data = { ...prev };
//     console.log(data,'dataincompletebadge')
//     const completeBadgseShow = Array.isArray(data.completeBadgseShow) ? data.completeBadgseShow : [];

//     if (completeBadgseShow.length === 0) {
//       console.log('new')
//       data.completeBadgseShow = [String(data?.currentQuest)];
//     } else if (!completeBadgseShow.includes(String(data?.currentQuest))) {
//       data.completeBadgseShow = [...completeBadgseShow, String(data?.currentQuest)];
//     }

//   //     const profileContent = {
//   //   ...profile,
    
//   // };

//     return data ;
//     // && profileContent;
//   });
// };
console.log("profile in entire",profile)
 const checkCompletionBadge =()=>{
    setProfile((prev: any) => {
                const data = { ...prev };
                if (profile.completeBadgseShow.length === 0) {
                  data.completeBadgseShow = [String(profile?.currentQuest)];
                }
                else if (!profile.completeBadgseShow.includes(String(profile?.currentQuest))) {
                  data.completeBadgseShow = [...data.completeBadgseShow, String(profile?.currentQuest)];
                }
                return data;
              });
  }

  console.log('gameInfoinentire',gameInfo)
  const getData = async (next: any) => {
      console.log(data,'datainentriepreview')
      console.log(gameInfo,'gaminforinentorepreview')
  console.log(type,'typeinentirepreview')
 
    if (navi === '' || navi !== 'Repeat Question') {
      setRepeatPrevOption([]);
      setRepeatSelectOption(false);
    }
    setSelectedOption(null);
    if(currentScreenId === 2)
    {
      BlockSeqNextPreviousNotes(next?.blockSecondaryId, next?.blockQuestNo);
    }
    if (next?.blockChoosen === 'Interaction' && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
      const isDuplicate = feedbackList?.some(
        (item: any) =>
          item.Seq === next?.blockPrimarySequence &&
          item.Options === getSelectedOptions,
      );

      if (!isDuplicate) {
        if (feed !== '') {
          setFeedbackList((prevFeedbackList) => [
            ...prevFeedbackList,
            {
              quest: next?.blockQuestNo,
              feedbackcontent: feed,
              type: navi,
              Seq: next?.blockPrimarySequence,
              Options: getSelectedOptions,
              totalPoints: playerTodayScore,
            },
          ]);
        }
      }
    }
    const currentBlock = next
      ? parseInt(next?.blockPrimarySequence.split('.')[1])
      : null;
    const quest = next ? next?.blockPrimarySequence.split('.')[0] : null;
    const valuesArray = demoBlocks && demoBlocks[quest] ? Object.values(demoBlocks[quest]) : null;
    const currentIndex = valuesArray ? valuesArray?.findIndex((item: any) => item.blockPrimarySequence === next?.blockPrimarySequence) : 0;
    let NextSeqBlock: any;
    if (currentIndex > 0) {
      NextSeqBlock = valuesArray[currentIndex + 1];
    } else {
      NextSeqBlock = null; 
    }
    const NextItem = NextSeqBlock != null ? parseInt(NextSeqBlock?.blockPrimarySequence.split('.')[1]) : null;
    const nextSeq = next
      ? `${next?.blockPrimarySequence.split('.')[0]}.${NextItem}`
      : '';
    const currentQuest = next
      ? parseInt(next?.blockPrimarySequence.split('.')[0])
      : null;
    setCurrentQuestNo(currentQuest);
    const nextLevel = parseInt(profile?.currentQuest) + 1 || null;
    const nextBlock = next
      ? Object.keys(demoBlocks[quest] || {})
        .filter(
          (key) => demoBlocks[quest]?.[key]?.blockPrimarySequence === nextSeq,
        )
        .map((key: any) => demoBlocks[quest]?.[key])
      : [];
       console.log('profile test getData=>',profile,',option =>',selectedOption);
    if (currentScreenId === 2) {
      let getscoreseq:any = [];
      let updatedscore:any = [];
      if (questState[parseInt(profile?.currentQuest)] === 'Started') {
        // Remove matching object from profile?.score
        getscoreseq = profile?.score?.find((item: any) => item?.seqId == next?.blockPrimarySequence);
        updatedscore = profile?.score;

      }
      else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
        // Remove matching object from profile?.replayScore
        getscoreseq = profile?.replayScore?.find((item: any) => item?.seqId == next?.blockPrimarySequence);
        updatedscore = profile?.replayScore;
   
        
      }
      else{
        getscoreseq = profile?.score?.find((item: any) => item?.seqId == next?.blockPrimarySequence);
        updatedscore = profile?.score;
   

      }
      const foundOption = getscoreseq;
    
 const foundOnlyOption = getscoreseq?.choosedoption;
      let total = 0;
      const scoreArray = updatedscore;
      if (scoreArray?.length > 0) {
        total = scoreArray?.reduce((acc: number, cur: any) => {
          if (cur.quest === parseInt(quest)) {
            return acc + cur.score;
          } else {
            return acc;
          }
        }, 0);
      }
      const conditionTypes = ['Interaction', 'response', 'feedback']
      const data = {
        blockname: type,
        galAverageScore: total,
        galBlockId: next?.blockSecondaryId,
        gameId: learner_game_play_id,
        galTimeSpent: formatTime(seconds),
        navigateId: (!conditionTypes.includes(type)) ? next?.blockShowNavigate : navi
      }
      const actId1 = Activitydata;
      const datas = JSON.stringify(data)
      const result = await activityUpdate(datas, actId1);
      
      if (result.status !== 'Success') {
        return false;
      }
      else {
        let getScore = 0;
       
        const selectedOptions = foundOption ? foundOption : null;
       
        if (conditionTypes.includes(type) && selectedOptions && selectedOptions.score !== undefined && selectedOptions.score !== null) {
          getScore = selectedOptions.score; 
       
        }
   
        const histdata = {
          histActivityId: result?.updatedData?.galId,
          histGameId: result?.updatedData?.galGameId,
          histQuestNo: result?.updatedData?.galQuestNo,
          histBlockId: result?.updatedData?.galBlockId,
          histType: type,
          histNavigateTo: (!conditionTypes.includes(type)) ? next?.blockShowNavigate : navi,
          histOption: foundOnlyOption ? foundOnlyOption : null,
          histScore: getScore !== null && !isNaN(getScore) ? getScore : null, 
        };
        const stringhistdata = JSON.stringify(histdata)
        if (learner_game_play_id) {
          const historyResult = await createGamePlayHistory(stringhistdata);
        }
      }
      const currentDataOfBlocks = Object.values(demoBlocks[next?.blockQuestNo]).filter((item: any) => item?.blockPrimarySequence === nextBlock[0]?.blockPrimarySequence)

      for (let key in demoBlocks[next?.blockQuestNo]) {
        if (demoBlocks[next?.blockQuestNo].hasOwnProperty(key)) {

          const block = demoBlocks[next?.blockQuestNo][key];
          const isMatchingBlock = currentDataOfBlocks.some(
            (currentBlock) => JSON.stringify(currentBlock) === JSON.stringify(block)
          );
          if (isMatchingBlock) {
            const convertToNum = Number(key)
            const incrementValue = Math.round(convertToNum + 1)
            const aHeadOfData = demoBlocks[next?.blockQuestNo][incrementValue]?.blockChoosen;
            setUpComingBlockChoosen(aHeadOfData);
          }
        }
      }

      if (!conditionTypes.includes(type)) {
        if (next?.blockShowNavigate) {
          if (next?.blockShowNavigate === 'Repeat Question') {
            const currentBlockinteraction =
              gameInfo?.blocks[currentQuest][currentBlock];
            

            setInteractionOptions(gameInfo, currentBlockinteraction);
            setType(next?.blockChoosen);
            setData(next);
            return false;
          } else if (next?.blockShowNavigate === 'New Block') {
            const selectedNext = Object.keys(demoBlocks[currentQuest])
              .filter((item: any) => {
                return (
                  demoBlocks[currentQuest][item]?.blockSecondaryId ===
                  parseInt(next?.blockLeadTo)
                );
              })
              .map((item: any) => {
                return demoBlocks[currentQuest][item];
              });
            if (selectedNext.length > 0) {
              setType(selectedNext[0]?.blockChoosen);
              if (selectedNext[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];

                for (const option of gameInfo.questOptions) {
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
              }
              setData(selectedNext && selectedNext[0]);

              return false;
            } else {
              if (nextBlock[0] !== undefined) {
                setType(nextBlock[0]?.blockChoosen);
                if (nextBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                setData(nextBlock[0]);

                return false;
              }
              else {
                setType(demoBlocks[quest]['1']?.blockChoosen);
                setData(demoBlocks[quest]['1']);
                if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (
                        option?.qpSequence ===
                        demoBlocks[quest]['1']?.blockPrimarySequence
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
                        option?.qpSequence === demoBlocks[quest]['1'].blockPrimarySequence
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
                }

                return false;
              }

            }
          } else if (next?.blockShowNavigate === 'Replay Point') {
            setQuestState((prevquestdataList: any) => ({
              ...prevquestdataList,
              [parseInt(next?.blockQuestNo)]: 'replayallowed',
            }));
            setReplayState('replayPointPrompt');
            setReplayIsOpen(true);
            return false;
          } else if (next?.blockShowNavigate === 'Select Block') {
            const selectedNext = Object.keys(demoBlocks[currentQuest])
              .filter((item: any) => {
                return (
                  demoBlocks[currentQuest][item]?.blockSecondaryId ===
                  parseInt(next?.blockLeadTo)
                );
              })
              .map((item: any) => {
                return demoBlocks[currentQuest][item];
              });
            if (selectedNext.length > 0) {
              setType(selectedNext && selectedNext[0]?.blockChoosen);
              if (selectedNext[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];

                for (const option of gameInfo.questOptions) {
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
              }
              setData(selectedNext && selectedNext[0]);

              return false;
            } else {
              if (nextBlock[0] !== undefined) {
                setType(nextBlock[0]?.blockChoosen);
                if (nextBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
                        console.log(option,'optionininrwXRION')
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
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                setData(nextBlock[0]);

                return false;
              }
              else {
                setType(demoBlocks[quest]['1']?.blockChoosen);
                setData(demoBlocks[quest]['1']);
                if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (
                        option?.qpSequence ===
                        demoBlocks[quest]['1']?.blockPrimarySequence
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
                        option?.qpSequence === demoBlocks[quest]['1'].blockPrimarySequence
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
                }

                return false;
              }
            }

          }
          else if (next?.blockShowNavigate === 'Complete') {
            checkAndUpdateScores();
            checkCompletionBadge();
            if (demoBlocks.hasOwnProperty(nextLevel)) {
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
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
          } else {
            setType(demoBlocks[quest]['1']?.blockChoosen);
            setData(demoBlocks[quest]['1']);
            if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              for (const option of gameInfo.questOptions) {
                if (profileData?.Audiogetlanguage.length > 0) {
                  if (
                    option?.qpSequence ===
                    demoBlocks[quest]['1']?.blockPrimarySequence
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
                    option?.qpSequence ===
                    demoBlocks[quest]['1'].blockPrimarySequence
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
            }
            return false;
          }
        }
        else {
          setType(demoBlocks[quest]['1']?.blockChoosen);
          setData(demoBlocks[quest]['1']);
          if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
            const optionsFiltered = [];
            for (const option of gameInfo.questOptions) {
              if (profileData?.Audiogetlanguage.length > 0) {
                if (
                  option?.qpSequence ===
                  demoBlocks[quest]['1']?.blockPrimarySequence
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
                  option?.qpSequence ===
                  demoBlocks[quest]['1'].blockPrimarySequence
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
          }
          return false;
        }
      }
      else {
        // if (nextBlock[0]?.blockChoosen === 'Interaction') {
        //   const optionsFiltered = [];
        //   for (const option of gameInfo.questOptions) {
        //     if (profileData?.Audiogetlanguage.length > 0) {
        //       if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
        //         const profilesetlan = profileData?.Audiogetlanguage.find(
        //           (key: any) => key?.textId === option.qpOptionId,
        //         );
        //         if (profilesetlan) {
        //           const languagecont = {
        //             ...option,
        //             qpOptionText: profilesetlan.content,
        //           };
        //           optionsFiltered.push(languagecont);
        //         } else {
        //           optionsFiltered.push(option);
        //         }
        //       }
        //     } else {
        //       if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
        //         optionsFiltered.push(option);
        //       }
        //     }
        //   }
        //   if (gameInfo?.gameData?.gameShuffle === 'true') {
        //     for (let i = optionsFiltered.length - 1; i > 0; i--) {
        //       const j = Math.floor(Math.random() * (i + 1));
        //       [optionsFiltered[i], optionsFiltered[j]] = [
        //         optionsFiltered[j],
        //         optionsFiltered[i],
        //       ];
        //     }
        //   }
        //   setOptions(optionsFiltered);
        // }
        if (type === 'Interaction' && resMsg !== '') {
          console.log('workingtocontineuw')
          setType('response');
          return false;
        }
        else if (
          (type === 'Interaction' || type === 'response') &&
          feed !== '' &&
          gameInfo?.gameData?.gameIsShowInteractionFeedBack !== 'Completion'
        ) {
          if (navi === 'Replay Point') {
            setQuestState((prevquestdataList: any) => ({
              ...prevquestdataList,
              [parseInt(profile?.currentQuest)]: 'replayallowed',
            }));
            setReplayState('replayPointPrompt');
            setReplayIsOpen(true);
            return false;
          }
          else {

            setType('feedback');
            return false;
          }
        } else if (
          type === 'Interaction' ||
          type === 'response' ||
          type === 'feedback'
        ) {
          if (navi === 'Repeat Question') {
            setFeed('');
            setRepeatSelectOption(true);
            RepeatPrevOption.push(getSelectedOptions.options);
            setRepeatPrevOption(RepeatPrevOption);
            setType(next?.blockChoosen);
            setData(next);
            if (next?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              for (const option of gameInfo.questOptions) {
                if (profileData?.Audiogetlanguage.length > 0) {
                  if (option?.qpSequence === next?.blockPrimarySequence) {
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
                  if (option?.qpSequence === next?.blockPrimarySequence) {
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
            return false;
          } else if (navi === 'New Block') {
            setFeed('');
              setSelectedOption(null);
            const selectedNext = Object.keys(demoBlocks[currentQuest])
              .filter((item: any) => {
                return (
                  demoBlocks[currentQuest][item]?.blockSecondaryId ===
                  parseInt(optionNavigation)
                );
              })
              .map((item: any) => {
                return demoBlocks[currentQuest][item];
              });
            if (selectedNext.length > 0) {
              setType(selectedNext && selectedNext[0]?.blockChoosen);
              if (selectedNext[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];
                for (const option of gameInfo.questOptions) {
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
              }
              setData(selectedNext && selectedNext[0]);
                // setSelectedOption(null);
              return false;
            } else {
              if (nextBlock[0] !== undefined) {
                setType(nextBlock[0]?.blockChoosen);
                if (nextBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                setData(nextBlock[0]);
                return false;
              }
              else {
                setType(demoBlocks[quest]['1']?.blockChoosen);
                setData(demoBlocks[quest]['1']);
                if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (
                        option?.qpSequence ===
                        demoBlocks[quest]['1']?.blockPrimarySequence
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
                        option?.qpSequence === demoBlocks[quest]['1'].blockPrimarySequence
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
                }
                return false;
              }

            }
          } else if (navi === 'Replay Point') {
            setQuestState((prevquestdataList: any) => ({
              ...prevquestdataList,
              [parseInt(profile?.currentQuest)]: 'replayallowed',
            }));
            setReplayState('replayPointPrompt');
            setReplayIsOpen(true);
            return false;
          } else if (navi === 'Select Block') {
            setFeed('');
              setSelectedOption(null);
            const selectedNext = Object.keys(demoBlocks[currentQuest])
              .filter((item: any) => {
                return (
                  demoBlocks[currentQuest][item]?.blockSecondaryId ===
                  parseInt(optionNavigation)
                );
              })
              .map((item: any) => {
                return demoBlocks[currentQuest][item];
              });
            if (selectedNext.length > 0) {
              setType(selectedNext && selectedNext[0]?.blockChoosen);
              if (selectedNext[0]?.blockChoosen === 'Interaction') {
                const optionsFiltered = [];
                for (const option of gameInfo.questOptions) {
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
              }
              setData(selectedNext && selectedNext[0]);
              return false;
            } else {
              if (nextBlock[0] !== undefined) {
                setType(nextBlock[0]?.blockChoosen);
                if (nextBlock[0]?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                      if (option?.qpSequence === nextBlock[0]?.blockPrimarySequence) {
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
                setData(nextBlock[0]);
                return false;
              }
              else {
                setType(demoBlocks[quest]['1']?.blockChoosen);
                setData(demoBlocks[quest]['1']);
                if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
                  const optionsFiltered = [];
                  for (const option of gameInfo.questOptions) {
                    if (profileData?.Audiogetlanguage.length > 0) {
                      if (
                        option?.qpSequence ===
                        demoBlocks[quest]['1']?.blockPrimarySequence
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
                        option?.qpSequence === demoBlocks[quest]['1'].blockPrimarySequence
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
                }
                return false;
              }

            }
          } else if (navi === 'Complete') {
            checkAndUpdateScores();
            checkCompletionBadge();
            setFeed('');
            const Nextcurrentquest = next?.blockQuestNo;
            const getgameinfoquest = gameInfo?.gameQuest.find(
              (row: any) => row.gameQuestNo == Nextcurrentquest,
            );
            if (demoBlocks.hasOwnProperty(nextLevel)) {
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
            setCurrentScreenId(6);
            setType(null);
            setData(null);
            return false;
          } else {
            setFeed('');
            setType(demoBlocks[quest]['1']?.blockChoosen);
            setData(demoBlocks[quest]['1']);
            if (demoBlocks[quest]['1']?.blockChoosen === 'Interaction') {
              const optionsFiltered = [];
              for (const option of gameInfo.questOptions) {
                if (profileData?.Audiogetlanguage.length > 0) {
                  if (
                    option?.qpSequence ===
                    demoBlocks[quest]['1']?.blockPrimarySequence
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
                    option?.qpSequence ===
                    demoBlocks[quest]['1'].blockPrimarySequence
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
            }
            return false;
          }
        }
      }
    }
    if (currentScreenId === 4) {
      LeaderBoardFunc(nextLevel);
    }
    if (currentScreenId === 6) {
      
      CompletionScreenFunction(nextLevel);
    }
    if (currentScreenId === 7) {
      setCurrentScreenId(5);
      return false;
    }
    if (currentScreenId === 8) {
      ReplayGameFunc();
    }
    if (currentScreenId === 14) {
      AfterCompletionFeedBackFunc();
    }

  };
  const calScore = () => {
    const currentQuest = profile?.currentQuest || "1";
    const currentGameData = gameInfo.gameQuest.find(
      (row: any) => row.gameQuestNo == profile?.currentQuest,
    );
    const nextLevel = parseInt(profile?.currentQuest) + 1 || null;
    const haveNextQuest = gameInfo.gameQuest.some(
      (row: any) => row.gameQuestNo > profile.currentQuest,
    );
    let totalScore = 0;
    profile?.score.reduce((acc: any, row: any) => {
      if (row.quest === profile?.currentQuest) {
        return acc + row.score;
      }
      return acc;
    }, 0);
    return {
      currentQuest: currentQuest,
      currentGameData: currentGameData,
      nextLevel: nextLevel,
      haveNextQuest: haveNextQuest,
      totalScore: totalScore,
    };
  };

  const handleValidate = (item: any,ind:any) => {
    const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
      (key: any) => key?.textId === item?.qpOptionId,
    );
    if (optionAudioFiltered.length > 0) {
      const responseFiltered = optionAudioFiltered.filter(
        (key: any) => key?.fieldName === 'qpResponse',
      );
      const FeedFiltered = optionAudioFiltered.filter(
        (key: any) => key?.fieldName === 'qpFeedback',
      );
      if (responseFiltered.length > 0) {
        const FilteredResponsecontent = responseFiltered[0]?.content;
        const resMsgLanguage = FilteredResponsecontent;
        setResMsg(resMsgLanguage);
      }
      else {
        setResMsg(item?.qpResponse);
      }
      if (FeedFiltered.length > 0) {
        const FilteredFeedcontent = FeedFiltered[0]?.content;
        const feedMsgLanguage = FilteredFeedcontent;
        setFeed(feedMsgLanguage);
      }
      else {
        setFeed(item?.qpFeedback);
      }

    } else {
      setResMsg(item?.qpResponse);
      setFeed(item?.qpFeedback);
    }

    setNavi(item?.qpNavigateShow);
    setOptionNavigation(item?.qpNextOption);
    setSelectedOption(item?.qpOptions);
    SetgetSelectedOptions({
      options: item.qpOptions,
      optionText: item.qpOptionText,
    });
    setOptionSelectId(item.qpOptionId);
  };

  useEffect(() => {
    if (voiceRef.current) {
      voiceRef.current.pause();
      
    }
    const backGroundBgmscreens = [1,12, 13];
    if (
      ![2, 3, 4, 5, 6, 7, 0, 14].includes(currentScreenId) &&
      backGroundBgmscreens.includes(currentScreenId)
    ) {
      setAudioObj((prev) => ({
        ...prev,
        url: audio,
        type: EnumType.BGM,
        loop: false, 
        autoplay: true,
      }));
      if (backgroundBgmRef.current && ![2, 3, 4, 5, 6, 7, 0, 14].includes(currentScreenId) &&
      backGroundBgmscreens.includes(currentScreenId)) {
        try {
          backgroundBgmRef.current.play().catch((error) => {
            
          }); 
        } catch (error) {
          console.error('Background BGM ref is not available.', error);
        }
      }
      if (voiceRef.current) {
        voiceRef.current.pause(); 
        
      }
    }
    if (currentScreenId === 2 && isLoading === true ) {
      if (backgroundBgmRef.current) {
        backgroundBgmRef.current.pause(); 
        
      }
      if (voiceRef.current) {
        try {
          voiceRef?.current?.play().catch((error) => {
            

          }); 
        } catch (error) {
          console.error('Background BGM ref is not available.', error);
        }
      }
    }
    const screens = [10, 8, 14,0, 6, 4];
   
      if (currentScreenId !== 4) {
        setHomeLeaderBoard(null);
      }
    
  }, [currentScreenId]);
  useEffect(() => {
    if (audioRef.current) {
      if (currentScreenId === 2) {
        audioRef.current.pause();
        
      } else {
        audioRef.current.play();
         
      }
    }
  }, [currentScreenId]);

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const startDemo = () => {
    onClose1();
    setCurrentScreenId(10);
  };

  const replayGame = () => {
    setType(gameInfo?.blocks[profile?.currentQuest]['1']?.blockChoosen);
    setData(gameInfo?.blocks[profile?.currentQuest]['1']);
    setCurrentScreenId(2);
  };
  const replayNextHandler = () => {
    const nextLevel = parseInt(profile?.currentQuest) + 1 || null;
    if (demoBlocks.hasOwnProperty(nextLevel)) {
      setProfile((prev: any) => {
        const data = { ...prev };
        if (!profile.completedLevels.includes(String(nextLevel))) {
          data.completedLevels = [...data.completedLevels, String(nextLevel)];
        }
        return data;
      });
      setType(demoBlocks[nextLevel]['1']?.blockChoosen);
      setData(demoBlocks[nextLevel]['1']);
      setMotionEffect(true);
      setCurrentScreenId(13);
      return false;
    } else {
      if (
        gameInfo.gameData?.gameIsShowReflectionScreen !== 'false' &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
        setCurrentScreenId(3); //Navigate to Reflection screen
        return false;
      } else if (gameInfo.gameData?.gameIsShowTakeaway !== 'false') {
        setCurrentScreenId(7); //Navigate to Takeaway screen
        return false;
      } else {
        setType(null);
        setData(null);
        setCurrentScreenId(5); //Navigate to Thank you screen
        return false;
      }
    }
  };
  
  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      if (gameInfo?.gameData?.gameId > 0) {
        const resLang = await getGameLanguages(gameInfo?.gameData?.gameId);
        if (resLang?.status === 'Success') {
          if (resLang?.data.length > 0) {
            const data = resLang?.data;
            const ifEnglishExist = data.filter((lang: any) => lang.value === 1);
            if (ifEnglishExist.length === 0) {
              data.unshift({ value: 1, label: 'English' });
            }
            setGameLanguages(data);
            setHasMulitLanguages(true);
          } else {
            setGameLanguages([{ value: 1, label: 'English' }]);
            setProfileData((prev: any) => ({
              ...prev,
              language: 1,
            }));
            setLearnerPlayingDetails((prev: any) => ({
              ...prev,
              LearnerProfile: {
                ...prev.LearnerProfile,
                language: 1,
              },
            }));
            setHasMulitLanguages(true);
          }
        }
      }
    };
  
    
    const startTimer = () => {
      timeRef.current = window.setInterval(() => {
        setSeconds((prevSeconds:any ) => prevSeconds + 1);
      }, 1000);
    };
  
    const stopTimer = () => {
      if (timeRef.current !== null) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }
    };
  
   
    const handleVisibilityTabChange = () => {
      if (document.visibilityState === 'hidden') {
       
        stopTimer();
      } else if (document.visibilityState === 'visible') {
        
        startTimer();
      }
    };
  
   
    fetchSupportedLanguages();
    startTimer();
  
  
    document.addEventListener('visibilitychange', handleVisibilityTabChange);
  
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityTabChange);
      stopTimer();
    };
  }, []);
  
 
  const getCurrentResolution = () => {
    const body = document.getElementById('body');
    body.style.width = `${window.innerWidth}px`;
    body.style.height = `${window.innerHeight}px`;

    return body;
  };



  const dontShowTopMenu = ![3, 4, 5, 6, 7, 10].includes(currentScreenId);
  useEffect(() => {
    if (FeedbackNavigatenext === true) {
      setisScreenshot(false);
      getData(data);
    }
  }, [FeedbackNavigatenext]);

  const getFeedbackData = (data?: any) => {
    setisScreenshot(true);
    const groupedFeedback: { [key: string]: any[] } = {};
    feedbackList?.forEach((feedback) => {
      if (!(feedback.Seq in groupedFeedback)) {
        groupedFeedback[feedback.Seq] = [];
      }
      const existingFeedback = groupedFeedback[feedback.Seq].find(
        (f) =>
          f.Options.options === feedback.Options.options &&
          f.type === feedback.type
      );
      if (!existingFeedback) {
        groupedFeedback[feedback.Seq].push(feedback);
      }
    });

    const firstPageFeedback: any[] = [];
    Object.keys(groupedFeedback).forEach((seq: any) => {
      groupedFeedback[seq].forEach((feedback) => {
        if (profile.currentQuest == feedback.quest) {
          firstPageFeedback.push(feedback);
        }
      });
    });

    let newRemainingSentences :any;
    let ScreenShotScore  :any;
    if (firstPageFeedback.length !== 0 && FeedbackcurrentPosition < firstPageFeedback.length) {
      newRemainingSentences =
        firstPageFeedback[FeedbackcurrentPosition].feedbackcontent;
      ScreenShotScore = firstPageFeedback[FeedbackcurrentPosition].totalPoints;
      const getgameinfoblockchoosen = gameInfo?.blocks[profile?.currentQuest];
      const getArray = [];
      for (const key in getgameinfoblockchoosen) {
        if (getgameinfoblockchoosen[key].blockChoosen === 'Interaction') {
          getArray.push(getgameinfoblockchoosen[key]);
        }
      }
      
      const GetSeqData = getArray.filter((item: any) => {
        return (
          item?.blockPrimarySequence ===
          firstPageFeedback[FeedbackcurrentPosition].Seq
        );
      });
      const optionsFiltered :any = [];
      for (const option of gameInfo.questOptions) {
        if (profileData?.Audiogetlanguage.length > 0) {
          if (option?.qpSequence === GetSeqData[0]?.blockPrimarySequence) {
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
          if (option?.qpSequence === GetSeqData[0]?.blockPrimarySequence) {
            optionsFiltered.push(option);
          }
        }
      }

      const SelectedoptionsFiltered = optionsFiltered.filter(
        (key: any) =>
          key?.qpOptions ==
          firstPageFeedback[FeedbackcurrentPosition].Options['options'],
      );
      const selectoptionfeed = SelectedoptionsFiltered[0].qpOptions
        ? SelectedoptionsFiltered[0].qpOptions
        : 'null';
          startTransition(() => {
        setInterActionBlockArray(firstPageFeedback.length);
      setOptions(optionsFiltered);
      setFeedBackSelectedoptionData(selectoptionfeed);
      setFeedBackoptionData(GetSeqData);
      setFeedbackCurrentPosition(FeedbackcurrentPosition + 1);
      setFeedbackRemainingSentences(newRemainingSentences);
      setInterActionScore(ScreenShotScore);
          });

    } else {
        startTransition(() => {
      setInterActionBlockArray(0)
      setOptions(null);
      setFeedBackSelectedoptionData(null);
      setFeedBackoptionData(null);
      setFeedbackCurrentPosition(0);
      setFeedbackRemainingSentences(null);
      setFeedbackNavigateNext(true);
      setInterActionScore(null);
        });
    }

  };
  function TriggerAnimation(data: () => void) {
    setMotionEffect(true);
    setTimeout(() => { data() }, 300)
  }

  const currentQuestRef = useRef(profile?.currentQuest);

  useEffect(() => {
    currentQuestRef.current = profile?.currentQuest;
  }, [profile?.currentQuest]);

  const handleReplayButtonClick = async(replayType: string) => {
    const updatedFeedbackList =feedbackList && feedbackList?.filter(feedback => feedback.quest != profile.currentQuest);
    setFeedbackList(updatedFeedbackList);
    if (replayState === 'replayPointprompt') {
      
      setFeed('');
      setOptions(null);
      setFeedBackSelectedoptionData(null);
      setFeedBackoptionData(null);
    }
    
    if (replayType === 'mandatoryReplay') {
      let updatedscore :any= profile?.score?.filter((item: any) => item.quest !== parseInt(profile?.currentQuest));
   

        if(questState[parseInt(profile?.currentQuest)] === 'completed')
        {
          setQuestState((prevquestdataList: any) => ({
            ...prevquestdataList,
            [parseInt(profile?.currentQuest)]: 'Started',
          }));
        }
      setProfile((prev: any) => ({
          ...prev,
          score:(questState[parseInt(profile?.currentQuest)] === 'Started' || questState[parseInt(profile?.currentQuest)] === 'completed') ? updatedscore : prev.score,
          // replayScore:questState[parseInt(profile?.currentQuest)] === 'replayallowed' ? updatedscore : prev.replayScore,
        }));
        if(learnerPlayList.Prevquestseq[profile.currentQuest])
        {
          setLearnerPlayingDetails((prev: any) => {
            const updatedPrevquestseq = { ...prev.Prevquestseq };
            if (updatedPrevquestseq[profile.currentQuest]) {
              delete updatedPrevquestseq[profile.currentQuest];
            }
            return {
              ...prev,
              Prevquestseq: updatedPrevquestseq
            };
          });
          setprevBlock([]);
        }
        let total = 0;
        const scoreArray = updatedscore;
        if (scoreArray?.length > 0) {

          total = scoreArray?.reduce((acc: number, cur: any) => {
            if (cur.quest === parseInt(profile?.currentQuest)) {
              return acc + cur.score;
            } else {
              return acc;
            }
          }, 0);

        }
        const conditionTypes = ['Interaction', 'response', 'feedback']
        const data1 = {
          blockname: type,
          galAverageScore: total,
          galBlockId: data?.blockSecondaryId,
          gameId: learner_game_play_id,
          galTimeSpent: formatTime(seconds),
          navigateId: (!conditionTypes.includes(type)) ? data?.blockShowNavigate : navi
        }
        const actId1 = Activitydata;
        const datas = JSON.stringify(data1)
        const result = await activityUpdate(datas, actId1);
        
        if (result.status !== 'Success') {
          return false;
        }
       
    }
    if (replayType === 'replayPointPrompt') {
      
      setFeed('');
      let updatedscore :any= [];
      if (questState[parseInt(profile?.currentQuest)] === 'Started') {
        // Remove matching object from profile?.score
        updatedscore = profile?.score?.filter((item:any) => item.quest !== parseInt(profile?.currentQuest));
    
      }
      else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
        // Remove matching object from profile?.replayScore
        updatedscore = profile?.replayScore.filter((item: any) => item.quest !== parseInt(profile?.currentQuest));
      }
      
      setProfile((prev: any) => ({
          ...prev,
          score:questState[parseInt(profile?.currentQuest)] === 'Started' ? updatedscore : prev.score,
          replayScore:questState[parseInt(profile?.currentQuest)] === 'replayallowed' ? updatedscore : prev.replayScore,
        }));
        if(learnerPlayList.Prevquestseq[profile.currentQuest])
        {
          setLearnerPlayingDetails((prev: any) => {
            const updatedPrevquestseq = { ...prev.Prevquestseq };
            if (updatedPrevquestseq[profile.currentQuest]) {
              delete updatedPrevquestseq[profile.currentQuest]; 
            }
            return {
              ...prev,
              Prevquestseq: updatedPrevquestseq 
            };
          });
          setprevBlock([]);
        }
        let total = 0;
        const scoreArray = updatedscore;
        if (scoreArray?.length > 0) {
          total = scoreArray?.reduce((acc: number, cur: any) => {
            if (cur.quest === parseInt(profile?.currentQuest)) {
              return acc + cur.score;
            } else {
              return acc;
            }
          }, 0);
        }
        const conditionTypes = ['Interaction', 'response', 'feedback']
        const data1 = {
          blockname: type,
          galAverageScore: total,
          galBlockId: data?.blockSecondaryId,
          gameId: learner_game_play_id,
          galTimeSpent: formatTime(seconds),
          navigateId: (!conditionTypes.includes(type)) ? data?.blockShowNavigate : navi
        }
        // const actId1 = Activitydata;
         setProfile((prev: any) => ({
  ...prev,
  currentQuest: prev.currentQuest, // fallback to old value
}));
console.log(profile,'profileinpreview')
         const checkdata = {
        gameId: learner_game_play_id,
        questNo: profile.currentQuest,
      }
      console.log(checkdata,'checkdatainpreview')
      const datas1 = JSON.stringify(checkdata);
      console.log(datas1,'datas1inpreview')
const lastBlockresult = await activitygetlastblock(datas1);
console.log(lastBlockresult,'lastBlockresultinpreview')
 setActivitydata(lastBlockresult?.data[0]?.galId);
        const actId1 = lastBlockresult?.data[0]?.galId;
        const datas = JSON.stringify(data1)
        const result = await activityUpdate(datas, actId1);
        
        if (result.status !== 'Success') {
          return false;
        }
    }
    if (replayType === 'optionalReplay') {
      setFeed('');
      let updatedscore :any= profile?.score?.filter((item: any) => item.quest !== parseInt(currentQuestRef.current));
   
      
      setProfile((prev: any) => ({
          ...prev,
          score:questState[parseInt(currentQuestRef.current)] === 'Started' ? updatedscore : prev.score,
          // replayScore:questState[parseInt(profile?.currentQuest)] === 'replayallowed' ? updatedscore : prev.replayScore,
        }));
        if(learnerPlayList.Prevquestseq[currentQuestRef.current])
        {
          setLearnerPlayingDetails((prev: any) => {
            const updatedPrevquestseq = { ...prev.Prevquestseq };
            if (updatedPrevquestseq[currentQuestRef.current]) {
              delete updatedPrevquestseq[currentQuestRef.current]; 
            }
            return {
              ...prev,
              Prevquestseq: updatedPrevquestseq 
            };
          });
          setprevBlock([]);
        }
        const data = {
          gameId: learner_game_play_id,
          questNo: parseInt(currentQuestRef.current),
          galBlockId: '',
          averageScore: 0,
          galAssignedId:AssignId,
        }
        const datas = JSON.stringify(data)
        const result = await activityCreate(datas);
        if (result.status !== 'Success') {
          return false;
      } 
      setActivitydata(result.data);
       
    }
    setType(demoBlocks[currentQuestRef.current]['1']?.blockChoosen);
    setData(demoBlocks[currentQuestRef.current]['1']);
    if (
      demoBlocks[currentQuestRef.current]['1']?.blockChoosen === 'Interaction'
    ) {
      const optionsFiltered = [];
      for (const option of gameInfo.questOptions) {
        if (profileData?.Audiogetlanguage.length > 0) {
          if (
            option?.qpSequence ===
            demoBlocks[currentQuestRef.current]['1']?.blockPrimarySequence
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
            option?.qpSequence ===
            demoBlocks[currentQuestRef.current]['1']?.blockPrimarySequence
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
    }
    setCurrentScreenId(2);
  };
  useEffect(() => {
    setTimeout(() => {
      setMotionEffect(false);
    }, 100)
  }, [currentScreenId, replayIsOpen]);
  
  const parseSequence = (seq: any) => {
    return seq.split('.').map(Number);
  }
  const findPreviousSequence = (array: any, currentSeq: any) => {
    const parsedCurrentSeq = parseSequence(currentSeq);
    let previousSeq = null;

    for (let obj of array) {
      const parsedSeq = parseSequence(obj.blockPrimarySequence);

      if (parsedSeq[0] === parsedCurrentSeq[0] && parsedSeq[1] < parsedCurrentSeq[1]) {
        if (!previousSeq || parsedSeq[1] > parseSequence(previousSeq.blockPrimarySequence)[1]) {
          previousSeq = obj;
        }
      }
    }

    return previousSeq;
  }



  useEffect(() => {
    if (!(gameInfo?.reviewer?.ReviewerId || user?.data?.id)) {
      setIsAuthFailed({ status: true, authMsg: "Your session has timed out. Please login then try again", reviewStatus: false });
    }
  }, [gameInfo?.reviewer?.ReviewerId, user?.data?.id])

  const tryForFeedbackAllTogether = async () => {

    if (feedbackList.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
      const Completionpage = Object.entries(questState).map(
        ([questId, status]) => ({ questId, status }),
      );
      const OpenStraigntCompletionPage = Completionpage.find(
        (row: any) =>
          row.questId === profile.currentQuest && row.status === 'completed',
      );
      if (feedbackList.length !== 0 && feedbackList?.find((item: any) => item.quest == profile.currentQuest)) {
        getFeedbackData();
        setFeedbackNavigateNext(false);
        setFirstLoading(true);
        setCurrentScreenId(14); 
        return false;
      }
    }
  }


useEffect(() => {
  
}, [GlbPlayindDetails]);

//  console.log("playerselected-profileDatain entirepreview",profileData)

  return (

    <ProfileContext.Provider value={{ profileData, setMotionEffect }}>
      {isAuthFailed.status === false ?
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: motionEffect ? 0 : 1 }}>
          <TopMenuBar
           isLeaderboardEnabled = {isLeaderboardEnabled}
          setIsLeaderboardEnabled = {setIsLeaderboardEnabled}
            dontShowTopMenu={dontShowTopMenu}
            preloadedAssets={preloadedAssets}
            currentScreenId={currentScreenId}
            setCurrentScreenId={setCurrentScreenId}
            isSettingOpen={isSettingOpen}
            setIsSettingOpen={setIsSettingOpen}
            setHomeLeaderBoard={setHomeLeaderBoard}
            profileData={profileData}
            gameInfo={gameInfo}
            demoBlocks={demoBlocks}
            data={data}
            setAudioObj={setAudioObj}
            audioObj={audioObj}
            questState={questState}
            EnumType={EnumType}
            setLearnerPlayingDetails={setLearnerPlayingDetails}
            learnerPlayList={learnerPlayList}
            handleMusicVolume={handleMusicVolume}
             homeLeaderBoard={homeLeaderBoard}
                             
                             
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.Lead}
                              getData={getData}
                           
                             
                             
                              setPlayerTodayScore={setPlayerTodayScore}
                              playerTodayScore={playerTodayScore}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              questWisePlayerScore={questWisePlayerScore}
                              setQuestWisePlayerScore={setQuestWisePlayerScore}
          />
          <Flex
            height="100vh"
            className={
              currentScreenId === 2  ? '' : 'EntirePreview'
            }
          >
            {replayIsOpen && (
              <ReplayScore
              getSelectedOptions={getSelectedOptions}
                preloadedAssets={preloadedAssets}
                setReplayIsOpen={setReplayIsOpen}
                handleReplayButtonClick={handleReplayButtonClick}
                replayState={replayState}
                setCurrentScreenId={setCurrentScreenId}
                gameInfo={gameInfo}
                setData={setData}
                setType={setType}
                gameInfoquest={gameInfo.questOptions}
                gameinfodata={gameInfo.gameData.gameShuffle}
                profileData={profileData}
                setQuestState={setQuestState} setOptions={setOptions}
                replayNextHandler={replayNextHandler}
                data={data}
                feed={feed}
                setAudioObj={setAudioObj}
                isScreenshot={isScreenshot}
                options={options}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                questState={questState}
                navi={navi}
              />
            )}

            <>
            {(currentScreenId === 2 ||
                currentScreenId === 9 ||
                currentScreenId === 14) && (
                <>
                  {gameInfo?.assets?.gasAssetName === 'Medieval office' && (
                    <BackgroundGLB
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}
                  {gameInfo?.assets?.gasAssetName === 'Medieval emporium' && (
                    <Emporium
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}
                   {gameInfo?.assets?.gasAssetName === 'Futuristic office' && (
                    <FuturisticOffice
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Futuristic City' && (
                    <FurturisticCity
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Futuristic Lab' && (
                    <FuturistiLab
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Medieval castle' && (
                    <Castle
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Magical office' && (
                    <Office
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Magical underground' && (
                    <Underground
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                  {gameInfo?.assets?.gasAssetName === 'Magical garden' && (
                    <MagicalGarden
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}
                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '}
                   {gameInfo?.assets?.gasAssetName === 'Realistic workplace' && (
                    <RealWorkplace
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '} 
                    {gameInfo?.assets?.gasAssetName === 'Realistic Factory' && (
                    <RealFactory
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}{' '} 
                  {gameInfo?.assets?.gasAssetName === 'Realistic office' && (
                    <RealisticOffice
                      preloadedAssets={preloadedAssets}
                      setModalLoaded={setModalLoaded}
                      modalLoaded={modalLoaded}
                      currentScreenId={currentScreenId}
                      SetGlbPlayingDetails={SetGlbPlayingDetails}
                      GlbPlayindDetails={GlbPlayindDetails}
                      setIsZoomComplete={setIsZoomComplete}
                      isZoomComplete={isZoomComplete}
                      glbName={glbName}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                      NonPlayerNameLanguageId={NonPlayerNameLanguageId}

                      PlayerNameLanguage={PlayerNameLanguage}
                    />
                  )}
                </>
              )}
                </>
            {(() => {
              switch (currentScreenId) {
                case 0:
                  return (
                    <>
                      {
                        <PlayInfo
                          onOpen={onOpen1}
                          onClose={onClose1}
                          isOpen={true}
                          startDemo={startDemo}
                        />
                      }
                    </>
                  );
                case 1:
                  return (
                    <>
                      {/* <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets?.introBgImage}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                          backgroundColor={'#0d161e'}
                        >
                          <Box className="Images" h={'100vh !important'} >
                            <Welcome
                              intro={audio}
                              currentScreenId={currentScreenId}
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.backgroundImage}
                              screen={preloadedAssets.Screen5}
                              preloadedAssets={preloadedAssets}
                              profileData={profileData}
                            />
                          </Box>
                        </Box>
                      </Box>  */}

                       {/* <ColorProvider> */}
                        <WelcomeFutureTheme
                          intro={audio}
                          currentScreenId={currentScreenId}
                          setCurrentScreenId={setCurrentScreenId}
                          formData={gameInfo?.gameData}
                          imageSrc={preloadedAssets.backgroundImage}
                          screen={preloadedAssets.Screen5}
                          preloadedAssets={preloadedAssets}
                          profileData={profileData}
                        />
                      {/* </ColorProvider> */}
                    </>
                  );
                case 2:
                  return (
                    <>
                      {data && type && (
                        <>
                          <Story
                           isInteractionButtonDisabled={isInteractionButtonDisabled}
                          setIsInteractionButtonDisabled={setIsInteractionButtonDisabled}
                          handleInteractionBackClick={handleInteractionBackClick}
                            modalLoaded={modalLoaded}
                            selectedPlayer={selectedPlayer}
                            formData={gameInfo?.gameData}
                            data={data}
                            type={type}
                            handleValidate={handleValidate}
                            resMsg={resMsg}
                            feed={feed}
                            getData={getData}
                            options={options}
                            profileData={profileData}
                            setAudioObj={setAudioObj}
                            setNavTrack={setNavTrack}
                            navTrack={navTrack}
                            gameInfo={gameInfo}
                            preloadedAssets={preloadedAssets}
                            LastModiPrevData={LastModiPrevData}
                            RepeatSelectOption={RepeatSelectOption}
                            RepeatPrevOption={RepeatPrevOption}
                            setScore={setScore}
                            SetAudioOptions={SetAudioOptions}
                            score={score}
                            AudioOptions={AudioOptions}
                            upComingBlockChoosen={upComingBlockChoosen}
                            learnerPlayList={learnerPlayList}
                            option={selectedOption}
                            SetGlbPlayingDetails={SetGlbPlayingDetails}
                            setIsZoomComplete={setIsZoomComplete}
                            isZoomComplete={isZoomComplete}
                            setNonPlayerNameLanguage={setNonPlayerNameLanguage}
                              NonPlayerNameLanguage={NonPlayerNameLanguage}
                              questState={questState}
                              originalScore={originalScore}
                              setLearnerPlayingDetails={setLearnerPlayingDetails}
                              navi={navi}
                              currentBlock={currentBlock}
                             
                          />
                        </>
                      )}
                    </>
                  );
                case 3:
                  return (
                    <>
                       {/* {gameInfo?.gameData?.gameTheme === 'false' ? (
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box className="Game-Screen">
                          <Box className="Images">
                            <Reflection
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.RefBg}
                              reflectionQuestions={
                                gameInfo?.reflectionQuestions
                              }
                              gameInfo={gameInfo}
                              setCurrentScreenId={setCurrentScreenId}
                              preloadedAssets={preloadedAssets}
                              FeedbackcurrentPosition={FeedbackcurrentPosition}
                              setFeedbackCurrentPosition={setFeedbackCurrentPosition}
                              interactionBlockArray={interactionBlockArray}
                              profileData={profileData}
                              getFeedbackData={getFeedbackData}
                              feedbackList={feedbackList}
                              setInterActionBlockArray={setInterActionBlockArray}
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              learnerPlayList={learnerPlayList}
                              setLearnerPlayingDetails={setLearnerPlayingDetails}
                            />
                          </Box>
                        </Box>
                      </Box>
                       ):( */}

                       <ReflectionFutureTheme
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.RefBg}
                              reflectionQuestions={
                                gameInfo?.reflectionQuestions
                              }
                              gameInfo={gameInfo}
                              setCurrentScreenId={setCurrentScreenId}
                              preloadedAssets={preloadedAssets}
                              FeedbackcurrentPosition={FeedbackcurrentPosition}
                              setFeedbackCurrentPosition={
                                setFeedbackCurrentPosition
                              }
                              interactionBlockArray={interactionBlockArray}
                              profileData={profileData}
                              getFeedbackData={getFeedbackData}
                              feedbackList={feedbackList}
                              setInterActionBlockArray={
                                setInterActionBlockArray
                              }
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              learnerPlayList={learnerPlayList}
                              setLearnerPlayingDetails={
                                setLearnerPlayingDetails
                              }
                            />
                       {/* )} */}
                    </>
                  );
                case 4:
                  return (
                    <>
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets?.introBgImage}
                          backgroundColor={'#0d161e'}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                        >
                          <Box className="Images" zIndex={99}>
                            <LeaderBoard
                              homeLeaderBoard={homeLeaderBoard}
                              setHomeLeaderBoard={setHomeLeaderBoard}
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.Lead}
                              getData={getData}
                              data={data}
                              gameInfo={gameInfo}
                              preloadedAssets={preloadedAssets}
                              setPlayerTodayScore={setPlayerTodayScore}
                              playerTodayScore={playerTodayScore}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              learnerPlayList={learnerPlayList}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 5:
                  return (
                    <>
                       {/* {gameInfo?.gameData?.gameTheme === 'false' ? (
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets?.introBgImage}
                          backgroundColor={'#0d161e'}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                        >
                          <Box className="Images">
                            <ThankYou
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.ThankYou}
                              preloadedAssets={preloadedAssets}
                              gameInfo={gameInfo}
                              FeedbackcurrentPosition={FeedbackcurrentPosition}
                              setFeedbackCurrentPosition={setFeedbackCurrentPosition}
                              interactionBlockArray={interactionBlockArray}
                              profileData={profileData}
                              getFeedbackData={getFeedbackData}
                              feedbackList={feedbackList}
                              setInterActionBlockArray={setInterActionBlockArray}
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              learnerPlayList={learnerPlayList}
                              setLearnerPlayingDetails={setLearnerPlayingDetails}
                              AssignId={AssignId}
                            />
                          </Box>
                        </Box>
                      </Box>
                       ):( */}
                        <ThankyouFutureTheme
                              setCurrentScreenId={setCurrentScreenId}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.ThankYou}
                              preloadedAssets={preloadedAssets}
                              gameInfo={gameInfo}
                              FeedbackcurrentPosition={FeedbackcurrentPosition}
                              setFeedbackCurrentPosition={
                                setFeedbackCurrentPosition
                              }
                              interactionBlockArray={interactionBlockArray}
                              profileData={profileData}
                              getFeedbackData={getFeedbackData}
                              feedbackList={feedbackList}
                              setInterActionBlockArray={
                                setInterActionBlockArray
                              }
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                              learnerPlayList={learnerPlayList}
                              setLearnerPlayingDetails={
                                setLearnerPlayingDetails
                              }
                              AssignId={AssignId}
                            />
                       {/* )} */}
                    </>
                  );
                case 6:
                  return (
                    <>
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets?.introBgImage}
                          backgroundColor={'#0d161e'}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                        >
                          <Box className="Images">
                            <Completion
                              getData={getData}
                              questState={questState}
                              setQuestState={setQuestState}
                              data={data}
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              getFeedbackData={getFeedbackData}
                              gameInfo={gameInfo}
                              currentScreenId={currentScreenId}
                              setCurrentScreenId={setCurrentScreenId}
                              currentQuestNo={currentQuestNo}
                              preloadedAssets={preloadedAssets}
                              setType={setType}
                              setData={setData}
                              type={type}
                              setOptions={setOptions}
                              profileData={profileData}
                              feedbackList={feedbackList}
                              setFeedbackList={setFeedbackList}
                              learnerPlayList={learnerPlayList}
                              setLearnerPlayingDetails={setLearnerPlayingDetails}
                              setprevBlock={setprevBlock}
                        prevBlock={prevBlock}
                        demoBlocks={demoBlocks}
                        checkCompletionBadge={checkCompletionBadge}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                case 7:
                  return (
                    <>
                   {gameInfo?.gameData?.gameTheme === 'false' ? (
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets?.introBgImage}
                          backgroundColor={'#0d161e'}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                        >
                          <Box className="Images">
                            <Takeway
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.Screen4}
                              getData={getData}
                              data={data}
                              preloadedAssets={preloadedAssets}
                              gameInfo={gameInfo}
                              setCurrentScreenId={setCurrentScreenId}
                              FeedbackcurrentPosition={FeedbackcurrentPosition}
                              setFeedbackCurrentPosition={setFeedbackCurrentPosition}
                              interactionBlockArray={interactionBlockArray}
                              profileData={profileData}
                              getFeedbackData={getFeedbackData}
                              feedbackList={feedbackList}
                              setInterActionBlockArray={setInterActionBlockArray}
                              setFeedbackNavigateNext={setFeedbackNavigateNext}
                              setCurrentQuestNo={setCurrentQuestNo}
                              setFirstLoading={setFirstLoading}
                            />
                          </Box>
                        </Box>
                      </Box>
                   ):(
                      //  <Takeway
                      //         formData={gameInfo?.gameData}
                      //         imageSrc={preloadedAssets.Screen4}
                      //         getData={getData}
                      //         data={data}
                      //         preloadedAssets={preloadedAssets}
                      //         gameInfo={gameInfo}
                      //         setCurrentScreenId={setCurrentScreenId}
                      //         FeedbackcurrentPosition={FeedbackcurrentPosition}
                      //         setFeedbackCurrentPosition={setFeedbackCurrentPosition}
                      //         interactionBlockArray={interactionBlockArray}
                      //         profileData={profileData}
                      //         getFeedbackData={getFeedbackData}
                      //         feedbackList={feedbackList}
                      //         setInterActionBlockArray={setInterActionBlockArray}
                      //         setFeedbackNavigateNext={setFeedbackNavigateNext}
                      //         setCurrentQuestNo={setCurrentQuestNo}
                      //         setFirstLoading={setFirstLoading}
                      //       />
                          // <ColorProvider>
                        <TakeawayFutureTheme
                          formData={gameInfo?.gameData}
                          imageSrc={preloadedAssets.Screen4}
                          getData={getData}
                          data={data}
                          preloadedAssets={preloadedAssets}
                          gameInfo={gameInfo}
                          setCurrentScreenId={setCurrentScreenId}
                          FeedbackcurrentPosition={FeedbackcurrentPosition}
                          setFeedbackCurrentPosition={
                            setFeedbackCurrentPosition
                          }
                          interactionBlockArray={interactionBlockArray}
                          profileData={profileData}
                          getFeedbackData={getFeedbackData}
                          feedbackList={feedbackList}
                          setInterActionBlockArray={setInterActionBlockArray}
                          setFeedbackNavigateNext={setFeedbackNavigateNext}
                          setCurrentQuestNo={setCurrentQuestNo}
                          setFirstLoading={setFirstLoading}
                        />
                      // </ColorProvider>
                   )}
                    </>
                  );
                case 8:
                  return (
                    <>
                      <Box
                        w={'100%'}
                        h={'100vh'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        position={'relative'}
                        overflow={'visible'}
                        style={{ perspective: '1000px' }}
                        className="Main-Content"
                      >
                        <Box
                          backgroundImage={preloadedAssets.backgroundImage}
                          w={'100% !important'}
                          h={'100vh'}
                          backgroundRepeat={'no-repeat'}
                          backgroundSize={'cover'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          className="Game-Screen"
                        >
                          <Box className="Images">
                            <ReplayGame
                              replayGame={replayGame}
                              replayNextHandler={replayNextHandler}
                              type={type}
                              gameInfo={gameInfo}
                              setType={setType}
                              setData={setData}
                              isOptionalReplay={isOptionalReplay}
                              setisOptionalReplay={setisOptionalReplay}
                              setisReplay={setisReplay}
                              isReplay={isReplay}
                              formData={gameInfo?.gameData}
                              imageSrc={preloadedAssets.Replay}
                              getData={getData}
                              data={data}
                              preloadedAssets={preloadedAssets}
                              profilescore={profilescore}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>

                  );
                case 10:
                  return (
                     <>
     {/* {gameInfo?.gameData?.gameTheme === 'false' ? (
                    <GameIntroScreen
                      preloadedAssets={preloadedAssets}
                      setCurrentScreenId={setCurrentScreenId}
                      currentScreenId={currentScreenId}
                      gameInfo={gameInfo.gameData}
                      hasMulitLanguages={hasMulitLanguages}
                      setReplayState={setReplayState}
                      setReplayIsOpen={setReplayIsOpen}
                      setQuestState={setQuestState}
                      gameLanguages={gameLanguages}
                      isInitialLoadScreenWelcome={isInitialLoadScreenWelcome}
                      setIsInitialLoadScreenWelcome={setIsInitialLoadScreenWelcome}
                      profileData={profileData}
                      setProfileData={setProfileData}
                      learnerPlayList={learnerPlayList}
                      setLearnerPlayingDetails={setLearnerPlayingDetails}
                      setAssignId={setAssignId}
                      AssignId={AssignId}
                      UpdateLearnerData={UpdateLearnerData}
                      setFeedbackList={setFeedbackList}
                    />
     ):( */}
                      <GameIntroScreenFutureTheme
                      preloadedAssets={preloadedAssets}
                      setCurrentScreenId={setCurrentScreenId}
                      currentScreenId={currentScreenId}
                      gameInfo={gameInfo.gameData}
                      hasMulitLanguages={hasMulitLanguages}
                      setReplayState={setReplayState}
                      setReplayIsOpen={setReplayIsOpen}
                      setQuestState={setQuestState}
                      gameLanguages={gameLanguages}
                      isInitialLoadScreenWelcome={isInitialLoadScreenWelcome}
                      setIsInitialLoadScreenWelcome={setIsInitialLoadScreenWelcome}
                      profileData={profileData}
                      setProfileData={setProfileData}
                      learnerPlayList={learnerPlayList}
                      setLearnerPlayingDetails={setLearnerPlayingDetails}
                      setAssignId={setAssignId}
                      AssignId={AssignId}
                      UpdateLearnerData={UpdateLearnerData}
                      setFeedbackList={setFeedbackList}
                    />
                      </>
                  );
                case 12:
                  return (
                    <>
                      {/* <Characterspage
                        profileData={profileData}
                        setProfileData={setProfileData}
                        currentScreenId={currentScreenId}
                        setSelectedPlayer={setSelectedPlayer}
                        players={gameInfo?.gamePlayers}
                        formData={gameInfo?.gameData}
                        imageSrc={preloadedAssets?.introBgImage}
                        setCurrentScreenId={setCurrentScreenId}
                        demoBlocks={demoBlocks}
                        preloadedAssets={preloadedAssets}
                        ModelPlayer={ModelPlayer}
                        learnerPlayList={learnerPlayList}
                        setLearnerPlayingDetails={setLearnerPlayingDetails}
                        selectedBackground={selectedBackground}
                        backgroundtheme={backgroundtheme}
                      /> */}

                        <CharacterSelectionFutureTheme 
                        profileData={profileData}
                        setProfileData={setProfileData}
                        currentScreenId={currentScreenId}
                        setSelectedPlayer={setSelectedPlayer}
                        players={gameInfo?.gamePlayers}
                        formData={gameInfo?.gameData}
                        imageSrc={preloadedAssets?.introBgImage}
                        setCurrentScreenId={setCurrentScreenId}
                        demoBlocks={demoBlocks}
                        preloadedAssets={preloadedAssets}
                        ModelPlayer={ModelPlayer}
                        learnerPlayList={learnerPlayList}
                        setLearnerPlayingDetails={setLearnerPlayingDetails}
                        selectedBackground={selectedBackground}
                        backgroundtheme={backgroundtheme}
                        />
                    </>
                  );
                case 13:
                  return (
                    <>
                    {/* old ui */}
                      <ChapterPage
                        handleReplayButtonClick={handleReplayButtonClick}
                        setCurrentQuestNo={setCurrentQuestNo}
                        questState={questState}
                        setQuestState={setQuestState}
                        backgroundImg={preloadedAssets.backgroundImage}
                        setCurrentScreenId={setCurrentScreenId}
                        setData={setData}
                        setType={setType}
                        setOptions={setOptions}
                        setFeedbackList={setFeedbackList}
                        preloadedAssets={preloadedAssets}
                        currentScreenId={currentScreenId}
                        profileData={profileData}
                        gameInfo={gameInfo}
                        learnerPlayList={learnerPlayList}
                        setLearnerPlayingDetails={setLearnerPlayingDetails}
                        setAssignId={setAssignId}
                        AssignId={AssignId}
                        setActivitydata={setActivitydata}
                        Activitydata={Activitydata}
                        setprevBlock={setprevBlock}
                        prevBlock={prevBlock}
                        getData={getData}
                        setNavi={setNavi}
                        setFeed={setFeed}
                        setRepeatSelectOption={setRepeatSelectOption}
                        RepeatPrevOption={RepeatPrevOption}
                        setRepeatPrevOption={setRepeatPrevOption}
                        setReplayIsOpen={setReplayIsOpen}
                        setReplayState={setReplayState}
                        setIsZoomComplete={setIsZoomComplete}
                  isZoomComplete={isZoomComplete}
                  scoreChapter={scoreChapter}
                  setScoreChapter={setScoreChapter}
                  questWisePlayerScore={questWisePlayerScore}
                  setQuestWisePlayerScore={setQuestWisePlayerScore}
                  checkCompletionBadge={checkCompletionBadge}
                      />

                      {/* <ChaptersFutureTheme
                          handleReplayButtonClick={handleReplayButtonClick}
                          setCurrentQuestNo={setCurrentQuestNo}
                          questState={questState}
                          setQuestState={setQuestState}
                          backgroundImg={preloadedAssets.backgroundImage}
                          setCurrentScreenId={setCurrentScreenId}
                          setData={setData}
                          setType={setType}
                          setOptions={setOptions}
                          setFeedbackList={setFeedbackList}
                          preloadedAssets={preloadedAssets}
                          currentScreenId={currentScreenId}
                          profileData={profileData}
                          gameInfo={gameInfo}
                          learnerPlayList={learnerPlayList}
                          setLearnerPlayingDetails={setLearnerPlayingDetails}
                          setAssignId={setAssignId}
                          AssignId={AssignId}
                          setActivitydata={setActivitydata}
                          Activitydata={Activitydata}
                          setprevBlock={setprevBlock}
                          prevBlock={prevBlock}
                          getData={getData}
                          setNavi={setNavi}
                          setFeed={setFeed}
                          setRepeatSelectOption={setRepeatSelectOption}
                          RepeatPrevOption={RepeatPrevOption}
                          setRepeatPrevOption={setRepeatPrevOption}
                          setReplayIsOpen={setReplayIsOpen}
                          setReplayState={setReplayState}
                          setIsZoomComplete={setIsZoomComplete}
                          isZoomComplete={isZoomComplete}
                          scoreChapter={scoreChapter}
                          setScoreChapter={setScoreChapter}
                          questWisePlayerScore={questWisePlayerScore}
                          setQuestWisePlayerScore={setQuestWisePlayerScore}
                          checkCompletionBadge={checkCompletionBadge}
                        /> */}
                    </>
                  );
                case 14:
                  return (
                    <FeedBackScreen
                      backgroundScreenUrl={preloadedAssets?.backgroundImage}
                      isScreenshot={isScreenshot}
                      FeedbackremainingSentences={FeedbackremainingSentences}
                      setisScreenshot={setisScreenshot}
                      options={options}
                      FeedBackselectedoptionData={FeedBackselectedoptionData}
                      FeedBackoptionData={FeedBackoptionData}
                      getFeedbackData={getFeedbackData}
                      data={data}
                      currentScreenId={currentScreenId}
                      getData={getData}
                      profile={profile}
                      preloadedAssets={preloadedAssets}
                      profileData={profileData}
                      interactionBlockArray={interactionBlockArray}
                      FeedbackcurrentPosition={FeedbackcurrentPosition}
                      setFeedbackCurrentPosition={setFeedbackCurrentPosition}
                      setCurrentScreenId={setCurrentScreenId}
                      gameInfo={gameInfo}
                      setAudioObj={setAudioObj}
                      firstLoading={firstLoading}
                      setFirstLoading={setFirstLoading}
                      InterActionScore={InterActionScore}
                      setCurrentQuestNo={setCurrentQuestNo}
                      NonPlayerNameLanguage={NonPlayerNameLanguage}
                    />
                  );
                  break;
                default:
                  console.warn(
                    'game details of the data',
                    gameInfo?.gameData,
                    currentScreenId,
                  );
                  return <h1>Loading Screen .... Default case </h1>;
              }
            })()}
          </Flex>

          {audioObj.type === EnumType.BGM && (
            <audio
              ref={backgroundBgmRef}
              loop={audioObj.loop}
              style={{ display: 'block' }}
            >
              <source src={audioObj.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
          {audioObj.type === EnumType.VOICE && (
            <audio ref={voiceRef} style={{ display: 'block' }}>
              <source src={audioObj.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </motion.div>
        : ""
      }
    </ProfileContext.Provider>
  );
};

export default EntirePreview;