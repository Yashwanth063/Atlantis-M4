import { Box, Img } from '@chakra-ui/react';
import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { preloadedImages, preloadedGLBFiles } from 'utils/hooks/function';
import { assetImageSrc } from 'utils/hooks/imageSrc';
import { useParams } from 'react-router-dom';
// import {
//   getGameCreatorDemoData,getAnimations
// } from 'utils/game/gameService';
import {
  getScormGameDemoData,getAnimations
} from 'utils/scormGameControl/scormgamecontrol';
import { getscormAssignedGame } from 'utils/scormApplication/scormgamePlayService';
import LoadImg from "assets/gif/SpartanGif.gif";
import { API_SERVER } from 'config/constant';
import Medieval from 'assets/glb/MedievalArtisanNPC 2.glb';
import FuturisticMaleUser from 'assets/glb/03 FuturisticMaleUser.glb';
import FuturisticFemaleUser from 'assets/glb/FuturisticFemaleUser 3.glb';
import RealFemaleUser from 'assets/glb/RealFemaleUser.glb';
import RealMaleUser from 'assets/glb/RealMaleUser.glb';
import RealFactorySupervisor from 'assets/glb/RealFactorySupervisor.glb';
import RealFemaleManager from 'assets/glb/RealFemaleManager.glb';
import RealTeamMember from 'assets/glb/RealTeamMember.glb';
import MedievalFemaleUser from 'assets/glb/04 MedievalFemaleUser.glb';
import MedievalMaleUser from 'assets/glb/05 MedievalMaleUser.glb';
import MedievalCastleMember from 'assets/glb/06 MedievalCastleMember.glb';
import FuturisticTeamMember from 'assets/glb/07 FuturisticTeamMember.glb';
import FuturisticCarOwner from 'assets/glb/08 FuturisticCarOwner.glb';
import MedievalMerchant from 'assets/glb/09 MedievalMerchant.glb';
import FuturisticScientist from 'assets/glb/10 FuturisticScientist.glb';
import Robo from 'assets/glb/Robo.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion } from 'framer-motion';
import NoAuth from './playcards/NoAuth';
import EntirePreview from './EntirePreview';
// import NPC from 'assets/glb/Character_sample.glb';
import CompressedRoom from 'assets/glb/Compressed_room.glb';
import medievalcastle from 'assets/glb/medievalcastle.glb';
import MedievalEmporium from 'assets/glb/MedievalEmporium.glb';
import furturisticCity from 'assets/glb/Futuristiccity.glb';
import futuristicLab from 'assets/glb/Futuristiclab.glb';
import futuristicOffice from 'assets/glb/Futuristicoffice.glb';
import Magicaloffice from 'assets/glb/Magicaloffice.glb';
import Magicalunderground from 'assets/glb/Magicalunderground.glb';
import Realisticoffice from 'assets/glb/Realisticoffice.glb';
import Realworkplace from 'assets/glb/Realworkplace.glb';
import Realfactory from 'assets/glb/Realfactory.glb';
import collector from 'assets/glb/FuturisticFemaleUser 3.glb';
import Magicalgarden from 'assets/glb/Magicalgarden.glb';
import MagicalFemaleUser from 'assets/glb/MagicalFemaleUser.glb';
import MagicalMaleUser from 'assets/glb/MagicalMaleUser.glb';
import MagicalFemalePotionSage from 'assets/glb/MagicalFemalePotionSage.glb';
import MagicalFemaleEnchantress from 'assets/glb/MagicalFemaleEnchantress.glb';
import MagicalMaleWizard from 'assets/glb/MagicalMaleWizard.glb';
import NPC from 'assets/glb/Character_sample.glb';
import MobileOrientationPrompt from './playcards/MobileOrientationPrompt';
export const ScoreContext = createContext<any>(null);
export type ProfileType = {
  score: any[];
  // completionScore: any[];
  completedLevels: string[];
  compQuest: any[];
  currentQuest: any;
  replayScore: any[];
  playerGrandTotal: {
    questScores: Record<string, any>;
  };

  playerGender: any;
  PlayerName: any;
  completeBadgseShow: any[];
};

