/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: '1440px',
      },
      colors: {
        white: '#FFFCFC',
        warm_white: '#FFFCFC',
        bright_blue: '#06A1DA',
        mid_blue: '#06668C',
        dark_blue: '#070054',
        orange: '#ED5E0B',
        yellow: '#FEB228',
        light_yellow: '#FFEDCC',
        light_blue_1: '#F0FBFF',
        light_blue_2: '#CDF1FE',
        error: '#D90000',
        black: '#151522',
        gray_1: '#666666',
        gray_2: '#999999',
        gray_3: '#E4E4E4',
        gray_4: '#F3F3F3',
      },
      fontFamily: {
        primary: ['Barlow Semi Condensed', 'sans-serif'],
        secondary: ['Barlow Condensed', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        bold: '700',
        semi_bold: '600',
        medium: '500',
        regular: '400',
      },
      fontSize: {
        scale_1: '12px',
        scale_2: '14px',
        scale_3: '16px',
        scale_4: '18px',
        scale_5: '24px',
        scale_6: '28px',
        scale_7: '32px',
        scale_8: '44px',
        scale_9: '52px',
        scale_10: '56px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'page-sm': '52px',
        'screen': '24px',
        'card-lg': '68px',
        'card-xl': '80px',
      },
      width: {
        'card-desktop': '435px',
      },
      plugins: [],
    }
  }
}