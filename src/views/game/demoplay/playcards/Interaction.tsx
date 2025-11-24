import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Scrollbar from 'components/customScroll/CustomScroll';
import ScrollbarInteraction from 'components/customScroll/CustomScrollInteraction'
import { ScoreContext } from '../GamePreview';
interface InteractionProps {
  // backGroundImg: any;
  data: any;
  options: any;
  optionClick: any;
  InteractionFunction: () => void;
  option: any;
  navTrack?: any;
  preloadedAssets: any;
  selectedPlayer: any;
  LastModiPrevData: any;
  RepeatSelectOption: any;
  RepeatPrevOption: any;
  contentByLanguage: any;
  currentScreenId?: number;
  gameInfo: any;
  animateInteraction?: boolean;
  handleValidate?: any;
  questState?: any;
  isInteractionButtonDisabled?: any;
  handleInteractionBackClick?: any;
  SetAudioOptions?: any;
   setPrevselectoptions:any;
  prevSelectOption:any;
}

const Interaction: React.FC<InteractionProps> = ({
   setPrevselectoptions,
  prevSelectOption,
  data,
  isInteractionButtonDisabled,
  handleInteractionBackClick,
  option,
  options,
  optionClick,
  InteractionFunction,
  navTrack,
  preloadedAssets,
  selectedPlayer,
  LastModiPrevData,
  RepeatSelectOption,
  RepeatPrevOption,
  contentByLanguage,
  currentScreenId,
  gameInfo,
  animateInteraction,
  handleValidate,
  questState,
  SetAudioOptions,
}) => {
  const [reapeatprevSelectOption, setRepeatselectoptions] = useState<any>();
  // const [prevSelectOption, setPrevselectoptions] = useState<any>([]);
  const { profile, setProfile } = useContext(ScoreContext);
  const [hasClicked, setHasClicked] = useState(false);
  useEffect(() => {
    if (RepeatSelectOption === true) {
      // setPrevselectoptions([]);
      if (RepeatPrevOption.length > 0) {
        const prevoptionseleted = RepeatPrevOption;

        // return;
        setRepeatselectoptions(prevoptionseleted);
      }
    } else {
      setRepeatselectoptions([]);
    }
  }, [RepeatSelectOption]);

  useEffect(() => {
      setPrevselectoptions(null);
    if (profile.score.length > 0 && !RepeatSelectOption) {
      let getOption: any = [];
      let updatedscore: any = [];

      if (questState[parseInt(profile?.currentQuest)] === 'Started') {
        // Remove matching object from profile?.score
        getOption = profile?.score?.find(
          (item: any) => item?.seqId == data?.blockPrimarySequence,
        );
      } else if (
        questState[parseInt(profile?.currentQuest)] === 'replayallowed'
      ) {
        // Remove matching object from profile?.replayScore
        getOption = profile?.replayScore?.find(
          (item: any) => item?.seqId == data?.blockPrimarySequence,
        );
      }

      if (getOption) {
        const getFilterOption = options.filter(
          (item: any) => item?.qpOptions == getOption?.choosedoption,
        );
        setPrevselectoptions(getOption.choosedoption);
        SetAudioOptions(getFilterOption[0]);
        handleValidate(getFilterOption[0]);
      } else {
        setPrevselectoptions(option);
      }
    } else {
      setPrevselectoptions(option);
    }
  }, [ data?.blockPrimarySequence,
  options,
  questState,
  profile?.currentQuest,
  profile?.score,
  profile?.replayScore,
  RepeatSelectOption,]);


  useEffect(() => {
  const seq = data?.blockPrimarySequence;
  if (!seq) return;

  // Find the score entry (either normal or replay)
  const existingScore =
    questState &&
    (questState[parseInt(profile?.currentQuest)] === 'replayallowed'
      ? profile?.replayScore?.find((p: any) => p.seqId === seq)
      : profile?.score?.find((p: any) => p.seqId === seq));

  // ✅ If score exists, restore it — do NOT clear
  if (existingScore) {
    setPrevselectoptions(existingScore.choosedoption);
    const matched = options.find(
      (o: any) => o.qpOptions === existingScore.choosedoption
    );
    if (matched) {
      SetAudioOptions && SetAudioOptions(matched);
      handleValidate && handleValidate(matched);
    }
    return; // prevent any clearing below
  }

  // 🧹 If no saved score for this question, clear
  setPrevselectoptions(null);
  SetAudioOptions && SetAudioOptions(null);
}, [
  data?.blockPrimarySequence,
  profile?.score?.length,
  profile?.replayScore?.length,
  questState,
  options,
]);
  useEffect(() => {
    if (hasClicked === true) {
      setHasClicked(false);
    }
    if (profile.score.length > 0 && !RepeatSelectOption) {
      let getOption: any = [];
      let updatedscore: any = [];
      if (questState[parseInt(profile?.currentQuest)] === 'Started') {
        // Remove matching object from profile?.score
        getOption = profile?.score?.find(
          (item: any) => item?.seqId == data?.blockPrimarySequence,
        );
      } else if (
        questState[parseInt(profile?.currentQuest)] === 'replayallowed'
      ) {
        // Remove matching object from profile?.replayScore
        getOption = profile?.replayScore?.find(
          (item: any) => item?.seqId == data?.blockPrimarySequence,
        );
      }
      if (getOption) {
        const getFilterOption = options.filter(
          (item: any) => item?.qpOptions == getOption?.choosedoption,
        );
        setPrevselectoptions(getOption.choosedoption);
        SetAudioOptions(getFilterOption[0]);
      } else {
        setPrevselectoptions(option);
      }
    } else {
      setPrevselectoptions(option);
    }
  }, [option]);
  const blockPrimarySequenceParts = data?.blockPrimarySequence.split('.');
  const primaryKey = blockPrimarySequenceParts
    ? parseInt(blockPrimarySequenceParts[0])
    : null;

  const sequenceMatches =
    primaryKey !== null &&
    gameInfo.blocks.hasOwnProperty(primaryKey) &&
    data?.blockPrimarySequence ===
      gameInfo.blocks[primaryKey]?.['1']?.blockPrimarySequence;
  const playerHeight = document.getElementById('player');

  return (
    <Box className="chapter_potrait" zIndex={9}>
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={4}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={'90%'}
      >
        <GridItem colSpan={1} position={'relative'}>
          <Box position={'relative'} className="story_interaction_image">
            <Img
              src={preloadedAssets.parch}
              w={'auto'}
              h={'100%'}
              loading="lazy"
            />
            <Box
              position={'absolute'}
              top={{ base: '5%', md: '6%' }}
              className="story_interaction_content"
            >
              <Box
                textAlign={'center'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={500}
                // fontSize={{ md: '3vw', lg: '2.5vw' }}
                fontFamily={'AtlantisText'}
                lineHeight={1}
                w={'100%'}
                h={'10%'}
                className={'interaction_heading_potrait'}
              >
                <Box w={'80%'} color={'#312821'}>
                  Interaction{' '}
                </Box>
              </Box>
              <Box
                textAlign={'center'}
                h={'50vh'}
                display={'flex'}
                // justifyContent={'center'}
                alignItems={'center'}
                fontWeight={500}
                fontFamily={'AtlantisText'}
                // lineHeight={1.1}
                w={'100%'}
                marginTop={'7%'}
                position={'relative'}
                flexDirection={'column'}
                css={{
                  // Hide scrollbar for webkit-based browsers (Safari, Chrome)
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  // Hide scrollbar for Mozilla-based browsers (Firefox)
                  'scrollbar-width': 'none', // For Firefox
                  '-ms-overflow-style': 'none', // For IE and Edge
                }}
              >
                {/* <Box w={'60%'}> */}
                <ScrollbarInteraction width={'70%'} className="custom-scroll-blink">
                  <Box
                    className={'story_intraction_question'}
                    justifyContent={'flex-start'}
                  >
                    <Img src={preloadedAssets.qs} h={'1em'} w={'1em'} />
                    <Text overflowWrap={'anywhere'}>
                      {contentByLanguage !== null
                        ? contentByLanguage
                        : data?.blockText}
                    </Text>
                  </Box>
                  <Box className="story_options_area">
                    <Box w={'100%'}>
                      {options &&
                        options.map((item: any, ind: number) => (
                          <Box
                            w={'100%'}
                            mb={'10px'}
                            lineHeight={1}
                            key={ind}
                            color={
                              reapeatprevSelectOption?.some(
                                (prev: any) => prev === item.qpOptions,
                              )
                                ? 'white'
                                : prevSelectOption === item.qpOptions
                                ? 'purple'
                                : ''
                            }
                            style={
                              reapeatprevSelectOption?.some(
                                (prev: any) => prev === item.qpOptions,
                              )
                                ? {
                                    opacity: 0.7,
                                    color: 'grey',
                                  }
                                : {}
                            }
                          >
                            <Box
                              w={'100%'}
                              mb={'10px'}
                              lineHeight={1}
                              key={ind}
                              color={
                                prevSelectOption === item.qpOptions
                                  ? 'purple'
                                  : ''
                              }
                              textAlign={'center'}
                              onClick={() => {
                                if (
                                  !reapeatprevSelectOption ||
                                  !reapeatprevSelectOption.some(
                                    (prev: any) => prev === item.qpOptions,
                                  )
                                ) {
                                  // setPrevselectoptions(item.qpOptions);
                                  optionClick(item);
                                }
                              }}
                              fontFamily={'AtlantisText'}
                            >
                              <Img
                                src={
                                  reapeatprevSelectOption?.some(
                                    (prev: any) => prev === item.qpOptions,
                                  )
                                    ? preloadedAssets.on
                                    : prevSelectOption === item.qpOptions
                                    ? preloadedAssets.on
                                    : preloadedAssets.off
                                }
                                opacity={
                                  reapeatprevSelectOption?.some(
                                    (prev: any) => prev === item.qpOptions,
                                  )
                                    ? 0.5
                                    : 1
                                }
                                h={'4vh'}
                                w={'100%'}
                              />
                              <Box
                                className={'story_interaction_option'}
                                overflowWrap={'anywhere'}
                              >
                                {`${String.fromCharCode(65 + ind)}). ${
                                  item?.qpOptionText
                                }`}
                              </Box>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </ScrollbarInteraction>
                {/* </Box> */}
              </Box>
              <Box w={'98%'} display={'flex'} justifyContent={'space-between'}>
                {sequenceMatches ? (
                  <Img />
                ) : (
                  <Img
                    src={preloadedAssets.left}
                    className={'interaction_button'}
                    // onClick={() => { LastModiPrevData(data) }}
                    onClick={() => {
                      handleInteractionBackClick(data); // ## use updated back click
                    }}
                  />
                )}

                {/* {prevSelectOption !== null && (
                  <Box className={'blinking-wave'} borderRadius={'50%'}>
                    <Img
                      src={preloadedAssets.right}
                      className={'interaction_button'}
                      onClick={() => {
                        if (!hasClicked) {
                          setHasClicked(true);
                          InteractionFunction();
                        }
                      }}
                    />
                  </Box>
                )} */}
                {prevSelectOption !== null &&
  (!RepeatSelectOption ||
    (RepeatSelectOption &&
      reapeatprevSelectOption &&
      !reapeatprevSelectOption.includes(prevSelectOption))) && (
    <Box className={'blinking-wave'} borderRadius={'50%'}>
      <Img
        src={preloadedAssets.right}
        className={'interaction_button'}
        onClick={() => {
          if (!hasClicked) {
            setHasClicked(true);
            InteractionFunction();
          }
        }}
      />
    </Box>
  )}

              </Box>
            </Box>
          </Box>
          {/* </motion.div> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Interaction;
