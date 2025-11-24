"use client";

import type React from "react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import svgPaths from "../../../../imports/svg-knollny4nu";

import {
  CustomCoinIcon,
  CustomHomeIcon,
  CustomMapIcon,
  CustomRankingIcon,
  CustomSettingsIcon,
} from "../../../../components/ui/CustomIcons";
// import imgBackground from "../../../../assets/img/NewUI_Images/background.png";
import { useColor } from "../../../../components/ui/ColorContext";
import ColorPicker from "../../../../components/ui/ColorPicker";
import { Textarea } from "../../../../components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Slider } from "../../../../components/ui/slider";
import { useContext, useEffect, useState } from "react";
import { storeReflection } from "utils/gameApplication/gamePlayService";
import { ProfileContext } from "../EntirePreview";
import { ScoreContext } from "../GamePreview";
import { useParams } from "react-router-dom";

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 255, 187"; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};

interface ReflectionFutureThemeProps {
  formData?: any;
  reflectionQuestions?: any;
  imageSrc?: any;
  gameInfo?: any;
  setCurrentScreenId?: any;
  preloadedAssets?: any;
  FeedbackcurrentPosition?: any;
  setFeedbackCurrentPosition?: any;
  interactionBlockArray?: any;
  profileData?: any;
  feedbackList?: any;
  getFeedbackData?: () => void;
  setInterActionBlockArray?: any;
  setFeedbackNavigateNext?: any;
  setCurrentQuestNo?: any;
  setFirstLoading?: any;
  learnerPlayList?: any;
  setLearnerPlayingDetails?: any;
  onNavigate?: (direction: "left" | "right") => void;
}

