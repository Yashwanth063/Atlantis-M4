import React from 'react';
import { useContext, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import svgPaths from '../../../../imports/svg-knollny4nu';
import svgThankYou from '../../../../imports/svg-fi1d3y679l';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';
import { useParams } from 'react-router-dom';
import {
  CustomCoinIcon,
  CustomHomeIcon,
  CustomMapIcon,
  CustomRankingIcon,
  CustomSettingsIcon,
} from '../../../../components/ui/CustomIcons';
// import imgBackground from '../../../../../public/background.png';
// import topNav from '../../../../../public/top-nav-bg.png';
import { useColor } from '../../../../components/ui/ColorContext';
import ColorPicker from '../../../../components/ui/ColorPicker';
import { Slider } from '../../../../components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { insertGameFedback } from '../../../../../src/utils/game/gameService';

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 255, 187'; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};

const ThankyouFutureTheme: React.FC<{
  formData: any;
  imageSrc: any;
  setCurrentScreenId: any;
  preloadedAssets: any;
  gameInfo: any;
  FeedbackcurrentPosition: any;
  setFeedbackCurrentPosition: (value: any) => void;
  interactionBlockArray: any;
  profileData: any;
  getFeedbackData: () => void;
  setFeedbackNavigateNext: any;
  setInterActionBlockArray: any;
  feedbackList: any;
  setCurrentQuestNo: any;
  setFirstLoading: any;
  learnerPlayList: any;
  setLearnerPlayingDetails: any;
  AssignId: any;
}> = ({
  formData,
  imageSrc,
  setCurrentScreenId,
  preloadedAssets,
  gameInfo,
  FeedbackcurrentPosition,
  setFeedbackCurrentPosition,
  interactionBlockArray,
  profileData,
  getFeedbackData,
  setFeedbackNavigateNext,
  setInterActionBlockArray,
  feedbackList,
  setCurrentQuestNo,
  setFirstLoading,
  learnerPlayList,
  setLearnerPlayingDetails,
  AssignId,
}) => {
   const useData = useContext(ProfileContext);
  const { profile, setProfile } = useContext(ScoreContext);
  const user: any = JSON.parse(localStorage.getItem('user') || '{}');
  const { id } = useParams();
  const Gameid = id ? id : null;
  const GameId = learnerPlayList?.GameId;

  const typeofUser = gameInfo?.reviewer?.ReviewerId
    ? 'reviewer'
    : user?.data?.id
    ? 'creator'
    : null;
  const renderContentTy = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    let parts = null;
    if (profileData?.Audiogetlanguage.length !== 0) {
      const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
        (key: any) => key?.textId === formData?.gameId,
      );
      if (GameLanguageFilter.length > 0) {
        const ThankYouFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameThankYouMessage',
        );
        if (ThankYouFiltered.length > 0) {
          parts = ThankYouFiltered[0]?.content
            ? ThankYouFiltered[0]?.content.split(linkRegex)
            : formData.gameThankYouMessage?.split(linkRegex);
        } else {
          parts = formData.gameThankYouMessage?.split(linkRegex);
        }
      } else {
        parts = formData.gameThankYouMessage?.split(linkRegex);
      }
    } else {
      parts = formData.gameThankYouMessage?.split(linkRegex);
    }
    // const parts = formData.gameThankYouMessage?.split(linkRegex);

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

  // for Thankyou-like data handling
  const [userInputs, setUserInputs] = useState<any>({
    gameOthers: learnerPlayList?.playerInputs?.Thankyou?.gameOthers || null,
    gameContent: learnerPlayList?.playerInputs?.Thankyou?.gameContent || null,
    gameRelevance:
      learnerPlayList?.playerInputs?.Thankyou?.gameRelevance || null,
    gameBehaviour:
      learnerPlayList?.playerInputs?.Thankyou?.gameBehaviour || null,
    gameGamification:
      learnerPlayList?.playerInputs?.Thankyou?.gameGamification || null,
    gameRecommendation:
      learnerPlayList?.playerInputs?.Thankyou?.gameRecommendation || null,
  });

  const { primaryColor } = useColor();

  // State for tracking selected feedback options
  const [selectedFeedback, setSelectedFeedback] = useState<{
    content: 'useful' | 'not-useful' | null;
    relevance: 'apply' | 'not-relevant' | null;
    behaviour: 'understood' | 'not-sure' | null;
    gamification: 'like-games' | 'dislike-format' | null;
  }>({
    content: null,
    relevance: null,
    behaviour: null,
    gamification: null,
  });

  const NavigationArrow: React.FC<{
    direction: "left" | "right";
    onClick: () => void;
  }> = ({ direction, onClick }) => {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="w-[3.75rem] h-10 py-2 px-4 rounded-3xl transition-all duration-200 hover:scale-110"
        style={{
          background: `linear-gradient(${
            direction === "left" ? "275.041deg" : "90deg"
          },
                rgba(${hexToRgb(primaryColor)}, 0.6) 7.25%, rgba(${hexToRgb(
            primaryColor
          )}, 0.15) 84.803%)`,
          border: `1px solid ${primaryColor}`,
          boxShadow: `0px 0px 15.9542px 0px rgba(${hexToRgb(
            primaryColor
          )}, 0.3)`,
        }}
      >
        {direction === "left" ? (
          <ChevronLeft className="!h-4 !w-4 text-white" />
        ) : (
          <ChevronRight className="!h-4 !w-4 text-white" />
        )}
      </Button>
    );
  };


  
  //previous and next page logic
  const handleNext = async () => {
    setFirstLoading(true);
    const data = {
      feedQuestNo: useData?.State?.PlayQuestNo,
      gameContent: userInputs.gameContent,
      gameRelevance: userInputs.gameRelevance,
      gameBehaviour: userInputs.gameBehaviour,
      gameGamification: userInputs.gameGamification,
      gameRecommendation: userInputs.gameRecommendation,
      gameOthers: userInputs.gameOthers,
      AssignId: AssignId,
    };

    const datas = JSON.stringify(data);
    const result = await insertGameFedback(GameId, datas);

    if (result.status !== 'Success') {
      setCurrentScreenId(13);
      return false;
    } else {
      // useData?.Function?.handleNextTab();
      setLearnerPlayingDetails((prev: any) => ({
        ...prev,
        playerInputs: {
          ...prev.playerInputs,
          Thankyou: userInputs,
        },
      }));
      setCurrentScreenId(13); //Afrith-modified-31/JULY/24
      return false; //Afrith-modified-31/JULY/24
    }

    // },300)
  };
  const previousNavigation = () => {
    useData?.setMotionEffect(true);
    const LastquestNo = parseInt(profile.currentQuest);
    setFirstLoading(false);
    setCurrentQuestNo(LastquestNo);
    setTimeout(() => {
      if (formData?.gameIsShowTakeaway === 'true') {
        setCurrentScreenId(7);
        return false;
      } else if (
        formData?.gameIsShowReflectionScreen === 'true' &&
        gameInfo?.reflectionQuestions.length > 0
      ) {
        setCurrentScreenId(3);
        return false;
      } else if (
        feedbackList.length !== 0 &&
        gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion'
      ) {
        if (
          feedbackList?.find((item: any) => item.quest == profile.currentQuest)
        ) {
          const groupedFeedback: { [key: string]: any[] } = {};
          feedbackList.forEach((feedback: any) => {
            if (!(feedback.Seq in groupedFeedback)) {
              groupedFeedback[feedback.Seq] = [];
            }
            groupedFeedback[feedback.Seq].push(feedback);
          });
          const firstPageFeedback: any[] = [];
          Object.keys(groupedFeedback).forEach((seq: any) => {
            const lastIndex = groupedFeedback[seq].length - 1;
            if (profile.currentQuest == groupedFeedback[seq][lastIndex].quest) {
              firstPageFeedback.push(groupedFeedback[seq][lastIndex]);
            }
          });
          setFeedbackCurrentPosition(firstPageFeedback.length - 1);
          setInterActionBlockArray(firstPageFeedback.length - 1);
          getFeedbackData();
          setFeedbackNavigateNext(false);
          setCurrentScreenId(14); //Navigate to together all feedback
        }
      } else if (formData?.gameIsShowLeaderboard === 'true') {
        setCurrentScreenId(4);
        return false;
      } else {
        setCurrentScreenId(6);
        return false;
      }
    }, 300);
  };

  // Emoji components from Figma import adapted for dynamic colors
  const FaceSmile = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-smile">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p14e33780} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const FaceMeh = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-meh">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p12f72cc0} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const FaceSmileWink = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-smile-wink">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p1db62a40} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const FaceDiagonalMouth = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-diagonal-mouth">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p29912600} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const FaceGrinStars = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-grin-stars">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p19ed8900} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const FaceMehBlank = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="face-meh-blank">
          <path d={svgThankYou.p7d93400} fill="#FFCE0A" opacity="0.4" />
          <path d={svgThankYou.p15121800} fill="#FFCE0A" />
        </g>
      </svg>
    </div>
  );

  const Like = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="like">
          <path d={svgThankYou.p316f6700} fill="#11FCBD" />
          <path d={svgThankYou.p51d3680} fill="#11FCBD" opacity="0.4" />
        </g>
      </svg>
    </div>
  );

  const Dislike = () => (
    <div className="relative shrink-0 h-[1.2rem] w-[1.2rem]">
      <svg
        className="block h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="dislike">
          <path d={svgThankYou.p3c87f300} fill="#FF0A0A" />
          <path d={svgThankYou.p6732eb0} fill="#FF0A0A" opacity="0.4" />
        </g>
      </svg>
    </div>
  );

  // Feedback Card Component with selection state
  const FeedbackCard: React.FC<{
    icon: React.ReactNode;
    text: string;
    isSelected: boolean;
    onClick: () => void;
  }> = ({ icon, text, isSelected, onClick }) => (
    <div
      className="backdrop-blur-[2.499rem] backdrop-filter  grow h-[4.198rem] min-h-px min-w-px relative rounded-[0.6rem] shrink-0 cursor-pointer hover:scale-105 transition-all duration-300 flex-1 w-full"
      onClick={onClick}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, rgba(${hexToRgb(
              primaryColor
            )}, 0.3) 0%, rgba(${hexToRgb(primaryColor)}, 0.1) 100%)`
          : `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
              primaryColor
            )}, 0.2) 127.18%)`,
      }}
    >
      <div className="flex flex-row items-center overflow-clip relative h-full w-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 h-[4.198rem] items-center justify-start p-[1.2rem] relative w-full">
          {icon}
          <div className="flex flex-col font-rubik font-semibold justify-center leading-[0] relative text-[#ffffff] text-sm text-left tracking-[-0.04px]">
            <p className="adjustLetterSpacing block leading-[1rem]">{text}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[1.599px_3.199px_12.795px_0px_inset_rgba(248,248,248,0.06)]" />
      <div
        className="absolute border-[1.2px] border-solid inset-0 pointer-events-none rounded-[0.6rem] transition-all duration-300"
        style={{
          borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.4)",
          boxShadow: isSelected
            ? `0 0 20px rgba(${hexToRgb(primaryColor)}, 0.5)`
            : "none",
        }}
      />
    </div>
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-no-repeat bg-center bg-cover bg-black/90"
      // style={{ backgroundImage: `url('${imgBackground}')` }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 relative h-full flex">
        {/* Top Navigation Bar */}
        <div
              // style={{ backgroundImage: `url('${topNav}')` }}
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
                  <div className="flex flex-col gap-10">
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
                      className="w-[5.75rem] text-lg h-11 py-2 px-4 rounded-4xl transition-all duration-200 hover:scale-110 text-white hover:text-white mx-auto"
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

        {/* Thank You Content */}
        <div className="h-full flex-grow flex flex-col justify-center items-center pt-24">
          <div
            className="flex flex-col gap-2 lg:gap-5 max-h-fit max-w-[74.875rem] overflow-hidden h-full w-full items-center justify-start rounded-[2.375rem] relative px-10 py-8 backdrop-filter backdrop-blur-[3.724rem]"
            style={{
              background: `linear-gradient(21deg, rgba(${hexToRgb(
                primaryColor
              )}, 0.05) -10.76%, rgba(${hexToRgb(
                primaryColor
              )}, 0.15) 127.18%)`,
            }}
          >
            <div className="flex flex-col gap-5 ">
              {/* Thank You Title */}
              <div className="relative">
                <h1
                  className="text-4xl  font-normal tracking-[0.08px] text-center"
                  style={{
                    color: "#ffffff",
                    textShadow: `rgba(${hexToRgb(
                      primaryColor
                    )}, 0.5) 0px 0px 10px`,
                  }}
                >
                  Thank You
                </h1>
              </div>
              {/* Subtitle */}
              <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-white text-xl text-center tracking-[-0.0753px]">
                <p className="adjustLetterSpacing block leading-[1.799rem]">
                  Thanks for playing in the future of teamwork! Your empathy
                  makes every mission count.
                </p>
              </div>
              {/* Feedback Section Header */}
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full lg:mb-6">
                <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                  <div className="h-0 relative w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                      <svg
                        className="block h-full w-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 456 2"
                      >
                        <line
                          stroke={`url(#paint0_linear_feedback_${primaryColor.replace(
                            "#",
                            ""
                          )})`}
                          strokeWidth="2"
                          x2="455.24"
                          y1="1"
                          y2="1"
                        />
                        <defs>
                          <linearGradient
                            gradientUnits="userSpaceOnUse"
                            id={`paint0_linear_feedback_${primaryColor.replace(
                              "#",
                              ""
                            )}`}
                            x1="455.24"
                            x2="0"
                            y1="1.9999"
                            y2="1.99991"
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
                <div
                  className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-xl text-center text-nowrap tracking-[0.08px]"
                  style={{
                    textShadow: `rgba(${hexToRgb(
                      primaryColor
                    )}, 0.5) 0px 0px 10px`,
                  }}
                >
                  <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                    Feedback
                  </p>
                </div>
                <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                  <div className="h-0 relative w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                      <svg
                        className="block h-full w-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 456 2"
                      >
                        <line
                          stroke={`url(#paint0_linear_feedback_${primaryColor.replace(
                            "#",
                            ""
                          )})`}
                          strokeWidth="2"
                          x2="455.24"
                          y1="1"
                          y2="1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Question */}
              <div className="box-border content-stretch flex flex-col gap-[1.799rem] items-center justify-start p-0 relative shrink-0 ">
                <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-[#bdbdbd] text-[1.194rem] text-center tracking-[-0.0753px]">
                  <p className="adjustLetterSpacing block leading-[1.799rem]">
                    How do you feel about the experience ?
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full relative z-10 flex-shrink-0 max-lg:overflow-y-auto flex-1">
              <div className="relative">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="relative">
                    {/* Feedback Categories */}
                    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full mb-2">
                      {/* First Row - Content & Relevance */}
                      <div className="flex flex-wrap gap-8 items-start justify-start p-0 relative shrink-0 w-full">
                        {/* Content Section */}
                        <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0">
                          <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-base text-center text-nowrap tracking-[-0.08px]">
                            <p className="adjustLetterSpacing block leading-relaxed whitespace-pre">
                              Content
                            </p>
                          </div>
                          <div className="box-border content-stretch flex  lg:flex-row flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeedbackCard
                              icon={<FaceSmile />}
                              text="I learned something useful"
                              isSelected={selectedFeedback.content === "useful"}
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  content:
                                    prev.content === "useful" ? null : "useful",
                                }))
                              }
                            />
                            <FeedbackCard
                              icon={<FaceMeh />}
                              text="It wasn't useful"
                              isSelected={
                                selectedFeedback.content === "not-useful"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  content:
                                    prev.content === "not-useful"
                                      ? null
                                      : "not-useful",
                                }))
                              }
                            />
                          </div>
                        </div>
                        {/* Relevance Section */}
                        <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0">
                          <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-base text-center text-nowrap tracking-[-0.08px]">
                            <p className="adjustLetterSpacing block leading-relaxed whitespace-pre">
                              Relevance
                            </p>
                          </div>
                          <div className="box-border content-stretch flex  lg:flex-row flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeedbackCard
                              icon={<FaceSmileWink />}
                              text="I'll apply what I learned"
                              isSelected={
                                selectedFeedback.relevance === "apply"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  relevance:
                                    prev.relevance === "apply" ? null : "apply",
                                }))
                              }
                            />
                            <FeedbackCard
                              icon={<FaceDiagonalMouth />}
                              text="It's not relevant to me"
                              isSelected={
                                selectedFeedback.relevance === "not-relevant"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  relevance:
                                    prev.relevance === "not-relevant"
                                      ? null
                                      : "not-relevant",
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* Second Row - Behaviour & Gamification */}
                      <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-0 relative shrink-0 w-full">
                        {/* Behaviour Section */}
                        <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0">
                          <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-base text-center text-nowrap tracking-[-0.08px]">
                            <p className="adjustLetterSpacing block leading-relaxed whitespace-pre">
                              Behaviour
                            </p>
                          </div>
                          <div className="box-border content-stretch flex  lg:flex-row flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeedbackCard
                              icon={<FaceGrinStars />}
                              text="I understood what I can do differently"
                              isSelected={
                                selectedFeedback.behaviour === "understood"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  behaviour:
                                    prev.behaviour === "understood"
                                      ? null
                                      : "understood",
                                }))
                              }
                            />
                            <FeedbackCard
                              icon={<FaceMehBlank />}
                              text="I'm not sure"
                              isSelected={
                                selectedFeedback.behaviour === "not-sure"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  behaviour:
                                    prev.behaviour === "not-sure"
                                      ? null
                                      : "not-sure",
                                }))
                              }
                            />
                          </div>
                        </div>
                        {/* Gamification Section */}
                        <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0">
                          <div className="flex flex-col font-rubik font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-base text-center text-nowrap tracking-[-0.08px]">
                            <p className="adjustLetterSpacing block leading-relaxed whitespace-pre">
                              Gamification
                            </p>
                          </div>
                          <div className="box-border content-stretch flex  lg:flex-row flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeedbackCard
                              icon={<Like />}
                              text="I would like to learn via games"
                              isSelected={
                                selectedFeedback.gamification === "like-games"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  gamification:
                                    prev.gamification === "like-games"
                                      ? null
                                      : "like-games",
                                }))
                              }
                            />
                            <FeedbackCard
                              icon={<Dislike />}
                              text="I don't like this format"
                              isSelected={
                                selectedFeedback.gamification ===
                                "dislike-format"
                              }
                              onClick={() =>
                                setSelectedFeedback((prev) => ({
                                  ...prev,
                                  gamification:
                                    prev.gamification === "dislike-format"
                                      ? null
                                      : "dislike-format",
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5  w-full">
              {/* Feedback Link Section */}
              <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start relative shrink-0 w-full">
                {/* Link Header */}
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
                  <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                    <div className="h-0 relative w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg
                          className="block h-full w-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 179 2"
                        >
                          <line
                            stroke={`url(#paint0_linear_link_${primaryColor.replace(
                              "#",
                              ""
                            )})`}
                            strokeWidth="2"
                            x2="178.74"
                            y1="1"
                            y2="1"
                          />
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id={`paint0_linear_link_${primaryColor.replace(
                                "#",
                                ""
                              )}`}
                              x1="178.74"
                              x2="0"
                              y1="1.9999"
                              y2="1.9999"
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
                  <div className="flex flex-col font-rubik justify-center leading-[0] not-italic relative shrink-0 text-white text-xl text-center">
                    <p className="adjustLetterSpacing block leading-[2.946rem]">
                      Could you please share your feedbacks with us on the below
                      link :
                    </p>
                  </div>
                  <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                    <div className="h-0 relative w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg
                          className="block h-full w-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 179 2"
                        >
                          <line
                            stroke={`url(#paint0_linear_link_${primaryColor.replace(
                              "#",
                              ""
                            )})`}
                            strokeWidth="2"
                            x2="178.74"
                            y1="1"
                            y2="1"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex justify-between items-center w-full">
                <NavigationArrow
                  direction="left"
                  onClick={previousNavigation}
                />
                <div className="flex flex-col  justify-center leading-[0] not-italic relative shrink-0 text-xl text-center text-nowrap text-white">
                  <a
                    className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] block leading-[2.946rem] whitespace-pre"
                    href="#"
                  >
                    link.io
                  </a>
                </div>
                <NavigationArrow
                  direction="right"
                  onClick={handleNext}
                />
              </div>
            </div>
            {/* Background Ellipses */}
            {/* <div className="absolute flex h-[27.69rem] items-center justify-center left-[29.796rem] mix-blend-lighten top-[-9.561rem] w-[31.188rem] pointer-events-none">
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
                        filter={`url(#filter_thankyou_1_${primaryColor.replace(
                          "#",
                          ""
                        )})`}
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
                          id={`filter_thankyou_1_${primaryColor.replace(
                            "#",
                            ""
                          )}`}
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
                            result="effect1_foregroundBlur"
                            stdDeviation="202.888"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[27.69rem] items-center justify-center left-[-8.366rem] mix-blend-lighten top-[-11.83rem] w-[31.188rem] pointer-events-none">
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
                        filter={`url(#filter_thankyou_2_${primaryColor.replace(
                          "#",
                          ""
                        )})`}
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
                          id={`filter_thankyou_2_${primaryColor.replace(
                            "#",
                            ""
                          )}`}
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
                            result="effect1_foregroundBlur"
                            stdDeviation="202.888"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Inset Shadow Border */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[2.375rem]"
              style={{
                boxShadow: `0px 0px 11px 0px inset rgba(${hexToRgb(
                  primaryColor
                )}, 0.3), 0px 0px 20px 0px rgba(${hexToRgb(
                  primaryColor
                )}, 0.2)`,
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
          <CustomSettingsIcon color={primaryColor} className="!h-10 !w-10  -mb-1" />
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
        return svgPaths.p1a822c00;
      case "home":
        return svgPaths.p3bf15400;
      case "map":
        return svgPaths.p285e4100;
      case "settings":
        return svgPaths.p2037cc80;
      case "coin":
        return svgPaths.p1444db00;
      default:
        return svgPaths.p1444db00;
    }
  };

  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <path d={getIconPath()} fill={color} />
    </svg>
  );
};

export default ThankyouFutureTheme;
