'use client';

import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import svgPaths from '../../../../imports/svg-knollny4nu';
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { Slider } from '../../../../components/ui/slider';
import { ProfileContext } from '../EntirePreview';
import { ScoreContext } from '../GamePreview';

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 255, 187'; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};

const TakeawayFutureTheme: React.FC<{
  formData: any;
  imageSrc: any;
  getData?: any;
  data?: any;
  preloadedAssets: any;
  gameInfo: any;
  setCurrentScreenId: any;
  FeedbackcurrentPosition: any;
  setFeedbackCurrentPosition: any;
  interactionBlockArray: any;
  profileData: any;
  setFeedbackNavigateNext: any;
  feedbackList: any;
  setInterActionBlockArray: any;
  getFeedbackData: () => void;
  setCurrentQuestNo: any;
  setFirstLoading: any;
}> = ({
  formData,
  imageSrc,
  getData,
  data,
  preloadedAssets,
  gameInfo,
  setCurrentScreenId,
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
}) => {
  const useData = useContext(ProfileContext);
  const [TakeAwayContentLang, setTakeAwayContentLang] = useState(null);
  const { profile, setProfile } = useContext(ScoreContext);
  console.log(gameInfo, 'gameInfointakeway');
  const TakeAwayContentLanguage = () => {
    if (profileData?.Audiogetlanguage.length !== 0) {
      const GameLanguageFilter = profileData?.Audiogetlanguage.filter(
        (key: any) => key?.textId === formData?.gameId,
      );
      if (GameLanguageFilter.length > 0) {
        const takeAwayFiltered = GameLanguageFilter.filter(
          (key: any) => key?.fieldName === 'gameTakeawayContent',
        );
        if (takeAwayFiltered.length > 0) {
          const TakeAwayContent = takeAwayFiltered[0]?.content
            ? takeAwayFiltered[0]?.content.split('\n')
            : formData?.gameTakeawayContent.split('\n');
          setTakeAwayContentLang(TakeAwayContent);
        }
      }
    } else {
      setTakeAwayContentLang(formData?.gameTakeawayContent?.split('\n'));
    }
  };
  useEffect(() => {
    TakeAwayContentLanguage();
  }, [formData]);
  // useEffect(() =>
  // {
  //   TakeAwayContentLanguage();
  // },[])

  // const content = formData.gameTakeawayContent?.split('\n');
  const previousNavigation = () => {
    useData?.setMotionEffect(true);
    const LastquestNo = parseInt(profile.currentQuest);
    setFirstLoading(false);
    setCurrentQuestNo(LastquestNo);
    setTimeout(() => {
      if (
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
  const handleNext = () => {
    setFirstLoading(true);
    useData?.setMotionEffect(true);
    setTimeout(() => {
      getData(data);
    }, 300);
  };
  // ✅ New: Download PDF function
  const handleDownloadPDF = () => {
    if (!TakeAwayContentLang || TakeAwayContentLang.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 15;
    let y = 25;

    // 🎯 Title: Bold, centered, and larger font
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const title = `${gameInfo.gameData.gameTitle} Takeaways`;
    const titleWidth = doc.getTextWidth(title);
    const centerX = (pageWidth - titleWidth) / 2;
    doc.text(title, centerX, y);
    y += 15;

    // 📝 Body: Regular font for takeaway content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    TakeAwayContentLang.forEach((line: any) => {
      // Clean up duplicate bullets
      const cleanLine = line.replace(/^\s*[\u2022•]\s*/, '');
      const wrappedText = doc.splitTextToSize(`• ${cleanLine}`, 180);

      // Add a new page if needed
      if (y > 270) {
        doc.addPage();
        y = 25;
      }

      doc.text(wrappedText, marginLeft, y);
      y += wrappedText.length * 8;
    });

    // 💾 Save as PDF
    doc.save(`${gameInfo.gameData.gameTitle} Takeaways.pdf`);
  };

  const { primaryColor } = useColor();

  const NavigationArrow: React.FC<{
    direction: 'left' | 'right';
    onClick: () => void;
  }> = ({ direction, onClick }) => {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="rounded-4xl h-10 w-[3.75rem] px-4 py-2 transition-all duration-200 hover:scale-110"
        style={{
          background: `linear-gradient(${
            direction === 'left' ? '275.041deg' : '90deg'
          },
                rgba(${hexToRgb(primaryColor)}, 0.6) 7.25%, rgba(${hexToRgb(
            primaryColor,
          )}, 0.15) 84.803%)`,
          border: `1px solid ${primaryColor}`,
          boxShadow: `0px 0px 15.9542px 0px rgba(${hexToRgb(
            primaryColor,
          )}, 0.3)`,
        }}
      >
        {direction === 'left' ? (
          <ChevronLeft className="!size-4 text-white" />
        ) : (
          <ChevronRight className="!size-4 text-white" />
        )}
      </Button>
    );
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black/90 bg-cover bg-center bg-no-repeat"
      // style={{ backgroundImage: `url('${imgBackground}')` }}
    >
      <div className="relative flex h-full w-full px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        {/* Top Navigation Bar */}
        <div className="absolute left-0 right-0 top-0 flex h-[5.5rem] items-center justify-between bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8">
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
                className="rounded-[2rem] border-none px-7 py-6 shadow-lg sm:max-w-2xl"
                style={{
                  background: `linear-gradient(151.477deg, rgb(0,0,0) 17.606%, rgba(${hexToRgb(
                    primaryColor,
                  )}, 0.6) 218.68%)`,
                  border: `1px solid linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                    primaryColor,
                  )}, 0.4) 188.68%)`,
                  boxShadow: '0px 0px 23.4px 0px rgba(0, 0, 0, 0.50)',
                }}
              >
                <h2
                  className="py-1 text-center text-3xl font-medium"
                  style={{
                    color: primaryColor,
                    textShadow: `0 0 9px rgba(${hexToRgb(primaryColor)}, 0.49)`,
                  }}
                >
                  Settings
                </h2>

                {/* Decorative Line */}
                <div className="relative flex w-full items-center justify-center">
                  <div className="w-full">
                    <div className="relative h-[1px] w-full">
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

                <div className="mx-auto mb-2 mt-3 flex w-full max-w-md flex-col gap-8 pb-3 pt-5">
                  <div className="flex flex-col gap-10">
                    {/* Music Volume */}
                    <div className="flex flex-col items-center gap-1">
                      <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
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
                    <div className="flex flex-col items-center gap-1">
                      <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
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
                    <div className="flex flex-col items-center gap-1">
                      <label className="font-rubik mb-2 text-2xl font-normal tracking-[-0.005rem] text-white">
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
                      className="rounded-4xl mx-auto h-11 w-[5.75rem] px-4 py-2 text-lg text-white transition-all duration-200 hover:scale-110 hover:text-white"
                      style={{
                        background: `linear-gradient(275.041deg
                              ,
                                rgba(${hexToRgb(
                                  primaryColor,
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

        {/* Takeaways Content */}
        <div className="flex-grow-1 flex h-full flex-col items-center justify-center pt-24">
          <div className="relative w-full max-w-[54.875rem] overflow-hidden rounded-[2.375rem] ">
            <div
              className="relative flex h-full max-h-fit w-full max-w-[54.875rem] flex-col items-center justify-start gap-5 overflow-hidden rounded-[2.375rem] px-10 py-8 backdrop-blur-[3.724rem] backdrop-filter"
              style={{
                background: `linear-gradient(21deg, rgba(${hexToRgb(
                  primaryColor,
                )}, 0.05) -10.76%, rgba(${hexToRgb(
                  primaryColor,
                )}, 0.1) 127.18%)`,
              }}
            >
              {/* Takeaways Title */}
              <div className="relative">
                <h1
                  className="text-center text-4xl font-normal tracking-[0.005rem]"
                  style={{
                    color: primaryColor,
                    textShadow: `rgba(${hexToRgb(
                      primaryColor,
                    )}, 0.5) 0px 0px 9px`,
                  }}
                >
                  Takeaways
                </h1>
              </div>

              {/* Decorative Line */}
              <div className="relative flex w-full items-center justify-center">
                <div className="w-full">
                  <div className="relative h-[1px] w-full">
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

              {/* Takeaways Content Area */}
              <div className=" flex w-full items-center justify-center overflow-y-auto p-4">
                <div className="mx-auto w-full max-w-4xl overflow-y-auto overflow-x-hidden">
                  <div className="relative">
                    {/* Takeaways List */}
                    <div className="relative z-10 w-full">
                      <div
                        className="font-rubik relative flex min-w-full shrink-0 flex-col justify-center text-justify text-[1.194rem] font-normal leading-relaxed tracking-[-0.09px] text-[#ffffff]"
                        style={{ width: 'min-content' }}
                      >
                        <div>
                          {TakeAwayContentLang &&
                            TakeAwayContentLang.map((it: any, ind: number) => {
                              const bulletIndex = it.indexOf('\u2022');
                              const contentAfterBullet =
                                bulletIndex !== -1
                                  ? it.slice(bulletIndex + 1).trim()
                                  : it;
                              return (
                                contentAfterBullet && (
                                  <div key={ind}>
                                    <>{contentAfterBullet}</>
                                  </div>
                                )
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex w-full items-center justify-between">
                <NavigationArrow
                  direction="left"
                  onClick={() => previousNavigation()}
                />
                <NavigationArrow
                  direction="right"
                  onClick={() => handleNext()}
                />
              </div>

              {/* <Box
                position="absolute"
                bottom="3%"
                right="15%"
                zIndex="10"
                className="download-mouse"
              >
                <button
                  onClick={handleDownloadPDF}
                  className="download-btntakeaway"
                >
                  <Img
                    src={download}
                    alt="Download"
                    w={{ base: '72px', md: '90px' }}
                  />
                </button>
              </Box> */}

              {/* Inset Shadow Border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2.375rem]"
                style={{
                  boxShadow: `0px 0px 11px 0px inset ${primaryColor}`,
                }}
              />
            </div>
            {/* Additional Background Ellipses */}
            <div className="pointer-events-none absolute left-[30.092rem] top-[0.428rem] flex h-[27.69rem] w-[31.188rem] items-center justify-center mix-blend-lighten">
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
                        filter={`url(#filter_takeaways_1_${primaryColor.replace(
                          '#',
                          '',
                        )})`}
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
                          id={`filter_takeaways_1_${primaryColor.replace(
                            '#',
                            '',
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

            <div className="pointer-events-none absolute left-[-12.004rem] top-[1.433rem] flex h-[27.69rem] w-[31.188rem] items-center justify-center mix-blend-lighten">
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
                        filter={`url(#filter_takeaways_2_${primaryColor.replace(
                          '#',
                          '',
                        )})`}
                        opacity="0.06"
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
                          id={`filter_takeaways_2_${primaryColor.replace(
                            '#',
                            '',
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
            {/* Background Effects */}
            <div className="pointer-events-none absolute -right-[5rem] -top-[5rem] h-[25rem] w-[30.75rem] opacity-20 mix-blend-exclusion">
              <div
                className="absolute inset-0 rounded-full blur-[9.375rem]"
                style={{
                  background: primaryColor,
                  transform: 'scale(0.8)',
                }}
              />
            </div>
            <div className="left pointer-events-none absolute -top-[7.5rem] h-[25rem] w-[30.75rem] opacity-15 mix-blend-exclusion">
              <div
                className="absolute inset-0 rounded-full blur-[9.375rem]"
                style={{
                  background: primaryColor,
                  transform: 'scale(0.8)',
                }}
              />
            </div>
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
      case 'home':
        return <CustomHomeIcon color={primaryColor} size={20} />;
      case 'map':
        return <CustomMapIcon color={primaryColor} size={20} />;
      case 'ranking':
        return <CustomRankingIcon color={primaryColor} size={20} />;
      case 'settings':
        return <CustomSettingsIcon color={primaryColor} size={20} />;
      default:
        return <IconComponent type={icon} color={primaryColor} />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="group relative h-12 w-12 rounded-2xl !px-0 py-0 transition-transform duration-300 hover:scale-110"
      style={{
        borderRadius: '16px',
        boxShadow: '0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)',
        background: `linear-gradient(151.477deg, rgba(${hexToRgb(
          primaryColor,
        )}, 0.3), rgb(0, 0, 0))`,
      }}
    >
      <div
        className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-2xl"
        style={{
          background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
            primaryColor,
          )}, 0.5) 188.68%)`,
          borderRadius: '16px',
          zIndex: 1,
        }}
      >
        {icon === 'ranking' ? (
          <CustomRankingIcon color={primaryColor} className="!size-10" />
        ) : icon === 'settings' ? (
          <CustomSettingsIcon color={primaryColor} className="-mb-1 !size-10" />
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
          className="relative h-12 w-12 rounded-2xl !px-0 py-0"
          style={{
            borderRadius: '16px',
            boxShadow: '0px 0px 23.386px 0px rgba(0, 0, 0, 0.50)',
            background: `linear-gradient(151.477deg, rgba(${hexToRgb(
              primaryColor,
            )}, 0.3), rgb(0, 0, 0))`,
          }}
        >
          <div
            className="backdrop-blur-xs absolute bottom-[1px] left-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                primaryColor,
              )}, 0.5) 188.68%)`,
              borderRadius: '16px',
              zIndex: 1,
            }}
          >
            {icon === 'coin' ? (
              <CustomCoinIcon color={primaryColor} className="!size-12" />
            ) : icon === 'progress' ? (
              <span
                className="font-rubik text-shadow-[0px_2.867px_8.6px_rgba(0,_255,_187,_0.30)] text-[0.813rem] font-medium -tracking-[0.007rem] text-white"
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
      {label === '50' ? (
        <div className="relative -ml-2.5 min-w-24 flex-1">
          <div
            className="h-8 w-full overflow-hidden rounded-[0.625rem]"
            style={{
              background: `linear-gradient(179.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
                primaryColor,
              )}, 0.4) 188.68%)`,
              border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.1)`,
              boxShadow: '0px 0px 15.3543px 0px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="h-full rounded-[0.625rem] shadow-[0px_0px_2.378px_0px_rgba(0,_255,_187,_0.30)_inset,_0px_2.867px_8.6px_0px_rgba(0,_255,_187,_0.60)] transition-all duration-500 ease-out"
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
          className="font-rubik -ml-1.5 flex h-8 min-w-24 items-center rounded-[0.625rem] px-4"
          style={{
            background: `linear-gradient(170.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
              primaryColor,
            )}, 0.4) 188.68%)`,
            border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.2)`,
            boxShadow: '0px 0px 23.3864px 0px rgba(0,0,0,0.5)',
          }}
        >
          <span className="text-[0.813rem] font-medium text-white">
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
      case 'ranking':
        return svgPaths.p1a822c00;
      case 'home':
        return svgPaths.p3bf15400;
      case 'map':
        return svgPaths.p285e4100;
      case 'settings':
        return svgPaths.p2037cc80;
      case 'coin':
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

export default TakeawayFutureTheme;
