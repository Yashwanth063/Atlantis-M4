'use client';

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import svgPaths from '../../../../imports/svg-v8jgyh5xpz';
import svgPaths2 from '../../../../imports/svg-knollny4nu';
import {
  CustomCoinIcon,
  CustomHomeIcon,
  CustomMapIcon,
  CustomRankingIcon,
  CustomSettingsIcon,
} from '../../../../components/ui/CustomIcons';
import imgBackground from '../../../../assets/img/NewUI_Images/background.png';
import topNav from '../../../../assets/img/NewUI_Images/topnav.png';
import { useColor } from '../../../../components/ui/ColorContext';
import ColorPicker from '../../../../components/ui/ColorPicker';
import { Slider } from '../../../../components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { getGameById, getSkillsName } from 'utils/game/gameService';
import { ProfileContext } from '../EntirePreview';
import Scrollbar from 'components/customScroll/CustomScroll';
import { useParams } from 'react-router-dom';





// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 255, 187"; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};


interface WelcomeFutureThemeProps {
  setCurrentScreenId: any;
  formData: any;
  imageSrc: any;
  intro: any;
  screen: any;
  preloadedAssets: any;
  currentScreenId: any;
  profileData: any;
}
// Icon Components
const AlarmClock: React.FC = () => {
  return (
    <div className="relative shrink-0 h-[1.433rem] w-[1.433rem]" data-name="alarm-clock">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="alarm-clock">
          <path d={svgPaths.p10d4e4c0} fill="white" id="Vector" opacity="0.4" />
          <path d={svgPaths.pf200c00} fill="white" id="Vector_2" />
          <path d={svgPaths.p3e549400} fill="white" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
};

const Target: React.FC = () => {
  const { primaryColor } = useColor();

  return (
    <div className="relative shrink-0 h-[1.433rem] w-[1.433rem]" data-name="target">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="target">
          <path d={svgPaths.p13af2900} fill={primaryColor} id="Vector" />
          <path
            d={svgPaths.p2338cc00}
            fill={primaryColor}
            id="Vector_2"
            opacity="0.4"
          />
          <path d={svgPaths.p978f000} fill={primaryColor} id="Vector_3" />
        </g>
      </svg>
    </div>
  );
};

const LocationCrosshairs: React.FC = () => {
  const { primaryColor } = useColor();

  return (
    <div
      className="relative shrink-0 h-[1.433rem] w-[1.433rem]"
      data-name="location-crosshairs"
    >
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="location-crosshairs">
          <path
            d={svgPaths.p16daa700}
            fill={primaryColor}
            id="Vector"
            opacity="0.4"
          />
          <path d={svgPaths.p1d077900} fill={primaryColor} id="Vector_2" />
          <path d={svgPaths.p39fe3b70} fill={primaryColor} id="Vector_3" />
          <path d={svgPaths.p22cf0080} fill={primaryColor} id="Vector_4" />
          <path d={svgPaths.p2d75d500} fill={primaryColor} id="Vector_5" />
          <path d={svgPaths.p283fcf00} fill={primaryColor} id="Vector_6" />
        </g>
      </svg>
    </div>
  );
};

const Book: React.FC = () => {
  const { primaryColor } = useColor();

  return (
    <div className="relative shrink-0 h-[1.433rem] w-[1.433rem]" data-name="book">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="book">
          <path d={svgPaths.p30bf5fc0} fill={primaryColor} id="Vector" />
          <path
            d={svgPaths.p25ca89f0}
            fill={primaryColor}
            id="Vector_2"
            opacity="0.4"
          />
          <path d={svgPaths.p137ef300} fill={primaryColor} id="Vector_3" />
        </g>
      </svg>
    </div>
  );
};

const UserSquare: React.FC = () => {
  const { primaryColor } = useColor();

  return (
    <div className="relative shrink-0 h-[1.433rem] w-[1.433rem]" data-name="user-square">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="user-square">
          <path
            d={svgPaths.pf8f3e00}
            fill={primaryColor}
            id="Vector"
            opacity="0.4"
          />
          <path d={svgPaths.p256c6840} fill={primaryColor} id="Vector_2" />
        </g>
      </svg>
    </div>
  );
};

const WelcomeFutureTheme: React.FC<WelcomeFutureThemeProps> = ({
  setCurrentScreenId,
  formData,
  imageSrc,
  intro,
  screen,
  preloadedAssets,
  currentScreenId,
  profileData,
}) => {
  const { primaryColor } = useColor();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0);

  const { id } = useParams();
  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
  const [showComplete, setShowComplete] = useState(false)
  const [blackScreen, setBlackScreen] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [LanguageContent, setLanguageContent] = useState({
    GameTitleLanguage: formData.gameTitle,
    StoryLineLanguage: formData?.gameStoryLine,
    AuthorNameLanguage: formData?.gameAuthorName,
    LearnOutLanguage: formData?.gameLearningOutcome !== ''
      ? formData?.gameLearningOutcome?.split('\n')
      : '',
    AdditionalWelcomeNoteLanguage: formData?.gameAdditionalWelcomeNote,
  });
  const useData = useContext(ProfileContext)
  const [gameId, setGameId] = useState();
  console.log(gameId, 'gameidfromteh state')
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
  const TraslationContent = () => {
    if (profileData?.Audiogetlanguage.length !== 0) {
      const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
        (key: any) => key?.textId === formData?.gameId,
      );
      if (GameLanguageFilter.length > 0) {
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
        if (TitleGameFiltered.length > 0) {
          const GameTitle = TitleGameFiltered[0]?.content ? TitleGameFiltered[0]?.content : formData?.gameTitle;
          setLanguageContent((prev: any) => ({
            ...prev,
            GameTitleLanguage: GameTitle,
          }));
          // (GameTitle);
        }
        if (StoryLineFiltered.length > 0) {
          const storyLine = StoryLineFiltered[0]?.content ? StoryLineFiltered[0]?.content : formData?.gameStoryLine;
          setLanguageContent((prev: any) => ({
            ...prev,
            StoryLineLanguage: storyLine,
          }));
        }
        if (LearningOutFiltered.length > 0) {

          const LearningOutComes = LearningOutFiltered[0]?.content ? LearningOutFiltered[0]?.content?.split('\n') : formData?.gameLearningOutcome?.split('\n');
          setLanguageContent((prev: any) => ({
            ...prev,
            LearnOutLanguage: LearningOutComes,
          }));
        }
        if (AuthorNameFiltered.length > 0) {
          const AuthorName = AuthorNameFiltered[0]?.content ? AuthorNameFiltered[0]?.content : formData?.gameAuthorName;
          setLanguageContent((prev: any) => ({
            ...prev,
            AuthorNameLanguage: AuthorName,
          }));
        }
        if (AdditionalWelNoteFiltered.length > 0) {
          const AdditionalWelcomeNote = AdditionalWelNoteFiltered[0]?.content ? AdditionalWelNoteFiltered[0]?.content : formData?.gameAdditionalWelcomeNote;
          setLanguageContent((prev: any) => ({
            ...prev,
            AdditionalWelcomeNoteLanguage: AdditionalWelcomeNote,
          }));
        }
      }
      //formData.gameTitle
    }
    else {
      setLanguageContent((prev: any) => ({
        GameTitleLanguage: formData.gameTitle,
        StoryLineLanguage: formData?.gameStoryLine,
        AuthorNameLanguage: formData?.gameAuthorName,
        LearnOutLanguage: formData?.gameLearningOutcome !== ''
          ? formData?.gameLearningOutcome?.split('\n')
          : '',
        AdditionalWelcomeNoteLanguage: formData?.gameAdditionalWelcomeNote,
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
    let parts;
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


  // Info Card Component
  const InfoCard: React.FC<{
    icon: React.ReactNode;
    content: string;
    fontSize?: string;
  }> = ({ icon, content, fontSize = "13.378px" }) => {
    return (
      <div
        className="backdrop-blur-[2.499rem] backdrop-filter relative rounded-[0.6rem] shrink-0 w-full"
        style={{
          background: `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
            primaryColor
          )}, 0.4) 127.18%)`,
        }}
      >
        <div className="flex flex-row items-center overflow-clip relative h-full w-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[1.2rem] py-[0.717rem] relative w-full">
            {icon}
            <div
              className="flex flex-col font-rubik font-medium justify-center leading-[0] relative shrink-0 text-[#ffffff] text-left tracking-[-0.04px]"
              style={{ fontSize }}
            >
              <p className="adjustLetterSpacing block leading-[1.893rem] whitespace-pre">
                {content}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[1.599px_3.199px_12.795px_0px_inset_rgba(248,248,248,0.06)]" />
        <div className="absolute border-[1.2px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[0.6rem]" />
      </div>
    );
  };

  // Skill Card Component
  const SkillCard: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div
        className="backdrop-blur-[2.499rem] backdrop-filter basis-0 grow min-h-px min-w-px relative rounded-[0.6rem] shrink-0"
        style={{
          background: `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
            primaryColor
          )}, 0.4) 127.18%)`,
        }}
      >
        <div className="flex flex-row items-center overflow-clip relative h-full w-full">
          <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[1.2rem] py-[0.717rem] relative w-full">
            <Target />
            <div className="flex flex-col font-rubik font-medium justify-center leading-[0] relative shrink-0 text-[#ffffff] text-sm text-left text-nowrap tracking-[-0.04px]">
              <p className="adjustLetterSpacing block leading-[1.893rem] whitespace-pre">
                {title}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[1.599px_3.199px_12.795px_0px_inset_rgba(248,248,248,0.06)]" />
        <div className="absolute border-[1.2px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[0.6rem]" />
      </div>
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isDragging) return; // Don't update position while dragging

    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    setScrollPosition(scrollPercentage);
  };

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);

    if (scrollContainerRef.current) {
      setDragStartScrollTop(scrollContainerRef.current.scrollTop);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current || !scrollbarRef.current)
        return;

      const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
      const scrollbarHeight = scrollbarRect.height;
      const trackHeight = scrollbarHeight * 0.9; // 90% of scrollbar height (matching the track)

      const deltaY = e.clientY - dragStartY;
      const deltaPercentage = deltaY / trackHeight; // Use full track height for calculation

      const scrollContainer = scrollContainerRef.current;
      const scrollableHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;

      const newScrollTop =
        dragStartScrollTop + deltaPercentage * scrollableHeight;
      const clampedScrollTop = Math.max(
        0,
        Math.min(scrollableHeight, newScrollTop)
      );

      scrollContainer.scrollTop = clampedScrollTop;

      // Update position immediately for smooth dragging
      const newScrollPercentage =
        scrollableHeight > 0 ? clampedScrollTop / scrollableHeight : 0;
      setScrollPosition(newScrollPercentage);
    },
    [isDragging, dragStartY, dragStartScrollTop]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection while dragging

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleStartMission = () => {
    useData?.setMotionEffect(true);
    setTimeout(() => setCurrentScreenId(12), 300);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-no-repeat bg-center bg-cover bg-black/90"
      style={{ backgroundImage: `url('${imgBackground}')` }}
    >
      <style>{`
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }

        div::-webkit-scrollbar {
                    display: none;
                  }
      `}</style>

      <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 relative h-full flex">
        {/* Top Navigation Bar */}
        <div
          //  style={{ backgroundImage: `url('${topNav}')` }}
          className="absolute top-0 left-0 right-0 h-[5.5rem] flex items-center justify-between  bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <TopNavButton icon="home" />
            <TopNavButton icon="map" />
          </div>
          <div className="flex items-center gap-4">
            <StatusBar label="50" icon="progress" />
            <StatusBar label="100" icon="coin" />
            <TopNavButton icon="ranking" />
            <Dialog>
              <DialogTrigger asChild>
                <div className="translate-y-1">
                  <TopNavButton icon="settings" />
                </div>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-2xl rounded-[2rem] px-7 py-6 border-none shadow-lg"
                style={{
                  background: `linear-gradient(151.477deg, rgb(0,0,0) 17.606%, rgba(${hexToRgb(
                    primaryColor
                  )}, 0.6) 218.68%)`,
                  border: `1px solid linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                    primaryColor
                  )}, 0.4) 188.68%)`,
                  boxShadow: "0px 0px 23.4px 0px rgba(0, 0, 0, 0.50)",
                }}
              >
                <h2
                  className="text-center text-3xl py-1 font-medium"
                  style={{
                    color: primaryColor,
                    textShadow: `0 0 9px rgba(${hexToRgb(primaryColor)}, 0.49)`,
                  }}
                >
                  Settings
                </h2>

                {/* Decorative Line */}
                <div className="flex items-center justify-center relative w-full">
                  <div className="w-full">
                    <div className="h-[1px] relative w-full">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 48%, transparent 100%)`,
                          opacity: 0.995,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 mt-3 mb-2 max-w-md mx-auto w-full pt-5 pb-3">
                  <div className="flex flex-col gap-10 mb-4">
                    {/* Music Volume */}
                    <div className="flex flex-col gap-1 items-center">
                      <label className="text-2xl font-rubik mb-2 text-white font-normal tracking-[-0.005rem]">
                        Music Volume
                      </label>
                      <Slider
                        defaultValue={[40]}
                        max={100}
                        step={1}
                        className="w-full"
                      // trackClassName="bg-white/70"
                      // thumbClassName="bg-white border border-gray-300 shadow-sm"
                      />
                    </div>
                    {/* Voice Over Volume */}
                    <div className="flex flex-col gap-1 items-center">
                      <label className="text-2xl font-rubik mb-2 text-white font-normal tracking-[-0.005rem]">
                        Voice over volume
                      </label>
                      <Slider
                        defaultValue={[20]}
                        max={100}
                        step={1}
                        className="w-full"
                      // trackClassName="bg-white/70"
                      // thumbClassName="bg-white border border-gray-300 shadow-sm"
                      />
                    </div>
                    {/* Color Picker */}
                    <div className="flex flex-col gap-1 items-center">
                      <label className="text-2xl font-rubik mb-2 text-white font-normal tracking-[-0.005rem]">
                        Set Theme
                      </label>
                      <ColorPicker />
                    </div>
                  </div>
                  {/* Okay button */}
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-[5.75rem] text-lg h-11 py-2 px-4 rounded-3xl transition-all duration-200 hover:scale-110 text-white hover:text-white mx-auto"
                      style={{
                        background: `linear-gradient(275.041deg
                              ,
                                rgba(${hexToRgb(
                          primaryColor
                        )}, 0.7) 7.25%, rgba(0, 0, 0, 0.8) 84.803%)`,
                        border: `1px solid ${primaryColor}`,
                        boxShadow: `0px 0px 15.9542px 0px rgba(3, 51, 38, 0.8)`,
                      }}
                    >
                      Okay
                    </Button>
                  </DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-full flex-grow flex flex-col justify-center items-center pt-[7.25rem]">
          <div
            className="flex flex-col gap-5 max-h-[40rem] max-w-[54.875rem] overflow-hidden h-full w-full items-center justify-start rounded-[2.375rem] relative px-10 py-8 backdrop-filter backdrop-blur-[3.724rem]"
            style={{
              background: `linear-gradient(21deg, rgba(0, 0, 0, 0.40) -10.76%, rgba(${hexToRgb(
                primaryColor
              )}, 0.2) 127.18%)`,
            }}
          >
            {/* Background Effects */}
            <div className="absolute flex h-[27.69rem] items-center justify-center right-[-12.5rem] mix-blend-lighten top-[3.125rem] w-[31.188rem] pointer-events-none z-0">
              <div className="flex-none rotate-[33.283deg]">
                <div className="h-[15.169rem] relative w-[27.352rem]">
                  <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
                    <svg
                      className="block h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 1250 1055"
                    >
                      <g
                        filter="url(#filter0_f_bg1)"
                        id="Ellipse 7187"
                        opacity="0.2"
                        style={{ mixBlendMode: "lighten" }}
                      >
                        <ellipse
                          cx="624.819"
                          cy="527.354"
                          fill={primaryColor}
                          rx="218.819"
                          ry="121.354"
                        />
                      </g>
                      <defs>
                        <filter
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                          height="1054.26"
                          id="filter0_f_bg1"
                          width="1249.19"
                          x="0.223328"
                          y="0.223328"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            mode="normal"
                            result="shape"
                          />
                          <feGaussianBlur
                            result="effect1_foregroundBlur_bg1"
                            stdDeviation="202.888"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute flex h-[27.69rem] items-center justify-center left-[-12.5rem] mix-blend-lighten top-[3.125rem] w-[31.188rem] pointer-events-none z-0">
              <div className="flex-none rotate-[33.283deg]">
                <div className="h-[15.169rem] relative w-[27.352rem]">
                  <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
                    <svg
                      className="block h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 1250 1055"
                    >
                      <g
                        filter="url(#filter0_f_bg2)"
                        id="Ellipse 7187"
                        opacity="0.2"
                        style={{ mixBlendMode: "lighten" }}
                      >
                        <ellipse
                          cx="624.819"
                          cy="527.354"
                          fill={primaryColor}
                          rx="218.819"
                          ry="121.354"
                        />
                      </g>
                      <defs>
                        <filter
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                          height="1054.26"
                          id="filter0_f_bg2"
                          width="1249.19"
                          x="0.223328"
                          y="0.223328"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            mode="normal"
                            result="shape"
                          />
                          <feGaussianBlur
                            result="effect1_foregroundBlur_bg2"
                            stdDeviation="202.888"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Section - */}
            <div className="flex flex-col items-center gap-4 w-full relative z-10 mb-4">
              {/* Welcome Title */}
              <div className="relative">
                <h1
                  className="text-4xl font-normal tracking-[0.005rem] text-center text-white mb-1"
                  style={{ textShadow: `rgba(${hexToRgb(primaryColor)}, 0.5) 0px 0px 9px` }}
                >
                  {LanguageContent?.GameTitleLanguage || 'Welcome'}
                </h1>
              </div>

              {/* Signal Sync with Decorative Lines */}
              <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                    <div className="h-0 relative w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                        <svg
                          className="block h-full w-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 318 1"
                        >
                          <line
                            id="Line 732"
                            stroke="url(#paint0_linear_signal)"
                            x2="317.267"
                            y1="0.5"
                            y2="0.5"
                          />
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint0_linear_signal"
                              x1="317.267"
                              x2="0"
                              y1="0.999899"
                              y2="0.999906"
                            >
                              <stop stopColor={primaryColor} stopOpacity="0" />
                              <stop
                                offset="0.484375"
                                stopColor={primaryColor}
                                stopOpacity="0.994792"
                              />
                              <stop
                                offset="1"
                                stopColor={primaryColor}
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-4xl text-center text-nowrap tracking-[0.08px]"
                  style={{ color: primaryColor }}
                >
                  <p className="adjustLetterSpacing block leading-[3.859rem] whitespace-pre">
                    Signal Sync
                  </p>
                </div>
                <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
                    <div className="h-0 relative w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                        <svg
                          className="block h-full w-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 318 1"
                        >
                          <line
                            id="Line 732"
                            stroke="url(#paint0_linear_signal2)"
                            x2="317.267"
                            y1="0.5"
                            y2="0.5"
                          />
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id="paint0_linear_signal2"
                              x1="317.267"
                              x2="0"
                              y1="0.999899"
                              y2="0.999906"
                            >
                              <stop stopColor={primaryColor} stopOpacity="0" />
                              <stop
                                offset="0.484375"
                                stopColor={primaryColor}
                                stopOpacity="0.994792"
                              />
                              <stop
                                offset="1"
                                stopColor={primaryColor}
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="box-border content-stretch flex flex-row gap-3.5 items-center justify-start p-0 relative shrink-0">
                <AlarmClock />
                <div className="flex flex-col font-rubik font-medium justify-center relative shrink-0 text-[#ffffff] text-[1.433rem] text-center text-nowrap tracking-[-0.09px]">
                  <p className="adjustLetterSpacing block whitespace-pre">
                    {formData.gameDuration > 1
                      ? Math.round(formData.gameDuration * 0.6) + ' minutes'
                      : Math.round(formData.gameDuration * 0.6) + ' minute'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Box with Interactive Custom Scrollbar */}
            <div className="w-full h-[17.75rem] relative z-10 flex-shrink-0 max-lg:flex-1 max-lg:overflow-y-auto">
              {/* Scrollable Content Container */}
              <div
                ref={scrollContainerRef}
                className="scrollbar-hidden relative h-full overflow-y-auto overflow-x-hidden pr-8 pl-5"
                onScroll={handleScroll}
              >
                <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start relative">
                  {/* Story Description */}
                  <div className=" text-white flex flex-col justify-center w-full">
                    <p>
                      {LanguageContent?.StoryLineLanguage || formData?.gameStoryLine}
                    </p>

                  </div>

                  {/* Skills Section */}
                  <div className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-full">
                    <div className="flex flex-col font-glancyr-neue justify-center shrink-0 text-[#ffffff] text-base text-left tracking-[0.1529px] w-full">
                      <p className="block leading-normal text-xl">SKILLS</p>
                    </div>
                    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full">
                      {authorArray?.map((authorItem, index) => {
                        const skillName = findSkillName(authorItem);
                        return skillName ? <SkillCard key={index} title={skillName} /> : null;
                      })}

                    </div>
                  </div>

                  {/* Learning Outcome */}
                  <div className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-full">
                    <div className="flex flex-col font-glancyr-neue justify-center shrink-0 text-[#ffffff] text-base text-left tracking-[0.1529px] w-full">
                      <p className="block leading-normal text-xl">
                        LEARNING OUTCOME
                      </p>
                    </div>
                    {LanguageContent?.LearnOutLanguage?.map((item: any, index: any) => {
                      const bulletIndex = item.indexOf('\u2022');
                      const content = bulletIndex !== -1 ? item.slice(bulletIndex + 1).trim() : item;
                      return <InfoCard key={index} icon={<LocationCrosshairs />} content={content} />;
                    })}

                  </div>

                  {/* NOTE Section */}
                  <div className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-full">
                    <div className="flex flex-col font-glancyr-neue justify-center shrink-0 text-[#ffffff] text-base text-left tracking-[0.1529px] w-full">
                      <p className="block leading-normal text-xl">NOTE</p>
                    </div>
                    <InfoCard
                      icon={<Book />}
                      content="This scenario focuses on emotional intelligence in high-pressure team environments"
                      fontSize="14px"
                    />
                  </div>

                  {/* AUTHOR Section */}
                  <div className="box-border content-stretch flex flex-col gap-1 items-center justify-center p-0 relative shrink-0 w-full pb-4">
                    <div className="flex flex-col font-glancyr-neue justify-center shrink-0 text-[#ffffff] text-base text-left tracking-[0.1529px] w-full">
                      <p className="block leading-normal text-xl">AUTHOR</p>
                    </div>
                    {LanguageContent?.AuthorNameLanguage && (
                      <InfoCard icon={<UserSquare />} content={LanguageContent.AuthorNameLanguage} />
                    )}

                  </div>
                </div>
              </div>

              {/* Interactive Custom Scrollbar */}
              <div
                ref={scrollbarRef}
                className="absolute right-2 -top-0 lg:right-0 lg:-top-1 w-4 h-full flex items-center justify-center"
              >
                {/* Track Line */}
                <div
                  className="w-0.5 h-[90%] rounded-full opacity-60 pointer-events-none"
                  style={{ backgroundColor: primaryColor }}
                />

                {/* Interactive Thumb with Outer Circle */}
                <div
                  className={`absolute h-3 w-3 lg:w-5 lg:h-5 rounded-full transition-all duration-150 ease-out cursor-pointer ${isDragging ? "scale-110" : "hover:scale-110"
                    }`}
                  style={{
                    top: `${6.5 + scrollPosition * 90}%`,
                    transform: "translateY(-50%)",
                  }}
                  onMouseDown={handleThumbMouseDown}
                >
                  {/* Outer Ring */}
                  <div
                    className="absolute inset-0 h-3 w-3 lg:w-5 lg:h-5 rounded-full border-2 opacity-40"
                    style={{
                      borderColor: primaryColor,
                      boxShadow:
                        window.innerWidth <= 934
                          ? `0 0 4px ${primaryColor}, 0 0 1px ${primaryColor}`
                          : `0 0 12px ${primaryColor}, 0 0 6px ${primaryColor}`,
                      filter:
                        window.innerWidth <= 934
                          ? `drop-shadow(0 0 3px ${primaryColor})`
                          : `drop-shadow(0 0 8px ${primaryColor})`,
                    }}
                  />

                  {/* Inner Circle */}
                  <div
                    className="absolute inset-0 h-1.5 w-1.5 lg:w-2 lg:h-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow: `0 0 4px ${primaryColor}`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Button - Below Content Box */}
            <div className="flex items-center justify-center relative shrink-0 mt-1 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStartMission()}
                className="min-w-[8.125rem] h-12 py-2 px-4 rounded-3xl transition-all duration-200 hover:scale-110 text-white hover:text-white font-rubik text-lg font-medium"
                style={{
                  background: `linear-gradient(100deg ,
                        rgba(${hexToRgb(
                    primaryColor
                  )}) -27.25%, rgba(0, 0, 0, 0.8) 127.803%)`,
                  border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.5)`,
                  boxShadow: `0px 0px 21.786px 0px rgba(${hexToRgb(
                    primaryColor
                  )}, 0.4)`,
                }}
              >
                Next
              </Button>
            </div>

            {/* Inset Shadow Border */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[2.375rem]"
              style={{
                boxShadow: `0px 0px 11px 0px inset rgba(${hexToRgb(
                  primaryColor
                )}, 0.3)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components (same as Note.tsx)
const TopNavButton: React.FC<{ icon: string }> = ({ icon }) => {
  const { primaryColor } = useColor();

  const IconElement = () => {
    switch (icon) {
      case "home":
        return <CustomHomeIcon color={primaryColor} size={20} />;
      case "map":
        return <CustomMapIcon color={primaryColor} size={20} />;
      case "ranking":
        return <CustomRankingIcon color={primaryColor} size={20} />;
      case "settings":
        return <CustomSettingsIcon color={primaryColor} size={20} />;
      default:
        return <IconComponent type={icon} color={primaryColor} />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-12 h-12 !px-0 py-0 relative rounded-2xl hover:scale-110 transition-transform duration-300 group"
      style={{
        borderRadius: "16px",
        boxShadow: "0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)",
        background: `linear-gradient(151.477deg, rgba(${hexToRgb(
          primaryColor
        )}, 0.3), rgb(0, 0, 0))`,
      }}
    >
      <div
        className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-2xl flex items-center justify-center"
        style={{
          background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
            primaryColor
          )}, 0.5) 188.68%)`,
          borderRadius: "16px",
          zIndex: 1,
        }}
      >
        {icon === "ranking" ? (
          <CustomRankingIcon color={primaryColor} className="!h-10 !w-10" />
        ) : icon === "settings" ? (
          <CustomSettingsIcon color={primaryColor} className="!h-10 !w-10 -mb-1" />
        ) : (
          <IconElement />
        )}
      </div>
    </Button>
  );
};

