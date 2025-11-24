import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  Button,
} from '@chakra-ui/react';

import Scrollbar from 'components/customScroll/CustomScroll';
import { ScoreContext } from '../GamePreview';

// import ScreenshotBackground from './ScreenshotBackground';

interface InteractionScreenShotProps {
  data?: any;
  options?: any;
  backGroundImg?: any;
  option?: any;
  geTfeedBackoption?: any;
  isScreenshot?: any;
  preloadedAssets?: any;
  profileData?: any;

  currentScreenId?: number;
  QuestContentByLanguage: any;
  gameInfo: any;
  InterActionScore: any;
  NonPlayerNameLanguage: any;
}

const InteractionScreenShot: React.FC<InteractionScreenShotProps> = ({
  data,
  backGroundImg,
  option,
  options,
  geTfeedBackoption,
  isScreenshot,
  preloadedAssets,
  profileData,
  currentScreenId,
  QuestContentByLanguage,
  gameInfo,
  InterActionScore,
  NonPlayerNameLanguage,
}) => {
  const [ReOrderedOptions, setReOrderedOptions] = useState<any>(null);
  const { profile, setProfile } = useContext(ScoreContext);
  const [progressPercent, setProgressPercent] = useState<any>(0);
  const [totalPoints, settotalPoints] = useState<any>(InterActionScore ?? 0);
  const [preloaded, setPreloaded] = useState(preloadedAssets);

  const matchedAsset = preloaded?.BackgroundScreenshots?.find(
    (item: any) =>
      item?.name?.trim() === gameInfo?.assets?.gasAssetName?.trim(),
  );
  console.log(preloaded, 'preloaded');
  console.log(gameInfo, 'gameinfo');
  console.log(matchedAsset, 'matchedAsset');

  let contentRef = useRef<any>(null);
  let optionRef = useRef<any>([]);

  const progressResult = () => {
    //calculate Progress based on screen, Need to show different progress for current screen is in story, progress of the current quest, unless  show the entire game progress
    const currentQuestBlocks = gameInfo.blocks[profile.currentQuest];
    const totalblockCount =
      currentQuestBlocks && Object.keys(currentQuestBlocks).length;
    const keyWithValueOfCurrentBlock =
      currentQuestBlocks &&
      Object.keys(currentQuestBlocks).find((key: any) => {
        const obj = currentQuestBlocks[key];
        const blockPrimarySequence = obj?.blockPrimarySequence;
        if (blockPrimarySequence) {
          const hasMatchingSequence =
            blockPrimarySequence.trim() ===
            (data[0]?.blockPrimarySequence || '').trim();
          return hasMatchingSequence;
        }
        return false;
      });
    const progressBarRatio: any =
      keyWithValueOfCurrentBlock &&
      (parseInt(keyWithValueOfCurrentBlock) > 0
        ? (parseInt(keyWithValueOfCurrentBlock) - 1) / totalblockCount
        : 0);
    setProgressPercent(
      progressBarRatio && progressBarRatio > 0 ? progressBarRatio : 0,
    );
  };
  useEffect(() => {
    // const selectedIndex = options ? options?.findIndex((item: any) => item.qpOptions === option) : null;
    const getTotalPoint = options
      ? options?.filter((item: any) => item.qpOptions === option)
      : null;

    progressResult();
  }, []);

  const handleShowSelectedOption = () => {
    setTimeout(() => {
      const selectedElement: any = document.getElementsByClassName('Selected');
      const screenShotQuestion: any = document.getElementsByClassName(
        'story_screenshot_interaction_question',
      );
      const element: any = document.getElementById('scrollbar');

      if (!options || options.length === 0 || !selectedElement) {
        console.error(
          'options is not defined or empty, or selectedElement is missing',
        );
        return;
      }

      const getOptionsHeight = options.map((item: any) => {
        return document.getElementById(item?.qpOptions)?.scrollHeight;
      });

      const alphaIndex =
        options.findIndex(
          (item: any) => item?.qpOptions === selectedElement[0]?.title,
        ) || 0;
      const totalHeight = getOptionsHeight
        .slice(0, alphaIndex)
        .reduce((acc: any, tot: any) => acc + tot, 0);

      element.scrollTop =
        Math.abs(totalHeight + screenShotQuestion[0].scrollHeight) || 0;
    }, 50);
  };
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  console.log(isFirstInteraction,'isFirstInteraction')

// 👇 Ref that persists across all interaction modals
const hasShownBlinkRef = useRef(false);
// 👇 stays in memory across all renders
let hasBlinkShownGlobally = false;


console.log(hasBlinkShownGlobally,'hasBlinkShownGlobally')


  useEffect(() => {
    handleShowSelectedOption();
  }, [options]);

  return (
    <>
      {preloadedAssets.parch && (
        <Modal
          isOpen={true}
          onClose={isScreenshot}
          size={'medium'}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent
            className="feedback_screenshot"
            //  backgroundImage={NonPlayerNameLanguage ==='Medieval'? preloadedAssets.glb_room: preloadedAssets.robo_room}
            backgroundImage={matchedAsset?.src}
            backgroundSize={'cover'}
            filter={'contrast(70%)'}
            backgroundRepeat={'no-repeat'}
            boxShadow={'inset 0px 5px 100px 25px white'}
            borderRadius={'20px !important'}
            containerProps={{ zIndex: 99999 }}
            position="relative"
          >
            {/* Add BackgroundGLB as the background */}
          
            <ModalBody width={'100%'} height={'100%'}>
             {/* <Button
  className={isFirstInteraction ? 'blinking-wave-interaction' : ''}
  style={{
    float: 'right',
    marginRight: '-26px',
    background: 'none',
  }}
>
  <Img
    src={preloadedAssets.Close}
    onClick={() => {
      geTfeedBackoption();
      setIsFirstInteraction(false); 
    }}
    className="close_model"
  />
</Button> */}

<Button
  className={!hasBlinkShownGlobally ? 'blinking-wave-interaction' : ''}
  style={{
    float: 'right',
    marginRight: '-26px',
    background: 'none',
  }}
>
  <Img
    src={preloadedAssets.Close}
    onClick={() => {
      geTfeedBackoption();
      hasBlinkShownGlobally = true; // ✅ prevents blink for future screenshots
    }}
    className="close_model"
  />
</Button>



              <Box className="top-menu-home-section-screenshot">
                <Img
                  src={preloadedAssets.TopMenu}
                  borderRadius={'20px 20px 0px 0px'}
                  opacity={0.5}
                  className="top-menu-img"
                  style={{ top: '58px', width: '100%' }}
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
                      // backgroundImage={preloadedAssets.TooltipImg}
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
                      top={'58px'}
                    >
                      <Img
                        src={preloadedAssets.home}
                        width={'auto'}
                        height={'70%'}
                        position={'relative'}
                        zIndex={9999}
                      />
                    </Tooltip>
                    <Tooltip
                      label="Map"
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      background={'transparent'}
                      boxShadow={'unset'}
                      // backgroundImage={preloadedAssets.TooltipImg}
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
                        // backgroundImage={preloadedAssets.TooltipImg}
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
                                  length: Math.floor(
                                    (progressPercent * 100) / 10,
                                  ),
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
                        // backgroundImage={preloadedAssets.TooltipImg}
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

                      <Tooltip
                        label={'LeaderBoard'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        background={'transparent'}
                        boxShadow={'unset'}
                        // backgroundImage={preloadedAssets.TooltipImg}
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
                          width={'auto'}
                          height={'70%'}
                          position={'relative'}
                          zIndex={9999}
                          pointerEvents={'auto'}
                        />
                      </Tooltip>

                      <Tooltip
                        label="Settings"
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        background={'transparent'}
                        boxShadow={'unset'}
                        // backgroundImage={preloadedAssets.TooltipImg}
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
              {/* <BackgroundGLB preloadedAssets={preloadedAssets} /> */}
              <Box className="story_interaction_image_screenshot">
                <Box position={'relative'} h={'100%'}>
                  <Img
                    src={preloadedAssets.parch}
                    w={'auto'}
                    filter={'contrast(80%)'}
                    h={'100%'}
                    loading="lazy"
                  />
                  <Box
                    position={'absolute'}
                    top={{ sm: '18px', md: '8%' }}
                    h={'80% !important'}
                    className="story_interaction_image_screenshot_content"
                  >
                    <Box
                      textAlign={'center'}
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      fontWeight={700}
                      fontSize={{ md: '1.5vw', lg: '1.9vw' }}
                      fontFamily={'AtlantisText'}
                      lineHeight={1}
                      w={'100%'}
                      h={'5%'}
                      className="heading-div"
                    >
                      <Box w={'80%'}>Interaction </Box>
                    </Box>
                    <Box
                      textAlign={'center'}
                      h={'75%'}
                      display={'flex'}
                      // justifyContent={'center'}
                      alignItems={'center'}
                      fontWeight={500}
                      fontFamily={'AtlantisText'}
                      lineHeight={1.1}
                      w={'100%'}
                      marginTop={'10%'}
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
                      <Scrollbar height={'95%'} width={'70%'} id="scrollbar">
                        <Box className="story_screenshot_interaction_question">
                          <Box
                            className="screenshot_content"
                            w={'100%'}
                            // letterSpacing={1}
                            justifyContent={'flex-start'}
                          >
                            {/* <Img src={preloadedAssets.qs} h={'1em'} w={'1em'} /> */}
                            <Text
                              display={'flex'}
                              justifyContent={'flext-start'}
                              textAlign={'center'}
                              fontFamily={'AtlantisContent'}
                              lineHeight={'3.7vh'}
                              className="font_inter_ss"
                            >
                              <Img
                                src={preloadedAssets.qs}
                                h={'1em'}
                                w={'1em'}
                              />
                              {QuestContentByLanguage !== null
                                ? QuestContentByLanguage
                                : data !== ''
                                ? data[0]?.blockText
                                : ''}
                            </Text>
                          </Box>
                        </Box>
                        <div
                          className={'screenshot_interaction_options'}
                          id="screenshot_options"
                          ref={contentRef}
                        >
                          <Box w={'100%'}>
                            {options &&
                              options?.map((item: any, ind: number) => (
                                <Box
                                  w={'100%'}
                                  mb={'10px'}
                                  lineHeight={1}
                                  key={ind}
                                  color={
                                    option === item?.qpOptions
                                      ? 'purple'
                                      : 'black'
                                  }
                                  textAlign={'center'}
                                  cursor={'pointer'}
                                  fontFamily={'AtlantisContent'}
                                  id={`${item?.qpOptions}`}
                                  className={
                                    option === item?.qpOptions ? 'Selected' : ''
                                  }
                                  title={item?.qpOptions}
                                  ref={optionRef}
                                >
                                  <Img
                                    src={
                                      option === item?.qpOptions
                                        ? preloadedAssets.on
                                        : preloadedAssets.off
                                    }
                                    // h={'30px'}
                                    w={'100%'}
                                  />
                                  <Box className="story_interaction_option">
                                    {/* {item?.qpOptionText} */}
                                    {`${item?.qpOptions}) ${item?.qpOptionText}`}
                                  </Box>
                                </Box>
                              ))}
                          </Box>
                        </div>
                      </Scrollbar>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default InteractionScreenShot;
