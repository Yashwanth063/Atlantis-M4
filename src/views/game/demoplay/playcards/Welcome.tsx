import {
  Box,
  Icon,
  Img,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getGameById, getSkills,getSkillsName } from 'utils/game/gameService';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { ProfileContext } from '../EntirePreview';
import Scrollbar from 'components/customScroll/CustomScroll';
// import AudioEffect from './Audio';
const Welcome: React.FC<{
  setCurrentScreenId: any;
  formData: any;
  imageSrc: any;
  intro: any;
  screen: any;
  preloadedAssets:any;
  currentScreenId:any;
  profileData:any;

}> = ({ formData, imageSrc, setCurrentScreenId, intro, screen, preloadedAssets,currentScreenId,profileData  }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
  const [showComplete, setShowComplete] = useState(false)
  const [blackScreen, setBlackScreen] = useState(false) 
  const [loaded, setLoaded] = useState(false); 
  const [LanguageContent,setLanguageContent] = useState({
    GameTitleLanguage:formData.gameTitle,
    StoryLineLanguage:formData?.gameStoryLine,
    AuthorNameLanguage:formData?.gameAuthorName,
    LearnOutLanguage:formData?.gameLearningOutcome !== ''
    ? formData?.gameLearningOutcome?.split('\n')
    : '',
    AdditionalWelcomeNoteLanguage:formData?.gameAdditionalWelcomeNote,
  });  
  const useData = useContext(ProfileContext)
   const [gameId, setGameId] = useState();
 console.log(gameId,'gameidfromteh state')
  const [skills, setSkills] = useState([]);

  // 🔹 Keep gameId in state whenever formData changes
  useEffect(() => {
    if (formData?.gameId) {
      setGameId(formData.gameId);
    }
  }, [formData]);
  useEffect(() => {
  console.log("formData changed:", formData);
  if (formData?.gameId) {
    setGameId(formData.gameId);
  }
}, [formData]);

useEffect(() => {
  console.log("gameId state changed:", gameId);
}, [gameId]);
  useEffect(() => {
  if (!gameId) return; // ⛔ skip until gameId is ready

  async function fetchSkills() {
    const res = await getSkillsName(gameId);
    if (res?.status === "Success") {
      setSkills(res.data);
    }
  }

  fetchSkills();
}, [gameId]);

  useEffect(() => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
    }, 1000);
  }, []);
  useEffect(() => {
  if (formData?.gameId) {
    fetch();
  }
}, [formData?.gameId]);

  const fetch = async () => {
    const result = await getGameById(formData?.gameId);
    if (result?.status !== 'Success') {
      setProfile([]);
      
    } else {

      setProfile(result.data);
    }
    // const res = await getSkills();
    // if (res?.status === 'Success') {
    //   setApSkl(res?.data);
    // }
       const res = await getSkillsName(formData.gameId);
  if (res?.status === "Success") {
    setApSkl(res.data);
  }
  };
  const customStylesicon = {
    cursor: 'pointer',
    color: '#D9C7A2',
    marginRight: '4px',
  };
  const TraslationContent = () =>
  {
    if (profileData?.Audiogetlanguage.length !== 0) {
    const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
       (key: any) => key?.textId === formData?.gameId,
    );
    if(GameLanguageFilter.length > 0)
      {
        const TitleGameFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameTitle',
        );
        const StoryLineFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameStoryLine',
        );
        const LearningOutFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameLearningOutcome',
        );
        const AuthorNameFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameAuthorName',
        );
        const AdditionalWelNoteFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameAdditionalWelcomeNote',
        );
        if(TitleGameFiltered.length > 0)
          {
            const GameTitle = TitleGameFiltered[0]?.content ? TitleGameFiltered[0]?.content : formData?.gameTitle;
            setLanguageContent((prev: any) => ({
              ...prev,
              GameTitleLanguage: GameTitle,
            }));
            // (GameTitle);
          }
          if(StoryLineFiltered.length > 0)
            {
              const storyLine = StoryLineFiltered[0]?.content ? StoryLineFiltered[0]?.content : formData?.gameStoryLine;
              setLanguageContent((prev: any) => ({
                ...prev,
                StoryLineLanguage: storyLine,
              }));
            }
            if(LearningOutFiltered.length > 0)
              {
                
                const LearningOutComes = LearningOutFiltered[0]?.content ? LearningOutFiltered[0]?.content?.split('\n') : formData?.gameLearningOutcome?.split('\n');
                setLanguageContent((prev: any) => ({
                  ...prev,
                  LearnOutLanguage: LearningOutComes,
                }));
              }
              if(AuthorNameFiltered.length > 0)
                {
                  const AuthorName = AuthorNameFiltered[0]?.content ? AuthorNameFiltered[0]?.content : formData?.gameAuthorName;
                  setLanguageContent((prev: any) => ({
                    ...prev,
                    AuthorNameLanguage: AuthorName,
                  }));
                }
              if(AdditionalWelNoteFiltered.length > 0)
                {
                  const AdditionalWelcomeNote = AdditionalWelNoteFiltered[0]?.content ? AdditionalWelNoteFiltered[0]?.content : formData?.gameAdditionalWelcomeNote;
                  setLanguageContent((prev: any) => ({
                    ...prev,
                    AdditionalWelcomeNoteLanguage: AdditionalWelcomeNote,
                  }));
                }
      }
    //formData.gameTitle
  }
  else
  {
    setLanguageContent((prev: any) => ({
      GameTitleLanguage:formData.gameTitle,
    StoryLineLanguage:formData?.gameStoryLine,
    AuthorNameLanguage:formData?.gameAuthorName,
    LearnOutLanguage:formData?.gameLearningOutcome !== ''
    ? formData?.gameLearningOutcome?.split('\n')
    : '',
    AdditionalWelcomeNoteLanguage:formData?.gameAdditionalWelcomeNote,
    }));
  }
  }
  useEffect(() => {
    fetch();
    TraslationContent();
  }, []);
  useEffect(() => {
    fetch();
    TraslationContent();
  }, [formData]);
  
  useEffect(() => {
    if (profile.gameSkills) {
      const Array = profile.gameSkills?.split(',');
      setauthorArray(Array);
    }
  }, [profile]);

  const findSkillName = (authorNumber: any) => {
    const matchedSkill = apSkl.find(
      (option: any) => option.id === Number(authorNumber),
    );
    return matchedSkill ? matchedSkill.name : null;
  };
  const renderContent = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    let parts ;
    parts = LanguageContent?.AdditionalWelcomeNoteLanguage?.split(linkRegex);
    const contentWithLinks = parts?.map((part: any, index: any) => {
      if (linkRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            style={{ color: '#caa784', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
    return <React.Fragment>{contentWithLinks}</React.Fragment>;
  };


  const extractLink = (text: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (text) {
      const urls = text?.match(urlRegex);

      return urls ? urls[0] : null;
    }
    return null;
  };

  const containerRef = useRef<any>(null);
  let lastScrollTop = 0;

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return; // Early return if container is not available


    const handleScroll = () => {
      let currentScrollTop = container?.scrollTop;   

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        // container.classList.add('content-box');
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

  const shouldShowScreenImage =
  formData.gameIsShowGameDuration === 'true' ||
  formData.gameIsShowStoryline === 'true' ||
  formData.gameIsShowSkill === 'true' ||
  formData.gameIsShowLearningOutcome === 'true' ||
  formData.gameIsShowAuhorName === 'true' ||
  formData.gameIsShowAdditionalWelcomeNote === 'true';

//     const getDurationMarginTop = (title: string) => {
//   if (!title) return "2px"; // default
//   const length = title.length;

//   if (length <= 20) return "25px";  
//   if (length <= 25) return "40px" // short titles
//   if (length <= 40) return "50px";  // medium titles
//   return "40px";                    // long titles
// };

const getDurationMarginTop = (title: string) => {
  if (typeof window !== "undefined" && window.innerWidth <= 950) {
    return "10%"; // Always 10% for screens ≤ 870px
  }

  if (!title) return "2px"; // default for larger screens
  const length = title.length;

  if (length <= 20) return "25px";
  if (length <= 25) return "40px";
  if (length <= 40) return "50px";
  return "55px";
};

  return (

    <>
    {shouldShowScreenImage ? (
     <>
      <Img
        src={screen}
        onLoad={() => setLoaded(true)}
        display={'none'}
      />
       { loaded && 
       <Box className="welcome-screen">
          <Box className="welcome-screen-box">
          <Img src={screen} className="welcome-pad"  />
          </Box>
          <Box className="top-title top-titleid">
            <Box w={'100%'} display={'flex'} justifyContent={'center'}>
              <Box>
                <Text
                  className="title gametitle"
                  fontSize={{
                    base: '13px',
                    sm: '13px',
                    md: '15px',
                    lg: '20px',
                  }}
                  style={{marginTop:'4vh !important'}}
                >
                  {LanguageContent?.GameTitleLanguage}
                </Text>
              </Box>
            </Box>
            {formData.gameIsShowGameDuration === 'true' && (
              <Text
                className="duration"
                fontSize={{
                  base: '11px',
                  sm: '12px',
                  md: '13px',
                  lg: '15px',
                }}
                // mt={'2px'}
                 sx={{
    mt: `${getDurationMarginTop(LanguageContent?.GameTitleLanguage)} !important`,
  }}
                fontFamily={'content'}
                position={'absolute'}
                display={'flex'}
                alignItems={'center'}
                letterSpacing={1}
              >
                <>
                  {' '}
                  <Icon as={FaClock} style={customStylesicon} />{' '}
                  <span style={customStylesicon}>
                    {formData.gameDuration > 1
                      ? Math.round(formData.gameDuration * 0.6) + ' minutes'
                      : Math.round(formData.gameDuration * 0.6) + ' minute'}
                  </span>
                </>
              </Text>
            )}
          </Box>
   <Box className="content-box contenttext" ref={containerRef} fontFamily={'gametext'}>
          <Scrollbar>
          <Box w={'60%'} className="content">
            {formData.gameIsShowStoryline === 'true' && (
              <Text
                className="text"
                mt={'20px'}
                fontSize={{
                  base: '11px',
                  sm: '12px',
                  md: '13px',
                  lg: '15px',
                }}
                fontFamily={'content'}
              >
                {LanguageContent?.StoryLineLanguage}
              </Text>
            )}

        <Box
              className={
                formData.gameIsShowSkill === 'true' ||
                  formData.gameIsShowLearningOutcome === 'true'
                  ? 'rewards-box'
                  : 'empty-rewards-box'
              }
            >
              {authorArray && formData.gameIsShowSkill === 'true' && (
                <>
                  <Box className="box-1">
                    <Img src={preloadedAssets.back} className="bg-img" />
                    <Img
                      className="rewards-arrow-img"
                      display={'block !important'}
                      src={preloadedAssets.skill}
                      mt={'25px'}
                      alt="rew"
                      w={'100%'}
                      h={'auto'}
                    />
                    <Box
                      className="inside-box"
                      mt={'10px'}
                      w={'100%'}
                    >
                      {authorArray
                        .map((authorItem, index) => {
                          const skillName = findSkillName(authorItem);
                          return skillName;
                        })
                        .filter((skillName) => skillName !== null)
                        .map((filteredSkillName, index) => (
                          <Box display={'flex'} key={index}>
                            <Img
                              src={preloadedAssets.write}
                              w={'25px'}
                              h={'25px'}
                            />
                            <Box>
                              <Box
                                className="text-wrapper"
                                display={'flex'}
                                w={'50px'}
                                h={'20px'}
                                justifyContent={'space-between'}
                                fontWeight={'300'}
                                marginLeft={'5px'}
                              >
                                <Text color={'#D9C7A2'}>
                                  {filteredSkillName}
                                </Text>
                                <Text></Text>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </>
              )}
              {LanguageContent?.LearnOutLanguage && formData.gameIsShowLearningOutcome === 'true' && (
                <>
                  <Box className="box-1">
                    <Img src={preloadedAssets.back} className="bg-img" />
                    <Img
                      className="rewards-arrow-img"
                      display={'block !important'}
                      src={preloadedAssets.LearnOut}
                      mt={'25px'}
                      alt="rew"
                      w={'100%'}
                      h={'auto'}
                    />
                    <Box
                      className="inside-box"
                      mt={'10px'}
                      w={'100%'}
                    >
                      {LanguageContent?.LearnOutLanguage &&
                        LanguageContent?.LearnOutLanguage.map((it: any, ind: number) => {
                          const bulletIndex = it.indexOf('\u2022');
                          const contentAfterBullet =
                            bulletIndex !== -1
                              ? it.slice(bulletIndex + 1).trim()
                              : it;
                          return (
                            <Box display={'flex'} key={ind}>
                              <Img
                                src={preloadedAssets.write}
                                w={'25px'}
                                h={'25px'}
                              />
                              <Box>
                                <Box
                                  className="text-wrapper"
                                  display={'flex'}
                                  w={'50px'}
                                  h={'20px'}
                                  justifyContent={'space-between'}
                                  fontWeight={'300'}
                                  marginLeft={'5px'}
                                >
                                  <Text color={'#D9C7A2'}>
                                    {contentAfterBullet}
                                  </Text>
                                  <Text></Text>
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            {LanguageContent?.AuthorNameLanguage && formData.gameIsShowAuhorName === 'true' && (
              <Box
                w={'100%'}
                h={'50px'}
                position={'relative'}
                className="author"
              >
                  <Img
                    src={preloadedAssets.Author}
                    w={'100%'}
                    h={'auto'}
                  />
                <Text
                  fontSize={{
                    base: '11px',
                    sm: '12px',
                    md: '13px',
                    lg: '15px',
                  }}
                  fontFamily={'content'}
                  color={'black'}
                  textAlign={'center'}
                >
                  {LanguageContent?.AuthorNameLanguage}
                </Text>
              </Box>
            )}
            {formData.gameIsShowAdditionalWelcomeNote === 'true' && (
              <Box
                className="renderContent"
                letterSpacing={'1px'}
              >
                  <Img
                    src={preloadedAssets.NoteArrow}
                    w={'100%'}
                    h={'auto'}
                  />
                <Text
                  fontSize={{
                    base: '11px',
                    sm: '12px',
                    md: '13px',
                    lg: '15px',
                  }}
                  fontFamily={'content'}
                  textAlign={'center'}
                >
                  {renderContent()}
                </Text>
              </Box>
            )}
          </Box>
          </Scrollbar>
       </Box>
        
          <Box className="next-btn">
            <Img
              src={preloadedAssets.next}
              onClick={() =>{
                useData?.setMotionEffect(true);              
                setTimeout(()=> {
                setCurrentScreenId(12);                 
                },300)
            }}
            />
          </Box>
      </Box>
      }
      
        </>
         ) : (

        
            <Box id="container" className="Play-station">
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
                  justifyContent={'space-between'}
                >
                  {/* <Text className="No_preview" textAlign={'center'} mt={12} > */}
                    <Text className="welcomescreen_No_preview" textAlign={'center'} mt={12} >
              The welcome screen preview will appear once you complete the story and head to the design section to create the welcome screen.
            </Text>
            <Box
          w={'100%'}
          display={'flex'}
          justifyContent={'center'}
          position={'absolute'}
          bottom={'0'}
          className='left-right-btn'
        >
         
           {/* <Box   w={'80%'} display={'flex'} justifyContent={'space-between'}>
          <Img src={preloadedAssets.left} className={'interaction_button'} cursor={'pointer'} 
          h={'60px'}
                onClick={() => setCurrentScreenId(10)}
              />
        
        <Img
                                src={preloadedAssets.right}
                                className={'interaction_button'}
                                cursor={'pointer'}
                                h={'60px'}
                onClick={() => setCurrentScreenId(12)}
              />
        
          </Box> */}
           <Box   w={'80%'} display={'flex'} justifyContent={'space-between'}>
          <Img src={preloadedAssets.left}
          //  className={'interaction_button'}
           className={'welcome_button'}
            cursor={'pointer'} 
          h={'60px'}
                onClick={() => setCurrentScreenId(10)}
              />
        
        <Img
                                src={preloadedAssets.right}
                                // className={'interaction_button'}
                                className={'welcome_button'}
                                cursor={'pointer'}
                                h={'60px'}
                onClick={() => setCurrentScreenId(12)}
              />
        
          </Box>
        </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>


         
          
        )}
    
       
      </>
  );
};
export default Welcome;