const StatusBar: React.FC<{ label: string; icon?: string }> = ({
  label,
  icon,
}) => {
  const { primaryColor } = useColor();

  return (
    <div className="flex items-center">
      {icon && (
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 !px-0 py-0 relative rounded-2xl"
          style={{
            borderRadius: "16px",
            boxShadow: "0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)",
            background: `linear-gradient(151.477deg, rgba(${hexToRgb(
              primaryColor
            )}, 0.3), rgb(0, 0, 0))`,
          }}
        >
          <div
            className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-2xl flex items-center justify-center backdrop-blur-xs"
            style={{
              background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                primaryColor
              )}, 0.5) 188.68%)`,
              borderRadius: "16px",
              zIndex: 1,
            }}
          >
            {icon === "coin" ? (
              <CustomCoinIcon color={primaryColor} className="!h-12 !w-12" />
            ) : icon === "progress" ? (
              <span
                className="text-white font-medium text-[0.813rem] font-rubik -tracking-[0.007rem] text-shadow-[0px_2.867px_8.6px_rgba(0,_255,_187,_0.30)]"
                style={{ color: primaryColor }}
              >
                {label}%
              </span>
            ) : (
              <IconComponent type={icon} color={primaryColor} />
            )}
          </div>
        </Button>
      )}
      {label === "50" ? (
        <div className="flex-1 relative -ml-2.5 min-w-24">
          <div
            className="w-full h-8 rounded-[0.625rem] overflow-hidden"
            style={{
              background: `linear-gradient(179.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                primaryColor
              )}, 0.4) 188.68%)`,
              border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.1)`,
              boxShadow: "0px 0px 15.3543px 0px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="h-full transition-all duration-500 ease-out rounded-[0.625rem] shadow-[0px_0px_2.378px_0px_rgba(0,_255,_187,_0.30)_inset,_0px_2.867px_8.6px_0px_rgba(0,_255,_187,_0.60)]"
              style={{
                width: `${(Number(label) / 100) * 100}%`,
                backgroundColor: primaryColor,
                boxShadow: `0px 0px 9.93511px 0px rgba(184,184,184,0.2)`,
              }}
            />
          </div>
        </div>
      ) : (
        <Badge
          variant="secondary"
          className="h-8 px-4 flex items-center -ml-1.5 rounded-[0.625rem] min-w-24 font-rubik"
          style={{
            background: `linear-gradient(170.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
              primaryColor
            )}, 0.4) 188.68%)`,
            border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.2)`,
            boxShadow: "0px 0px 23.3864px 0px rgba(0,0,0,0.5)",
          }}
        >
          <span className="text-white font-medium text-[0.813rem]">
            {label}
          </span>
        </Badge>
      )}
    </div>
  );
};
const IconComponent: React.FC<{ type: string; color: string }> = ({
  type,
  color,
}) => {
  const getIconPath = () => {
    switch (type) {
      case "ranking":
        return svgPaths2.p1a822c00;
      case "home":
        return svgPaths2.p3bf15400;
      case "map":
        return svgPaths2.p285e4100;
      case "settings":
        return svgPaths2.p2037cc80;
      case "coin":
        return svgPaths2.p1444db00;
      default:
        return svgPaths2.p1444db00;
    }
  };

  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <path d={getIconPath()} fill={color} />
    </svg>
  );
};

export default WelcomeFutureTheme;
