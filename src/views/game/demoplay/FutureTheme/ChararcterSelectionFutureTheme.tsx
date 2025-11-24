"use client";

import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../../../../src/components/ui/button";
import { Input } from "../../../../../src/components/ui/input";
import { Card } from "../../../../../src/components/ui/card";
import { Badge } from "../../../../../src/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import svgPaths from "../../../../../src/imports/svg-knollny4nu";
import {
    CustomAttackIcon,
    CustomCoinIcon,
    CustomDamageIcon,
    CustomDefenceIcon,
    CustomHomeIcon,
    CustomMapIcon,
    CustomRankingIcon,
    CustomSettingsIcon,
    CustomSpeedIcon,
} from "../../../../../src/components/ui/CustomIcons";
// import imgCharacter from "/images/character.png";
import topNav from "../../../../../src/assets/img/NewUI_Images/top-nav-bg.png"
import imgBackground from "../../../../../src/assets/img/NewUI_Images/background.png";
import { useColor } from "../../../../../src/components/ui/ColorContext";
import ColorPicker from "../../../../../src/components/ui/ColorPicker";
import { Dialog, DialogContent, DialogTrigger } from "../../../../../src/components/ui/dialog";
import { Slider } from "../../../../../src/components/ui/slider";


import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import { ProfileContext } from '../EntirePreview';
import { updateLearnerNickName } from 'utils/gameApplication/gamePlayService';

interface Character {
    id: number;
    name: string;
    stats: {
        attack: number;
        speed: number;
        defense: number;
        damage: number;
    };
    icon: "ranking" | "male" | "female" | "settings";
}

interface PlayGamesProps {
    formData?: any;
    state?: any;
    dispatch?: any;
    setDatas?: any;
    imageSrc?: any;
    setCurrentScreenId?: any;
    players?: any;
    setSelectedPlayer?: any;
    profileData?: any;
    setProfileData?: any;
    demoBlocks?: any;
    preloadedAssets?: any;
    currentScreenId: any;
    ModelPlayer: any;
    setLearnerPlayingDetails: any;
    learnerPlayList: any;
    backgroundtheme: any;
    selectedBackground: any;
}

const IsErrorInitialState: { name: string | null } = { name: null, };

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0, 255, 187"; // fallback to default green
    const r = Number.parseInt(result[1], 16);
    const g = Number.parseInt(result[2], 16);
    const b = Number.parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
};


