// Chakra Imports
import { Box, Grid, GridItem, Img, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState,useMemo } from 'react';
import Interaction from './Interaction';
import TypingEffect from './Typing';
import { motion } from 'framer-motion';
import { API_SERVER } from 'config/constant';
import { ScoreContext } from '../GamePreview';
import 'assets/css/CustomScroll.css';
import Scrollbar from 'components/customScroll/CustomScroll';
import LoadImg from "assets/gif/SpartanGif.gif";

const Story: React.FC<{
  data?: any;
  type?: any;
  profileData: any;
  getData: any;
  options: any;
  handleValidate: any;
  resMsg: any;
  feed: any;
  formData: any;
  setAudioObj: any;
  selectedPlayer: any;
  setNavTrack: any;
  navTrack: any;
  gameInfo: any;
  preloadedAssets: any;
  LastModiPrevData: any;
  RepeatSelectOption: any;
  RepeatPrevOption: any;
  setScore: any;
  SetAudioOptions: any;
  score: any;
  AudioOptions: any;
  upComingBlockChoosen?: any;
  modalLoaded: any;
  learnerPlayList:any;
  option: any;
  SetGlbPlayingDetails:any;
  isZoomComplete:any;
  setIsZoomComplete:any;
  NonPlayerNameLanguage:any;
  setNonPlayerNameLanguage:any;
  questState:any;
  originalScore:any;
  setLearnerPlayingDetails:any;
  navi:any;
  currentBlock:any;
    setIsInteractionButtonDisabled:any;
  isInteractionButtonDisabled:any
  handleInteractionBackClick:any;

}> = ({
    setIsInteractionButtonDisabled,
  isInteractionButtonDisabled,
  handleInteractionBackClick,
  data,
  type,
  resMsg,
  feed,
  getData,
  profileData,
  options,
  setAudioObj,
  handleValidate,
  formData,
  selectedPlayer,
  setNavTrack,
  navTrack,
  gameInfo,
  preloadedAssets,
  LastModiPrevData,
  RepeatSelectOption,
  RepeatPrevOption,
  setScore,
  SetAudioOptions,
  score,
  AudioOptions,
  upComingBlockChoosen,
  modalLoaded,
  learnerPlayList,
  option,
  SetGlbPlayingDetails,
  setIsZoomComplete,
  isZoomComplete,
  setNonPlayerNameLanguage,
  NonPlayerNameLanguage,questState,originalScore,
  setLearnerPlayingDetails,navi,
  currentBlock,

}) => {

  console.log(options,'optionsinthework')
  useEffect(() => {
  
}, [currentBlock]);
console.log(currentBlock,'currentBlockinstru')
console.log(navi,'naviinstory')
const [currentBlockTest,setCurrentBlockTest] = useState(currentBlock)
useEffect(() => {

    setCurrentBlockTest(currentBlock);

}, [currentBlock]);

    const { profile, setProfile } = useContext(ScoreContext);
    const [showTypingEffect, setShowTypingEffect] = useState<any>(false);
    const [interactionNext, setInteractionNext] = useState(null);
    const [contentByLanguage, setContentByLanguage] = useState(null);
    const EnumType = {
      BGM: 'bgm',
      VOICE: 'voice',
    };
    const [animateNote, setAnimateNote] = useState<boolean>(false);
    const [animateDialog, setAnimateDialog] = useState<boolean>(false);
    const [animateInteraction, setAnimateInteraction] = useState<boolean>(false);
    const [animateFeedback, setAnimateFeedback] = useState<boolean>(false);
    const [basedOnNDI, setBasedOnNDI] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
     const [isBackDisabled, setIsBackDisabled] = useState(false);
 const audioFiles = {
 
    IntroMusic: require("../../../../assets/adiuo/intromusicone.mp3"),
    
  };
    const musicRef = React.useRef(null);
  
     useEffect(() => {
      if (isLoading) {
        // 🎵 Play Bill’s music when loader starts
        musicRef.current = new Audio(audioFiles.IntroMusic);
        musicRef.current.loop = true; // optional looping
        musicRef.current.volume = 0.8; // optional volume control (0–1)
        musicRef.current.play().catch((err:any) => {
          console.warn("Autoplay blocked by browser:", err);
        });
      } else {
        // ⏹️ Stop music when loader ends
        if (musicRef.current) {
          musicRef.current.pause();
          musicRef.current.currentTime = 0;
        }
      }
  
      // 🧹 Cleanup on unmount
      return () => {
        if (musicRef.current) {
          musicRef.current.pause();
          musicRef.current.currentTime = 0;
        }
      };
    }, [isLoading]);


    useEffect(() => {
      if (modalLoaded) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
      else {
        setIsLoading(true);
      }
    }, [modalLoaded]);



//     useEffect(() => {
//   if (modalLoaded) {
//     // First loader hold pannura (before fetch)
//     setTimeout(() => {
//       // fetchData call panniduvom
//       fetchData().then(() => {
//         // fetch complete aana aprum 4 sec loader show panniduvom
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000); // extra 4 sec
//       });
//     }, 2500);
//   } else {
//     setIsLoading(true);
//   }
// }, [modalLoaded]);




    useEffect(() => {

      if (data && type) {
        setAudioObj((prev: any) => ({
          ...prev,
          url: '',
          type: EnumType.VOICE,
          loop: false, // Voice doesn't loop
          autoplay: true, // Autoplay is disabled
        }));
        setAnimateInteraction(false)
        setShowTypingEffect(false);
        setTimeout(() => {
          interactionNext === true && setInteractionNext(false);
        }, 1000);
        if (type === 'Note' || type === 'Dialog' || type === 'Interaction') {
          SetAudioOptions({ qpOptionId: '' });
        }
        if (profileData?.Audiogetlanguage.length !== 0) {
          const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
            (key: any) => key?.textId === formData?.gameId,
          );
          const BlockTextFilter = profileData?.Audiogetlanguage.filter(
            (key: any) => key?.textId === data?.blockId,
          );
          if (BlockTextFilter.length > 0) {
            const blockTextgetFiltered = BlockTextFilter.filter(
              (key: any) => key?.fieldName === 'blockText',
            );
            if (blockTextgetFiltered.length > 0) {
              const BlockTextContent = blockTextgetFiltered[0]?.content ? blockTextgetFiltered[0]?.content : null;
              setContentByLanguage(BlockTextContent);
            }
          }

          if (GameLanguageFilter.length > 0) {
            const NonPlayerGameFiltered = GameLanguageFilter.filter(
              (key: any) => key?.fieldName === 'gameNonPlayerName',
            );
            if (NonPlayerGameFiltered.length > 0) {
              const NonplayerName = NonPlayerGameFiltered[0]?.content ? NonPlayerGameFiltered[0]?.content : formData?.gameNonPlayerName;
              setNonPlayerNameLanguage(NonplayerName);
            }
          }
        }
        else {
          setContentByLanguage(data?.blockText);
        }
        if (gameInfo.hasOwnProperty('blocks')) {
          let previousPrimarySeq = navTrack[navTrack.length - 1];
          if (previousPrimarySeq) {
            let currentQuest = previousPrimarySeq.split('.')[0];
            let previousBlock: any = Object.values(
              gameInfo?.blocks[currentQuest],
            )?.find((row: any) => {
              return row.blockPrimarySequence === previousPrimarySeq;
            });
            if (data.blockPrimarySequence !== previousPrimarySeq) {
              const newArray = navTrack;
              newArray.push(data.blockPrimarySequence);
              setNavTrack(newArray);
            }
          } else {
            setNavTrack([data.blockPrimarySequence]);
          }
        }
      }
    }, [data, type]);

    useEffect(() => {
      setAnimateInteraction(false);
    }, []);
    useEffect(() => {
      if (animateInteraction === true) {
        setAnimateInteraction(false)
      }

    }, [animateInteraction]);

    const AudioDuration =(audio:any,audioUrl:any,gettype?:any,FindCurrentPlayingData?:any)=>
          
    {
     
      audio.addEventListener('loadedmetadata', () => {
   console.log('gettypeinstory',gettype)
          console.log("Audio metadata loaded for:", audioUrl);
        const duration = audio.duration; // Duration in seconds
    console.log("FindCurrentPlayingData",FindCurrentPlayingData)
        let setWhospeaker:any='';
        let setcharacteraction:any='';
        let setcharacterName:any='';
        if(!['response','feedback','Note'].includes(gettype) && AudioOptions.qpOptionId=== '')
        {
          
          
          setWhospeaker = FindCurrentPlayingData.blockRoll === '99999' || FindCurrentPlayingData.blockRoll === 'Narrator'? 'Narrator' : FindCurrentPlayingData.blockRoll === '999999' ? 'PC' : 'NPC'
          // NonPlayerNameLanguage ? NonPlayerNameLanguage: '';
              console.log("FindCurrentPlayingData-setWhospeaker",setWhospeaker)

          setcharacteraction = FindCurrentPlayingData?.blockCharacterposesId ?? '';
        }
        else if(['Note'].includes(gettype) && AudioOptions.qpOptionId=== '')
        {
          setWhospeaker = 'Narrator';
          setcharacteraction = '';
        }
        else if(['Interaction'].includes(gettype) && AudioOptions.qpOptionId !== '')
        {
          setWhospeaker = 'PC' ;
          setcharacteraction = FindCurrentPlayingData?.qpEmotion ?? '';
        }
        else if(['response'].includes(gettype) && AudioOptions.qpOptionId !== '')
        {
          setWhospeaker = FindCurrentPlayingData.blockResponseRoll === '99999' || FindCurrentPlayingData.blockRoll === 'Narrator' ? 'Narrator' : FindCurrentPlayingData.blockResponseRoll === '999999' ? 'PC' : 'NPC';
          setcharacteraction = FindCurrentPlayingData?.qpResponseEmotion ?? '';
        }
        else if(['dialog'].includes(gettype) && AudioOptions.qpOptionId !== '')
          {
            setWhospeaker = FindCurrentPlayingData.blockResponseRoll === '99999' || FindCurrentPlayingData.blockRoll === 'Narrator'? 'Narrator' : FindCurrentPlayingData.blockResponseRoll === '999999' ? 'PC' : 'NPC';
            setcharacteraction = FindCurrentPlayingData?.qpResponseEmotion ?? '';
          }
        else if(['feedback'].includes(gettype) && AudioOptions.qpOptionId !== '')
        {
          // setWhospeaker = FindCurrentPlayingData.blockRoll === '99999' ? 'Narrator' : FindCurrentPlayingData.blockRoll === '999999' ? 'PC' : 'NPC';
          // setcharacteraction = '';
          setWhospeaker =  'Narrator';
          setcharacteraction = '';
        }
        SetGlbPlayingDetails({
          audioduration: duration,
          characteraction: setcharacteraction,
          whospeak: setWhospeaker,
        });
    
        // Clean up the object URL after use
        URL.revokeObjectURL(audioUrl);
      });
    }
    
    const fetchData = async () => {
      console.log(type,'typeinsoryvore')
      if (profileData?.Audiogetlanguage.length !== 0) {
        const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === formData?.gameId,
        );
        const BlockTextFilter = profileData?.Audiogetlanguage.filter(
          (key: any) => key?.textId === data?.blockId,
        );
        if (BlockTextFilter.length > 0) {
          const blockTextgetFiltered = BlockTextFilter.filter(
            (key: any) => key?.fieldName === 'blockText',
          );
          if (blockTextgetFiltered.length > 0) {
            const BlockTextContent = blockTextgetFiltered[0]?.content;
            setContentByLanguage(BlockTextContent);
          }
        }

        if (GameLanguageFilter.length > 0) {
          const NonPlayerGameFiltered = GameLanguageFilter.filter(
            (key: any) => key?.fieldName === 'gameNonPlayerName',
          );
          if (NonPlayerGameFiltered.length > 0) {
            const NonplayerName = NonPlayerGameFiltered[0]?.content ? NonPlayerGameFiltered[0]?.content : formData?.gameNonPlayerName;
            setNonPlayerNameLanguage(NonplayerName);
          }
        }
        setAudioObj((prev: any) => ({
          ...prev,
          url: '',
          type: EnumType.VOICE,
          loop: false, // Voice doesn't loop
          autoplay: true, // Autoplay is disabled
        }));

        if (AudioOptions.qpOptionId === '' && (type === 'Note' || type === 'Dialog' || type === 'Interaction')) {
          const GetblocktextAudioFiltered =
            profileData?.Audiogetlanguage.filter(
              (key: any) => key?.textId === data?.blockId,
            );
          if (GetblocktextAudioFiltered.length > 0) {
            const FilteredFieldName = GetblocktextAudioFiltered.map(
              (item: any) => item.fieldName,
            );
            const Filteredcontent = GetblocktextAudioFiltered.map(
              (item: any) => item.content,
            );

            if (FilteredFieldName[0] === 'blockText') {
              try {
                const normalizedPath = GetblocktextAudioFiltered[0]?.audioUrls ? GetblocktextAudioFiltered[0]?.audioUrls : '';
                if (normalizedPath !== '') {
                  const fullUrl = `${API_SERVER}${normalizedPath}`;
                  
                  const responseblockText = await fetch(fullUrl);
                  if (responseblockText.ok) {
                    setAudioObj((prev: any) => ({
                      ...prev,
                      url: fullUrl,
                      type: EnumType.VOICE,
                      loop: false, // Voice doesn't loop
                      autoplay: true, // Autoplay is disabled
                    }));
                    const audioBlob = await responseblockText.blob();
                    // Create a URL for the Blob
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // Create an Audio element and set the source to the Blob URL
                    const audio = new Audio(audioUrl);
                    SetGlbPlayingDetails({
                      audioduration:audio.duration,
                        characteraction:data.blockCharacterposesId,
                        whospeak:data.blockRoll === '99999'? 'Narrator' : data.blockRoll === '999999' ? 'PC': 'NPC',
                      }
                    );
                  }
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }
        } else {
          if (AudioOptions.qpOptionId) {
            const optionAudioFiltered = profileData?.Audiogetlanguage.filter(
              (key: any) => key?.textId === AudioOptions?.qpOptionId,
            );
            if (optionAudioFiltered.length > 0) {
              const getoptionsAudioFiltered = optionAudioFiltered.filter(
                (key: any) => key?.fieldName === 'qpOptionText',
              );
              const responseAudioFiltered = optionAudioFiltered.filter(
                (key: any) => key?.fieldName === 'qpResponse',
              );
              const FeedBackAudioFiltered = optionAudioFiltered.filter(
                (key: any) => key?.fieldName === 'qpFeedback',
              );
              if (type === 'Interaction') {
                if (getoptionsAudioFiltered.length > 0) {
                  try {
                    const normalizedPath = getoptionsAudioFiltered[0]?.audioUrls ? getoptionsAudioFiltered[0]?.audioUrls : '';
                    if (normalizedPath !== '') {
                      const qpOptionTextUrl = `${API_SERVER}${normalizedPath}`;
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
              else if (type === 'response') {
                if (responseAudioFiltered.length > 0) {
                  try {
                    const normalizedPath = responseAudioFiltered[0]?.audioUrls ? responseAudioFiltered[0]?.audioUrls : '';
                    console.log(normalizedPath,'normalizedPathinentire')
                    if (normalizedPath !== '') {
                      const qRespOptionTextUrl = `${API_SERVER}${normalizedPath}`;
                      console.log(qRespOptionTextUrl,'qRespOptionTextUrl')
                      const responseqpOptionText = await fetch(qRespOptionTextUrl);
                      if (responseqpOptionText.ok) {
                        setAudioObj((prev: any) => ({
                          ...prev,
                          url: qRespOptionTextUrl,
                          type: EnumType.VOICE,
                          // volume: '0.5',
                          loop: false,
                          autoplay: true,
                        }));
                      }
                    }
                  }
                  catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
              }
              else if (type === 'feedback') {
                if (FeedBackAudioFiltered.length > 0) {
                  try {
                    const normalizedPath = FeedBackAudioFiltered[0]?.audioUrls ? FeedBackAudioFiltered[0]?.audioUrls : '';
                    if (normalizedPath !== '') {
                      const qFeedTextUrl = `${API_SERVER}${normalizedPath}`;
                      const FeedBackOptionText = await fetch(qFeedTextUrl);
                      if (FeedBackOptionText.ok) {
                        setAudioObj((prev: any) => ({
                          ...prev,
                          url: qFeedTextUrl,
                          type: EnumType.VOICE,
                          // volume: '0.5',
                          loop: false,
                          autoplay: true,
                        }));
                      }
                    }
                  }
                  catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
              }
            }
          }
        }
      }
      else {
        if (data && type) {
          if (['Note', 'Dialog', 'Interaction'].includes(type) && AudioOptions?.qpOptionId === '') {
            if (data?.blockRoll !== '999999') {
              try {
                const normalizedPath = data?.blockAudioUrl ? data?.blockAudioUrl : '';
                if (normalizedPath !== '') {
                  const fullUrl = `${API_SERVER}${normalizedPath}`;
                   
                  const responseblockText = await fetch(fullUrl);
                   
                  if (responseblockText.ok) {
                  

                    setAudioObj((prev: any) => ({
                      ...prev,
                      url: fullUrl,
                      type: EnumType.VOICE,
                      loop: false, // Voice doesn't loop
                      autoplay: true, // Autoplay is disabled
                    }));
                    const audioBlob = await responseblockText.blob();
                    // Create a URL for the Blob
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // Create an Audio element and set the source to the Blob URL
                    const audio = new Audio(audioUrl);
                    AudioDuration(audio,audioUrl,type,data);
                 
                  }
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
            else {
              if ((profileData && ('gender' in profileData)) || learnerPlayList.player_gender) {
                if (learnerPlayList.player_gender ?learnerPlayList.player_gender==="male" : ['Male','male', 'Others'].includes(profileData?.gender)) {
                  try {
                    const normalizedPath = data?.blockAudioUrl ? data?.blockAudioUrl : '';
                    if (normalizedPath !== '') {
                      const fullUrl = `${API_SERVER}${normalizedPath}`;
                      const responseblockText = await fetch(fullUrl);
                      if (responseblockText.ok) {
                        setAudioObj((prev: any) => ({
                          ...prev,
                          url: fullUrl,
                          type: EnumType.VOICE,
                          loop: false, // Voice doesn't loop
                          autoplay: true, // Autoplay is disabled
                        }));
                        const audioBlob = await responseblockText.blob();
                        // Create a URL for the Blob
                        const audioUrl = URL.createObjectURL(audioBlob);
                        // Create an Audio element and set the source to the Blob URL
                        const audio = new Audio(audioUrl);
                        AudioDuration(audio,audioUrl,type,data);
                      }
                    }
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
                else if ((profileData?.gender === 'Female'|| 'female') || learnerPlayList.player_gender==="female" ) {
                  try {
                    const normalizedPath = data?.blockAudioUrlFemale ? data?.blockAudioUrlFemale : '';
                    if (normalizedPath !== '') {
                      const fullUrl = `${API_SERVER}${normalizedPath}`;
                      const responseblockText = await fetch(fullUrl);
                      if (responseblockText.ok) {
                        setAudioObj((prev: any) => ({
                          ...prev,
                          url: fullUrl,
                          type: EnumType.VOICE,
                          loop: false, // Voice doesn't loop
                          autoplay: true, // Autoplay is disabled
                        }));
                        const audioBlob = await responseblockText.blob();
                        // Create a URL for the Blob
                        const audioUrl = URL.createObjectURL(audioBlob);
    
                        // Create an Audio element and set the source to the Blob URL
                        const audio = new Audio(audioUrl);
                        AudioDuration(audio,audioUrl,type,data);
                      }
                    }
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
              }

            }
          }

          else if (AudioOptions?.qpOptionId !== '') {
            console.log('fineinworking')
            const FindUrl = options?.filter((item: any) => AudioOptions?.qpOptionId === item?.qpOptionId)
            console.log(FindUrl,'FindUrl')
            if (FindUrl?.length > 0) {
              try {
                if (type === 'Interaction') {
                  if ((profileData && ('gender' in profileData)) || learnerPlayList.player_gender) {
                    if (learnerPlayList.player_gender ? learnerPlayList.player_gender==="male" :['male','Male', 'Others'].includes(profileData?.gender)) {
                  const optionAudio = FindUrl[0]?.qbAudioUrl ? FindUrl[0]?.qbAudioUrl : '';
                  if (optionAudio !== '') {
                    const fullUrl = `${API_SERVER}${optionAudio}`;
                    const responseblockText = await fetch(fullUrl);
                    if (responseblockText.ok) {
                      setAudioObj((prev: any) => ({
                        ...prev,
                        url: fullUrl,
                        type: EnumType.VOICE,
                        loop: false, // Voice doesn't loop
                        autoplay: true, // Autoplay is disabled
                      }));
                      const audioBlob = await responseblockText.blob();
                      // Create a URL for the Blob
                      const audioUrl = URL.createObjectURL(audioBlob);
  
                      // Create an Audio element and set the source to the Blob URL
                      const audio = new Audio(audioUrl);
                     
                      AudioDuration(audio,audioUrl,type,FindUrl[0]);
                    }
                  }
                } else {
                  const optionAudio = FindUrl[0]?.qbAudioUrlFemale? FindUrl[0]?.qbAudioUrlFemale: '';
                  if (optionAudio !== '') {
                    const fullUrl = `${API_SERVER}${optionAudio}`;
                    const responseblockText = await fetch(fullUrl);
                    if (responseblockText.ok) {
                      setAudioObj((prev: any) => ({
                        ...prev,
                        url: fullUrl,
                        type: EnumType.VOICE,
                        loop: false, // Voice doesn't loop
                        autoplay: true, // Autoplay is disabled
                      }));
                      const audioBlob = await responseblockText.blob();
                      // Create a URL for the Blob
                      const audioUrl = URL.createObjectURL(audioBlob);
  
                      // Create an Audio element and set the source to the Blob URL
                      const audio = new Audio(audioUrl);
                     
                      AudioDuration(audio,audioUrl,type,FindUrl[0]);
                    }
                  }
                }
              }
                }                  
                else if (type === 'response') {
                  console.log('workignfineinrepsinse')
                  const optionResponseAudio = FindUrl[0]?.qbResponseAudioUrl ? FindUrl[0]?.qbResponseAudioUrl : '';
                  console.log(optionResponseAudio,'optionResponseAudio')
                  if (optionResponseAudio !== '') {
                    const fullUrl = `${API_SERVER}${optionResponseAudio}`;
                    const responseblockText = await fetch(fullUrl);
                    if (responseblockText.ok) {
                      setAudioObj((prev: any) => ({
                        ...prev,
                        url: fullUrl,
                        type: EnumType.VOICE,
                        loop: false, // Voice doesn't loop
                        autoplay: true, // Autoplay is disabled
                      }));
                      const audioBlob = await responseblockText.blob();
                      // Create a URL for the Blob
                      const audioUrl = URL.createObjectURL(audioBlob);
  
                      // Create an Audio element and set the source to the Blob URL
                      const audio = new Audio(audioUrl);
                      
                      AudioDuration(audio,audioUrl,type,FindUrl[0]);
                    }
                  }
                }
                else if (type === 'feedback') {
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
                      const audioBlob = await responseblockText.blob();
                      // Create a URL for the Blob
                      const audioUrl = URL.createObjectURL(audioBlob);
  
                      // Create an Audio element and set the source to the Blob URL
                      const audio = new Audio(audioUrl);
                     
                      AudioDuration(audio,audioUrl,type,FindUrl[0]);
                    }
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

    useEffect(() => {
      if (modalLoaded === true && isLoading === false ) {
        fetchData();
      }
    }, [data, type, AudioOptions, modalLoaded, isLoading]);

    useEffect(() => {
  
}, [learnerPlayList.firstTryScore]);

//     const InteractionFunction = () => {
//       setAnimateInteraction(true)
//       setTimeout(() => {  
//         const currentDateTime = new Date();
//         const day: String = String(currentDateTime.getDate()).padStart(2, '0');
//         const month: String = String(currentDateTime.getMonth() + 1).padStart(
//           2,
//           '0',
//         ); 
//         const year: String = String(currentDateTime.getFullYear());
//         const currentDate = `${day}-${month}-${year}`;
//         const getScore =profile?.score.find((item: any) => item.seqId === data?.blockPrimarySequence);
//         if (Object.keys(questState).length > 0) {
//         if (questState[profile?.currentQuest] === 'Started') {
//         setProfile((prev: any) => {
//           const { seqId, score: newScore, selectedOptioncheck } = score ?? { seqId:getScore?.seqId, score: getScore?.score, selectedOptioncheck:getScore?.choosedoption};
//           const index = prev.score.findIndex((item: any) => item.seqId === seqId);
       
//           const  currentnewBlock = currentBlockTest
         
//           if (index !== -1) {
//             const updatedScore = [...prev.score];
              
//             updatedScore[index] = { ...updatedScore[index], score: Number(newScore || 0),choosedoption: selectedOptioncheck, quest: parseInt(seqId.split('.')[0]) };
             
//            setLearnerPlayingDetails((prev: any) => ({
//   ...prev,
//   firstTryScore: [
//     ...prev.firstTryScore,
//     {
//       seqId:updatedScore[index].seqId,
//       quest: parseInt(updatedScore[index].seqId.split('.')[0]),
//       score: updatedScore[index].score
//     }
//   ],
// }));

             
//             return { ...prev, score: updatedScore};
//           }
//           if (index !== -1) {
//             const updatedScore = [...prev.score];
            
//             updatedScore[index] = { ...updatedScore[index], score: Number(newScore || 0),choosedoption: selectedOptioncheck, quest: parseInt(seqId.split('.')[0]) };
          
       

//             if(currentBlockTest === "Repeat Question")
//             {
              
//             setLearnerPlayingDetails((prev: any) => ({
//               ...prev,
//               firstTryScore: [...prev.firstTryScore, { quest: parseInt(seqId.split('.')[0]), score:  Number(newScore || 0) }],
//             }));
//             }
//             return { ...prev, score: updatedScore};
//           }
//           else {
//             const newScoreArray = [
//               ...prev.score,
//               {
//                 seqId: seqId,
//                 score: Number(newScore || 0),
//                 choosedoption: selectedOptioncheck,
//                 quest: parseInt(seqId.split('.')[0]),
//                 scoreEarnedDate: currentDate,
//               },
//             ];

           
          
//               setLearnerPlayingDetails((prev: any) => ({
//                 ...prev,
//                 firstTryScore: [...prev.firstTryScore, {seqId:seqId, quest: parseInt(seqId.split('.')[0]), score: Number(newScore || 0) }],
//               }));
    
//             return { ...prev, score: newScoreArray };
//           }
//         });
        
        
//       }else{
//         setProfile((prev: any) => {
//           const { seqId, score: newScore, selectedOptioncheck } = score ?? { seqId:getScore?.seqId, score: getScore?.score, selectedOptioncheck:getScore?.choosedoption};
//           const index = prev.replayScore.findIndex((item: any) => item.seqId === seqId);
//           if (index !== -1) {
//             const updatedScore = [...prev.replayScore];
//             updatedScore[index] = { ...updatedScore[index], score: Number(newScore || 0),choosedoption: selectedOptioncheck, quest: parseInt(seqId.split('.')[0]) };
//             return { ...prev, replayScore: updatedScore};
//           }
//           else {
           
//             const newScoreArray = [
//               ...prev.replayScore,
//               {
//                 seqId: seqId,
//                 score: Number(newScore || 0),
//                 choosedoption: selectedOptioncheck,
//                 quest: parseInt(seqId.split('.')[0]),
//                 scoreEarnedDate: currentDate,
//               },
//             ];

//             return { ...prev, replayScore: newScoreArray };
//           }
//         });
//       }
//     } else {
//       setProfile((prev: any) => {
//         const { seqId, score: newScore, selectedOptioncheck } = score ?? { seqId:getScore?.seqId, score: getScore?.score, selectedOptioncheck:getScore?.choosedoption};
//         const index = prev.score.findIndex((item: any) => item.seqId === seqId);
//         if (index !== -1) {
//           const updatedScore = [...prev.score];
//           updatedScore[index] = { ...updatedScore[index], score: Number(newScore || 0),choosedoption: selectedOptioncheck, quest: parseInt(seqId.split('.')[0]) };
//           return { ...prev, score: updatedScore};
//         }
//         else {
//           const newScoreArray = [
//             ...prev.score,
//             {
//               seqId: seqId,
//               score: Number(newScore || 0),
//               choosedoption: selectedOptioncheck,
//               quest: parseInt(seqId.split('.')[0]),
//               scoreEarnedDate: currentDate,
//             },
//           ];

//           return { ...prev, score: newScoreArray };
//         }
//       });
//     }

//         setInteractionNext(true);
//       }, 600)
//     };


const InteractionFunction = () => {
  setAnimateInteraction(true);

  setTimeout(() => {
    const currentDateTime = new Date();
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const year = String(currentDateTime.getFullYear());
    const currentDate = `${day}-${month}-${year}`;

    // ✅ Avoid running if score not yet chosen
    if (!score || !score.seqId) {
      console.log(
        "[InteractionFunction] Skipped save — no selection found for",
        data?.blockPrimarySequence
      );
      setInteractionNext(true);
      return;
    }

    const { seqId, score: newScore, selectedOptioncheck } = score;
    const questNo = parseInt(seqId.split(".")[0]);

    // Determine replay/first try mode
    const isReplay =
      Object.keys(questState).length > 0 &&
      questState[profile?.currentQuest] === "replayallowed";

    // ✅ Update score or replayScore safely
    setProfile((prev: any) => {
      const targetList = isReplay ? prev.replayScore : prev.score;
      const idx = targetList.findIndex((i: any) => i.seqId === seqId);
      const updatedList = [...targetList];
      const numericScore = Number(newScore || 0);

      if (idx !== -1) {
        // Update existing score safely
        updatedList[idx] = {
          ...updatedList[idx],
          score: RepeatSelectOption ? updatedList[idx].score : numericScore,
          choosedoption: selectedOptioncheck,
          quest: questNo,
          scoreEarnedDate: currentDate,
        };
      } else {
        // Add new score entry
        updatedList.push({
          seqId,
          score: numericScore,
          choosedoption: selectedOptioncheck,
          quest: questNo,
          scoreEarnedDate: currentDate,
        });

        // ✅ Only push first try to learnerPlayingDetails
        if (!isReplay) {
          setLearnerPlayingDetails((prevPlay: any) => ({
            ...prevPlay,
            firstTryScore: [
              ...prevPlay.firstTryScore,
              { seqId, quest: questNo, score: numericScore },
            ],
          }));
        }
      }

      return {
        ...prev,
        [isReplay ? "replayScore" : "score"]: updatedList,
      };
    });

    // ✅ Fully reset temporary state after saving
    if (typeof setScore === "function") {
      setScore({
        seqId: null,
        score: null,
        selectedOptioncheck: null,
      });
    }

    // ✅ Proceed to next question
    setInteractionNext(true);
  }, 600);
};
    useEffect(() => {
      if (interactionNext === true) {
        setInteractionNext(false);
        getData(data);
      }
    }, [interactionNext]);

    // const optionClick = (item: any) => {
    //   let updatedscore :any= [];
    //   if (questState[parseInt(profile?.currentQuest)] === 'Started') {
    //     updatedscore = profile?.score;
    //   }
    //   else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
    //     updatedscore = profile?.replayScore;
    //   }
    //   if(updatedscore.length > 0 && !RepeatSelectOption)
    //     {
    //       let getOption :any=[];
    //       if (questState[parseInt(profile?.currentQuest)] === 'Started') {
    //         getOption = profile?.score?.find((item: any) => item?.seqId == data?.blockPrimarySequence);
    //       }
    //       else if (questState[parseInt(profile?.currentQuest)] === 'replayallowed') {
    //         getOption = profile?.replayScore?.find((item: any) => item?.seqId == data?.blockPrimarySequence);
    //       }
    //      if(!getOption)
    //      {
    //       setScore({ seqId: item?.qpSequence, score: parseInt(item?.qpScore), selectedOptioncheck: item?.qpOptions });
    //       SetAudioOptions(item);
    //       handleValidate(item);
    //      }
    //     }
    //     else{
    //       setScore({ seqId: item?.qpSequence, score: parseInt(item?.qpScore), selectedOptioncheck: item?.qpOptions });
    //       SetAudioOptions(item);
    //       handleValidate(item);
    //     }
    // };



    
//      const optionClick = (item: any) => {
//   console.log("options-in optionsclick-item", item);
//   let updatedscore: any = [];

//   const currentQuest = parseInt(profile?.currentQuest);

//   if (questState[currentQuest] === 'Started') {
//     updatedscore = profile?.score;
//   } else if (questState[currentQuest] === 'replayallowed') {
//     updatedscore = profile?.replayScore;
//   }

//   if (updatedscore.length > 0 && !RepeatSelectOption) {
//     let getOption: any = [];
//     if (questState[currentQuest] === 'Started') {
//       getOption = profile?.score?.find(
//         (opt: any) => opt?.seqId == data?.blockPrimarySequence
//       );
//     } else if (questState[currentQuest] === 'replayallowed') {
//       getOption = profile?.replayScore?.find(
//         (opt: any) => opt?.seqId == data?.blockPrimarySequence
//       );
//     }

//     if (!getOption) {
//       console.log("Skipping score update for repeat question --1", score);

//       if (score?.selectedOptioncheck !== item?.qpOptions && score?.seqId !== item?.qpSequence) {
//         // ✅ first-time: update all fields
//         setScore({
//           seqId: item?.qpSequence,
//           score: parseInt(item?.qpScore),
//           selectedOptioncheck: item?.qpOptions
//         });
//       }  else if (RepeatSelectOption) {
//     // Repeat question => update only seqId & selected option, do NOT touch score
//     setScore((prev: any) => ({
//       ...prev,
//       seqId: item?.qpSequence,
//       selectedOptioncheck: item?.qpOptions,
//     }));
//   } else {
//     // Default fallback (first-time for this session)
//     setScore({
//       seqId: item?.qpSequence,
//       score: parseInt(item?.qpScore),
//       selectedOptioncheck: item?.qpOptions,
//     });
//   }

//       SetAudioOptions(item);
//       handleValidate(item);
//     }

//     if (!getOption && RepeatPrevOption) {
//       console.log("getOption inside updating---22", getOption);
//       console.log("getOption inside updating----RepeatPrevOption", RepeatPrevOption);
//     }

//   } else {
//     console.log("Skipping score update for repeat question --1", score);

//     if (score?.selectedOptioncheck !== item?.qpOptions && score?.seqId !== item?.qpSequence) {
//       // ✅ first-time or new block: update all fields
//       setScore({
//         seqId: item?.qpSequence,
//         score: parseInt(item?.qpScore),
//         selectedOptioncheck: item?.qpOptions
//       });
//     }  else if (RepeatSelectOption) {
//     // Repeat question => update only seqId & selected option, do NOT touch score
//     setScore((prev: any) => ({
//       ...prev,
//       seqId: item?.qpSequence,
//       selectedOptioncheck: item?.qpOptions,
//     }));
//   } else {
//     // Default fallback (first-time for this session)
//     setScore({
//       seqId: item?.qpSequence,
//       score: parseInt(item?.qpScore),
//       selectedOptioncheck: item?.qpOptions,
//     });
//   }

//     SetAudioOptions(item);
//     handleValidate(item);
//   }
// };

  const [prevSelectOption, setPrevselectoptions] = useState<any>([]);
     const optionClick = (item: any) => {
  console.log("options-in optionsclick-item", item);
  let updatedscore: any = [];

  const currentQuest = parseInt(profile?.currentQuest);

  if (questState[currentQuest] === 'Started') {
    updatedscore = profile?.score;
  } else if (questState[currentQuest] === 'replayallowed') {
    updatedscore = profile?.replayScore;
  }

  if (updatedscore.length > 0 && !RepeatSelectOption) {
    let getOption: any = [];
    if (questState[currentQuest] === 'Started') {
      getOption = profile?.score?.find(
        (opt: any) => opt?.seqId == data?.blockPrimarySequence
      );
    } else if (questState[currentQuest] === 'replayallowed') {
      getOption = profile?.replayScore?.find(
        (opt: any) => opt?.seqId == data?.blockPrimarySequence
      );
    }

    if (!getOption) {
      console.log("Skipping score update for repeat question --1", score);

      if (score?.selectedOptioncheck !== item?.qpOptions && score?.seqId !== item?.qpSequence) {
        // ✅ first-time: update all fields
        setScore({
          seqId: item?.qpSequence,
          score: parseInt(item?.qpScore),
          selectedOptioncheck: item?.qpOptions
        });
      }  else if (RepeatSelectOption) {
    // Repeat question => update only seqId & selected option, do NOT touch score
    setScore((prev: any) => ({
      ...prev,
      seqId: item?.qpSequence,
      selectedOptioncheck: item?.qpOptions,
    }));
  } else {
    // Default fallback (first-time for this session)
    setScore({
      seqId: item?.qpSequence,
      score: parseInt(item?.qpScore),
      selectedOptioncheck: item?.qpOptions,
    });
  }

      SetAudioOptions(item);
      handleValidate(item);
    }

    if (!getOption && RepeatPrevOption) {
      console.log("getOption inside updating---22", getOption);
      console.log("getOption inside updating----RepeatPrevOption", RepeatPrevOption);
    }

  } else {
    console.log("Skipping score update for repeat question --1", score);

    if (score?.selectedOptioncheck !== item?.qpOptions && score?.seqId !== item?.qpSequence) {
      // ✅ first-time or new block: update all fields
      setScore({
        seqId: item?.qpSequence,
        score: parseInt(item?.qpScore),
        selectedOptioncheck: item?.qpOptions
      });
    }  else if (RepeatSelectOption) {
    // Repeat question => update only seqId & selected option, do NOT touch score
    setScore((prev: any) => ({
      ...prev,
      seqId: item?.qpSequence,
      selectedOptioncheck: item?.qpOptions,
    }));
  } else {
    // Default fallback (first-time for this session)
    setScore({
      seqId: item?.qpSequence,
      score: parseInt(item?.qpScore),
      selectedOptioncheck: item?.qpOptions,
    });
  }

    SetAudioOptions(item);
    handleValidate(item);
  }
}; 
    

const Updatecontent = () => {
  // Always show typing effect, but continue with logic
  if (!showTypingEffect) {
    setShowTypingEffect(true);
  }

   // Move getData logic outside the else block
  if (upComingBlockChoosen !== 'Dialog') {
    setAnimateDialog(true);
    setTimeout(() => {
      getData(data);
    }, 500);
  } else {
    getData(data);
  }
};
    useEffect(() => {
      setAnimateNote(false)
      setAnimateDialog(false)
      setAnimateInteraction(false)
      setAnimateFeedback(false)
    }, [data, type, showTypingEffect, upComingBlockChoosen])


    const getNoteNextData = () => {
      setAnimateNote(true)
      setTimeout(() => {
        getData(data);
      }, 500)
    };
   
        const SkipContentForBackNavigation = () => {
  
  if (!showTypingEffect) {
    setShowTypingEffect(true);
  }

  LastModiPrevData(data);
};



const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
// const [isInteractionButtonDisabled, setIsInteractionButtonDisabled] = useState(false); 

// const handleInteractionBackClick = (data: any) => {
//   if (isInteractionButtonDisabled) return;

//   setIsInteractionButtonDisabled(true); // ## disable both arrows

//   LastModiPrevData(data); // ## call core function

//   setTimeout(() => {
//     setIsInteractionButtonDisabled(false); // ## enable both after delay
//   }, 2000); // ## 0.5s debounce
// };



const handleBackClick = (data: any) => {
  if (isButtonDisabled) return; // prevent double click

  setIsButtonDisabled(true); // ## disable both arrows

  LastModiPrevData(data); // ## previous nav logic

  setTimeout(() => {
    setIsButtonDisabled(false); // ## re-enable after delay
  }, 500); // delay in ms
};




    const upNext = () => {
      setAnimateFeedback(true)
      setTimeout(() => {
        getData(data)
      }, 500)
    }
    const parseSequence = (seq: any) => {
      return seq.split('.').map(Number);
    }
    const findPreviousSequence = (array: any, currentSeq: any) => {
      const parsedCurrentSeq = parseSequence(currentSeq);
      let previousSeq = null;
      if (array) {
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
      else {
        return previousSeq;
      }


    }
    const blockPrimarySequenceParts = data?.blockPrimarySequence.split('.');
    const primaryKey = blockPrimarySequenceParts ? parseInt(blockPrimarySequenceParts[0]) : null;
    const valuesArray = gameInfo.blocks && gameInfo.blocks[primaryKey] ? Object.values(gameInfo.blocks[primaryKey]) : null;
    const previousSeqObj = findPreviousSequence(valuesArray, data?.blockPrimarySequence);
    const checkInfo = primaryKey && gameInfo?.blocks && gameInfo?.blocks[primaryKey] ? Object.values(gameInfo?.blocks[primaryKey])?.some((item: any) => {
      return item?.blockPrimarySequence === data?.blockPrimarySequence;
    }) : null;
    let CheckPreviousData = null;
    if (checkInfo) {
      CheckPreviousData = data?.blockPrimarySequence
    }
    else {
      CheckPreviousData = previousSeqObj?.blockPrimarySequence
    }
    const sequenceMatches = primaryKey !== null &&
      gameInfo.blocks.hasOwnProperty(primaryKey) &&
      CheckPreviousData === gameInfo.blocks[primaryKey]?.['1']?.blockPrimarySequence;
    useEffect(() => {
      if (type === 'Note') {
        setBasedOnNDI('top center')
      }
      if (type === 'Dialog') {
        setBasedOnNDI('right bottom')
      }
      if (type === 'Interaction') {
        setBasedOnNDI('center bottom')
      }
    }, [type])
// Determine if this note is the first or last in the current sequence
let isFirstNote = false;
let isLastNote = false;

if (type === 'Note' && primaryKey !== null && gameInfo.blocks?.[primaryKey]) {
  const sequenceArray = Object.values(gameInfo.blocks[primaryKey])
    .sort((a: any, b: any) => {
      const aPart = parseInt(a.blockPrimarySequence.split('.')[1]);
      const bPart = parseInt(b.blockPrimarySequence.split('.')[1]);
      return aPart - bPart;
    });

  const currentIndex = sequenceArray.findIndex(
    (item: any) => item.blockPrimarySequence === data?.blockPrimarySequence
  );

  isFirstNote = currentIndex === 0;
  isLastNote = currentIndex === sequenceArray.length - 1;
}

   
console.log(sequenceMatches,'sequenceMatches')
 // Put this at the top of your component (inside the function body but outside return)
const memoizedIframe = useMemo(() => {
  const Link = contentByLanguage || data?.blockText;
  if (!Link) return null;

  const IframeContainer = ({ children }: { children: React.ReactNode }) => (
    <Box
      className="url_box"
      // w="calc(160vh - 28vh)"
       w="90%"
      h={['56vh']}
      // maxW="90vw"
       maxW="124vw"
      maxH="70vh"
      borderRadius="12px"
      overflow="hidden"
      mx="auto"
    >
      {children}
    </Box>
  );

  if (Link.includes('youtube.com') || Link.includes('youtu.be')) {
    const videoId = Link.includes('youtu.be')
      ? Link.split('youtu.be/')[1]
      : new URL(Link).searchParams.get('v');
    return (
      <IframeContainer>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width="100%"
          height="100%"
          title="YouTube video"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
         
        />
      </IframeContainer>
    );
  }

  if (Link.includes('vimeo.com')) {
    const videoId = Link.split('/').pop();
    return (
      <IframeContainer>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          width="100%"
          height="100%"
          title="Vimeo video"
          style={{ border: 'none' }}
          allow="autoplay; fullscreen; picture-in-picture"
         allowFullScreen
        />
      </IframeContainer>
    );
  }

  if (Link.startsWith('http')) {
    return (
      <IframeContainer>
        <iframe
          className="iframe_url"
          src={Link}
           width="100%"
          height="100%"
          title="Website preview"
          style={{
            border: 'none',
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </IframeContainer>
    );
  }

  return <Text textAlign="center">{Link}</Text>;
}, [data?.blockText, contentByLanguage]);

    return (
      <>
        <Box className='storyPart' backgroundPosition={basedOnNDI} >
          {isLoading
            && (
              <Box
                style={{
                  zIndex: 999999,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',

                }}
              >
                <InitialLoader />
              </Box>
            )}
          {!isLoading && (
            <>
              {data && type === 'Note' && (

                <Box
                  className="chapter_potrait"
                >
                  <Grid
                    templateColumns="repeat(1, 1fr)"
                    gap={4}
                    position="absolute"
                    top="52%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    className="story_note_grid"
                  >
                    <GridItem colSpan={1} position={'relative'}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: animateNote ? 0 : 1, scale: animateNote ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box display={'flex'} justifyContent={'center'}>
                          <Img
                            src={preloadedAssets.note}
                            className="story_note_image"
                            loading="lazy"
                          />

                          <Box className={'note_align'}>
                            <Text textAlign={'center'} className="note_title">
                              Note
                            </Text>
                          </Box>
                          <Box
                            className={'story_note_content'}
                          >
                            <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                              <Box className={'story_note_block'}>
                                <Scrollbar>
                                  {/* <Text textAlign={'center'} letterSpacing={'normal'}>
                                    {contentByLanguage !== null
                                      ? contentByLanguage
                                      : data?.blockText}
                                  </Text> */}

                                  {/* <Box textAlign="center" letterSpacing="normal">
  {isFirstNote && (
    <Text mb={2} fontWeight="bold">
      Introduction
    </Text>
  )}
  {isLastNote && (
    <Text mb={2} fontWeight="bold">
     Key Learnings
    </Text>
  )}
  <Text>
    {contentByLanguage !== null ? contentByLanguage : data?.blockText}
  </Text>
</Box> */}
<Box textAlign="center" letterSpacing="normal">
  {/* {isFirstNote && (
    <Text mb={2} fontWeight="bold">
      Introduction
    </Text>
  )}
  {isLastNote && (
    <Text mb={2} fontWeight="bold">
      Key Learnings
    </Text>
  )} */}

  {(() => {
    const noteText = contentByLanguage !== null ? contentByLanguage : data?.blockText || '';
    const [heading, ...rest] = noteText.split('<h1>');
    const normalText = rest.join('<h1>');

    return (
      <Box>
        {/* Show heading if present */}
        {heading && (
          <Text mb={2}  >
            {heading}
          </Text>
        )}

        {/* Render the rest (allowing <br> to become actual line breaks) */}
        {normalText && (
          <Text
            fontSize="md"
            
            whiteSpace="pre-line"
            dangerouslySetInnerHTML={{ __html: normalText }}
          />
        )}
      </Box>
    );
  })()}
</Box>


                                </Scrollbar>
                              </Box>
                            </Box>
                            <Box
                              className='story_block_btns_box'
                            >
                              <Box className="story_block_btns" justifyContent={!sequenceMatches ? 'space-between' : 'center'}>
                                {!sequenceMatches && <Img
                                  src={preloadedAssets.left}
                                  className={'interaction_button'}
                                  onClick={() => LastModiPrevData(data)}
                                />}
                                <Img
                                  src={preloadedAssets.right}
                                  className={'interaction_button'}
                                  onClick={() => {
                                    getNoteNextData()
                                  }}
                                  height={sequenceMatches ? '9vh' : '7vh'}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </GridItem>
                  </Grid>
                </Box>
              )}

             {data && type === 'Link' && (
  <Box className="chapter_potrait">
    <Grid
      templateColumns="repeat(1, 1fr)"
      gap={4}
      position="absolute"
      top="52%"
      left="50%"
       width="80% !important"
      transform="translate(-50%, -50%)"
      className="story_note_grid"
    >
      <GridItem colSpan={1} position="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: animateNote ? 0 : 1, scale: animateNote ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" justifyContent="center">
            <Img
              src={preloadedAssets.Thankyou}
              className="story_note_image"
              loading="lazy"
            />

            <Box className="url_align">
              <Text textAlign="center" className="note_title">
                Nugget
              </Text>
            </Box>

            <Box className="story_url_content">
              <Box display="flex" justifyContent="center" width={'100%'}>
                <Box className="story_url_block" width={'100%'}>
                  <Box textAlign="center" width={'100%'}>
                    {memoizedIframe}
                  </Box>
                </Box>
              </Box>

              <Box className="story_url_block_btns_box"
             
              >
                <Box
                  className="story_blockurl_btns"
                  justifyContent={!sequenceMatches ? 'space-between' : 'center'}
                >
                  {!sequenceMatches && (
                    <Img
                     style={{marginLeft:'-6% !important'}}
                      src={preloadedAssets.left}
                      className="interaction_button_left"
                      onClick={() => LastModiPrevData(data)}
                    />
                  )}
                  <Img
                    src={preloadedAssets.right}
                    className="interaction_button"
                    onClick={() => {
                      getNoteNextData();
                    }}
                    height={sequenceMatches ? '9vh' : '7vh'}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </GridItem>
    </Grid>
  </Box>
)}


              {data && (type === 'Dialog' || type === 'response') && (
  <Box className="chapter_potrait">
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Img
        className={'dialogue_image animateDialog dialog-transition'}
        src={preloadedAssets.dial}
        bottom={animateDialog ? '-200px' : '0'}
        //  style={{ transition:'none'  }}
      />
      <Box position={'relative'}>
        <Box
          position={'fixed'}
          h={'auto'}
          w={'30%'}
          left={'5%'}
          bottom={animateDialog ? '-200' : '11.5vw'}
          className={'animateDialog title dialog-title'}
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
            fontWeight={500}
            textAlign={'center'}
            fontFamily={'AtlantisText'}
            color={'#312821'}
            textTransform={'capitalize'}
            className='character_name'
          >
            <Text whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>
              {(type === 'Dialog'
                ? data.blockRoll === '99999'
                  ? 'Narrator'
                  : data.blockRoll === '999999'
                    ? (learnerPlayList?.LearnerProfile?.nickName?.trim()
                      ? learnerPlayList?.LearnerProfile?.nickName
                      : learnerPlayList?.LearnerProfile?.name)
                    : NonPlayerNameLanguage
                : data.blockResponseRoll === '99999'
                  ? 'Narrator'
                  : data.blockResponseRoll === '999999'
                    ? (learnerPlayList?.LearnerProfile?.nickName?.trim()
                      ? learnerPlayList?.LearnerProfile?.nickName
                      : learnerPlayList?.LearnerProfile?.name)
                    : NonPlayerNameLanguage
              )}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className='dialogue_scroll animateDialog animate-dialog-transition' bottom={animateDialog ? '-200px' : '16px'}>
        <Scrollbar>
          <Box className='dialogpapercontent' paddingTop={'10px'}>
            {type === 'Dialog'
              ? contentByLanguage !== null
                ? contentByLanguage
                : data?.blockText
              : resMsg}
          </Box>
        </Scrollbar>
      </Box>

      <Box
        display={'flex'}
        position={'fixed'}
        justifyContent={'space-between'}
        w={'95%'}
        bottom={animateDialog ? '-200px' : '0'}
        className={'animateDialog animate-dialog-transition '}
      >

         {type === 'Dialog' && sequenceMatches && !isBackDisabled ? (
          <Img />
        ) : (
          <Img
            src={preloadedAssets.left}
            className='dialog_btn'
            cursor={'pointer'}
            onClick={() => {
              handleBackClick(data);
            }}
          />
        )}
        <Img
          className='dialog_btn'
          src={preloadedAssets.right}
          onClick={() => Updatecontent()}
        />
      </Box>

      <Box
        display={'flex'}
        position={'fixed'}
        justifyContent={'space-between'}
        w={'95%'}
        bottom={animateDialog ? '-200px' : '0'}
        className={'animateDialog animate-dialog-transition'}
      >
         {type === 'response' && sequenceMatches ? (
         <Img
            src={preloadedAssets.left}
            className='dialog_btn'
            cursor={'pointer'}
            onClick={() => {
              handleBackClick(data);
            }}
          />
      
        ) : (
          <Img
            src={preloadedAssets.left}
            className='dialog_btn'
            cursor={'pointer'}
            onClick={() => {
              handleBackClick(data);
            }}
          />
        )}
        <Img
          className='dialog_btn'
          src={preloadedAssets.right}
          onClick={() => Updatecontent()}
        />
      </Box>
    </Box>
  </Box>
)}

              {data && type === 'Interaction' && (
                <Interaction
prevSelectOption={prevSelectOption}
 setPrevselectoptions={setPrevselectoptions}
                data={data}
                 isInteractionButtonDisabled={isInteractionButtonDisabled}
                handleInteractionBackClick={handleInteractionBackClick}
                option={option}
                options={options}
                optionClick={optionClick}
                InteractionFunction={InteractionFunction}
                navTrack={navTrack}
                preloadedAssets={preloadedAssets}
                selectedPlayer={selectedPlayer}
                LastModiPrevData={LastModiPrevData}
                RepeatSelectOption={RepeatSelectOption}
                RepeatPrevOption={RepeatPrevOption}
                contentByLanguage={contentByLanguage}
                currentScreenId={2}
                animateInteraction={animateInteraction}
                gameInfo={gameInfo}
                handleValidate={handleValidate}
                questState={questState}
                SetAudioOptions={SetAudioOptions}
                />
              )}

              {data && type === 'feedback' && (
                <Box
                  className="chapter_potrait"
                >
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
                      <motion.div
                        initial={{ y: 800 }}
                        animate={{ y: animateFeedback ? -800 : 0 }}
                        transition={{ duration: 0.1 , ease: "easeOut"  }}
                        
                      >
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
                                  <Box w={'70%'}>
                                    <Img src={preloadedAssets.on} h={'4vh'} w={'100%'} />
                                  </Box>
                                  <Scrollbar width='70%' height='65%'>
                                    <Box
                                      w={'100%'}
                                      h={'auto'}
                                      overflow={'hidden'}
                                      className="feedback_content_text"
                                    >
                                      <Box display={'flex'} mt={'10px'}>
                                        <Img 
                                        className='storyfbicon'
                                        src={preloadedAssets.FB} h={'1em'} w={'1em'} />
                                        <Text textAlign={'justify'}>{feed}</Text>
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
                                  <Img
                                    src={preloadedAssets.left}
                                    className={'interaction_button'}
                                    onClick={() => {
                                      LastModiPrevData(data);
                                    }}
                                  />
                                  <Img
                                    src={preloadedAssets.right}
                                    className={'interaction_button'}
                                    onClick={() => upNext()}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </GridItem>
                  </Grid>
                </Box>
              )}
            </>
          )}
        </Box>
      </>
    );
  };

export default Story;

function InitialLoader() {
  return (
    <>
      <Box className='Entire-Loader-story' style={{zIndex :'99999 !important'}}>
        <motion.div className='Entire-Loader-wrapper-story'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{zIndex :'9999999 !important',opacity: 1 }}
        >
          <Img src={LoadImg} className='load'
          style={{ zIndex: '99999999 !important',opacity: 1 }} />
        </motion.div>
      </Box>
    </>
  )
}