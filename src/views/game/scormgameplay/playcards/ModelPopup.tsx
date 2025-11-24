import React, { useContext, useState } from 'react'
import { Box, Button, Img} from '@chakra-ui/react';
import { ScoreContext,ProfileType } from '../GamePreview';
import { motion } from 'framer-motion';
import { ProfileContext } from '../EntirePreview';
interface ModelPopupProps {
  data?: any;
  options?: any;
  backGroundImg?: any;
  option?: any;
  profile?: any;
  geTfeedBackoption?: any;
  preloadedAssets?: any;
  getPrevLogDatas: any
  setCurrentScreenId: any;
  setData: any;
  setType: any;
  gameInfo: any;
  setOptions: any;
  gameInfoquest: any;
  gameinfodata: any;
  isStoryScreen: any;
  isSetStoryScreen: any;
  setPreLogDatas: any;
  profileData: any;
  setQuestState: any;
  setReplayState: any;
  setReplayIsOpen: any;
  replayState?: string;
}

const ModelPopup: React.FC<ModelPopupProps> = ({ data, backGroundImg, option, options, geTfeedBackoption, preloadedAssets, getPrevLogDatas, setCurrentScreenId, setType, setData, gameInfo, setOptions, gameInfoquest, gameinfodata, isStoryScreen, isSetStoryScreen, setPreLogDatas, profileData, setQuestState, setReplayState, setReplayIsOpen,replayState}) => {
  const [QuestScreen, SetQuestScreen] = useState<boolean>(false);
  const [QuestSelectionPage, SetQuestSelectionPage] = useState<boolean>(false);
  const [PlayAgain, SetPlayAgain] = useState<boolean>(false);
  const initialProfileObject: ProfileType = {
    score: [],
    // completionScore: [],
    completedLevels: ['1'],
    compQuest:[],
    currentQuest: 1,
    replayScore: [],
    playerGrandTotal: { questScores: {} },
    playerGender:'',
    PlayerName:'',
    completeBadgseShow: []
  };
  const { profile, setProfile } = useContext(ScoreContext);
  const useData = useContext(ProfileContext)
  const NextScreen = () => {
    // setPreLogDatas((prev:any) => ({...prev,previewProfile:{ ...formState,
    //   score:getPrevLogDatas.previewProfile.score ? getPrevLogDatas.previewProfile.score : []}}))
    useData?.setMotionEffect(true);
    setTimeout(()=> {
    setQuestState({});
    setPreLogDatas((prev: any) => ({
      ...prev,
      nevigatedSeq: [],
      screenIdSeq: [],
      lastActiveBlockSeq: '',
      lastModifiedBlockSeq: null,
      lastBlockModifiedDate: null,
      selectedOptions: '',
      previewScore:initialProfileObject,
      previewProfile:{...getPrevLogDatas.previewProfile,score:[]},
      questState:{},
    }));
    setProfile(initialProfileObject);
    setReplayState('');
    setReplayIsOpen(false);
    setCurrentScreenId(1);
  },300)
  }
  const continueScreen = () => {
    useData?.setMotionEffect(true);
    setTimeout(()=> {
      if (getPrevLogDatas.screenIdSeq.length > 0) {
        const screenlast = getPrevLogDatas.screenIdSeq;
        const getLastScreenId = screenlast[0];
        if (getLastScreenId === 2) {
          setPreLogDatas(getPrevLogDatas)
          setReplayState('Prompt');
          setReplayIsOpen(true);
          return false;
        }
        else {
          setPreLogDatas(getPrevLogDatas)
          setCurrentScreenId(getLastScreenId);
          return false;
        }
      }
    },300)
  }
  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === 'lastpausedQuest' && checked) {

      SetQuestScreen(true);
      SetQuestSelectionPage(false);
      SetPlayAgain(false);
      return false;
    }
    else if (name === 'questSelectionPage' && checked) {
      SetQuestScreen(false);
      SetQuestSelectionPage(true);
      SetPlayAgain(false);
      return false;
    }
    else if (name === 'playAgain' && checked) {
      SetQuestScreen(false);
      SetQuestSelectionPage(false);
      SetPlayAgain(true);
      return false;
    }
  }
  const HandleScreen = () => {
    if (QuestScreen === true) {
      if (getPrevLogDatas.nevigatedSeq) {
        const getnevigatedSeq = getPrevLogDatas.nevigatedSeq;
        const convertArray = Object.keys(getnevigatedSeq);
        const getLastquest = convertArray[convertArray.length - 1];
        const findseq = getnevigatedSeq[getLastquest];
        const getLastSeq = findseq[getnevigatedSeq[getLastquest].length - 1];
        const lenCompleteQuest = Object.keys(getnevigatedSeq);
        let checkcompleteQuest = lenCompleteQuest;

        if (Object.keys(gameInfo).length !== convertArray.length) {
          checkcompleteQuest.push((convertArray.length + 1).toString());
        }

        let SetLastSeqData: any;
        for (const key in gameInfo[getLastquest]) {
          const data = gameInfo[getLastquest][key];
          if (data.blockPrimarySequence == getLastSeq) {
            SetLastSeqData = data;
            break;
          }

        }
        setData(SetLastSeqData);
        setType(SetLastSeqData.blockChoosen);
        if (
          SetLastSeqData.blockChoosen ===
          'Interaction'
        ) {
          const optionsFiltered = [];
          const primarySequence = getLastSeq;

          for (const option of gameInfoquest) {
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
          if (gameinfodata === 'true') {
            for (let i = optionsFiltered.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [optionsFiltered[i], optionsFiltered[j]] = [
                optionsFiltered[j],
                optionsFiltered[i],
              ]; // Swap elements at indices i and j
            }
          }
          setOptions(optionsFiltered);
        }
        //isSetStoryScreen(false);
        // setReplayState(null)
        setCurrentScreenId(2);
        return false;
      }
    }
    else if (QuestSelectionPage === true) {
      //isSetStoryScreen(false);
      setCurrentScreenId(13);
      return false;
    }
    else if (PlayAgain === true) {
      setPreLogDatas((prev: any) => ({
        ...prev,
        nevigatedSeq: [],
        screenIdSeq: [],
        lastActiveBlockSeq: '',
        selectedOptions: '',
      }));
      //isSetStoryScreen(false);
      return false;
    }
  }
  const HandleBlockScreen = () => {
    return false;
  }

  return (
    <>
      <Box id="container" className="Play-station">
        <Box className="top-menu-home-section">
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
              <Img src={preloadedAssets?.Replay} className="setting-pad" />
              <Box className="replay-vertex">
                <Box
                  w={'100%'}
                  h={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Box className="replay_game_text">
                    { 'No blocks available. Click "Okay" to redirecting to the initial block'}
                  </Box>

                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    w={'100%'}
                  >
                    {replayState === 'Prompt'  ?   <>
                      <Button background={'transparent !important'}>
                        <Img
                          src={preloadedAssets?.No}
                          onClick={NextScreen}
                          className="replay_game_btn_cancel"
                        />
                      </Button>
                      <Button background={'transparent !important'}>
                        <Img
                          src={preloadedAssets?.Yes}
                          className="replay_game_btn"
                        />
                      </Button>
                    </> :
                      <>
                        <Button background={'transparent !important'}>
                          <Img
                              src={preloadedAssets?.No}
                            onClick={NextScreen}
                            className="replay_game_btn_cancel"
                          />
                        </Button>
                        <Button background={'transparent !important'}>
                          <Img
                            src={preloadedAssets?.Yes}
                            className="replay_game_btn"
                            onClick={continueScreen}
                          />
                        </Button>
                      </>
                    }
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ModelPopup;