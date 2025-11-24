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
// import imgBackground from '/images/background.png';
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

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 255, 187'; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};

interface SignalSyncProps {
  onNavigate?: (direction: 'left' | 'right') => void;
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
    <div className="relative size-[1.433rem] shrink-0" data-name="alarm-clock">
      <svg
        className="block size-full"
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
    <div className="relative size-[1.433rem] shrink-0" data-name="target">
      <svg
        className="block size-full"
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
      className="relative size-[1.433rem] shrink-0"
      data-name="location-crosshairs"
    >
      <svg
        className="block size-full"
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
    <div className="relative size-[1.433rem] shrink-0" data-name="book">
      <svg
        className="block size-full"
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
    <div className="relative size-[1.433rem] shrink-0" data-name="user-square">
      <svg
        className="block size-full"
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

const WelcomeFutureTheme: React.FC<SignalSyncProps> = ({
  onNavigate,
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

  const [profile, setProfile] = useState<any>([]);
  const [apSkl, setApSkl] = useState([]);
  const [authorArray, setauthorArray] = useState<any[]>([]);
  const [showComplete, setShowComplete] = useState(false);
  const [blackScreen, setBlackScreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [LanguageContent, setLanguageContent] = useState({
    GameTitleLanguage: formData?.gameTitle,
    StoryLineLanguage: formData?.gameStoryLine,
    AuthorNameLanguage: formData?.gameAuthorName,
    LearnOutLanguage:
      formData?.gameLearningOutcome !== ''
        ? formData?.gameLearningOutcome?.split('\n')
        : '',
    AdditionalWelcomeNoteLanguage: formData?.gameAdditionalWelcomeNote,
  });
  const useData = useContext(ProfileContext);
  const [gameId, setGameId] = useState();
  const [skills, setSkills] = useState([]);

  // 🔹 Keep gameId in state whenever formData changes
  useEffect(() => {
    if (formData?.gameId) {
      setGameId(formData.gameId);
    }
  }, [formData]);

  useEffect(() => {
    console.log('formData changed:', formData);
    if (formData?.gameId) {
      setGameId(formData.gameId);
    }
  }, [formData]);

  useEffect(() => {
    console.log('gameId state changed:', gameId);
  }, [gameId]);

  useEffect(() => {
    if (!gameId) return; // ⛔ skip until gameId is ready

    async function fetchSkills() {
      const res = await getSkillsName(gameId);
      if (res?.status === 'Success') {
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
    const res = await getSkillsName(formData.gameId);
    if (res?.status === 'Success') {
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
          const GameTitle = TitleGameFiltered[0]?.content
            ? TitleGameFiltered[0]?.content
            : formData?.gameTitle;
          setLanguageContent((prev: any) => ({
            ...prev,
            GameTitleLanguage: GameTitle,
          }));
        }
        if (StoryLineFiltered.length > 0) {
          const storyLine = StoryLineFiltered[0]?.content
            ? StoryLineFiltered[0]?.content
            : formData?.gameStoryLine;
          setLanguageContent((prev: any) => ({
            ...prev,
            StoryLineLanguage: storyLine,
          }));
        }
        if (LearningOutFiltered.length > 0) {
          const LearningOutComes = LearningOutFiltered[0]?.content
            ? LearningOutFiltered[0]?.content?.split('\n')
            : formData?.gameLearningOutcome?.split('\n');
          setLanguageContent((prev: any) => ({
            ...prev,
            LearnOutLanguage: LearningOutComes,
          }));
        }
        if (AuthorNameFiltered.length > 0) {
          const AuthorName = AuthorNameFiltered[0]?.content
            ? AuthorNameFiltered[0]?.content
            : formData?.gameAuthorName;
          setLanguageContent((prev: any) => ({
            ...prev,
            AuthorNameLanguage: AuthorName,
          }));
        }
        if (AdditionalWelNoteFiltered.length > 0) {
          const AdditionalWelcomeNote = AdditionalWelNoteFiltered[0]?.content
            ? AdditionalWelNoteFiltered[0]?.content
            : formData?.gameAdditionalWelcomeNote;
          setLanguageContent((prev: any) => ({
            ...prev,
            AdditionalWelcomeNoteLanguage: AdditionalWelcomeNote,
          }));
        }
      }
    } else {
      setLanguageContent((prev: any) => ({
        GameTitleLanguage: formData.gameTitle,
        StoryLineLanguage: formData?.gameStoryLine,
        AuthorNameLanguage: formData?.gameAuthorName,
        LearnOutLanguage:
          formData?.gameLearningOutcome !== ''
            ? formData?.gameLearningOutcome?.split('\n')
            : '',
        AdditionalWelcomeNoteLanguage: formData?.gameAdditionalWelcomeNote,
      }));
    }
  };

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
        container.classList.add('scrollbar-down');
      } else {
        // Scrolling up
        container.classList.remove('scrollbar-down');
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
    if (typeof window !== 'undefined' && window.innerWidth <= 950) {
      return '10%'; // Always 10% for screens ≤ 870px
    }

    if (!title) return '2px'; // default for larger screens
    const length = title.length;

    if (length <= 20) return '25px';
    if (length <= 25) return '40px';
    if (length <= 40) return '50px';
    return '55px';
  };

  // Info Card Component
  const InfoCard: React.FC<{
    icon: React.ReactNode;
    content: React.ReactNode;
    fontSize?: string;
  }> = ({ icon, content, fontSize = '13.378px' }) => {
    return (
      <div
        className="relative w-full shrink-0 rounded-[0.6rem] backdrop-blur-[2.499rem] backdrop-filter"
        style={{
          background: `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
            primaryColor,
          )}, 0.4) 127.18%)`,
        }}
      >
        <div className="relative flex size-full flex-row items-center overflow-clip">
          <div className="relative box-border flex w-full flex-row content-stretch items-center justify-start gap-2.5 px-[1.2rem] py-[0.717rem]">
            {icon}
            <div
              className="font-rubik relative flex shrink-0 flex-col justify-center text-left font-medium leading-[0] tracking-[-0.04px] text-[#ffffff]"
              style={{ fontSize }}
            >
              <p className="adjustLetterSpacing block whitespace-pre leading-[1.893rem]">
                {content}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[1.599px_3.199px_12.795px_0px_inset_rgba(248,248,248,0.06)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[0.6rem] border-[1.2px] border-solid border-[rgba(255,255,255,0.4)]" />
      </div>
    );
  };

  // Skill Card Component
  const SkillCard: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div
        className="relative min-h-px min-w-px shrink-0 grow basis-0 rounded-[0.6rem] backdrop-blur-[2.499rem] backdrop-filter"
        style={{
          background: `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
            primaryColor,
          )}, 0.4) 127.18%)`,
        }}
      >
        <div className="relative flex size-full flex-row items-center overflow-clip">
          <div className="relative box-border flex w-full flex-row content-stretch items-center justify-start gap-2.5 px-[1.2rem] py-[0.717rem]">
            <Target />
            <div className="font-rubik relative flex shrink-0 flex-col justify-center text-nowrap text-left text-sm font-medium leading-[0] tracking-[-0.04px] text-[#ffffff]">
              <p className="adjustLetterSpacing block whitespace-pre leading-[1.893rem]">
                {title}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[1.599px_3.199px_12.795px_0px_inset_rgba(248,248,248,0.06)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[0.6rem] border-[1.2px] border-solid border-[rgba(255,255,255,0.4)]" />
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
        Math.min(scrollableHeight, newScrollTop),
      );

      scrollContainer.scrollTop = clampedScrollTop;

      // Update position immediately for smooth dragging
      const newScrollPercentage =
        scrollableHeight > 0 ? clampedScrollTop / scrollableHeight : 0;
      setScrollPosition(newScrollPercentage);
    },
    [isDragging, dragStartY, dragStartScrollTop],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleStartMission = () => {
    onNavigate?.('right');
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black/90 bg-cover bg-center bg-no-repeat"
      // style={{ backgroundImage: `url('${imgBackground}')` }}
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

      {/* Main Content */}
      <div className="flex-grow-1 flex h-full flex-col items-center justify-center pt-0">
        <div
          className="relative flex h-full max-h-[40rem] w-full max-w-[54.875rem] flex-col items-center justify-start gap-5 overflow-hidden rounded-[2.375rem] px-10 py-8 backdrop-blur-[3.724rem] backdrop-filter"
          style={{
            background: `linear-gradient(21deg, rgba(0, 0, 0, 0.40) -10.76%, rgba(${hexToRgb(
              primaryColor,
            )}, 0.2) 127.18%)`,
          }}
        >
          {/* Background Effects */}
          <div className="pointer-events-none absolute right-[-12.5rem] top-[3.125rem] z-0 flex h-[27.69rem] w-[31.188rem] items-center justify-center mix-blend-lighten">
            <div className="flex-none rotate-[33.283deg]">
              <div className="relative h-[15.169rem] w-[27.352rem]">
                <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1250 1055"
                  >
                    <g
                      filter="url(#filter0_f_bg1)"
                      id="Ellipse 7187"
                      opacity="0.2"
                      style={{ mixBlendMode: 'lighten' }}
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
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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

          <div className="pointer-events-none absolute left-[-12.5rem] top-[3.125rem] z-0 flex h-[27.69rem] w-[31.188rem] items-center justify-center mix-blend-lighten">
            <div className="flex-none rotate-[33.283deg]">
              <div className="relative h-[15.169rem] w-[27.352rem]">
                <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1250 1055"
                  >
                    <g
                      filter="url(#filter0_f_bg2)"
                      id="Ellipse 7187"
                      opacity="0.2"
                      style={{ mixBlendMode: 'lighten' }}
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
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
          <div className="relative z-10 mb-4 flex w-full flex-col items-center gap-4">
            {/* Welcome Title */}
            <div className="relative">
              <h1
                className="mb-1 text-center text-4xl font-normal tracking-[0.005rem] text-white"
                style={{
                  textShadow: `rgba(${hexToRgb(
                    primaryColor,
                  )}, 0.5) 0px 0px 9px`,
                }}
              >
                Welcome
              </h1>
            </div>

            {/* Signal Sync with Decorative Lines */}
            <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-start gap-1.5 p-0">
              <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 items-center justify-center">
                <div className="w-full flex-none rotate-[180deg] scale-y-[-100%]">
                  <div className="relative h-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg
                        className="block size-full"
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
                className="relative flex shrink-0 flex-col justify-center text-nowrap text-center text-4xl not-italic leading-[0] tracking-[0.08px]"
                style={{ color: primaryColor }}
              >
                <p className="adjustLetterSpacing block whitespace-pre leading-[3.859rem]">
                  Signal Sync
                </p>
              </div>
              <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 items-center justify-center">
                <div className="w-full flex-none rotate-[180deg] scale-y-[-100%]">
                  <div className="relative h-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg
                        className="block size-full"
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
            {formData.gameIsShowGameDuration === 'true' && (
              <div className="relative box-border flex shrink-0 flex-row content-stretch items-center justify-start gap-3.5 p-0">
                <AlarmClock />
                <div className="font-rubik relative flex shrink-0 flex-col justify-center text-nowrap text-center text-[1.433rem] font-medium tracking-[-0.09px] text-[#ffffff]">
                  <p className="adjustLetterSpacing block whitespace-pre">
                    {formData.gameDuration > 1
                      ? Math.round(formData.gameDuration * 0.6) + ' minutes'
                      : Math.round(formData.gameDuration * 0.6) + ' minute'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Content Box with Interactive Custom Scrollbar */}
          <div className="max-md2x:flex-1 max-md2x:overflow-y-auto relative z-10 h-[17.75rem] w-full flex-shrink-0">
            {/* Scrollable Content Container */}
            <div
              ref={scrollContainerRef}
              className="scrollbar-hidden relative h-full overflow-y-auto overflow-x-hidden pl-5 pr-8"
              onScroll={handleScroll}
            >
              <div className="relative box-border flex flex-col content-stretch items-center justify-start gap-6">
                {/* Story Description */}
                {formData.gameIsShowStoryline === 'true' && (
                  <div className="flex w-full flex-col justify-center">
                    <p className="adjustLetterSpacing font-rubik block text-justify text-base font-normal leading-[1.851rem] tracking-[-0.09px] text-white">
                      {LanguageContent?.StoryLineLanguage}
                    </p>
                  </div>
                )}

                {/* Skills Section */}
                {formData.gameIsShowSkill === 'true' && (
                  <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-1 p-0">
                    <div className="font-glancyr-neue flex w-full shrink-0 flex-col justify-center text-left text-base tracking-[0.1529px] text-[#ffffff]">
                      <p className="block text-xl leading-normal">SKILLS</p>
                    </div>
                    <div className="relative box-border flex w-full shrink-0 flex-row content-stretch items-center justify-start gap-2.5 p-0">
                      {authorArray?.map((skillId: any, index: any) => {
                        const skillName = findSkillName(skillId);
                        return skillName ? (
                          <SkillCard key={index} title={skillName} />
                        ) : null;
                      })}
                      
                    </div>
                  </div>
                )}

                {/* Learning Outcome */}
                {formData.gameIsShowLearningOutcome === 'true' && (
                  <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-1 p-0">
                    <div className="font-glancyr-neue flex w-full shrink-0 flex-col justify-center text-left text-base tracking-[0.1529px] text-[#ffffff]">
                      <p className="block text-xl leading-normal">
                        LEARNING OUTCOME
                      </p>
                    </div>
                    {LanguageContent?.LearnOutLanguage?.map(
                      (outcome: any, index: any) => (
                        <InfoCard
                          key={index}
                          icon={<LocationCrosshairs />}
                          content={outcome}
                        />
                      ),
                    )}
                  </div>
                )}

                {/* NOTE Section */}
                {formData.gameIsShowAdditionalWelcomeNote === 'true' && (
                  <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-1 p-0">
                    <div className="font-glancyr-neue flex w-full shrink-0 flex-col justify-center text-left text-base tracking-[0.1529px] text-[#ffffff]">
                      <p className="block text-xl leading-normal">NOTE</p>
                    </div>
                    <InfoCard
                      icon={<Book />}
                      content={renderContent()}
                      fontSize="14px"
                    />
                  </div>
                )}

                {/* AUTHOR Section */}
                <div className="relative box-border flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-1 p-0 pb-4">
                  <div className="font-glancyr-neue flex w-full shrink-0 flex-col justify-center text-left text-base tracking-[0.1529px] text-[#ffffff]">
                    <p className="block text-xl leading-normal">AUTHOR</p>
                  </div>
                  <InfoCard
                    icon={<UserSquare />}
                    content="Dr. Elena Rodriguez"
                    fontSize="14px"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Custom Scrollbar */}
            <div
              ref={scrollbarRef}
              className="md2x:right-0 md2x:-top-1 absolute -top-0 right-2 flex h-full w-4 items-center justify-center"
            >
              {/* Track Line */}
              <div
                className="pointer-events-none h-[90%] w-0.5 rounded-full opacity-60"
                style={{ backgroundColor: primaryColor }}
              />

              {/* Interactive Thumb with Outer Circle */}
              <div
                className={`md2x:w-5 md2x:h-5 absolute h-3 w-3 cursor-pointer rounded-full transition-all duration-150 ease-out ${
                  isDragging ? 'scale-110' : 'hover:scale-110'
                }`}
                style={{
                  top: `${6.5 + scrollPosition * 90}%`,
                  transform: 'translateY(-50%)',
                }}
                onMouseDown={handleThumbMouseDown}
              >
                {/* Outer Ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  style={{
                    backgroundColor: primaryColor,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Start Mission Button */}
          <div className="relative z-10 mt-6 flex w-full justify-center">
            <Button
              onClick={handleStartMission}
              className="rounded-[2rem] border-2 border-white/20 bg-gradient-to-r from-black/80 to-black/60 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, rgba(${hexToRgb(
                  primaryColor,
                )}, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)`,
                borderColor: primaryColor,
                boxShadow: `0 0 20px rgba(${hexToRgb(primaryColor)}, 0.5)`,
              }}
            >
              Start Mission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFutureTheme;
