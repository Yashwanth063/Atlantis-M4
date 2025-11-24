import {
  Box,
  Grid,
  GridItem,
  Img,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import TypingEffect from './Typing';
import InteractionScreenShot from './InteractionScreenShot';
import { API_SERVER } from 'config/constant';
import { ProfileContext } from '../EntirePreview';
import Scrollbar from 'components/customScroll/CustomScroll';
import BackgroundGLB from './BackgroundFeedback';
import ReplayPoints from './ReplayPoints';

interface FeedBackScreenShotProps {
  backgroundScreenUrl: any;
  currentScreenId: any;
  isScreenshot: any;
  FeedbackremainingSentences?: any;
  options: any;
  getData: any;
  data: any;
  FeedBackselectedoptionData?: any;
  FeedBackoptionData?: any;
  feed?: any;
  getFeedbackData?: any;
  profile: any;
  setisScreenshot: any;
  preloadedAssets: any;
  FeedbackcurrentPosition?: any;
  interactionBlockArray?: any;
  profileData?: any;
  setFeedbackCurrentPosition?: any;
  setCurrentScreenId?: any;
  gameInfo?: any;
  setAudioObj?: any;
  firstLoading: any;
  setFirstLoading: any;
  InterActionScore?: any;
  setCurrentQuestNo?: any;
  NonPlayerNameLanguage?: any;
  // setModalLoaded?:any;
  // modalLoaded?:any;
}
const FeedBackScreen: React.FC<FeedBackScreenShotProps> = ({
  backgroundScreenUrl,
  profile,
  isScreenshot,
  setisScreenshot,
  data,
  getData,
  FeedbackremainingSentences,
  options,
  currentScreenId,
  FeedBackselectedoptionData,
  FeedBackoptionData,
  feed,
  getFeedbackData,
  preloadedAssets,
  FeedbackcurrentPosition,
  interactionBlockArray,
  profileData,
  setFeedbackCurrentPosition,
  setCurrentScreenId,
  gameInfo,
  setAudioObj,
  setFirstLoading,
  firstLoading,
  InterActionScore,
  setCurrentQuestNo,
  NonPlayerNameLanguage
  // modalLoaded,
  // setModalLoaded
}) => {
  const [QuestContentByLanguage, setQuestContentByLanguage] = useState(null);
  const [FeedbackPositionStatus, setFeedbackPositionStatus] = useState<boolean>(false);
  const EnumType = {
    BGM: 'bgm',
    VOICE: 'voice',
  };
  const useData = useContext(ProfileContext);

  const [animateDialog, setAnimateDialog] = useState<boolean>(false);
  const [showTypingEffect, setShowTypingEffect] = useState<any>(false);

  const geTfeedBackoption = () => {
    setisScreenshot(false);

  };
  useEffect(() => {
    if (FeedbackPositionStatus === true) {
      setFeedbackPositionStatus(false);
    }
  }, []);
  useEffect(() => {
    if (isScreenshot === false) {
      // option === item?.qpOptions
      // options

      feedBackAudioPlay();
    }
    else {
      setAudioObj((prev: any) => ({
        ...prev,
        url: '',
        type: EnumType.VOICE,
        loop: false, // Voice doesn't loop
        autoplay: true, // Autoplay is disabled
      }));
    }

  }, [isScreenshot]);


  const feedBackAudioPlay = async () => {
    if (FeedBackselectedoptionData !== '' && profileData?.Audiogetlanguage.length === 0) {
      const FindUrl = options?.filter((item: any) => FeedBackselectedoptionData === item?.qpOptions)
      if (FindUrl?.length > 0) {
        try {
          const optionFeedBackAudio = FindUrl[0]?.qbfeedbackAudioUrl ? FindUrl[0]?.qbfeedbackAudioUrl : '';

          if (optionFeedBackAudio !== '') {
            const fullUrl = `${API_SERVER}${optionFeedBackAudio}`;
            const responseblockText = await fetch(fullUrl);
            if (responseblockText.ok) {
              setAudioObj((prev: any) => ({
                ...prev,
                url: fullUrl,
                type: EnumType.VOICE,
                loop: false, // Voice doesn't loop
                autoplay: true, // Autoplay is disabled
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    else {
      if (profileData?.Audiogetlanguage.length !== 0) {
        const FindUrl = options?.filter((item: any) => FeedBackselectedoptionData === item?.qpOptions)

        if (FindUrl.length > 0) {
          const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
            (key: any) => key?.textId === FindUrl[0]?.qpOptionId,
          );
          if (optionAudioFiltered.length > 0) {
            const getoptionsAudioFiltered = optionAudioFiltered.filter(
              (key: any) => key?.fieldName === 'qpFeedback',
            );
            if (getoptionsAudioFiltered.length > 0) {
              try {
                const QOTaudioUrls = getoptionsAudioFiltered[0]?.audioUrls ? getoptionsAudioFiltered[0]?.audioUrls : '';
                if (QOTaudioUrls !== '') {
                  const qpOptionTextUrl = `${API_SERVER}${QOTaudioUrls}`;
                  const responseqpOptionText = await fetch(qpOptionTextUrl);
                  if (responseqpOptionText.ok) {
                    setAudioObj((prev: any) => ({
                      ...prev,
                      url: qpOptionTextUrl,
                      type: EnumType.VOICE,
                      // volume: '0.5',
                      loop: false,
                      autoplay: true,
                    }));
                  }
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }

        }

      }
    }
  }

  const setAudioForfeedBack = () => {
    if (profileData?.Audiogetlanguage.length !== 0) {
      const GetblocktextAudioFiltered =
        profileData?.Audiogetlanguage.filter(
          (key: any) => key.textId === FeedBackoptionData[0].blockId,
        );

      if (GetblocktextAudioFiltered.length > 0) {
        const Filteredcontent = GetblocktextAudioFiltered.filter(
          (item: any) => item?.fieldName === 'blockText',
        );

        setQuestContentByLanguage(Filteredcontent[0]?.content ? Filteredcontent[0]?.content : null);
      }
    }
  }
  useEffect(() => {
    if (FeedBackoptionData !== null) {
      if (FeedBackoptionData[0]?.blockId) {
        setAudioForfeedBack();
      }
    }
  }, [FeedBackoptionData]);

  const previousScreen = () => {
    const setPositionForFeedBack = FeedbackcurrentPosition === 1 ? FeedbackcurrentPosition - 1 : FeedbackcurrentPosition > 1 ? FeedbackcurrentPosition - 2 : null;

    if (setPositionForFeedBack !== null && FeedbackcurrentPosition !== 1) {
      setFeedbackCurrentPosition(setPositionForFeedBack);
      setFeedbackPositionStatus(true)
      return;
    }
    else {
      setFeedbackCurrentPosition(0);
      if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4); //Navigate to leaderboard
        return false;
      }
      else {
        const LastquestNo = parseInt(profile.currentQuest);
        setCurrentQuestNo(LastquestNo);
        setCurrentScreenId(6);
        // setCurrentScreenId(13);
        return false;
      }
    }
  }

  useEffect(() => {
    if (FeedbackPositionStatus === true) {
      getFeedbackData();
      setFeedbackPositionStatus(false);
    }
  }, [FeedbackPositionStatus]);

  useEffect(() => {
    setAnimateDialog(false)
  }, [firstLoading, showTypingEffect]);

  const Updatecontent = () => {
    useData?.setMotionEffect(true);
    setTimeout(() => {
      useData?.setMotionEffect(false);
    }, 1000)
    
      setAnimateDialog(true)
      setTimeout(() => {
        setFirstLoading(false);

      }, 500)
    
  };


  return (
    <>
      {/* <BackgroundGLB preloadedAssets={preloadedAssets}  />  */}

      {firstLoading === false ?
        <>
          <Box
            position="relative"
            w={'100%'}
            height="100vh"
             backgroundImage={`url(${backgroundScreenUrl})`}
            // backgroundImage={backgroundScreenUrl}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
            className="chapter_potrait"
          >
            {/*** Background GLB Added */}
            <Box
              position="relative"
              w={'100%'}
              height="100vh"
              className="chapter_potrait"
              zIndex={0}
            >
              {/* { isScreenshottrack &&  */}
              {/* <BackgroundGLB preloadedAssets={preloadedAssets} isScreenshot={isScreenshot} isScreenshottrack={isScreenshottrack}/>  */}
              {/* } */}

            </Box>
            {/***End Background GLB Added */}
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
                <Box w={'fit-content'} display={'flex'} position={'relative'}>
                  <Img
                    src={preloadedAssets.feedi}
                    className="story_note_image"
                    loading="lazy"
                  />
                  <Box
                    position={'absolute'}
                    top={{ base: '5%', md: '6%' }}
                    className="story_feedback_content"
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      h={'100%'}
                    >
                      <Box
                        w={'90%'}
                        h={'70%'}
                        display={'flex'}
                        justifyContent={'center'}
                        position={'relative'}
                      >
                        <Img
                          src={preloadedAssets?.feedparch}
                          w={'auto'}
                          h={'100%'}
                        />
                        <Box
                          position={'absolute'}
                          top={{ base: '-7px', sm: '-7px', lg: '-15px' }}
                          width={'100%'}
                          h={'100%'}
                          display={'flex'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <Box w={'70%'} >
                            <Img src={preloadedAssets.on} h={'4vh'} w={'100%'} />
                            <Box w={'90%'} display={'flex'} justifyContent={'flex-end'} position={'relative'} onClick={() => (true)}>
                              {/* <Img src={preloadedAssets.ModelQ} className='feedback_unknown' />
                              <Text className='exlamatry'>!</Text> */}
                              <Img onClick={() => setisScreenshot(true)} cursor="pointer" src={preloadedAssets.ModelQ} className='feedback_unknown' />
                              {/* <Text className='exlamatry'>!</Text> */}
                              <Box onClick={() => setisScreenshot(true)} cursor="pointer">
                                <Text className='exlamatry'>!</Text>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="feed_list" position={'absolute'} top={'17%'}>
                            {' '}
                            Interaction{' '}
                            {currentScreenId === 14 &&
                              FeedbackcurrentPosition &&
                              interactionBlockArray &&
                              FeedbackcurrentPosition +
                              '/' +
                              interactionBlockArray}
                          </Box>
                          <Scrollbar width='70%' height='62%'>
                            <Box
                              w={'100%'}
                              h={'auto'}
                              // overflow={'hidden'}
                              className="feedback_content_text"
                            >
                              <Box display={'flex'} mt={'10px'} alignItems={'center'}>
                                <Img className="feedbackfb_icon" src={preloadedAssets.FB} h={'1em'} w={'1em'} mr={'8px'}  alignSelf="flex-start" />
                                {currentScreenId === 9 ? (
                                  <Text textAlign={'justify'}>
                                    feed
                                  </Text>
                                ) : (
                                  <Text>
                                    {FeedbackremainingSentences}
                                  </Text>
                                )}
                              </Box>
                            </Box>
                          </Scrollbar>
                        </Box>
                        <Box
                          w={'120%'}
                          mt={'20px'}
                          display={'flex'}
                          justifyContent={'space-between'}
                          cursor={'pointer'}
                          position={'absolute'}
                          bottom={'-8%'}
                        >
                          {currentScreenId === 14 ? <Img
                            src={preloadedAssets.left}
                            className={'interaction_button'}
                            onClick={() => previousScreen()}
                          /> : null}

                          <Img
                            src={preloadedAssets.right}
                            className={'interaction_button'}
                            onClick={() => getFeedbackData(data)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
          {isScreenshot === true && (
            <InteractionScreenShot
              data={FeedBackoptionData ?? ''}
              option={FeedBackselectedoptionData ?? ''}
              options={options ?? ''}
              backGroundImg={backgroundScreenUrl}
              geTfeedBackoption={geTfeedBackoption}
              isScreenshot={isScreenshot}
              preloadedAssets={preloadedAssets}
              profileData={profileData}
              currentScreenId={9}
              QuestContentByLanguage={QuestContentByLanguage}
              gameInfo={gameInfo}
              InterActionScore={InterActionScore}
              NonPlayerNameLanguage={NonPlayerNameLanguage}
            />
          )
          }
        </>
        :
        <Box className="chapter_potrait" position="relative"
          w={'100%'}
          height="100vh"
            backgroundImage={`url(${backgroundScreenUrl})`}
          // backgroundImage={backgroundScreenUrl}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}>
          {/*** Background GLB included */}
          {/* <BackgroundGLB preloadedAssets={preloadedAssets} isScreenshot={isScreenshot}/> */}
          {/* <BackgroundGLB preloadedAssets={preloadedAssets}/> */}
          {/*** End Background GLB included */}
          <Box
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Img className={'dialogue_image animateDialog'} src={preloadedAssets.dial} bottom={animateDialog ? '-200px' : '0'} />
            <Box position={'relative'}>
              <Box
                position={'fixed'}
                h={'auto'}
                w={'30%'}
                left={'5%'}
                bottom={animateDialog ? '-200' : '11.5vw'}
                className={'animateDialog title'}
              >
                <Img src={preloadedAssets.char} w={'100%'} height={'100%'} />
                <Box
                  position={'absolute'}
                  top={'31%'}
                  left={'25.5%'}
                  w={'48%'}
                  height={'42%'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontSize={{ base: '1.9rem', xl: '3rem' }}
                  fontWeight={500}
                  textAlign={'center'}
                  fontFamily={'AtlantisText'}
                  color={'#312821'}
                  textTransform={'capitalize'}
                >
                  <Text whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{'Narrator'}</Text>
                </Box>
              </Box>
            </Box>
            <Box
              className='dialogue_scroll animateDialog' bottom={animateDialog ? '-200px' : '16px'}>
              
               <Box className='feedbackpapercontent' paddingTop={'10px'}>
                
                <Text>Let us now see how you performed</Text>
              </Box>
            </Box>
            <Box
              display={'flex'}
              position={'fixed'}
              justifyContent={'space-between'}
              w={'95%'}
              bottom={animateDialog ? '-200px' : '0'}
              className={'animateDialog'}
            >
              <Box></Box>

              <Img
              className="rightside-button"
                src={preloadedAssets.right}
                // w={'70px'}
                // h={'50px'}
                onClick={() => Updatecontent()}
              />
            </Box>
          </Box>
        </Box>
      }
    </>
  );
};


const ThreeScene = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  useEffect(() => {
    const { current: container } = refContainer;
    if (container) {
      const canvas = document.createElement('canvas');
      canvas.className = 'webgl';
      container.appendChild(canvas);
    }
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    new RGBELoader().setPath('models').load('bg.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      const loader = new GLTFLoader().setPath('models');
      loader.load('Compressed.glb', async function (gltf) {
        gltf.scene.traverse(function (child: any) {
          /////////////////////
          if (child.isMesh && child.material.map) {
            child.material.map.minFilter = THREE.LinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
          }
        });
        const model = gltf.scene;
        model.rotation.y -= 1.15;
        model.position.x = -1.88;
        scene.add(model);
        setLoading(false);
      });
    });
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    window.addEventListener('resize', resizecallback);
    function resizecallback() {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    const aspectRatio = sizes.width / sizes.height;
    const camera = new THREE.PerspectiveCamera(
      65,
      sizes.width / sizes.height,
      1,
      1000,
    );
    camera.position.z = 8.9;
    camera.position.y = 1.7;
    scene.add(camera);
    const cursor = { x: 0, y: 0 };
    canvas.addEventListener('mousemove', movecallback, false);
    function movecallback(event: any) {
      cursor.x = (event.clientX / sizes.width) * 2 - 1;
      cursor.y = -(event.clientY / sizes.height) * 2 + 1;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0xffffff, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    function animate() {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate); // Call again on the next frame
    }
    animate();
  }, []);
  return (
    <div
      style={{ height: '100%', width: '100%', position: 'absolute' }}
      ref={refContainer}
    >
      {loading && (
        <span style={{ position: 'absolute', left: '50%', top: '50%' }}>
          Loading...
        </span>
      )}
    </div>
  );
};


export default FeedBackScreen;