const CharacterSelectionFutureTheme: React.FC<PlayGamesProps & {
    onNavigate?: (direction: "left" | "right") => void;
}> = ({
    formData,
    state,
    dispatch,
    setDatas,
    imageSrc,
    setCurrentScreenId,
    players,
    setSelectedPlayer,
    profileData,
    setProfileData,
    demoBlocks,
    preloadedAssets,
    currentScreenId,
    ModelPlayer,
    setLearnerPlayingDetails,
    learnerPlayList,
    backgroundtheme,
    selectedBackground,
    onNavigate,   // existing prop
}) => {

        const { primaryColor } = useColor();
        const [toggleLeft, setToggleLeft] = useState(false);
        const [toggleRight, setToggleRight] = useState(false)
        const [blackScreen, setBlackScreen] = useState(false);
        const [loaded, setLoaded] = useState(false);

        const useData = useContext(ProfileContext);
        const [isEditing, setIsEditing] = useState(false);
        const [isError, setIsError] = useState(IsErrorInitialState);

        //   const StatBar: React.FC<{
        //     label: string;
        //     value: number;
        //     maxValue?: number;
        //   }> = ({ label, value, maxValue = 100 }) => {
        //     const [animatedWidth, setAnimatedWidth] = useState(0);

        //     useEffect(() => {
        //       const timer = setTimeout(() => {
        //         setAnimatedWidth((value / maxValue) * 100);
        //       }, 100);

        //       return () => clearTimeout(timer);
        //     }, [value, maxValue]);

        //     return (
        //       <div className="flex items-center gap-0 w-full">
        //         <Badge
        //           variant="secondary"
        //           className="h-5 z-10 flex-shrink-0 px-3 py-2 text-[0.625rem] tracking-[0.07rem] font-medium max-w-[4.25rem] justify-center rounded-xs"
        //           style={{
        //             background: `linear-gradient(170.74deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
        //               primaryColor
        //             )}, 0.6) 218.68%)`,
        //             border: "1px solid",
        //             borderImage: `linear-gradient(160deg, rgba(${hexToRgb(
        //               primaryColor
        //             )}, 0.2) 0%, #000 60%) 1`,
        //             boxShadow: "0px 0px 15.3543px 0px rgba(0,0,0,0.5)",
        //             color: primaryColor,
        //           }}
        //         >
        //           {label}
        //         </Badge>
        //         <div className="flex-1 relative -ml-0.5">
        //           <div
        //             className="w-full h-2 rounded-tr-full rounded-br-full overflow-hidden"
        //             style={{
        //               background: `linear-gradient(179.484deg, rgb(0, 0, 0) 17.606%, rgba(${hexToRgb(
        //                 primaryColor
        //               )}, 0.4) 188.68%)`,
        //               border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.1)`,
        //               boxShadow: "0px 0px 15.3543px 0px rgba(0,0,0,0.5)",
        //             }}
        //           >
        //             <div
        //               className="h-full rounded-tr-full rounded-br-full transition-all duration-700 ease-in-out"
        //               style={{
        //                 // ✨ CHANGED: Use animated width instead of direct calculation
        //                 width: `${animatedWidth}%`,
        //                 backgroundColor: primaryColor,
        //                 boxShadow: `0px 0px 9.93511px 0px rgba(184,184,184,0.2)`,
        //                 transformOrigin: "left center",
        //               }}
        //             />
        //           </div>
        //         </div>
        //       </div>
        //     );
        //   };

        // const CharacterAvatar: React.FC<{
        //   character: Character;
        //   isSelected: boolean;
        //   onClick: () => void;
        // }> = ({ character, isSelected, onClick }) => {
        //   return (
        //     <Button
        //       variant="ghost"
        //       onClick={onClick}
        //       className={`relative w-16 h-16 p-0 rounded-2xl transition-all duration-300 ${
        //         isSelected ? "scale-110" : "hover:scale-105"
        //       }`}
        //       style={{
        //         background:
        //           "linear-gradient(151.477deg, rgb(0, 0, 0) 17.606%, rgb(102, 102, 102) 218.68%)",
        //         border: "1px solid #000000",
        //         boxShadow: "0px 0px 23.3864px 0px rgba(0,0,0,0.5)",
        //         filter: isSelected
        //           ? `drop-shadow(0px 0px 20px ${primaryColor})`
        //           : "none",
        //       }}
        //     >
        //       <IconComponent type={character.icon} color={primaryColor} />
        //     </Button>
        //   );
        // };

        const NavigationArrow: React.FC<{
            direction: "left" | "right";
            onClick: () => void;
        }> = ({ direction, onClick }) => {
            return (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClick}
                    className="w-[3.125rem] h-[2.125rem] py-2 px-4 rounded-3xl transition-all duration-200 hover:scale-110"
                    style={{
                        background: `linear-gradient(${direction === "left" ? "275.041deg" : "90deg"
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
        const [formState, setFormState] = useState<any>({
            name: '',
        });

        const selectPlayerClick = async () => {
            // if (!formState.name.trim()) {
            //     toast({
            //         // title: 'Error',
            //         description: 'Please Enter Your Name.',
            //         status: 'error',
            //         duration: 3000,
            //         isClosable: true,
            //         position: 'bottom-right',
            //     });
            //     return;
            // }

            // Update backend & local state
            const data = {
                learnerPlayList: {
                    ...learnerPlayList,
                    LearnerProfile: {
                        ...learnerPlayList?.LearnerProfile,
                        nickName: formState.name.trim(),
                    },
                },
            };
            const dataString = JSON.stringify(data);
            const UpdateLearnerNickname = await updateLearnerNickName(dataString);

            if (UpdateLearnerNickname?.status === 'Success' && UpdateLearnerNickname?.data) {
                setLearnerPlayingDetails((prev: any) => ({
                    ...prev,
                    LearnerProfile: {
                        ...prev.LearnerProfile,
                        nickName: UpdateLearnerNickname?.data?.lenNickName,
                    },
                }));
            }

            setProfileData((prev: any) => ({
                ...prev,
                name: formState.name,
            }));

            useData?.setMotionEffect(true);

            setTimeout(() => {
                const i = 0;
                setSelectedPlayer(players[i]);
                setCurrentScreenId(13);
            }, 300);
        };


        const handleInputChange = (e: any) => {
            const { value } = e.target;
            const trimmedValue = value.slice(0, 15);


            setFormState((prevState: any) => ({
                ...prevState,
                name: trimmedValue,
            }));
            setLearnerPlayingDetails((prevState: any) => ({
                ...prevState,
                LearnerProfile: {
                    ...prevState.LearnerProfile,
                    nickName: trimmedValue, // Set the new name as the nickname
                },

            }));

        };
        const [rightBlink, setRightBlink] = useState(false);



        useEffect(() => {

        }, [formState.name]);




        let theme: string | string[] = '';
        if ([1, 2, 3].includes(backgroundtheme?.gasId)) {
            theme = 'Medieval';
        } else if ([4, 5, 6].includes(backgroundtheme?.gasId)) {
            theme = 'Future';
        } else if ([10, 11, 12].includes(backgroundtheme?.gasId)) {
            theme = 'Real';
        } else if ([7, 8, 9].includes(backgroundtheme?.gasId)) {
            theme = ['Magical'];
        }



        const matchingCharacter = preloadedAssets?.Player_Image?.filter((char: any) =>
            Array.isArray(theme) ? theme.includes(char.theme) : char.theme === theme
        );

        const [blinking, setBlinking] = useState(false);

        const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

        const [selectedCharacter, setSelectedCharacter] = useState(matchingCharacter[0]);


        const [selectedIndex, setSelectedIndex] = useState(0); // Initialize index as 0
        const choosegender = profileData?.gender && profileData?.gender === 'Female' ? preloadedAssets.Player_Image[1] : preloadedAssets.Player_Image[0];
        // const [selectedCharacter, setSelectedCharacter] = useState(preloadedAssets.Player_Image[0]);
        const [toggleLeftCharacter, setToggleLeftCharacter] = useState(false);
        const [toggleRightCharacter, setToggleRightCharacter] = useState(false);

        const getTexture = (selected: number): THREE.Texture => {

            const asset = selectedCharacter;

            return new THREE.TextureLoader().load(asset?.src || 'fallback-image-url.png');
        };


        useEffect(() => {
            if (selectedCharacter?.id) {
                setProfileData((prev: any) => ({ ...prev, gender: selectedCharacter?.id, selectedplayer: selectedCharacter?.name }));
                setLearnerPlayingDetails((prev: any) => ({
                    ...prev,

                    player_gender: selectedCharacter?.id,
                    selectedplayer_charcter: selectedCharacter?.name
                }));
            }
        }, [selectedCharacter]);

        const prevCharacter = () => {
            setSelectedIndex((prevIndex) => {
                const newIndex = (prevIndex - 1 + matchingCharacter.length) % matchingCharacter.length;
                setSelectedCharacter(matchingCharacter[newIndex]);
                return newIndex;
            });
        };

        const nextCharacter = () => {
            setSelectedIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % matchingCharacter.length;
                setSelectedCharacter(matchingCharacter[newIndex]);
                return newIndex;
            });
        };

        // Navigate to the previous page (e.g., Reflection page)
        const goToPreviousPage = () => {
            setBlackScreen(true); // Trigger black screen fade effect
            setTimeout(() => {
                setCurrentScreenId(1); // Reflection page screen id
            }, 1000); // Delay 1 second for effect
        };

        // Navigate to the next page (e.g., Thank-You page)
        const goToNextPage = () => {
            setBlackScreen(true); // Trigger black screen fade effect
            setTimeout(() => {
                setCurrentScreenId(13); // Thank-You page screen id
            }, 1000); // Delay 1 second for effect
        };



        return (
            <div
                className="relative w-full h-screen overflow-y-auto bg-no-repeat bg-center bg-cover bg-black/90"
                style={{ backgroundImage: `url('${imgBackground}')` }}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 relative">
                    {/* Top Navigation Bar */}
                    <div 
                     style={{ backgroundImage: `url('${topNav}')` }}
                    className="fixed w-full top-0 left-0 right-0 h-[5.5rem] flex items-center justify-between  bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8">
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
                                                className="w-[5.75rem] text-lg h-11 py-2 px-4 3xl transition-all duration-200 hover:scale-110 text-white hover:text-white mx-auto"
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

                    {/* Character Selection Section */}
                    <div className="flex pt-32 h-screen">

                        <div className="relative flex-grow h-full">
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-14 lg:bottom-19 z-20 max-w-[27rem] w-full">
                                {/* Character Image */}
                                {/* <div className=" max-h-[35.75rem] max-w-[21.25rem] mx-auto"> */}
                                <div className=" lg:max-h-[38rem] lg:max-w-[22.8rem] max-h-[calc(100svh-100px)] max-w-full text-center mx-auto">
                                    <img
                                        src={selectedCharacter?.src || "/placeholder.svg"}
                                        alt={selectedCharacter?.name || "character"}
                                        className="lg:w-full lg:h-full lg:object-contain max-lg:w-auto max-lg:mx-auto max-lg:max-h-[inherit] select-none"
                                    />
                                </div>
                                {/* Navigation Arrows */}
                                <div className="absolute bottom-1/2 transform -translate-y-1/2 flex items-center justify-between gap-3 w-full">
                                    <NavigationArrow direction="left" onClick={prevCharacter} />
                                    <NavigationArrow direction="right" onClick={nextCharacter} />
                                </div>
                            </div>

                            {/* Glowing effect */}
                            <div
                                className="absolute h-[35.75rem] w-[26.375rem] rounded-full blur-[6.875rem] opacity-15 mix-blend-hard-light bottom-12 left-1/2 transform -translate-x-1/2"
                                style={{
                                    background: primaryColor,
                                }}
                            />

                            {/* Platform */}
                            <div className="w-full max-w-[80%] pl-[19%] absolute bottom-0">
                                <img
                                    // src={imgPlatform || "/placeholder.svg"}
                                    alt="platform"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Platform */}
                            {/* <div className="w-full h-52 max-w-5xl absolute -bottom-11 scale-110">
              <img
                 src={imgPlatform}
                alt="platform"
                className="w-full h-full object-contain opacity-60"
                onError={(e) => {
                  // Fallback to a solid colored div if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div 
                className="w-full h-full absolute inset-0 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(ellipse at center, ${primaryColor} 0%, transparent 70%)`,
                }}
              />
            </div> */}

                            {/* Name Input */}
                            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
                                <Card
                                    className="relative w-80 h-16 rounded-lg bg-[#1A1A1A] border-none"
                                    style={{
                                        border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.5)`,
                                        boxShadow: `0px 0px 6px 1px rgba(${hexToRgb(
                                            primaryColor
                                        )}, 0.5)`,
                                    }}
                                >
                                    <div
                                        className="absolute inset-2.5 rounded-md flex items-center justify-center px-0"
                                        style={{
                                            background: `rgba(${hexToRgb(primaryColor)}, 0.1)`,
                                            border: `1px solid rgba(${hexToRgb(primaryColor)})`,
                                            boxShadow: `inset 0px 0px 2.69259px 0px rgba(${hexToRgb(
                                                primaryColor
                                            )}, 0.24)`,
                                        }}
                                    >
                                        <Input
                                            type="text"
                                            value={formState.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Name"
                                            className="bg-transparent border-none font-glancyr-neue text-white pt-2 text-center !text-lg font-medium tracking-[0.07rem] outline-none placeholder:text-white/70 shadow-none focus-visible:ring-0"
                                        />

                                    </div>
                                </Card>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-16 left-12 right-12 flex justify-between items-center">
                        <NavigationArrow
                            direction="left"
                            onClick={goToNextPage}
                        />
                        <NavigationArrow
                            direction="right"
                            onClick={goToNextPage}
                        />
                    </div>

                </div>
            </div>
        );
    };

// Helper Components
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
                    <CustomRankingIcon color={primaryColor} className="!h-10 !w-10"  />
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

export default CharacterSelectionFutureTheme;
