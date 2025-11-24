"use client";

import type React from "react";
import svgPaths from "../../../../imports/svg-b343pn5u7l";
import { useColor } from "../../../../components/ui/ColorContext";
// import imgBackground from "/images/background.png";
// import imgLogo from "/images/atlantis-logo.png";
import { Button } from "../../../../components/ui/button";

interface WelcomeProps {
  onNavigate?: (direction: "left" | "right") => void;
}
// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 255, 187"; // fallback to default green
  const r = Number.parseInt(result[1], 16);
  const g = Number.parseInt(result[2], 16);
  const b = Number.parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
};

const AvatarAndTitle: React.FC = () => {
  const { primaryColor } = useColor();

  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-center justify-start p-0 relative shrink-0 w-full">
      <div className="bg-[#000000] box-border content-stretch flex flex-row gap-1.5 items-center justify-center p-3.5 relative rounded-full shrink-0">
        <div
          className="absolute border-[0.654px] border-solid inset-0 pointer-events-none rounded-full"
          style={{
            borderColor: "#033326",
            boxShadow: `0px 2.618px 7.853px 0px rgba(${primaryColor
              .replace("#", "")
              .match(/.{2}/g)
              ?.map((hex) => parseInt(hex, 16))
              .join(", ")}, 0.2)`,
          }}
        />
        <div
          className="bg-center bg-cover bg-no-repeat shrink-0 size-[6.092rem] rounded-full"
          data-name="image 99"
          // style={{ backgroundImage: `url('${imgLogo}')` }}
        />
      </div>
      <p className="adjustLetterSpacing block leading-[6.438rem] whitespace-pre font-uncial-antiqua text-5xl font-normal text-center text-white tracking-[-0.008rem]">
        ATLANTIS
      </p>

      {/* Background effects */}
      <div className="absolute flex h-[27.69rem] items-center justify-center left-[18.514rem] mix-blend-lighten top-[-8.421rem] w-[31.188rem]">
        <div className="flex-none rotate-[33.283deg]">
          <div className="h-[15.169rem] relative w-[27.352rem]">
            <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1250 1055"
              >
                <g
                  filter="url(#filter0_f_70_172)"
                  id="Ellipse 7188"
                  opacity="0.1"
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
                    id="filter0_f_70_172"
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
                      result="effect1_foregroundBlur_70_172"
                      stdDeviation="202.888"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[27.69rem] items-center justify-center left-[-7.286rem] mix-blend-lighten top-[-5.972rem] w-[31.188rem]">
        <div className="flex-none rotate-[33.283deg]">
          <div className="h-[15.169rem] relative w-[27.352rem]">
            <div className="absolute bottom-[-167.188%] left-[-92.72%] right-[-92.72%] top-[-167.188%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1250 1055"
              >
                <g
                  filter="url(#filter0_f_70_172_2)"
                  id="Ellipse 7188"
                  opacity="0.1"
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
                    id="filter0_f_70_172_2"
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
                      result="effect1_foregroundBlur_70_172_2"
                      stdDeviation="202.888"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeContent: React.FC<{
  onNavigate?: (direction: "left" | "right") => void;
}> = ({ onNavigate }) => {
  const { primaryColor } = useColor();

  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-9 items-center justify-start pb-11 pt-[1.433rem] px-[1.433rem] relative w-full">
          <div className="text-white text-4xl font-normal text-center text-nowrap tracking-[0.005rem]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
              Welcome to the game
            </p>
          </div>
          <div className="flex items-center justify-center relative shrink-0 w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.("right")}
              className="w-[8.125rem] h-11 py-2 px-4 rounded-4xl transition-all duration-200 hover:scale-110 text-white hover:text-white font-rubik text-lg font-medium"
              style={{
                background: `linear-gradient(100deg ,
          rgba(${hexToRgb(
            primaryColor
          )}) -27.25%, rgba(0, 0, 0, 0.8) 107.803%)`,
                border: `1px solid rgba(${hexToRgb(primaryColor)}, 0.5)`,
                boxShadow: `0px 0px 21.786px 0px rgba(${hexToRgb(
                  primaryColor
                )}, 0.4)`,
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Welcome1: React.FC<WelcomeProps> = ({ onNavigate }) => {
  const { primaryColor } = useColor();

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-no-repeat bg-center bg-cover bg-black/90"
      // style={{ backgroundImage: `url('${imgBackground}')` }}
    >
      {/* Main Content */}
      <div className="h-full flex-grow-1 flex flex-col justify-center items-center z-10 relative">
        <div
          className="flex flex-col gap-5 max-h-[30.5rem] max-w-[46rem] overflow-hidden h-full w-full items-center justify-start rounded-[2.375rem] relative px-10 py-8 backdrop-filter backdrop-blur-[3.724rem]"
          style={{
            background: `linear-gradient(2deg, rgba(0, 0, 0, 0.70) -60.76%, rgba(${hexToRgb(
              primaryColor
            )}, 0.1) 147.18%)`,
            boxShadow: `0px 3.822px 47.777px 0px rgba(${primaryColor
              .replace("#", "")
              .match(/.{2}/g)
              ?.map((hex) => parseInt(hex, 16))
              .join(", ")}, 0.2), 0px 3.822px 3.822px 0px rgba(0,0,0,0.25)`,
          }}
        >
          <div className="absolute flex h-[50.669rem] items-center justify-center left-[-10.272rem] mix-blend-lighten top-[-5.541rem] w-[46.274rem]">
            <div className="flex-none rotate-[33.283deg]">
              <div className="h-[42.657rem] relative w-[27.352rem]">
                <div className="absolute bottom-[-59.453%] left-[-92.72%] right-[-92.72%] top-[-59.453%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1250 1495"
                  >
                    <g
                      filter="url(#filter0_f_70_170)"
                      id="Ellipse 7187"
                      opacity="0.1"
                      style={{ mixBlendMode: "lighten" }}
                    >
                      <ellipse
                        cx="624.819"
                        cy="747.26"
                        fill={primaryColor}
                        rx="218.819"
                        ry="341.26"
                      />
                    </g>
                    <defs>
                      <filter
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                        height="1494.07"
                        id="filter0_f_70_170"
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
                          result="effect1_foregroundBlur_70_170"
                          stdDeviation="202.888"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 z-10">
            <AvatarAndTitle />
            <WelcomeContent onNavigate={onNavigate} />
          </div>

          {/* Additional Background Effects */}
          <div className="absolute flex h-[36.624rem] items-center justify-center right-1/2 mix-blend-multiply top-[-23.769rem] w-[37.054rem]">
            <div className="flex-none rotate-[33.283deg]">
              <div className="h-[25.856rem] relative w-[27.352rem]">
                <div className="absolute bottom-[-98.086%] left-[-92.72%] right-[-92.72%] top-[-98.086%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1250 1226"
                  >
                    <g
                      filter="url(#filter0_f_70_168)"
                      id="Ellipse 7189"
                      opacity="0.2"
                      style={{ mixBlendMode: "darken" }}
                    >
                      <ellipse
                        cx="624.819"
                        cy="612.847"
                        fill={primaryColor}
                        rx="218.819"
                        ry="206.847"
                      />
                    </g>
                    <defs>
                      <filter
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                        height="1225.25"
                        id="filter0_f_70_168"
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
                          result="effect1_foregroundBlur_70_168"
                          stdDeviation="202.888"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute flex h-[49.03rem] items-center justify-center left-1/2 mix-blend-darken top-[-9.411rem] w-[49.371rem]">
            <div className="flex-none rotate-[33.283deg]">
              <div className="h-[34.938rem] relative w-[36.124rem]">
                <div className="absolute bottom-[-72.588%] left-[-70.206%] right-[-70.206%] top-[-72.588%]">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1390 1371"
                  >
                    <g
                      filter="url(#filter0_f_70_166)"
                      id="Ellipse 7188"
                      opacity="0.3"
                      style={{ mixBlendMode: "overlay" }}
                    >
                      <ellipse
                        cx="694.991"
                        cy="685.505"
                        fill={primaryColor}
                        rx="288.991"
                        ry="279.505"
                      />
                    </g>
                    <defs>
                      <filter
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                        height="1370.56"
                        id="filter0_f_70_166"
                        width="1389.54"
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
                          result="effect1_foregroundBlur_70_166"
                          stdDeviation="202.888"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card Border Effects */}
          <div className="absolute inset-0 pointer-events-none shadow-[1.911px_3.822px_15.289px_0px_inset_rgba(248,248,248,0.06)] rounded-[2.375rem]" />
          <div
            className="absolute inset-0 pointer-events-none rounded-[2.375rem]"
            style={{
              border: `1.911px solid rgba(${primaryColor
                .replace("#", "")
                .match(/.{2}/g)
                ?.map((hex) => parseInt(hex, 16))
                .join(", ")}, 0.1)`,

              boxShadow: `0px 3.822px 47.777px 0px rgba(${primaryColor
                .replace("#", "")
                .match(/.{2}/g)
                ?.map((hex) => parseInt(hex, 16))
                .join(", ")}, 0.2), 0px 3.822px 3.822px 0px rgba(0,0,0,0.25)`,
            }}
          />
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-[-7.441%] left-[-1.128%] right-[-0.666%] top-[-5.352%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1466 864"
        >
          <g id="Group 2085664301">
            <path d={svgPaths.p2b7f9200} fill="#033326" id="Vector" />
            <path d={svgPaths.p11193800} fill="#033326" id="Vector_2" />
            <path d={svgPaths.p2cfbdf00} fill="#033326" id="Vector_3" />
            <path d={svgPaths.p25915f40} fill="#033326" id="Vector_4" />
            <path d={svgPaths.p13d33080} fill="#033326" id="Vector_5" />
            <path d={svgPaths.p346b68f0} fill="#033326" id="Vector_6" />
            <path d={svgPaths.pfbc8300} fill="#033326" id="Vector_7" />
            <path d={svgPaths.p12946600} fill="#033326" id="Vector_8" />
            <path d={svgPaths.p2431d300} fill="#033326" id="Vector_9" />
            <path
              clipRule="evenodd"
              d={svgPaths.p37a93100}
              fill="#033326"
              fillRule="evenodd"
              id="Vector_10"
            />
            <path d={svgPaths.p10eaea00} fill="#033326" id="Vector_11" />
            <path d={svgPaths.p37932500} fill="#033326" id="Vector_12" />
            <path d={svgPaths.p223ae100} fill="#033326" id="Vector_13" />
            <path d={svgPaths.pdd17ff0} fill="#033326" id="Vector_14" />
            <path d={svgPaths.p3ec93e80} fill="#033326" id="Vector_15" />
            <path d={svgPaths.p181cbe80} fill="#033326" id="Vector_16" />
            <path d={svgPaths.p236a3580} fill="#033326" id="Vector_17" />
            <path d={svgPaths.p44d0500} fill="#033326" id="Vector_18" />
            <path d={svgPaths.p346d4700} fill="#033326" id="Vector_19" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Welcome1;
