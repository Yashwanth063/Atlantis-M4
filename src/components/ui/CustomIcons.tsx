import type React from "react";

interface CustomIconProps {
  color: string;
  size?: number;
  className?: string;
}

export const CustomHomeIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter ID to avoid conflicts
  const filterId = `filter_home_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 39 39"
      fill="none"
      className={className}
      style={{ display: "block" }} // Ensures proper alignment
    >
      <defs>
        <filter
          id={filterId}
          x="-3.58355"
          y="-2.91703"
          width="45.2162"
          height="45.2162"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.75832" />
          <feGaussianBlur stdDeviation="4.13748" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.14419" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.191 27.6827H22.3689C22.1707 27.6827 22.0106 27.5225 22.0106 27.3243V22.3077C22.0106 20.6582 20.674 19.3217 19.0245 19.3217C17.375 19.3217 16.0384 20.6582 16.0384 22.3077V27.3243C16.0384 27.5225 15.8783 27.6827 15.68 27.6827H11.8579C9.46908 27.6827 8.27466 26.4882 8.27466 24.0994V16.516C8.27466 14.1295 8.89941 13.7629 9.98275 12.8551L17.1063 6.88168C18.2159 5.95122 19.8344 5.95122 20.944 6.88168L28.0675 12.8551C29.1497 13.7629 29.7755 14.1295 29.7755 16.516V24.0994C29.7743 26.4882 28.5799 27.6827 26.191 27.6827Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const CustomMapIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Helper function to calculate darker shade for the map background
  const getDarkerShade = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Make it significantly darker for the map background
    const darkerR = Math.max(0, Math.floor(r * 0.2));
    const darkerG = Math.max(0, Math.floor(g * 0.4));
    const darkerB = Math.max(0, Math.floor(b * 0.3));

    return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
      .toString(16)
      .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
  };

  const darkerColor = getDarkerShade(color);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      {/* Map background paths - scaled down by 0.8 for 24x24 viewBox */}
      <path
        d="M7.629 11.927V19.075L4.571 20.613C3.931 20.929 3.186 20.470 3.186 19.753V11.708C3.186 11.058 3.549 10.465 4.131 10.179L6.693 8.889C6.683 8.956 6.683 9.013 6.683 9.080C6.683 10.169 7.036 11.115 7.629 11.927ZM11.776 15.453C10.983 14.918 9.970 14.278 9.062 13.475V18.989L14.509 21.034V13.466C13.592 14.269 12.569 14.918 11.776 15.453ZM18.999 8.765L16.802 9.864C16.678 10.618 16.372 11.306 15.942 11.908V20.948L19.439 19.190C20.022 18.893 20.385 18.301 20.385 17.651V9.615C20.385 8.765 19.640 8.449 18.999 8.765Z"
        fill={darkerColor}
      />

      {/* Location pin - scaled down by 0.8 for 24x24 viewBox */}
      <path
        d="M11.776 3.987C8.967 3.987 6.683 6.261 6.683 9.080C6.683 12.262 9.865 14.173 11.776 15.453C13.687 14.173 16.879 12.262 16.879 9.080C16.879 6.261 14.595 3.987 11.776 3.987ZM11.776 10.676C10.897 10.676 10.190 9.959 10.190 9.080C10.190 8.201 10.897 7.484 11.776 7.484C12.655 7.484 13.372 8.201 13.372 9.080C13.372 9.959 12.655 10.676 11.776 10.676Z"
        fill={color}
      />

      {/* Inner pin circle with opacity - scaled down by 0.8 for 24x24 viewBox */}
      <path
        opacity="0.4"
        d="M13.371 9.080C13.371 9.959 12.655 10.675 11.777 10.675C10.897 10.675 10.189 9.959 10.189 9.080C10.189 8.201 10.897 7.484 11.777 7.484C12.655 7.484 13.371 8.201 13.371 9.080Z"
        fill={color}
      />
    </svg>
  );
};

export const CustomRankingIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter ID to avoid conflicts
  const filterId = `filter_ranking_${Math.random().toString(36).substr(2, 9)}`;

  // Helper function to calculate darker shade for the smaller bars
  const getDarkerShade = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Make it moderately darker for the side bars
    const darkerR = Math.max(0, Math.floor(r * 0.6));
    const darkerG = Math.max(0, Math.floor(g * 0.7));
    const darkerB = Math.max(0, Math.floor(b * 0.65));

    return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
      .toString(16)
      .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
  };

  const darkerColor = getDarkerShade(color);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId}
          x="-2.2"
          y="-1.3"
          width="28.1"
          height="28.1"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.76" />
          <feGaussianBlur stdDeviation="2.64" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.29 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.73" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* Right bar - shortest, scaled down by ~0.6 for 24x24 viewBox */}
        <path
          d="M18.46 17.61H14.12V15.08C14.12 14.38 14.54 13.96 15.24 13.96H17.34C18.04 13.96 18.46 14.38 18.46 15.08V17.61Z"
          fill={darkerColor}
        />

        {/* Left bar - medium height, scaled down by ~0.6 for 24x24 viewBox */}
        <path
          d="M9.71 17.61H5.28V13.65C5.28 12.95 5.7 12.53 6.4 12.53H8.59C9.29 12.53 9.71 12.95 9.71 13.65V17.61Z"
          fill={darkerColor}
        />

        {/* Center bar - tallest, scaled down by ~0.6 for 24x24 viewBox */}
        <path
          d="M14.12 17.61H9.71V11.42C9.71 10.72 10.13 10.3 10.83 10.3H13.00C13.70 10.3 14.12 10.72 14.12 11.42V17.61Z"
          fill={color}
        />

        {/* Star icon on top, scaled down by ~0.6 for 24x24 viewBox */}
        <path
          d="M12.17 4.24L12.67 5.47C12.71 5.55 12.79 5.60 12.87 5.61L14.14 5.77C14.37 5.79 14.46 6.08 14.29 6.24L13.33 7.17C13.27 7.23 13.24 7.31 13.26 7.39L13.48 8.61C13.52 8.84 13.28 9.01 13.08 8.90L11.97 8.33C11.90 8.30 11.82 8.30 11.75 8.33L10.64 8.90C10.44 9.01 10.20 8.84 10.24 8.61L10.46 7.39C10.48 7.31 10.45 7.23 10.39 7.17L9.43 6.24C9.26 6.08 9.35 5.79 9.58 5.77L10.85 5.61C10.93 5.60 11.01 5.55 11.05 5.47L11.55 4.24C11.65 4.03 11.94 4.03 12.04 4.24L12.17 4.24Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const CustomCoinIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter ID to avoid conflicts
  const filterId = `filter_coin_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId}
          x="-2.65"
          y="-1.86"
          width="29.26"
          height="29.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.33" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* Trophy top - scaled down by ~0.52 for 24x24 viewBox */}
        <path
          d="M15.15 7.64L14.38 8.99H9.96L9.19 7.64C8.88 7.20 9.17 6.64 9.69 6.64H14.84C15.36 6.64 15.65 7.20 15.15 7.64Z"
          fill={color}
        />

        {/* Trophy body with opacity */}
        <path
          opacity="0.4"
          d="M17.39 14.53C17.39 15.84 16.74 18.47 12.14 18.47C7.54 18.47 6.88 15.84 6.88 14.53C6.88 11.90 8.85 9.93 9.93 8.99H14.35C15.42 9.93 17.39 11.90 17.39 14.53Z"
          fill={color}
        />

        {/* Dollar sign - scaled down by ~0.52 for 24x24 viewBox */}
        <path
          d="M13.78 14.93C13.78 14.26 13.38 13.67 12.67 13.50L11.84 13.29C11.74 13.26 11.65 13.20 11.58 13.11C11.51 13.03 11.48 12.92 11.48 12.81C11.48 12.54 11.69 12.32 11.96 12.32H12.32C12.56 12.32 12.76 12.51 12.79 12.76C12.82 13.03 13.04 13.22 13.31 13.19C13.58 13.16 13.80 12.95 13.77 12.65C13.70 12.08 13.23 11.65 12.68 11.57V11.44C12.68 11.19 12.49 11.00 12.24 11.00C11.99 11.00 11.80 11.19 11.80 11.44V11.57C11.24 11.66 10.74 12.11 10.74 12.81C10.74 13.14 10.85 13.46 11.05 13.71C11.25 13.98 11.54 14.12 11.86 14.19L12.69 14.40C12.89 14.45 13.04 14.66 13.04 14.93C13.04 15.06 13.00 15.18 12.92 15.28C12.85 15.38 12.75 15.43 12.64 15.43H12.28C12.04 15.43 11.84 15.24 11.81 14.99C11.78 14.72 11.56 14.53 11.29 14.56C11.02 14.59 10.80 14.80 10.83 15.10C10.90 15.67 11.37 16.10 11.92 16.18V16.31C11.92 16.56 12.11 16.75 12.36 16.75C12.61 16.75 12.80 16.56 12.80 16.31V16.18C13.08 16.13 13.33 16.00 13.52 15.79C13.79 15.52 13.94 15.15 13.94 14.76L13.78 14.93Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const CustomSettingsIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter ID to avoid conflicts
  const filterId = `filter_settings_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId}
          x="-2.05"
          y="-1.92"
          width="28.1"
          height="28.1"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.76" />
          <feGaussianBlur stdDeviation="2.64" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.73" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* Settings gear outer mechanism with opacity - scaled down by ~0.6 for 24x24 viewBox */}
        <path
          opacity="0.4"
          d="M9.23 14.85L9.23 14.85C8.56 14.43 7.68 14.43 7.01 14.84C6.88 14.92 6.72 14.88 6.64 14.75L5.34 12.65C5.26 12.52 5.3 12.36 5.43 12.28L5.44 12.27C6.1 11.86 6.51 11.12 6.5 10.32C6.5 9.52 6.09 8.8 5.43 8.4L5.43 8.4C5.3 8.32 5.26 8.16 5.34 8.03L6.64 5.94C6.72 5.81 6.87 5.77 7.01 5.84C7.68 6.24 8.56 6.24 9.23 5.83L9.23 5.83C9.89 5.42 10.29 4.69 10.29 3.91C10.29 3.73 10.43 3.59 10.61 3.59H13.47C13.65 3.59 13.79 3.73 13.79 3.91C13.79 4.69 14.19 5.42 14.85 5.83L14.85 5.83C15.52 6.24 16.4 6.24 17.07 5.84C17.2 5.77 17.36 5.81 17.44 5.94L18.74 8.02C18.82 8.16 18.78 8.31 18.65 8.39L18.64 8.4C18.01 8.8 17.6 9.53 17.61 10.32C17.61 11.13 18.02 11.86 18.68 12.26L18.68 12.26C18.78 12.31 18.82 12.52 18.74 12.65L17.44 14.75C17.36 14.88 17.21 14.92 17.07 14.85C16.4 14.44 15.52 14.44 14.85 14.85L14.85 14.85C14.18 15.27 13.79 16 13.79 16.78C13.79 16.95 13.65 17.09 13.47 17.09H10.6C10.42 17.09 10.28 16.95 10.28 16.77C10.29 16 9.89 15.27 9.23 14.85Z"
          fill={color}
        />
        {/* Settings gear center circle - scaled down by ~0.6 for 24x24 viewBox */}
        <path
          d="M12.04 12.62C13.01 12.62 13.79 11.84 13.79 10.87C13.79 9.9 13.01 9.12 12.04 9.12C11.07 9.12 10.29 9.9 10.29 10.87C10.29 11.84 11.07 12.62 12.04 12.62Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const CustomAttackIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter IDs to avoid conflicts
  const filterId0 = `filter_attack_0_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId1 = `filter_attack_1_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId2 = `filter_attack_2_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId3 = `filter_attack_3_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId4 = `filter_attack_4_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId5 = `filter_attack_5_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId6 = `filter_attack_6_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId7 = `filter_attack_7_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId8 = `filter_attack_8_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId9 = `filter_attack_9_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId10 = `filter_attack_10_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const maskId = `mask_attack_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 84 79"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId0}
          x="6.29825"
          y="6.88321"
          width="69.9916"
          height="65.7658"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.38542" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={filterId1}
          x="13.0935"
          y="12.2999"
          width="55.0044"
          height="54.9325"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId2}
          x="14.7777"
          y="15.1644"
          width="54.0699"
          height="48.672"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId3}
          x="19.0812"
          y="54.9248"
          width="42.9722"
          height="15.4662"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.25694"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId4}
          x="32.1391"
          y="61.7201"
          width="17.4443"
          height="6.63567"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.35417"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId5}
          x="11.2635"
          y="19.6131"
          width="60.0611"
          height="44.8211"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId6}
          x="35.0627"
          y="56.4667"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId7}
          x="33.7947"
          y="55.1739"
          width="8.45582"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId8}
          x="35.0627"
          y="20.371"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId9}
          x="33.7947"
          y="19.0816"
          width="8.45582"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId10}
          x="23.2602"
          y="22.7173"
          width="36.7567"
          height="38.1591"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.902778" />
          <feGaussianBlur stdDeviation="0.451389" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0449653 0 0 0 0 0.222917 0 0 0 0 0.308333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_${filterId0}`}
          x1="38.5913"
          y1="65.8783"
          x2="49.9607"
          y2="12.1839"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${filterId1}`}
          x1="62.9864"
          y1="22.5081"
          x2="30.3128"
          y2="55.6599"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_${filterId2}`}
          x1="23.6097"
          y1="49.2322"
          x2="58.7502"
          y2="25.1355"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_${filterId3}`}
          x1="40.5673"
          y1="65.8773"
          x2="40.5673"
          y2="61.1454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint4_linear_${filterId4}`}
          x1="40.5935"
          y1="65.3972"
          x2="40.5935"
          y2="63.9655"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`paint5_linear_${filterId5}`}
          x1="33.7582"
          y1="20.1896"
          x2="44.1964"
          y2="65.7994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint6_linear_${filterId6}`}
          x1="35.1621"
          y1="57.7914"
          x2="40.8784"
          y2="61.0969"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint7_linear_${filterId7}`}
          x1="35.1621"
          y1="21.6991"
          x2="40.8784"
          y2="25.0046"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint8_linear_${filterId8}`}
          x1="41.6386"
          y1="23.6201"
          x2="41.6386"
          y2="58.168"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint9_linear_${filterId9}`}
          x1="41.6386"
          y1="23.62"
          x2="41.6386"
          y2="58.1679"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter={`url(#${filterId0})`}>
        <g filter={`url(#${filterId1})`}>
          <path
            d="M40.5956 65.8783C55.0368 65.8783 66.7436 54.1875 66.7436 39.7662C66.7436 25.3448 55.0368 13.6541 40.5956 13.6541C26.1545 13.6541 14.4476 25.3448 14.4476 39.7662C14.4476 54.1875 26.1545 65.8783 40.5956 65.8783Z"
            fill={`url(#paint0_linear_${filterId0})`}
            fillOpacity="0.12"
          />
        </g>
        <g filter={`url(#${filterId2})`}>
          <path
            d="M30.2671 55.615C42.9326 64.6643 58.3691 64.7854 64.7455 55.8855C71.1219 46.9855 66.0236 32.4348 53.3581 23.3855C40.6926 14.3362 25.2561 14.2151 18.8797 23.115C12.5033 32.0149 17.6017 46.5657 30.2671 55.615Z"
            fill={`url(#paint1_linear_${filterId1})`}
            fillOpacity="0.04"
          />
          <path
            d="M53.2916 23.4773C59.6077 27.9901 64.0336 33.8718 66.0858 39.7287C68.1381 45.5859 67.8141 51.408 64.6531 55.82C61.492 60.2318 56.0792 62.4172 49.8655 62.3685C43.6521 62.3197 36.6483 60.0361 30.3322 55.5233C24.0163 51.0106 19.5915 45.1285 17.5394 39.2718C15.4871 33.4146 15.8108 27.5932 18.9715 23.1812C22.1325 18.7692 27.5458 16.5833 33.7597 16.6321C39.9729 16.6809 46.9757 18.9648 53.2916 23.4773Z"
            stroke={`url(#paint2_linear_${filterId2})`}
            strokeWidth="0.225694"
          />
        </g>
        <g filter={`url(#${filterId3})`}>
          <path
            d="M23.5951 59.4387C24.597 60.91 31.6688 65.4415 40.5941 65.8773C44.6379 65.8773 54.7699 62.9697 57.5396 59.4387C51.2656 63.3427 36.0297 66.3831 23.5951 59.4387Z"
            fill={`url(#paint3_linear_${filterId3})`}
          />
        </g>
        <g filter={`url(#${filterId4})`}>
          <path
            d="M34.8474 64.6956C36.7747 65.1051 38.882 65.6476 40.5399 65.6476C42.7008 65.6476 44.5714 65.0665 46.875 64.4285C41.4728 65.0509 38.4354 65.0043 34.8474 64.6956Z"
            fill={`url(#paint4_linear_${filterId4})`}
            fillOpacity="0.6"
          />
        </g>
        <g filter={`url(#${filterId5})`}>
          <path
            d="M68.633 32.3158C70.2459 36.2246 68.8428 41.864 65.0824 47.2345C61.3311 52.5917 55.2691 57.6247 47.6833 60.3018C40.0961 62.9793 32.2657 62.9182 26.0038 61.1302C19.7288 59.3383 15.0849 55.832 13.7756 51.6712C12.4624 47.4977 13.8781 41.847 17.5564 36.545C21.2285 31.2516 27.1325 26.3441 34.7189 23.6668C42.304 20.9899 49.9763 21.1755 56.1602 23.026C62.3548 24.8798 67.0127 28.3892 68.633 32.3158Z"
            stroke={`url(#paint5_linear_${filterId5})`}
            strokeWidth="0.451389"
          />
        </g>
        <g filter={`url(#${filterId6})`}>
          <path
            d="M39.0211 60.0165C39.3468 59.4532 39.1652 58.7396 38.6154 58.4227C38.0656 58.1057 37.3558 58.3055 37.0301 58.8687C36.7044 59.432 36.886 60.1456 37.4358 60.4625C37.9856 60.7795 38.6954 60.5798 39.0211 60.0165Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId7})`}>
          <path
            d="M35.5532 58.0164C36.3697 56.6047 38.1368 56.1196 39.4913 56.9004C40.8457 57.6812 41.3086 59.4517 40.4924 60.8636C39.676 62.2756 37.9084 62.7612 36.5538 61.9804C35.1992 61.1995 34.7367 59.4283 35.5532 58.0164Z"
            stroke={`url(#paint6_linear_${filterId6})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId8})`}>
          <path
            d="M39.0211 23.9208C39.3468 23.3575 39.1652 22.6439 38.6154 22.327C38.0656 22.01 37.3558 22.2098 37.0301 22.773C36.7044 23.3363 36.886 24.0499 37.4358 24.3668C37.9856 24.6838 38.6954 24.484 39.0211 23.9208Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId9})`}>
          <path
            d="M35.5532 21.9241C36.3697 20.5124 38.1368 20.0273 39.4913 20.8081C40.8457 21.5889 41.3086 23.3594 40.4924 24.7713C39.676 26.1833 37.9084 26.6689 36.5538 25.8881C35.1992 25.1072 34.7367 23.3361 35.5532 21.9241Z"
            stroke={`url(#paint7_linear_${filterId7})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId10})`}>
          <path
            d="M42.9896 33.834L47.1957 30.1289V35.6367H58.2113L48.5971 40.8438L55.2064 47.3525H45.9936V58.168L39.5853 49.8564L34.3773 52.8613L35.1791 46.0518H25.0658L34.3773 40.8438L28.8695 38.2402L34.3773 36.6387L29.3705 27.4248L38.183 33.834L40.7865 23.6201L42.9896 33.834ZM40.6889 35.3359C37.6471 35.3359 35.1812 37.802 35.1811 40.8438C35.1811 43.8855 37.6471 46.3516 40.6889 46.3516C43.7301 46.3509 46.1957 43.8851 46.1957 40.8438C46.1956 37.8025 43.73 35.3366 40.6889 35.3359ZM41.0199 39.8164C41.4014 39.9309 41.6791 40.2853 41.6791 40.7041C41.679 40.8684 41.636 41.0225 41.5609 41.1562L43.1508 43.1992L42.8842 43.4072L42.6166 43.6152L41.0355 41.585C40.9465 41.6135 40.8519 41.6299 40.7533 41.6299C40.2419 41.6299 39.8277 41.2154 39.8275 40.7041C39.8275 40.3405 40.0372 40.0265 40.3422 39.875V36.7725H41.0199V39.8164Z"
            fill={`url(#paint8_linear_${filterId8})`}
          />
          <mask
            id={maskId}
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="24"
            y="22"
            width="37"
            height="38"
          >
            <path
              d="M60.0658 22.6201H24.0658V59.6201H60.0658V22.6201Z"
              fill="white"
            />
            <path
              d="M42.9896 33.834L47.1957 30.1289V35.6367H58.2113L48.5971 40.8438L55.2064 47.3525H45.9936V58.168L39.5853 49.8564L34.3773 52.8613L35.1791 46.0518H25.0658L34.3773 40.8438L28.8695 38.2402L34.3773 36.6387L29.3705 27.4248L38.183 33.834L40.7865 23.6201L42.9896 33.834ZM40.6889 35.3359C37.6471 35.3359 35.1812 37.802 35.1811 40.8438C35.1811 43.8855 37.6471 46.3516 40.6889 46.3516C43.7301 46.3509 46.1957 43.8851 46.1957 40.8438C46.1956 37.8025 43.73 35.3366 40.6889 35.3359ZM41.0199 39.8164C41.4014 39.9309 41.6791 40.2853 41.6791 40.7041C41.679 40.8684 41.636 41.0225 41.5609 41.1562L43.1508 43.1992L42.8842 43.4072L42.6166 43.6152L41.0355 41.585C40.9465 41.6135 40.8519 41.6299 40.7533 41.6299C40.2419 41.6299 39.8277 41.2154 39.8275 40.7041C39.8275 40.3405 40.0372 40.0265 40.3422 39.875V36.7725H41.0199V39.8164Z"
              fill="black"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M42.9896 33.8339L42.1072 34.0242C42.1747 34.3373 42.4031 34.5912 42.7073 34.6914C43.0115 34.7915 43.346 34.723 43.5864 34.5113L42.9896 33.8339ZM47.1957 30.1288H48.0985C48.0985 29.774 47.8907 29.4521 47.5674 29.3061C47.2441 29.16 46.8652 29.2169 46.599 29.4514L47.1957 30.1288ZM47.1957 35.6366H46.2929C46.2929 36.1352 46.6971 36.5394 47.1957 36.5394V35.6366ZM58.2113 35.6366L58.6413 36.4304C59.0046 36.2337 59.1879 35.8154 59.0864 35.4149C58.9849 35.0143 58.6245 34.7338 58.2113 34.7338V35.6366ZM48.5971 40.8437L48.1671 40.0498C47.9155 40.1861 47.7433 40.4337 47.7032 40.7171C47.6631 41.0004 47.7597 41.2861 47.9636 41.4869L48.5971 40.8437ZM55.2064 47.3524V48.2552C55.5728 48.2552 55.9029 48.0338 56.0418 47.6947C56.1807 47.3557 56.101 46.9663 55.8399 46.7092L55.2064 47.3524ZM45.9936 47.3524V46.4497C45.495 46.4497 45.0908 46.8538 45.0908 47.3524H45.9936ZM45.9936 58.1679L45.2786 58.7191C45.5145 59.0251 45.919 59.147 46.2847 59.0224C46.6505 58.8978 46.8963 58.5542 46.8963 58.1679H45.9936ZM39.5853 49.8563L40.3003 49.3051C40.0242 48.947 39.5258 48.8484 39.1342 49.0744L39.5853 49.8563ZM34.3773 52.8612L33.4808 52.7557C33.4408 53.0948 33.5957 53.4274 33.8808 53.6152C34.166 53.803 34.5327 53.8138 34.8285 53.6432L34.3773 52.8612ZM35.1791 46.0517L36.0757 46.1572C36.1058 45.9012 36.0251 45.6444 35.8538 45.4518C35.6824 45.2591 35.4369 45.1489 35.1791 45.1489V46.0517ZM25.0658 46.0517L24.6251 45.2637C24.2665 45.4643 24.0886 45.8818 24.1922 46.2794C24.2959 46.677 24.6549 46.9544 25.0658 46.9544V46.0517ZM34.3773 40.8437L34.818 41.6316C35.113 41.4666 35.2911 41.1506 35.2796 40.8128C35.268 40.475 35.0687 40.1719 34.7631 40.0275L34.3773 40.8437ZM28.8695 38.2401L28.6175 37.3733C28.2572 37.478 27.9993 37.7946 27.9696 38.1686C27.9399 38.5426 28.1445 38.896 28.4837 39.0563L28.8695 38.2401ZM34.3773 36.6386L34.6294 37.5054C34.8918 37.4292 35.1054 37.2382 35.2106 36.986C35.3157 36.7338 35.301 36.4476 35.1706 36.2075L34.3773 36.6386ZM29.3705 27.4247L29.9015 26.6946C29.5602 26.4464 29.0926 26.4677 28.7753 26.7459C28.458 27.0241 28.3758 27.485 28.5773 27.8557L29.3705 27.4247ZM38.183 33.8339L37.652 34.564C37.8941 34.7401 38.2077 34.7847 38.4893 34.6831C38.7709 34.5815 38.9839 34.347 39.0578 34.0569L38.183 33.8339ZM40.7865 23.62L41.669 23.4297C41.5807 23.0201 41.2222 22.7252 40.8033 22.7174C40.3844 22.7096 40.0152 22.991 39.9117 23.397L40.7865 23.62ZM41.0199 39.8163H40.1171C40.1171 40.215 40.3786 40.5664 40.7604 40.681L41.0199 39.8163ZM41.5609 41.1561L40.7737 40.7142C40.5958 41.0311 40.6253 41.4238 40.8485 41.7106L41.5609 41.1561ZM43.1508 43.1991L43.7061 43.9109C44.0989 43.6045 44.1692 43.0378 43.8632 42.6447L43.1508 43.1991ZM42.8842 43.4071L43.4383 44.1199L43.4395 44.1189L42.8842 43.4071ZM42.6166 43.6151L41.9043 44.1698C42.2105 44.563 42.7773 44.6337 43.1707 44.3279L42.6166 43.6151ZM41.0355 41.5849L41.7478 41.0302C41.5152 40.7315 41.1209 40.6096 40.7603 40.7251L41.0355 41.5849ZM40.3422 39.8749L40.7439 40.6834C41.0509 40.5308 41.245 40.2176 41.245 39.8749H40.3422ZM40.3422 36.7724V35.8696C39.8436 35.8696 39.4394 36.2738 39.4394 36.7724H40.3422ZM41.0199 36.7724H41.9227C41.9227 36.2738 41.5185 35.8696 41.0199 35.8696V36.7724Z"
              fill={`url(#paint9_linear_${filterId9})`}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CustomSpeedIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter IDs to avoid conflicts
  const filterId0 = `filter_speed_0_${Math.random().toString(36).substr(2, 9)}`;
  const filterId1 = `filter_speed_1_${Math.random().toString(36).substr(2, 9)}`;
  const filterId2 = `filter_speed_2_${Math.random().toString(36).substr(2, 9)}`;
  const filterId3 = `filter_speed_3_${Math.random().toString(36).substr(2, 9)}`;
  const filterId4 = `filter_speed_4_${Math.random().toString(36).substr(2, 9)}`;
  const filterId5 = `filter_speed_5_${Math.random().toString(36).substr(2, 9)}`;
  const filterId6 = `filter_speed_6_${Math.random().toString(36).substr(2, 9)}`;
  const filterId7 = `filter_speed_7_${Math.random().toString(36).substr(2, 9)}`;
  const filterId8 = `filter_speed_8_${Math.random().toString(36).substr(2, 9)}`;
  const filterId9 = `filter_speed_9_${Math.random().toString(36).substr(2, 9)}`;
  const filterId10 = `filter_speed_10_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const clipId = `clip_speed_${Math.random().toString(36).substr(2, 9)}`;
  const maskId = `mask_speed_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 71 67"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId0}
          x="0.587436"
          y="0.882968"
          width="69.9916"
          height="65.7658"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.38542" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={filterId1}
          x="7.38265"
          y="6.29964"
          width="55.0044"
          height="54.9325"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId2}
          x="9.06234"
          y="9.16414"
          width="54.0693"
          height="48.672"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId3}
          x="13.3703"
          y="48.9246"
          width="42.9722"
          height="15.4665"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.25694"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId4}
          x="26.4259"
          y="55.7199"
          width="17.4443"
          height="6.63592"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.35417"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId5}
          x="5.55272"
          y="13.6129"
          width="60.0611"
          height="44.8211"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId6}
          x="29.3486"
          y="50.4664"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId7}
          x="28.0829"
          y="49.1736"
          width="8.45582"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId8}
          x="29.3486"
          y="14.3705"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId9}
          x="28.0829"
          y="13.0801"
          width="8.45582"
          height="8.53261"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId10}
          x="21.7648"
          y="23.1829"
          width="28.3298"
          height="28.662"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.902778" />
          <feGaussianBlur stdDeviation="0.451389" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0449653 0 0 0 0 0.222917 0 0 0 0 0.308333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_${filterId0}`}
          x1="32.8805"
          y1="59.878"
          x2="44.2499"
          y2="6.18366"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${filterId1}`}
          x1="17.8941"
          y1="43.232"
          x2="53.0346"
          y2="19.1354"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_${filterId2}`}
          x1="34.8564"
          y1="59.877"
          x2="34.8564"
          y2="55.1451"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_${filterId3}`}
          x1="34.8804"
          y1="59.397"
          x2="34.8804"
          y2="57.9653"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`paint4_linear_${filterId4}`}
          x1="28.0473"
          y1="14.1894"
          x2="38.4855"
          y2="59.7991"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint5_linear_${filterId5}`}
          x1="29.4503"
          y1="51.7912"
          x2="35.1666"
          y2="55.0967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint6_linear_${filterId6}`}
          x1="29.4503"
          y1="15.6977"
          x2="35.1666"
          y2="19.0032"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint7_linear_${filterId7}`}
          x1="35.9298"
          y1="24.0854"
          x2="35.9298"
          y2="49.1362"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint8_linear_${filterId8}`}
          x1="35.9298"
          y1="24.0856"
          x2="35.9298"
          y2="49.1364"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="71" height="67" fill="white" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g filter={`url(#${filterId0})`}>
          <g filter={`url(#${filterId1})`}>
            <path
              d="M34.8848 59.878C49.326 59.878 61.0328 48.1872 61.0328 33.7659C61.0328 19.3446 49.326 7.65381 34.8848 7.65381C20.4437 7.65381 8.73682 19.3446 8.73682 33.7659C8.73682 48.1872 20.4437 59.878 34.8848 59.878Z"
              fill={`url(#paint0_linear_${filterId0})`}
              fillOpacity="0.12"
            />
          </g>
          <g filter={`url(#${filterId2})`}>
            <path
              d="M47.5761 17.4772C53.8921 21.9899 58.318 27.8716 60.3702 33.7285C62.4225 39.5858 62.0985 45.4079 58.9375 49.8199C55.7765 54.2317 50.3636 56.417 44.1499 56.3682C37.9365 56.3195 30.9327 54.036 24.6166 49.5232C18.3007 45.0105 13.8759 39.1284 11.8238 33.2716C9.77156 27.4145 10.0952 21.593 13.256 17.181C16.417 12.769 21.8303 10.5832 28.0441 10.6319C34.2574 10.6807 41.2601 12.9646 47.5761 17.4772Z"
              stroke={`url(#paint1_linear_${filterId1})`}
              strokeWidth="0.225694"
            />
          </g>
          <g filter={`url(#${filterId3})`}>
            <path
              d="M17.8842 53.4385C18.8861 54.9097 25.9578 59.4412 34.8832 59.8771C38.927 59.8771 49.0589 56.9695 51.8287 53.4385C45.5546 57.3425 30.3187 60.3828 17.8842 53.4385Z"
              fill={`url(#paint2_linear_${filterId2})`}
            />
          </g>
          <g filter={`url(#${filterId4})`}>
            <path
              d="M29.1343 58.6953C31.0616 59.1049 33.1688 59.6474 34.8267 59.6474C36.9877 59.6474 38.8583 59.0662 41.1619 58.4282C35.7597 59.0507 32.7222 59.004 29.1343 58.6953Z"
              fill={`url(#paint3_linear_${filterId3})`}
              fillOpacity="0.6"
            />
          </g>
          <g filter={`url(#${filterId5})`}>
            <path
              d="M62.9221 26.3156C64.535 30.2244 63.1319 35.8638 59.3715 41.2343C55.6202 46.5914 49.5582 51.6245 41.9723 54.3016C34.3852 56.9791 26.5547 56.918 20.2929 55.1299C14.0179 53.3381 9.37402 49.8318 8.06476 45.6709C6.75157 41.4975 8.16728 35.8468 11.8455 30.5447C15.5176 25.2514 21.4216 20.3439 29.008 17.6665C36.5931 14.9897 44.2654 15.1752 50.4493 17.0258C56.6439 18.8795 61.3018 22.3889 62.9221 26.3156Z"
              stroke={`url(#paint4_linear_${filterId4})`}
              strokeWidth="0.451389"
            />
          </g>
          <g filter={`url(#${filterId6})`}>
            <path
              d="M33.307 54.0162C33.6327 53.4529 33.451 52.7394 32.9012 52.4224C32.3514 52.1055 31.6417 52.3052 31.316 52.8685C30.9902 53.4318 31.1719 54.1454 31.7217 54.4623C32.2715 54.7792 32.9813 54.5795 33.307 54.0162Z"
              fill={color}
            />
          </g>
          <g filter={`url(#${filterId7})`}>
            <path
              d="M29.8414 52.0161C30.658 50.6044 32.425 50.1194 33.7795 50.9002C35.1339 51.681 35.5968 53.4515 34.7806 54.8634C33.9642 56.2753 32.1966 56.7609 30.842 55.9802C29.4874 55.1993 29.0249 53.4281 29.8414 52.0161Z"
              stroke={`url(#paint5_linear_${filterId5})`}
              strokeOpacity="0.6"
              strokeWidth="0.902778"
            />
          </g>
          <g filter={`url(#${filterId8})`}>
            <path
              d="M33.307 17.9203C33.6327 17.357 33.451 16.6434 32.9012 16.3265C32.3514 16.0096 31.6417 16.2093 31.316 16.7726C30.9902 17.3358 31.1719 18.0494 31.7217 18.3663C32.2715 18.6833 32.9813 18.4836 33.307 17.9203Z"
              fill={color}
            />
          </g>
          <g filter={`url(#${filterId9})`}>
            <path
              d="M29.8414 15.9226C30.658 14.5109 32.425 14.0259 33.7795 14.8067C35.1339 15.5875 35.5968 17.358 34.7806 18.7699C33.9642 20.1818 32.1966 20.6674 30.842 19.8866C29.4874 19.1058 29.0249 17.3346 29.8414 15.9226Z"
              stroke={`url(#paint6_linear_${filterId6})`}
              strokeOpacity="0.6"
              strokeWidth="0.902778"
            />
          </g>
        </g>
        <g filter={`url(#${filterId10})`}>
          <path
            d="M48.2892 24.0854C48.2878 24.1705 48.0859 36.4359 46.3234 41.0669C44.8085 43.0387 35.8806 49.1199 35.8566 49.1362C35.8566 49.1362 26.6797 43.0414 25.3898 41.0669C23.7335 36.4358 23.5715 24.1701 23.5704 24.0854H48.2892ZM25.9044 26.8004V26.8286C25.9048 26.8467 25.9056 26.8742 25.9064 26.9088C25.908 26.9785 25.9105 27.0807 25.9142 27.2114C25.9215 27.474 25.9332 27.8533 25.9513 28.3179C25.9875 29.247 26.0488 30.5239 26.1495 31.9107C26.3486 34.65 26.7084 37.9346 27.3693 39.7827L27.3956 39.8589L27.4396 39.9254C27.6056 40.1795 27.8669 40.4579 28.1564 40.7329C28.4548 41.0164 28.8191 41.3288 29.2179 41.6539C30.016 42.3043 30.9817 43.0261 31.9093 43.6949C32.8382 44.3647 33.7357 44.9872 34.4005 45.4419C34.7329 45.6692 35.0076 45.8549 35.1993 45.9839C35.2952 46.0484 35.3707 46.0991 35.422 46.1334C35.4475 46.1504 35.4672 46.1636 35.4806 46.1725C35.4872 46.1769 35.4928 46.1798 35.4962 46.1821C35.4979 46.1833 35.4992 46.1845 35.5001 46.1852L35.5011 46.1861L35.881 46.438L36.2579 46.1812C36.2586 46.1806 36.2606 46.1792 36.2618 46.1782C36.2651 46.1761 36.2711 46.1728 36.2775 46.1685C36.2903 46.1597 36.3095 46.1463 36.3341 46.1294C36.384 46.0952 36.4575 46.0443 36.5509 45.98C36.7381 45.8511 37.0076 45.6652 37.3331 45.438C37.9841 44.9835 38.8653 44.3609 39.7823 43.6919C40.6984 43.0237 41.6568 42.3048 42.4601 41.6567C43.2419 41.0261 43.9403 40.4123 44.2823 39.9674L44.3429 39.8892L44.3781 39.7964C45.0831 37.9439 45.4702 34.6537 45.6866 31.9146C45.7963 30.5272 45.8641 29.2504 45.9044 28.3209C45.9246 27.8562 45.9381 27.4771 45.9464 27.2144C45.9506 27.0832 45.9533 26.9806 45.9552 26.9107C45.9561 26.876 45.9567 26.8488 45.9572 26.8307C45.9574 26.8219 45.958 26.8148 45.9581 26.8102V26.8032L45.9738 26.1108H25.8907L25.9044 26.8004ZM44.5519 28.2622C44.512 29.1806 44.4451 30.441 44.337 31.8081C44.1223 34.5248 43.7497 37.5512 43.1466 39.2154C42.8873 39.5205 42.3466 40.0073 41.6095 40.6021C40.8306 41.2304 39.8919 41.9355 38.9835 42.5981C38.0763 43.2599 37.2038 43.8766 36.5577 44.3276C36.2831 44.5193 36.0488 44.6808 35.8712 44.8032C35.689 44.6804 35.4483 44.5175 35.1652 44.3237C34.5062 43.873 33.6183 43.2574 32.7013 42.5962C31.783 41.934 30.8415 41.231 30.0734 40.605C29.689 40.2917 29.3534 40.0027 29.089 39.7515C28.8573 39.5314 28.7036 39.3605 28.6154 39.2427C28.0445 37.5772 27.699 34.5361 27.5011 31.812C27.4017 30.4444 27.3406 29.1839 27.3048 28.2652C27.2928 27.9569 27.2844 27.6864 27.2775 27.4644H35.9025L34.8019 33.6109L27.9425 35.3052L34.8019 36.9995L35.9279 43.2906L37.0538 36.9995L43.9132 35.3052L37.0538 33.6109L35.9532 27.4644H44.5822C44.5744 27.6858 44.5652 27.9552 44.5519 28.2622Z"
            fill={`url(#paint7_linear_${filterId7})`}
          />
          <mask
            id={maskId}
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="22"
            y="23"
            width="28"
            height="28"
          >
            <path
              d="M49.5704 23.0854H22.5704V50.0854H49.5704V23.0854Z"
              fill="white"
            />
            <path
              d="M48.2892 24.0854C48.2878 24.1705 48.0859 36.4359 46.3234 41.0669C44.8085 43.0387 35.8806 49.1199 35.8566 49.1362C35.8566 49.1362 26.6797 43.0414 25.3898 41.0669C23.7335 36.4358 23.5715 24.1701 23.5704 24.0854H48.2892ZM25.9044 26.8004V26.8286C25.9048 26.8467 25.9056 26.8742 25.9064 26.9088C25.908 26.9785 25.9105 27.0807 25.9142 27.2114C25.9215 27.474 25.9332 27.8533 25.9513 28.3179C25.9875 29.247 26.0488 30.5239 26.1495 31.9107C26.3486 34.65 26.7084 37.9346 27.3693 39.7827L27.3956 39.8589L27.4396 39.9254C27.6056 40.1795 27.8669 40.4579 28.1564 40.7329C28.4548 41.0164 28.8191 41.3288 29.2179 41.6539C30.016 42.3043 30.9817 43.0261 31.9093 43.6949C32.8382 44.3647 33.7357 44.9872 34.4005 45.4419C34.7329 45.6692 35.0076 45.8549 35.1993 45.9839C35.2952 46.0484 35.3707 46.0991 35.422 46.1334C35.4475 46.1504 35.4672 46.1636 35.4806 46.1725C35.4872 46.1769 35.4928 46.1798 35.4962 46.1821C35.4979 46.1833 35.4992 46.1845 35.5001 46.1852L35.5011 46.1861L35.881 46.438L36.2579 46.1812C36.2586 46.1806 36.2606 46.1792 36.2618 46.1782C36.2651 46.1761 36.2711 46.1728 36.2775 46.1685C36.2903 46.1597 36.3095 46.1463 36.3341 46.1294C36.384 46.0952 36.4575 46.0443 36.5509 45.98C36.7381 45.8511 37.0076 45.6652 37.3331 45.438C37.9841 44.9835 38.8653 44.3609 39.7823 43.6919C40.6984 43.0237 41.6568 42.3048 42.4601 41.6567C43.2419 41.0261 43.9403 40.4123 44.2823 39.9674L44.3429 39.8892L44.3781 39.7964C45.0831 37.9439 45.4702 34.6537 45.6866 31.9146C45.7963 30.5272 45.8641 29.2504 45.9044 28.3209C45.9246 27.8562 45.9381 27.4771 45.9464 27.2144C45.9506 27.0832 45.9533 26.9806 45.9552 26.9107C45.9561 26.876 45.9567 26.8488 45.9572 26.8307C45.9574 26.8219 45.958 26.8148 45.9581 26.8102V26.8032L45.9738 26.1108H25.8907L25.9044 26.8004ZM44.5519 28.2622C44.512 29.1806 44.4451 30.441 44.337 31.8081C44.1223 34.5248 43.7497 37.5512 43.1466 39.2154C42.8873 39.5205 42.3466 40.0073 41.6095 40.6021C40.8306 41.2304 39.8919 41.9355 38.9835 42.5981C38.0763 43.2599 37.2038 43.8766 36.5577 44.3276C36.2831 44.5193 36.0488 44.6808 35.8712 44.8032C35.689 44.6804 35.4483 44.5175 35.1652 44.3237C34.5062 43.873 33.6183 43.2574 32.7013 42.5962C31.783 41.934 30.8415 41.231 30.0734 40.605C29.689 40.2917 29.3534 40.0027 29.089 39.7515C28.8573 39.5314 28.7036 39.3605 28.6154 39.2427C28.0445 37.5772 27.699 34.5361 27.5011 31.812C27.4017 30.4444 27.3406 29.1839 27.3048 28.2652C27.2928 27.9569 27.2844 27.6864 27.2775 27.4644H35.9025L34.8019 33.6109L27.9425 35.3052L34.8019 36.9995L35.9279 43.2906L37.0538 36.9995L43.9132 35.3052L37.0538 33.6109L35.9532 27.4644H44.5822C44.5744 27.6858 44.5652 27.9552 44.5519 28.2622Z"
              fill="black"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M48.2892 24.0856L49.1918 24.1003C49.1958 23.8584 49.1024 23.625 48.9327 23.4525C48.763 23.28 48.5312 23.1829 48.2892 23.1829V24.0856ZM46.3234 41.0671L47.0392 41.6171C47.0928 41.5474 47.1358 41.4703 47.1671 41.3882L46.3234 41.0671ZM35.8566 49.1364L35.3571 49.8885C35.6629 50.0916 36.0613 50.0893 36.3648 49.8826L35.8566 49.1364ZM25.3898 41.0671L24.5397 41.3711C24.5636 41.4378 24.5952 41.5015 24.634 41.5608L25.3898 41.0671ZM23.5704 24.0856V23.1829C23.329 23.1829 23.0976 23.2796 22.9279 23.4514C22.7583 23.6233 22.6646 23.8559 22.6677 24.0974L23.5704 24.0856Z"
              fill={`url(#paint8_linear_${filterId8})`}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CustomDefenceIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter IDs to avoid conflicts
  const filterId0 = `filter_defence_0_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId1 = `filter_defence_1_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId2 = `filter_defence_2_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId3 = `filter_defence_3_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId4 = `filter_defence_4_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId5 = `filter_defence_5_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId6 = `filter_defence_6_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId7 = `filter_defence_7_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId8 = `filter_defence_8_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId9 = `filter_defence_9_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId10 = `filter_defence_10_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const maskId = `mask_defence_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 84 79"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId0}
          x="6.87699"
          y="6.88297"
          width="69.9916"
          height="65.7658"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.38542" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={filterId1}
          x="13.6673"
          y="12.2996"
          width="55.0044"
          height="54.9325"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId2}
          x="15.3515"
          y="15.1641"
          width="54.0699"
          height="48.672"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId3}
          x="19.6574"
          y="54.9246"
          width="42.9722"
          height="15.4662"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.25694"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId4}
          x="32.7154"
          y="61.7199"
          width="17.4443"
          height="6.63592"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.35417"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId5}
          x="11.8423"
          y="19.6129"
          width="60.0611"
          height="44.8211"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId6}
          x="35.6371"
          y="56.4664"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId7}
          x="34.3738"
          y="55.1736"
          width="8.45582"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId8}
          x="35.6371"
          y="20.3707"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId9}
          x="34.3738"
          y="19.0816"
          width="8.45582"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId10}
          x="26.7316"
          y="25.5132"
          width="30.9688"
          height="34.6884"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.902778" />
          <feGaussianBlur stdDeviation="0.451389" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0449653 0 0 0 0 0.222917 0 0 0 0 0.308333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_${filterId0}`}
          x1="39.1653"
          y1="65.878"
          x2="50.5347"
          y2="12.1836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${filterId1}`}
          x1="63.5603"
          y1="22.5079"
          x2="30.8866"
          y2="55.6597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_${filterId2}`}
          x1="24.1837"
          y1="49.232"
          x2="59.3241"
          y2="25.1354"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_${filterId3}`}
          x1="41.1435"
          y1="65.877"
          x2="41.1435"
          y2="61.1451"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint4_linear_${filterId4}`}
          x1="41.1698"
          y1="65.397"
          x2="41.1698"
          y2="63.9653"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`paint5_linear_${filterId5}`}
          x1="34.3369"
          y1="20.1894"
          x2="44.7751"
          y2="65.7991"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint6_linear_${filterId6}`}
          x1="35.7411"
          y1="57.7912"
          x2="41.4575"
          y2="61.0967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint7_linear_${filterId7}`}
          x1="35.7411"
          y1="21.6991"
          x2="41.4575"
          y2="25.0046"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint8_linear_${filterId8}`}
          x1="42.216"
          y1="26.416"
          x2="42.216"
          y2="57.4932"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint9_linear_${filterId9}`}
          x1="42.216"
          y1="26.4161"
          x2="42.216"
          y2="57.4933"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter={`url(#${filterId0})`}>
        <g filter={`url(#${filterId1})`}>
          <path
            d="M41.1695 65.878C55.6106 65.878 67.3175 54.1872 67.3175 39.7659C67.3175 25.3446 55.6106 13.6538 41.1695 13.6538C26.7283 13.6538 15.0215 25.3446 15.0215 39.7659C15.0215 54.1872 26.7283 65.878 41.1695 65.878Z"
            fill={`url(#paint0_linear_${filterId0})`}
            fillOpacity="0.12"
          />
        </g>
        <g filter={`url(#${filterId2})`}>
          <path
            d="M30.841 55.6147C43.5065 64.664 58.943 64.7851 65.3193 55.8852C71.6957 46.9853 66.5974 32.4346 53.9319 23.3852C41.2664 14.3359 25.8299 14.2148 19.4536 23.1147C13.0772 32.0147 18.1755 46.5654 30.841 55.6147Z"
            fill={`url(#paint1_linear_${filterId1})`}
            fillOpacity="0.04"
          />
          <path
            d="M53.8656 23.4772C60.1817 27.9899 64.6076 33.8716 66.6598 39.7285C68.7121 45.5858 68.388 51.4079 65.227 55.8199C62.066 60.2317 56.6531 62.417 50.4395 62.3682C44.226 62.3195 37.2222 60.036 30.9061 55.5232C24.5902 51.0105 20.1655 45.1284 18.1133 39.2716C16.0611 33.4145 16.3847 27.593 19.5455 23.181C22.7065 18.769 28.1198 16.5832 34.3336 16.6319C40.5469 16.6807 47.5496 18.9646 53.8656 23.4772Z"
            stroke={`url(#paint2_linear_${filterId2})`}
            strokeWidth="0.225694"
          />
        </g>
        <g filter={`url(#${filterId3})`}>
          <path
            d="M24.1713 59.4385C25.1732 60.9097 32.2449 65.4412 41.1703 65.8771C45.2141 65.8771 55.346 62.9695 58.1158 59.4385C51.8417 63.3425 36.6059 66.3828 24.1713 59.4385Z"
            fill={`url(#paint3_linear_${filterId3})`}
          />
        </g>
        <g filter={`url(#${filterId4})`}>
          <path
            d="M35.4237 64.6953C37.351 65.1049 39.4583 65.6474 41.1162 65.6474C43.2771 65.6474 45.1477 65.0662 47.4513 64.4282C42.0491 65.0507 39.0117 65.004 35.4237 64.6953Z"
            fill={`url(#paint4_linear_${filterId4})`}
            fillOpacity="0.6"
          />
        </g>
        <g filter={`url(#${filterId5})`}>
          <path
            d="M69.2118 32.3156C70.8246 36.2244 69.4215 41.8638 65.6611 47.2343C61.9098 52.5914 55.8478 57.6245 48.262 60.3016C40.6748 62.9791 32.8444 62.918 26.5825 61.1299C20.3075 59.3381 15.6636 55.8318 14.3543 51.6709C13.0412 47.4975 14.4569 41.8468 18.1351 36.5447C21.8073 31.2514 27.7112 26.3439 35.2976 23.6665C42.8827 20.9897 50.555 21.1752 56.7389 23.0258C62.9335 24.8795 67.5914 28.3889 69.2118 32.3156Z"
            stroke={`url(#paint5_linear_${filterId5})`}
            strokeWidth="0.451389"
          />
        </g>
        <g filter={`url(#${filterId6})`}>
          <path
            d="M39.5954 60.0162C39.9211 59.4529 39.7395 58.7394 39.1897 58.4224C38.6399 58.1055 37.9301 58.3052 37.6044 58.8685C37.2787 59.4318 37.4603 60.1454 38.0102 60.4623C38.56 60.7792 39.2697 60.5795 39.5954 60.0162Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId7})`}>
          <path
            d="M36.1322 58.0161C36.9488 56.6044 38.7159 56.1194 40.0704 56.9002C41.4248 57.681 41.8877 59.4515 41.0715 60.8634C40.2551 62.2753 38.4875 62.7609 37.1329 61.9802C35.7783 61.1993 35.3158 59.4281 36.1322 58.0161Z"
            stroke={`url(#paint6_linear_${filterId6})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId8})`}>
          <path
            d="M39.5954 23.9205C39.9212 23.3572 39.7395 22.6437 39.1897 22.3267C38.6399 22.0098 37.9301 22.2095 37.6044 22.7728C37.2787 23.3361 37.4604 24.0496 38.0102 24.3666C38.56 24.6835 39.2697 24.4838 39.5954 23.9205Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId9})`}>
          <path
            d="M36.1322 21.9241C36.9488 20.5124 38.7159 20.0273 40.0704 20.8081C41.4248 21.5889 41.8877 23.3594 41.0715 24.7713C40.2551 26.1833 38.4875 26.6689 37.1329 25.8881C35.7783 25.1072 35.3158 23.3361 36.1322 21.9241Z"
            stroke={`url(#paint7_linear_${filterId7})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId10})`}>
          <path
            d="M33.5554 33.1885C37.1854 31.6272 41.6008 33.3099 44.7966 37.0459C42.2415 35.2186 39.4047 34.5963 36.9899 35.6348C32.4868 37.5718 31.1606 44.5468 34.028 51.2139C35.1338 53.7847 36.7031 55.9332 38.4704 57.4932C35.08 56.4195 31.8103 53.3481 29.9577 49.041C27.0902 42.3739 28.7013 35.2764 33.5554 33.1885ZM45.9626 26.416C49.3527 27.4899 52.6219 30.5605 54.4743 34.8672C57.3418 41.5343 55.7308 48.6319 50.8767 50.7197C47.2482 52.2801 42.8356 50.5987 39.6403 46.8662C42.194 48.6906 45.029 49.3109 47.4421 48.2734C51.9453 46.3365 53.2724 39.3615 50.405 32.6943C49.2994 30.1239 47.7296 27.976 45.9626 26.416ZM42.2224 37.6885C44.5779 37.6885 46.4879 39.5976 46.488 41.9531C46.488 44.3087 44.5779 46.2188 42.2224 46.2188C39.867 46.2185 37.9577 44.3085 37.9577 41.9531C37.9578 39.5978 39.867 37.6887 42.2224 37.6885Z"
            fill={`url(#paint8_linear_${filterId8})`}
          />
          <mask
            id={maskId}
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="27"
            y="25"
            width="31"
            height="34"
          >
            <path
              d="M57.5372 25.416H27.5372V58.416H57.5372V25.416Z"
              fill="white"
            />
            <path
              d="M33.5554 33.1885C37.1854 31.6272 41.6008 33.3099 44.7966 37.0459C42.2415 35.2186 39.4047 34.5963 36.9899 35.6348C32.4868 37.5718 31.1606 44.5468 34.028 51.2139C35.1338 53.7847 36.7031 55.9332 38.4704 57.4932C35.08 56.4195 31.8103 53.3481 29.9577 49.041C27.0902 42.3739 28.7013 35.2764 33.5554 33.1885ZM45.9626 26.416C49.3527 27.4899 52.6219 30.5605 54.4743 34.8672C57.3418 41.5343 55.7308 48.6319 50.8767 50.7197C47.2482 52.2801 42.8356 50.5987 39.6403 46.8662C42.194 48.6906 45.029 49.3109 47.4421 48.2734C51.9453 46.3365 53.2724 39.3615 50.405 32.6943C49.2994 30.1239 47.7296 27.976 45.9626 26.416ZM42.2224 37.6885C44.5779 37.6885 46.4879 39.5976 46.488 41.9531C46.488 44.3087 44.5779 46.2188 42.2224 46.2188C39.867 46.2185 37.9577 44.3085 37.9577 41.9531C37.9578 39.5978 39.867 37.6887 42.2224 37.6885Z"
              fill="black"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M44.7966 37.046L44.2714 37.7803C44.6427 38.0458 45.1536 37.9925 45.462 37.6561C45.7704 37.3197 45.7793 36.806 45.4826 36.4592L44.7966 37.046ZM38.4704 57.4933L38.1979 58.3539C38.6046 58.4827 39.046 58.3092 39.2561 57.9379C39.4662 57.5665 39.3877 57.0988 39.0678 56.8164L38.4704 57.4933ZM45.9626 26.4161L46.2352 25.5555C45.8285 25.4266 45.3871 25.6001 45.1769 25.9715C44.9668 26.3428 45.0453 26.8105 45.3651 27.0929L45.9626 26.4161ZM39.6403 46.8663L40.1651 46.1317C39.7938 45.8664 39.2829 45.92 38.9746 46.2565C38.6664 46.5931 38.6577 47.1067 38.9545 47.4534L39.6403 46.8663Z"
              fill={`url(#paint9_linear_${filterId9})`}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CustomDamageIcon: React.FC<CustomIconProps> = ({
  color,
  size = 24,
  className = "",
}) => {
  // Generate unique filter IDs to avoid conflicts
  const filterId0 = `filter_damage_0_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId1 = `filter_damage_1_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId2 = `filter_damage_2_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId3 = `filter_damage_3_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId4 = `filter_damage_4_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId5 = `filter_damage_5_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId6 = `filter_damage_6_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId7 = `filter_damage_7_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId8 = `filter_damage_8_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId9 = `filter_damage_9_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const filterId10 = `filter_damage_10_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const maskId = `mask_damage_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 83 79"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <filter
          id={filterId0}
          x="6.16361"
          y="6.88297"
          width="69.9916"
          height="65.7658"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.38542" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id={filterId1}
          x="12.9541"
          y="12.2996"
          width="55.0044"
          height="54.9325"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId2}
          x="14.6383"
          y="15.1641"
          width="54.0699"
          height="48.672"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.677083"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId3}
          x="18.944"
          y="54.9246"
          width="42.9722"
          height="15.4662"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.25694"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId4}
          x="32.002"
          y="61.7199"
          width="17.4443"
          height="6.63592"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.35417"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId5}
          x="11.1289"
          y="19.6129"
          width="60.0611"
          height="44.8211"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId6}
          x="34.9222"
          y="56.4664"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId7}
          x="33.659"
          y="55.1736"
          width="8.45595"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId8}
          x="34.9222"
          y="20.3707"
          width="5.92569"
          height="5.95193"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.902778"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId9}
          x="33.659"
          y="19.0816"
          width="8.45595"
          height="8.53285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.451389"
            result="effect1_foregroundBlur"
          />
        </filter>
        <filter
          id={filterId10}
          x="24.8135"
          y="26.6912"
          width="37.3417"
          height="30.1998"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.902778" />
          <feGaussianBlur stdDeviation="0.451389" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0449653 0 0 0 0 0.222917 0 0 0 0 0.308333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_${filterId0}`}
          x1="38.4519"
          y1="65.878"
          x2="49.8213"
          y2="12.1836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${filterId1}`}
          x1="62.847"
          y1="22.5079"
          x2="30.1734"
          y2="55.6597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_${filterId2}`}
          x1="23.4703"
          y1="49.232"
          x2="58.6108"
          y2="25.1354"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_${filterId3}`}
          x1="40.4302"
          y1="65.877"
          x2="40.4302"
          y2="61.1451"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint4_linear_${filterId4}`}
          x1="40.4565"
          y1="65.397"
          x2="40.4565"
          y2="63.9653"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`paint5_linear_${filterId5}`}
          x1="33.6235"
          y1="20.1894"
          x2="44.0616"
          y2="65.7991"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={`paint6_linear_${filterId6}`}
          x1="35.0264"
          y1="57.7912"
          x2="40.7428"
          y2="61.0967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint7_linear_${filterId7}`}
          x1="35.0264"
          y1="21.6991"
          x2="40.7428"
          y2="25.0046"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient
          id={`paint8_linear_${filterId8}`}
          x1="43.4843"
          y1="29.7459"
          x2="43.4843"
          y2="55.4775"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor="#033326" />
        </linearGradient>
        <linearGradient
          id={`paint9_linear_${filterId9}`}
          x1="43.4843"
          y1="27.594"
          x2="43.4843"
          y2="54.1829"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter={`url(#${filterId0})`}>
        <g filter={`url(#${filterId1})`}>
          <path
            d="M40.4562 65.878C54.8974 65.878 66.6042 54.1872 66.6042 39.7659C66.6042 25.3446 54.8974 13.6538 40.4562 13.6538C26.0151 13.6538 14.3082 25.3446 14.3082 39.7659C14.3082 54.1872 26.0151 65.878 40.4562 65.878Z"
            fill={`url(#paint0_linear_${filterId0})`}
            fillOpacity="0.12"
          />
        </g>
        <g filter={`url(#${filterId2})`}>
          <path
            d="M30.1277 55.6147C42.7932 64.664 58.2297 64.7851 64.6061 55.8852C70.9825 46.9853 65.8841 32.4346 53.2187 23.3852C40.5532 14.3359 25.1167 14.2148 18.7403 23.1147C12.3639 32.0147 17.4623 46.5654 30.1277 55.6147Z"
            fill={`url(#paint1_linear_${filterId1})`}
            fillOpacity="0.04"
          />
          <path
            d="M53.1522 23.4772C59.4683 27.9899 63.8942 33.8716 65.9464 39.7285C67.9987 45.5858 67.6747 51.4079 64.5137 55.8199C61.3526 60.2317 55.9398 62.417 49.7261 62.3682C43.5127 62.3195 36.5089 60.036 30.1928 55.5232C23.8769 51.0105 19.4521 45.1284 17.4 39.2716C15.3477 33.4145 15.6714 27.593 18.8321 23.181C21.9931 18.769 27.4064 16.5832 33.6203 16.6319C39.8335 16.6807 46.8363 18.9646 53.1522 23.4772Z"
            stroke={`url(#paint2_linear_${filterId2})`}
            strokeWidth="0.225694"
          />
        </g>
        <g filter={`url(#${filterId3})`}>
          <path
            d="M23.4579 59.4385C24.4598 60.9097 31.5316 65.4412 40.4569 65.8771C44.5007 65.8771 54.6327 62.9695 57.4024 59.4385C51.1284 63.3425 35.8925 66.3828 23.4579 59.4385Z"
            fill={`url(#paint3_linear_${filterId3})`}
          />
        </g>
        <g filter={`url(#${filterId4})`}>
          <path
            d="M34.7103 64.6953C36.6376 65.1049 38.7449 65.6474 40.4028 65.6474C42.5638 65.6474 44.4343 65.0662 46.7379 64.4282C41.3358 65.0507 38.2983 65.004 34.7103 64.6953Z"
            fill={`url(#paint4_linear_${filterId4})`}
            fillOpacity="0.6"
          />
        </g>
        <g filter={`url(#${filterId5})`}>
          <path
            d="M68.4983 32.3156C70.1112 36.2244 68.7081 41.8638 64.9476 47.2343C61.1963 52.5914 55.1344 57.6245 47.5485 60.3016C39.9614 62.9791 32.1309 62.918 25.869 61.1299C19.5941 59.3381 14.9501 55.8318 13.6409 51.6709C12.3277 47.4975 13.7434 41.8468 17.4216 36.5447C21.0938 31.2514 26.9977 26.3439 34.5842 23.6665C42.1693 20.9897 49.8416 21.1752 56.0255 23.0258C62.2201 24.8795 66.878 28.3889 68.4983 32.3156Z"
            stroke={`url(#paint5_linear_${filterId5})`}
            strokeWidth="0.451389"
          />
        </g>
        <g filter={`url(#${filterId6})`}>
          <path
            d="M38.8806 60.0162C39.2063 59.4529 39.0247 58.7394 38.4749 58.4224C37.9251 58.1055 37.2153 58.3052 36.8896 58.8685C36.5639 59.4318 36.7455 60.1454 37.2953 60.4623C37.8451 60.7792 38.5549 60.5795 38.8806 60.0162Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId7})`}>
          <path
            d="M35.4175 58.0161C36.2341 56.6044 38.0012 56.1194 39.3557 56.9002C40.7101 57.681 41.173 59.4515 40.3568 60.8634C39.5403 62.2753 37.7728 62.7609 36.4182 61.9802C35.0635 61.1993 34.601 59.4281 35.4175 58.0161Z"
            stroke={`url(#paint6_linear_${filterId6})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId8})`}>
          <path
            d="M38.8806 23.9205C39.2063 23.3572 39.0247 22.6437 38.4749 22.3267C37.9251 22.0098 37.2153 22.2095 36.8896 22.7728C36.5639 23.3361 36.7455 24.0496 37.2953 24.3666C37.8451 24.6835 38.5549 24.4838 38.8806 23.9205Z"
            fill={color}
          />
        </g>
        <g filter={`url(#${filterId9})`}>
          <path
            d="M35.4175 21.9241C36.2341 20.5124 38.0012 20.0273 39.3557 20.8081C40.7101 21.5889 41.173 23.3594 40.3568 24.7713C39.5403 26.1833 37.7728 26.6689 36.4182 25.8881C35.0635 25.1072 34.601 23.3361 35.4175 21.9241Z"
            stroke={`url(#paint7_linear_${filterId7})`}
            strokeOpacity="0.6"
            strokeWidth="0.902778"
          />
        </g>
        <g filter={`url(#${filterId10})`}>
          <path
            d="M40.4678 39.5647C44.1418 39.5647 47.1201 42.4826 47.1201 47.6965C47.1201 50.2091 46.4267 52.4914 45.2988 54.1829H35.6367C34.509 52.4914 33.8155 50.2088 33.8154 47.6965C33.8154 42.4832 36.7943 39.5654 40.4678 39.5647ZM51.3066 27.594C50.5623 30.5937 51.064 33.6633 52.9697 35.9719C54.766 38.1475 57.4617 39.2252 60.3496 39.2053C58.1034 40.8722 56.5095 43.2324 56.0039 46.0266C55.6057 48.2278 55.9346 50.4134 56.835 52.3899C54.6049 52.397 52.3221 52.9391 50.1826 53.9856C51.8988 51.8506 52.9277 49.1391 52.9277 46.1868C52.9274 39.3058 47.3487 33.7271 40.4678 33.7268C37.6698 33.7269 35.0866 34.649 33.0068 36.2063C35.0313 34.0906 36.2221 31.4939 36.5166 28.9114C38.3691 30.1387 40.7459 30.8575 43.3262 30.8088C46.5524 30.7478 49.4149 29.5018 51.3066 27.594ZM40.5322 35.5881C46.3385 35.5883 51.0449 40.2955 51.0449 46.1018C51.0448 49.2412 49.6673 52.0573 47.4853 53.9836C49.069 52.2852 50.04 50.0076 50.04 47.5022C50.04 42.2508 45.7826 37.9935 40.5312 37.9934C35.2797 37.9934 31.0225 42.2507 31.0225 47.5022C31.0225 50.0025 31.9885 52.2765 33.5664 53.9739C31.3912 52.0478 30.0187 49.2356 30.0186 46.1018C30.0186 40.2955 34.7259 35.5882 40.5322 35.5881ZM41.6445 47.0276C40.3836 46.7007 38.9619 47.9684 38.4697 49.8596C38.2457 50.7209 38.2559 51.5632 38.4492 52.2561C39.1519 51.7684 40.0389 51.3251 41.0391 50.9944C41.7653 50.7544 42.4791 50.5984 43.1426 50.5198C43.4032 48.8316 42.7877 47.3251 41.6445 47.0276ZM30.7246 39.1145C29.8125 40.0915 29.0903 41.3862 28.6758 42.927C28.2077 44.6669 28.2008 46.4664 28.5703 48.1106C27.8078 46.5758 27.5783 44.6314 28.0762 42.7805C28.5355 41.073 29.5218 39.7866 30.7246 39.1145ZM29.2012 38.3674C28.3504 39.4275 27.7068 40.786 27.3838 42.3596C27.0188 44.1382 27.1172 45.9322 27.5811 47.5364C26.7323 46.0782 26.39 44.1617 26.7783 42.2698C27.1363 40.5261 28.0435 39.1521 29.2012 38.3674ZM36.1309 44.7874C36.5952 44.8516 37.8684 45.3438 38.6758 46.8235L39.0723 46.6077L39.4687 46.3909C38.5116 44.6365 36.9747 43.9924 36.2539 43.8928L36.1309 44.7874ZM43.0518 42.3928C42.4053 42.7268 41.1706 43.8457 40.8525 45.8186L41.2978 45.8909L41.7441 45.9622C42.0124 44.2985 43.0483 43.4101 43.4648 43.1946L43.0518 42.3928Z"
            fill={`url(#paint8_linear_${filterId8})`}
          />
          <mask
            id={maskId}
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="25"
            y="26"
            width="37"
            height="30"
          >
            <path
              d="M61.619 26.594H25.619V55.594H61.619V26.594Z"
              fill="white"
            />
            <path
              d="M40.4678 39.5647C44.1418 39.5647 47.1201 42.4826 47.1201 47.6965C47.1201 50.2091 46.4267 52.4914 45.2988 54.1829H35.6367C34.509 52.4914 33.8155 50.2088 33.8154 47.6965C33.8154 42.4832 36.7943 39.5654 40.4678 39.5647ZM51.3066 27.594C50.5623 30.5937 51.064 33.6633 52.9697 35.9719C54.766 38.1475 57.4617 39.2252 60.3496 39.2053C58.1034 40.8722 56.5095 43.2324 56.0039 46.0266C55.6057 48.2278 55.9346 50.4134 56.835 52.3899C54.6049 52.397 52.3221 52.9391 50.1826 53.9856C51.8988 51.8506 52.9277 49.1391 52.9277 46.1868C52.9274 39.3058 47.3487 33.7271 40.4678 33.7268C37.6698 33.7269 35.0866 34.649 33.0068 36.2063C35.0313 34.0906 36.2221 31.4939 36.5166 28.9114C38.3691 30.1387 40.7459 30.8575 43.3262 30.8088C46.5524 30.7478 49.4149 29.5018 51.3066 27.594ZM40.5322 35.5881C46.3385 35.5883 51.0449 40.2955 51.0449 46.1018C51.0448 49.2412 49.6673 52.0573 47.4853 53.9836C49.069 52.2852 50.04 50.0076 50.04 47.5022C50.04 42.2508 45.7826 37.9935 40.5312 37.9934C35.2797 37.9934 31.0225 42.2507 31.0225 47.5022C31.0225 50.0025 31.9885 52.2765 33.5664 53.9739C31.3912 52.0478 30.0187 49.2356 30.0186 46.1018C30.0186 40.2955 34.7259 35.5882 40.5322 35.5881ZM41.6445 47.0276C40.3836 46.7007 38.9619 47.9684 38.4697 49.8596C38.2457 50.7209 38.2559 51.5632 38.4492 52.2561C39.1519 51.7684 40.0389 51.3251 41.0391 50.9944C41.7653 50.7544 42.4791 50.5984 43.1426 50.5198C43.4032 48.8316 42.7877 47.3251 41.6445 47.0276ZM30.7246 39.1145C29.8125 40.0915 29.0903 41.3862 28.6758 42.927C28.2077 44.6669 28.2008 46.4664 28.5703 48.1106C27.8078 46.5758 27.5783 44.6314 28.0762 42.7805C28.5355 41.073 29.5218 39.7866 30.7246 39.1145ZM29.2012 38.3674C28.3504 39.4275 27.7068 40.786 27.3838 42.3596C27.0188 44.1382 27.1172 45.9322 27.5811 47.5364C26.7323 46.0782 26.39 44.1617 26.7783 42.2698C27.1363 40.5261 28.0435 39.1521 29.2012 38.3674ZM36.1309 44.7874C36.5952 44.8516 37.8684 45.3438 38.6758 46.8235L39.0723 46.6077L39.4687 46.3909C38.5116 44.6365 36.9747 43.9924 36.2539 43.8928L36.1309 44.7874ZM43.0518 42.3928C42.4053 42.7268 41.1706 43.8457 40.8525 45.8186L41.2978 45.8909L41.7441 45.9622C42.0124 44.2985 43.0483 43.4101 43.4648 43.1946L43.0518 42.3928Z"
              fill="black"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M45.2988 54.1829V55.0856C45.6006 55.0856 45.8825 54.9348 46.0499 54.6837L45.2988 54.1829ZM35.6367 54.1829L34.8856 54.6836C35.053 54.9348 35.3349 55.0856 35.6367 55.0856V54.1829ZM51.3066 27.594L52.1828 27.8114C52.2807 27.4172 52.1032 27.0061 51.7491 26.8071C51.395 26.608 50.9516 26.6699 50.6656 26.9583L51.3066 27.594ZM60.3496 39.2053L60.8876 39.9303C61.2012 39.6975 61.3296 39.2895 61.2058 38.9191C61.082 38.5486 60.734 38.2999 60.3434 38.3026L60.3496 39.2053ZM56.835 52.3899L56.8378 53.2927C57.1444 53.2917 57.4295 53.1352 57.595 52.8771C57.7604 52.619 57.7836 52.2946 57.6565 52.0156L56.835 52.3899ZM50.1826 53.9856L49.479 53.42C49.214 53.7496 49.2134 54.2189 49.4774 54.5493C49.7415 54.8796 50.1994 54.9824 50.5793 54.7966L50.1826 53.9856ZM33.0068 36.2063L32.3546 35.5822C32.0298 35.9216 32.0196 36.4534 32.3312 36.805C32.6427 37.1566 33.1719 37.2105 33.5479 36.9289L33.0068 36.2063ZM36.5166 28.9114L37.0152 28.1588C36.7533 27.9853 36.4201 27.9604 36.1353 28.0931C35.8505 28.2258 35.6552 28.497 35.6196 28.8091L36.5166 28.9114ZM47.4853 53.9836L46.8251 53.368C46.4967 53.7202 46.5025 54.2682 46.8384 54.6133C47.1742 54.9584 47.7218 54.9791 48.0828 54.6604L47.4853 53.9836ZM33.5664 53.9739L32.9679 54.6498C33.3285 54.969 33.8761 54.9491 34.2124 54.6045C34.5488 54.2599 34.5555 53.7119 34.2276 53.3592L33.5664 53.9739ZM38.4492 52.2561L37.5796 52.4987C37.6582 52.7802 37.8681 53.0063 38.143 53.1054C38.418 53.2045 38.7239 53.1644 38.964 52.9977L38.4492 52.2561ZM43.1426 50.5198L43.2488 51.4163C43.6515 51.3686 43.9729 51.0582 44.0348 50.6575L43.1426 50.5198ZM30.7246 39.1145L31.3845 39.7306C31.688 39.4055 31.7095 38.9078 31.4352 38.5577C31.1609 38.2076 30.6725 38.1095 30.2842 38.3264L30.7246 39.1145ZM28.5703 48.1106L27.7618 48.5123C27.9651 48.9214 28.4418 49.1142 28.8723 48.9614C29.3028 48.8086 29.5513 48.3583 29.4511 47.9126L28.5703 48.1106ZM29.2012 38.3674L29.9052 38.9325C30.1848 38.5841 30.1676 38.0837 29.8647 37.7553C29.5619 37.427 29.0644 37.3695 28.6946 37.6201L29.2012 38.3674ZM27.5811 47.5364L26.8008 47.9905C27.0301 48.3845 27.5171 48.5457 27.9362 48.3664C28.3552 48.1871 28.5749 47.7235 28.4483 47.2856L27.5811 47.5364ZM36.1309 44.7874L35.2365 44.6643C35.1686 45.158 35.5135 45.6133 36.007 45.6816L36.1309 44.7874ZM38.6758 46.8235L37.8833 47.2559C38.1219 47.6933 38.6698 47.8546 39.1074 47.6164L38.6758 46.8235ZM39.0723 46.6077L39.5039 47.4006L39.5054 47.3998L39.0723 46.6077ZM39.4687 46.3909L39.9019 47.183C40.339 46.9439 40.4999 46.3959 40.2612 45.9585L39.4687 46.3909ZM36.2539 43.8928L36.3775 42.9985C36.1402 42.9658 35.8996 43.0286 35.7087 43.1733C35.5178 43.3179 35.3922 43.5325 35.3595 43.7698L36.2539 43.8928ZM43.0518 42.3928L43.8543 41.9793C43.7445 41.7663 43.5546 41.6057 43.3264 41.5328C43.0981 41.4599 42.8502 41.4808 42.6373 41.5908L43.0518 42.3928ZM40.8525 45.8186L39.9613 45.6749C39.882 46.1668 40.2161 46.6299 40.7079 46.7097L40.8525 45.8186ZM41.2978 45.8909L41.1532 46.782L41.1554 46.7823L41.2978 45.8909ZM41.7441 45.9622L41.6017 46.8536C42.0936 46.9322 42.5561 46.5976 42.6354 46.1059L41.7441 45.9622Z"
              fill={`url(#paint9_linear_${filterId9})`}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CustomMedalIcon: React.FC<CustomIconProps> = ({
  color,
  size = 42,
  className = "",
}) => {
  // Helper function to calculate darker shade for the star
  const getDarkerShade = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Make it significantly darker for the star (similar to #033326)
    const darkerR = Math.max(0, Math.floor(r * 0.1));
    const darkerG = Math.max(0, Math.floor(g * 0.3));
    const darkerB = Math.max(0, Math.floor(b * 0.2));

    return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
      .toString(16)
      .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
  };

  const darkerColor = getDarkerShade(color);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      className={className}
    >
      {/* Left ribbon */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.1657 5.1543L28.6661 16.9589L28.649 16.9418C26.9406 15.2335 24.6687 14.0889 22.1403 13.7814L27.624 5.1543H36.1657Z"
        fill={color}
      />

      {/* Right ribbon */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4427 13.7814C16.9144 14.0889 14.6424 15.2335 12.9341 16.9418L12.917 16.9589L5.41736 5.1543H13.959L19.4427 13.7814Z"
        fill={color}
      />

      {/* Medal background circle with opacity */}
      <path
        opacity="0.6"
        d="M20.7934 35.9036C26.9261 35.9036 31.8976 30.9321 31.8976 24.7995C31.8976 18.6668 26.9261 13.6953 20.7934 13.6953C14.6608 13.6953 9.68927 18.6668 9.68927 24.7995C9.68927 30.9321 14.6608 35.9036 20.7934 35.9036Z"
        fill={color}
      />

      {/* Star in center */}
      <path
        d="M21.3392 20.2981L22.4445 22.5292C22.5282 22.6966 22.6887 22.8128 22.8732 22.8401L25.4255 23.2091C25.8936 23.2774 26.0797 23.8514 25.7414 24.1794L23.8965 25.9698C23.7615 26.1013 23.7001 26.2892 23.7326 26.4737L24.1545 28.9252C24.2399 29.4223 23.7172 29.8015 23.2696 29.5675L21.0556 28.4093C20.8899 28.3221 20.6916 28.3221 20.5259 28.4093L18.3138 29.5675C17.8662 29.8015 17.3416 29.4223 17.4271 28.9252L17.8489 26.4771C17.8814 26.2926 17.82 26.103 17.685 25.9732L15.8401 24.1829C15.5018 23.8531 15.6879 23.2792 16.156 23.2125L18.7083 22.8435C18.8945 22.8162 19.0551 22.7 19.1371 22.5326L20.2423 20.3015C20.4678 19.8454 21.1137 19.8454 21.3392 20.2981Z"
        fill={darkerColor}
      />
    </svg>
  );
};