const ReflectionFutureTheme: React.FC<ReflectionFutureThemeProps> = ({
  formData,
  reflectionQuestions,
  imageSrc,
  gameInfo,
  setCurrentScreenId,
  preloadedAssets,
  FeedbackcurrentPosition,
  setFeedbackCurrentPosition,
  interactionBlockArray,
  profileData,
  feedbackList,
  getFeedbackData,
  setInterActionBlockArray,
  setFeedbackNavigateNext,
  setCurrentQuestNo,
  setFirstLoading,
  learnerPlayList,
  setLearnerPlayingDetails,
  onNavigate
}) => {

  const { primaryColor } = useColor();
    const useData = useContext(ProfileContext)
      const [isFormValid, setIsFormValid] = useState<boolean>(false);
      const [answers, setAnswers] = useState<any>([]);
      const [RefAnswer, setrefAnswer] = useState<any>([]);
      const [reflectionFilter, setReflectionFilter] = useState<any>([reflectionQuestions]);
      const { id } = useParams();
      const Gameid = id ? id : null;
      const { profile, setProfile } = useContext(ScoreContext);
      const playingQuestNo=learnerPlayList?.PlayerScore_Level?.currentQuest;
      const playingGameId=learnerPlayList?.GameId;
      const StroredAnsRefLang = () => {
        const storedRefAnswers =learnerPlayList?.playerInputs?.Refelection_Answer || [];
        if (storedRefAnswers !== undefined) {
          setrefAnswer(storedRefAnswers);
          const modifedAnswers = storedRefAnswers.map((item: { [key: string]: string }) => {
            const key = Object.keys(item)[0]; // Get the key of the current object
            return { text: item[key] }; // Return a new object with the "text" property
          });
          setAnswers(modifedAnswers)
        }
        if (reflectionQuestions) {
          const translationId = 1;
          const ReflectionFilter = reflectionQuestions.filter((item: any, index: number) => (item?.translationId === translationId));
          if (ReflectionFilter.length === formData.gameReflectionQuestion) {
            setReflectionFilter(ReflectionFilter);
          } else {
            const requiredQuestions = ReflectionFilter.slice(0, formData.gameReflectionQuestion);
            setReflectionFilter(requiredQuestions);
          }
  
        }
      }
      useEffect(() => {
        StroredAnsRefLang();
      }, [])
      const validateFunc = () => {
        if (
          formData?.gameIsLearnerMandatoryQuestion &&
          formData?.gameReflectionQuestion &&
          answers.length === formData?.gameReflectionQuestion
        ) {
          let validate = answers?.filter((ans: any) => ans === undefined || ans.text.trim() === '');
          validate.length === 0 ? setIsFormValid(true) : setIsFormValid(false);
        } else {
          formData?.gameIsLearnerMandatoryQuestion === "true"
            ? setIsFormValid(false)
            : setIsFormValid(true);
        }
      }
  
      useEffect(() => {
        validateFunc();
      }, [answers]);
  
      useEffect(() => {
        StroredAnsRefLang();
        // setReflectionFilter(reflectionQuestions);
      }, [reflectionQuestions])
  
  
      const updateAnswer = (e: any, index: any) => {
  
   const refId = index;
   const ansValue = e.target.value;
  
        const updatedAnswers = [...answers];
        updatedAnswers[index] = { ...updatedAnswers[index], text: e.target.value };
        const updatedRefAnswers = [...RefAnswer];
        updatedRefAnswers[index] = { ...updatedRefAnswers[index], [`ref${index + 1}`]: e.target.value };
        setAnswers(updatedAnswers);
      
  
        setrefAnswer(updatedRefAnswers);
  
      };
     
      const nextNavigation = async() => {
        setFirstLoading(true)
       
        setLearnerPlayingDetails((prev:any) => ({
          ...prev,
          playerInputs:{
            ...prev.playerInputs, 
            Refelection_Answer:RefAnswer,
            // Thankyou:learnerPlayList?.playerInputs?.Thankyou
          }
        }));
        const data = {
          answers: RefAnswer,
          // gameId: useData.gameDetail.id,
          gameId: playingGameId,
          questNo: playingQuestNo,
          refansGameMode: 'game'
  
        }
        const result = await storeReflection(JSON.stringify(data));
        if (result.status !== 'Success') {
          return false;
        }
        else
        {
          if (gameInfo?.gameData?.gameIsShowTakeaway === 'true') {
            setCurrentScreenId(7);//Navigate to Takeaway screen
          }
          else {
            setCurrentScreenId(5);//Navigate to Thank you screen
          }
        }
       
        // },300)     
      }
      const backNavigation = () => {
        const LastquestNo = parseInt(profile.currentQuest);
        setFirstLoading(false)
        setCurrentQuestNo(LastquestNo)
        
        if (feedbackList.length !== 0 && gameInfo?.gameData?.gameIsShowInteractionFeedBack === 'Completion') {
          if (feedbackList?.find((item: any) => item.quest == profile.currentQuest)) {
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
          else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
            setCurrentScreenId(4); //Navigate to leaderboard
            return false;
          }
          else {
            setCurrentScreenId(6);
            // setCurrentScreenId(13);
            return false;
          }
        }
        else if (gameInfo?.gameData?.gameIsShowLeaderboard === 'true') {
          setCurrentScreenId(4); //Navigate to leaderboard
          return false;
        }
        else {
  
          setCurrentScreenId(6);
  
          // setCurrentScreenId(13);
          return false;
        }
      }
      useEffect(() => {
        if (formData?.gameIsLearnerMandatoryQuestion === 'false') {
          setIsFormValid(true);
        }
        else {
          validateFunc();
        }
        StroredAnsRefLang();
      }, [formData])


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
          <ChevronLeft className="!h-4 !h-4 text-white" />
        ) : (
          <ChevronRight className="!h-4 !w-4 text-white" />
        )}
      </Button>
    );
  };

  const QuestionNumber: React.FC<{ number: string }> = ({ number }) => {
    return (
      <div className="box-border content-stretch flex flex-row gap-1 items-end justify-start not-italic p-0 relative shadow-[0px_0.993px_3.973px_0px_rgba(0,0,0,0.25)] shrink-0 tracking-[-0.0935px]">
        <div
          className="[text-shadow:rgba(0,0,0,0.46)_0px_7.482px_18.175px] flex flex-col h-[1.152rem] justify-center relative shrink-0 text-xl w-4 text-white"
        >
          <p className="adjustLetterSpacing block leading-[4.793rem]">Q</p>
        </div>
        <div
          className="[text-shadow:rgba(0,0,0,0.46)_0px_7.482px_18.175px] flex flex-col h-[1.152rem] justify-center relative shrink-0 text-xl w-3 text-white"
        >
          <p className="adjustLetterSpacing block leading-[4.793rem]">
            {number}
          </p>
        </div>
      </div>
    );
  };

  const QuestionHeader: React.FC<{ number: string; question: string }> = ({
    number,
    question,
  }) => {
    return (
      <div
        className="box-border content-stretch flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-start leading-[0] p-0 relative shrink-0 text-white"
      >
        <QuestionNumber number={number} />
        <div className="flex flex-col font-rubik font-normal justify-center relative shrink-0 text-lg sm:text-xl tracking-[-0.09px] max-w-full">
          <p className="adjustLetterSpacing block leading-[1.8rem] sm:leading-[2.15rem] break-words">
            {question}
          </p>
        </div>
      </div>
    );
  };

  const ReflectionCard: React.FC<{ question: string; number: string }> = ({
    question,
    number,
  }) => {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[35rem]">
        <QuestionHeader number={number} question={question} />
        <div
          className="backdrop-blur-[2.986rem] backdrop-filter relative rounded-3xl overflow-hidden shrink-0 w-full min-w-[28rem]"
          style={{
            border: `1.433px solid rgba(${hexToRgb(primaryColor)}, 0.5)`,
            background: `linear-gradient(21deg, rgba(10, 10, 10, 0.70) -10.76%, rgba(${hexToRgb(
              primaryColor
            )}, 0.1) 127.18%)`,
          }}
        >
          <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start overflow-clip relative w-full">
            <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
              <div className="flex flex-col items-center relative w-full h-full">
                <div className="box-border content-stretch flex flex-col gap-[2.125rem] items-center justify-start p-2 relative w-full">
                  <Textarea
                    className="min-h-[7.5rem] w-full bg-transparent border-none resize-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none focus-visible:border-0 focus-visible:ring-0"
                    placeholder="Enter your answer here"
                    rows={5}
                    style={{
                      background: "transparent",
                    }}
                  />
                </div>

                {/* Background ellipse effect */}
                <div className="absolute h-[30.04rem] left-[9.375rem] mix-blend-lighten top-[-5.916rem] w-[33.086rem] pointer-events-none">
                  <div className="absolute bottom-[-102.084%] left-[-92.686%] right-[-92.686%] top-[-102.084%]">
                    <svg
                      className="block w-full h-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 1512 1463"
                    >
                      <g
                        filter={`url(#filter_reflection_${number}_${primaryColor.replace(
                          "#",
                          ""
                        )})`}
                        opacity="0.2"
                        style={{ mixBlendMode: "lighten" }}
                      >
                        <ellipse
                          cx="755.685"
                          cy="731.318"
                          fill={primaryColor}
                          rx="264.685"
                          ry="240.319"
                        />
                      </g>
                      <defs>
                        <filter
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                          height="1461.94"
                          id={`filter_reflection_${number}_${primaryColor.replace(
                            "#",
                            ""
                          )}`}
                          width="1510.68"
                          x="0.34726"
                          y="0.34726"
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
                            stdDeviation="245.326"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inner shadow overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[1.911px_3.822px_15.289px_0px_inset_rgba(248,248,248,0.06)]" />

          {/* Border and outer shadow */}
          <div
            className="absolute border-solid inset-0 pointer-events-none rounded-3xl"
            style={{
              borderWidth: "1.433px",
              borderColor: "#033326",
              boxShadow: `0px 4px 15px 0px rgba(${hexToRgb(
                primaryColor
              )}, 0.12)`,
            }}
          />
        </div>
      </div>
    );
  };

  const questions = [
    { number: "1", text: "What were your biggest learnings ?" },
    { number: "2", text: "How can you apply these learnings back at work ?" },
    { number: "3", text: "What's one thing you learned about your mindset ?" },
    { number: "4", text: "What's one thing you are committing to change ?" },
  ];

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

        {/* Reflection Content */}
        <div className="h-full flex-grow flex flex-col justify-center items-center pt-24">
          <div
            className="flex flex-col gap-5 max-h-fit max-w-fit overflow-hidden h-full w-full items-center justify-start rounded-[2.375rem] relative px-10 py-8 backdrop-filter backdrop-blur-[3.724rem]"
            style={{
              background: `linear-gradient(21deg, rgba(${hexToRgb(
                primaryColor
              )}, 0.05) -10.76%, rgba(${hexToRgb(primaryColor)}, 0.1) 127.18%)`,
            }}
          >
            {/* Reflection Title */}
            <div className="relative">
              <h1
                className="text-4xl font-normal tracking-[0.005rem] text-center"
                style={{
                  color: primaryColor,
                  textShadow: `rgba(${hexToRgb(
                    primaryColor
                  )}, 0.5) 0px 0px 9px`,
                }}
              >
                Reflection
              </h1>
            </div>

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

            {/* Questions Grid - Improved Layout */}
            <div className="flex-1 w-full flex justify-center px-3 py-4 overflow-y-auto">
              <div className="w-full max-w-[75rem] mx-auto">
                <div className="relative">
                  {/* Responsive Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[3rem] gap-y-[2.5rem] lg:gap-x-[2.5rem] lg:gap-y-[2rem] place-items-center">
                    {questions.map((question, index) => (
                      <div key={index} className="w-full flex justify-center">
                        <ReflectionCard
                          question={question.text}
                          number={question.number}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center w-full">
              <NavigationArrow
                direction="left"
                onClick={backNavigation}
              />
              <NavigationArrow
                direction="right"
                onClick={nextNavigation}
              />
            </div>

            {/* Background Effects */}
            <div className="absolute h-[25rem] w-[30.75rem] -top-[5rem] -right-[5rem] mix-blend-exclusion opacity-20 pointer-events-none">
              <div
                className="absolute inset-0 rounded-full blur-[9.375rem]"
                style={{
                  background: primaryColor,
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <div className="absolute h-[25rem] w-[30.75rem] -top-[7.5rem] -left-[5rem] mix-blend-exclusion opacity-15 pointer-events-none">
              <div
                className="absolute inset-0 rounded-full blur-[9.375rem]"
                style={{
                  background: primaryColor,
                  transform: "scale(0.8)",
                }}
              />
            </div>

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

export default ReflectionFutureTheme;