const initialProfileObject: ProfileType = {
  score: [],
  // completionScore:[],
  completedLevels: ['1'],
  compQuest: [],
  currentQuest: 1,
  replayScore: [],
  playerGrandTotal: { questScores: {} },
  playerGender: '',
  PlayerName: '',
  completeBadgseShow: []
};
export interface promptType {
  name: string;
  value: any;
  DelseQ: string | number;
  quest: number;
}
interface GameDetailsProps {
  ScormGame:any;
}
const GamePreview: React.FC<GameDetailsProps> = ({
  ScormGame
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scormDetails,setScormdetails] = useState<any>(ScormGame);
  // const {learner_game_play_id} = useParams();
  const InitialScreenId = useRef(10);
  const [gameInfo, setGameInfo] = useState<any | null>(null);
  const [profile, setProfile] = useState(initialProfileObject);
  const [contentReady, setContentReady] = useState<boolean>(null);
  const [apiImageSet, setApiImageSet] = useState<any>();
  const [staticAssetImageUrls, setStaticAssetImageUrls] = useState<any>(null);
  const [apiUrlAssetImageUrls, setApiUrlAssetImageUrls] = useState<any>(null); //preloaded Api image urls
  const [assignedData, setAssignedData] = useState<any>({});
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const [loadedGLBs, setLoadedGLBs] = useState<any>(null);
  const [selectedBackground, setSelectedBackground] = useState<any>(null);
  const [animationOptions, setAnimationOptions] = useState<any>(null);
  const [glbName, setGlbName] = useState<any>(null);
  const [timer, setTimer] = useState<any>(false);
  const [seconds, setSeconds] = useState<number | null>(null);
 

  const [isAuthFailed, setIsAuthFailed] = useState<{
    status: boolean;
    authMsg: string;
    reviewStatus: boolean;
  }>({ status: false, authMsg: '', reviewStatus: false });
  const user: any = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!gameInfo) return;

    const init = async () => {
      try {
        // 🚀 Run all async fetches in parallel
        const [resolvedResult, preloadedGLBs] = await Promise.all([
          preloadedImages(assetImageSrc), // preload images
          (async () => {
            const gamebackground = String(gameInfo?.assets?.gasId);
            const gamecharacter = String(
              gameInfo?.gameData?.gameNonPlayingCharacterId,
            );

            const allGLBs = [
              // Backgrounds
              {
                assetType: 'backgroundGlb',
                uniqueId: '1',
                src: CompressedRoom,
                type: 'background',
              },
              {
                assetType: 'castleGlb',
                uniqueId: '2',
                src: medievalcastle,
                type: 'background',
              },
              {
                assetType: 'emporiumGlb',
                uniqueId: '3',
                src: MedievalEmporium,
                type: 'background',
              },
              {
                assetType: 'furturisticCity',
                uniqueId: '4',
                src: furturisticCity,
                type: 'background',
              },
              {
                assetType: 'futuristicGlb',
                uniqueId: '5',
                src: futuristicLab,
                type: 'background',
              },
              {
                assetType: 'futuristicOffice',
                uniqueId: '6',
                src: futuristicOffice,
                type: 'background',
              },
              {
                assetType: 'OfficeGlb',
                uniqueId: '7',
                src: Magicaloffice,
                type: 'background',
              },
              {
                assetType: 'UndergroundGlb',
                uniqueId: '8',
                src: Magicalunderground,
                type: 'background',
              },
              {
                assetType: 'Magicalgarden',
                uniqueId: '9',
                src: Magicalgarden,
                type: 'background',
              },
              {
                assetType: 'Realfactory',
                uniqueId: '10',
                src: Realfactory,
                type: 'background',
              },
              {
                assetType: 'Realworkplace',
                uniqueId: '11',
                src: Realworkplace,
                type: 'background',
              },
              {
                assetType: 'RealOfficeGlb',
                uniqueId: '12',
                src: Realisticoffice,
                type: 'background',
              },

              // Characters
              {
                assetType: 'Lucas',
                uniqueId: '31',
                src: RealFactorySupervisor,
                type: 'character',
              },
              {
                assetType: 'Olivia',
                uniqueId: '32',
                src: RealFemaleManager,
                type: 'character',
              },
              {
                assetType: 'Ryan',
                uniqueId: '33',
                src: RealTeamMember,
                type: 'character',
              },
              {
                assetType: 'Tristan',
                uniqueId: '23',
                src: MedievalCastleMember,
                type: 'character',
              },
              {
                assetType: 'Lena',
                uniqueId: '27',
                src: FuturisticTeamMember,
                type: 'character',
              },
              {
                assetType: 'Nova',
                uniqueId: '25',
                src: FuturisticCarOwner,
                type: 'character',
              },
              {
                assetType: 'Belthor',
                uniqueId: '24',
                src: MedievalMerchant,
                type: 'character',
              },
              {
                assetType: 'Zane',
                uniqueId: '26',
                src: FuturisticScientist,
                type: 'character',
              },
              {
                assetType: 'Evelina',
                uniqueId: '22',
                src: Medieval,
                type: 'character',
              },
              {
                assetType: 'Nerina',
                uniqueId: '30',
                src: MagicalFemalePotionSage,
                type: 'character',
              },
              {
                assetType: 'Eldrin',
                uniqueId: '29',
                src: MagicalMaleWizard,
                type: 'character',
              },
              {
                assetType: 'Thalassa',
                uniqueId: '28',
                src: MagicalFemaleEnchantress,
                type: 'character',
              },

              // PCs
              {
                assetType: 'FuturisticMaleUser',
                uniqueId: '1',
                src: FuturisticMaleUser,
                theme: 'Future',
                type: 'pc',
              },
              {
                assetType: 'FuturisticFemaleUser',
                uniqueId: '2',
                src: FuturisticFemaleUser,
                theme: 'Future',
                type: 'pc',
              },
              {
                assetType: 'RealFemaleUser',
                uniqueId: '3',
                src: RealFemaleUser,
                theme: 'Real',
                type: 'pc',
              },
              {
                assetType: 'RealMaleUser',
                uniqueId: '4',
                src: RealMaleUser,
                theme: 'Real',
                type: 'pc',
              },
              {
                assetType: 'MedievalFemaleUser',
                uniqueId: '5',
                src: MedievalFemaleUser,
                theme: 'Medieval',
                type: 'pc',
              },
              {
                assetType: 'MedievalMaleUser',
                uniqueId: '6',
                src: MedievalMaleUser,
                theme: 'Medieval',
                type: 'pc',
              },
              {
                assetType: 'MagicalMaleUser',
                uniqueId: '7',
                src: MagicalMaleUser,
                theme: 'Magical',
                type: 'pc',
              },
              {
                assetType: 'MagicalFemaleUser',
                uniqueId: '8',
                src: MagicalFemaleUser,
                theme: 'Magical',
                type: 'pc',
              },
            ];

            // 🎨 derive theme
            let theme = '';
            if (['1', '2', '3'].includes(gamebackground)) theme = 'Medieval';
            else if (['4', '5', '6'].includes(gamebackground)) theme = 'Future';
            else if (['7', '8', '9'].includes(gamebackground))
              theme = 'Magical';
            else if (['10', '11', '12'].includes(gamebackground))
              theme = 'Real';

            const filteredCharacterGLBs = allGLBs.filter(
              (glb) =>
                glb.type === 'character' && glb.uniqueId === gamecharacter,
            );
            const filteredBackgroundGLBs = allGLBs.filter(
              (glb) =>
                glb.type === 'background' && glb.uniqueId === gamebackground,
            );
            const matchingPCAssets = allGLBs.filter(
              (glb) => glb.type === 'pc' && glb.theme === theme,
            );

            const themedGLBs = [
              ...filteredCharacterGLBs,
              ...filteredBackgroundGLBs,
              ...matchingPCAssets,
            ].map((glb) => ({ ...glb, theme }));

            return preloadedGLBFiles(themedGLBs); // batch load 🚀
          })(),
        ]);

        // ✅ Set images + GLBs at the same time
        setStaticAssetImageUrls(resolvedResult);
        setLoadedGLBs((prev: any) => ({ ...prev, preloadedGLBs }));

        // Mark components ready
        setComponentsLoaded(true);

       
      } catch (err) {
        console.error('Init failed:', err);
      }
    };

    init();
  }, [gameInfo]);

  useEffect(() => {
    scormDetails?.ScormGamePlayId && fetchCreatorDemoData();
  }, [scormDetails?.ScormGamePlayId]);

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen(); // For Chrome, Safari, and Opera
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen(); // For Internet Explorer/Edge
    } else {
      // alert('Fullscreen API is not supported by your browser.');
    }
  };
  const fetchCreatorDemoData = async () => {
    const LearnerId = scormDetails?.scormLearnerId;
    if (!LearnerId) {
 setIsAuthFailed({
        status: true,
        authMsg: 'Your session has timed out. Please login then try again.',
        reviewStatus: false,
      });
      return;
    }
    let gameId = scormDetails?.ScormGamePlayId;
    const gamedata = await getScormGameDemoData(gameId, LearnerId);
    console.log("gamedata of SCORM:",gamedata)
    if (!gamedata?.error && gamedata) {
      updateCreatorGameInfo(gamedata);
      const backgroundIdselected = gamedata?.result?.gameBackgroundId;

      setSelectedBackground(backgroundIdselected);
      setIsAuthFailed({ status: false, authMsg: '', reviewStatus: false });
    } else {
      setIsAuthFailed({
        status: true,
        authMsg: 'Game is not availble at the moment..!',
        reviewStatus: false,
      });
    }
    const animationOptions = await getAnimations(gameId);
    if (!animationOptions?.error) {
      setAnimationOptions(animationOptions?.data);
      setGlbName(animationOptions?.assetImages?.gasglbname);
      setIsAuthFailed({ status: false, authMsg: '', reviewStatus: false });
    } else {
      setIsAuthFailed({
        status: true,
        authMsg: 'Game is not availble at the moment..!',
        reviewStatus: false,
      });
    }
  };
  const updateCreatorGameInfo = async (info: any) => {
    const {
      gameview,
      image,
      lmsblocks,
      lmsquestionsoptions,
      gameQuest,
      ...gameData
    } = info?.result;

    setProfile((prev: any) => ({
      ...prev,
      PlayerName: info?.LearnerDetails?.ctName,
      playerGender: info?.LearnerDetails?.ctGender,
    }));
    const sortBlockSequence = (blockArray: []) => {
      const transformedArray = blockArray.reduce((result: any, obj: any) => {
        const groupKey = obj?.blockQuestNo.toString();
        const seqKey = obj?.blockPrimarySequence.toString()?.split('.')[1];
        if (!result[groupKey]) {
          result[groupKey] = {};
        }
        result[groupKey][seqKey] = obj;
        return result;
      }, {});
      return transformedArray;
    };

    setGameInfo({
      learnerDetails : info?.LearnerDetails,
      gameId: info?.result?.gameId,
      gameData: gameData,
      gameHistory: gameview,
      assets: image,
      blocks: sortBlockSequence(lmsblocks),
      gameQuest: gameQuest, //used for completion screen
      completionQuestOptions: gameQuest,
      questOptions: lmsquestionsoptions,
      reflectionQuestions: info?.resultReflection,
      gamePlayers: info?.assets?.playerCharectorsUrl,
      bgMusic:
        gameData?.gameIntroMusicName && gameData?.gameIntroMusic
          ? gameData?.gameIntroMusicName
          : '',
      gameNonPlayerUrl:
        info?.assets?.npcUrl && API_SERVER + '/' + info?.assets?.npcUrl,
    });
    const apiImageSetArr: any = [
      { assetType: 'backgroundImage', src: image?.gasAssetImage },
      {
        assetType: 'nonplayerImage',
        src: API_SERVER + '/' + info?.assets?.npcUrl,
      },
    ];
    let playerCharectorsUrls = info?.assets?.playerCharectorsUrl.map(
      (item: any, index: number) => {
        let objValue = API_SERVER + '/' + item;
        let objKey = `playerCharacterImage_${index}`;
        apiImageSetArr.push({ assetType: objKey, src: objValue });
      },
    );
    let gameQuestBadges = await Promise.all(
      info?.assets?.badges.map(async (item: Record<string, string>) => {
        Object.entries(item).forEach(([key, value]) => {
          let objkeyValue = key.split('_')[1];
          let objKey = `Quest_${objkeyValue}`;
          let objKeyValue = API_SERVER + '/' + value;
          let badgeUrl = value.split('.');
          const shadowBadgeUrl = badgeUrl[0] + '-shadow.' + badgeUrl[1];
          apiImageSetArr.push({ assetType: objKey, src: objKeyValue });
          apiImageSetArr.push({
            assetType: objKey + '-shadow',
            src: API_SERVER + '/' + shadowBadgeUrl,
          });
        });
        setApiImageSet(apiImageSetArr);
        return true;
      }),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedResult: any = await preloadedImages(apiImageSet);
        setApiUrlAssetImageUrls(resolvedResult);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };
    apiImageSet && fetchData();
  }, [apiImageSet]);
  const preloadedAssets = useMemo(() => {
    return { ...apiUrlAssetImageUrls, ...staticAssetImageUrls, ...loadedGLBs };
  }, [apiUrlAssetImageUrls, staticAssetImageUrls, loadedGLBs]);
  useEffect(() => {
    if (
      gameInfo &&
      apiUrlAssetImageUrls &&
      Object.keys(apiUrlAssetImageUrls).length > 0 &&
      staticAssetImageUrls &&
      Object.keys(staticAssetImageUrls).length > 0 &&
      loadedGLBs &&
      Object.keys(loadedGLBs).length > 0 &&
      componentsLoaded === true
    ) {
      setContentReady(true);
      setIsAuthFailed({ status: false, authMsg: '', reviewStatus: false });
    } else {
      setContentReady(false);
    }
  }, [
    gameInfo,
    apiUrlAssetImageUrls,
    staticAssetImageUrls,
    loadedGLBs,
    componentsLoaded,
  ]);
   const  learner_game_play_id  = scormDetails?.ScormGamePlayId;
  useEffect(() => {
    const fetchData = async () => {
          const learnerid = scormDetails.scormLearnerId;
          console.log(learnerid,'learneridimgameprevoe')
      const result = await getscormAssignedGame(learner_game_play_id,learnerid);
      if (result?.status === 'Success') {
        // setAssignId(result?.LearnerPlayinggame?.gaId);
        const learnerPlayingDetails = result?.LearnerPlayinggame
          ?.learnerGameplayDetails
          ? JSON.parse(result?.LearnerPlayinggame?.learnerGameplayDetails)
          : null;

        if (!result?.LearnerPlayinggame?.learnerGameplayDetails) {
          setSeconds(0);
        } else {
          const data = JSON.parse(
            result?.LearnerPlayinggame?.learnerGameplayDetails,
          );
          const totalTimeSpent = data?.totalTimeSpent;

          setAssignedData(data);
          const convertToSeconds = (time: any) => {
            const [minutes, seconds] = time.split(':').map(Number);
            return minutes * 60 + seconds;
          };

          // Access totalTimeSpent and convert it to seconds

          const totalTimeInSeconds = convertToSeconds(totalTimeSpent);

          setSeconds(totalTimeInSeconds);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthFailed.status === true || contentReady === true) {
      setIsLoading(false);
      setTimer(true);
    }
  }, [isAuthFailed, contentReady, isLoading]);

  return (
    <>
      <Box background={'black'} h={'100vh'} width={'100vw'}>
        <MobileOrientationPrompt onRotate={() => {}} />

        {isLoading && <InitialLoader />}
        {isAuthFailed.status === true && (
          <NoAuth
            isAuthFailed={isAuthFailed.status}
            status={isAuthFailed.authMsg}
            bgImage={preloadedAssets.introBgImage}
            isLoading={isLoading}
            reviewStatus={isAuthFailed.reviewStatus}
          />
        )}
        {contentReady === true && gameInfo?.gameId && (
          <ScoreContext.Provider value={{ profile, setProfile }}>
            <Box id="container">
              <Box>
                <Box id="EntirePreview-wrapper">
                  <Box className="EntirePreview-content">
                    <Box id="container" className="Play-station">
                      <EntirePreview
                       scormDetails={scormDetails}
                        gameInfo={gameInfo}
                        preloadedAssets={preloadedAssets}
                        InitialScreenId={InitialScreenId.current}
                        setIsAuthFailed={setIsAuthFailed}
                        isAuthFailed={isAuthFailed}
                        isLoading={isLoading}
                        glbName={glbName}
                        timer={timer}
                        setTimer={setTimer}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        selectedBackground={selectedBackground}
                        assignedData={assignedData}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScoreContext.Provider>
        )}
      </Box>
    </>
  );
};
export default GamePreview;

function InitialLoader() {
  return (
    <>
      <Box className="Entire-Loader" style={{ zIndex: '99999 !important' }}>
        <motion.div
          className="Entire-Loader-wrapper"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ zIndex: '99999 !important',opacity: 1 }}
        >
          <Img src={LoadImg} className="load"
          style={{ zIndex: '99999999 !important',opacity: 1 }} />
        </motion.div>
      </Box>
    </>
  );
}




