import { css } from '@emotion/react';

// fontSize 정의
const fontSizeLg = '1.375rem'; // 22px
const fontSizeMd = '1rem'; // 16px
const fontSizeSm = '0.875rem'; // 14px
const fontSizeXs = '0.75rem'; // 12px
const fontSizeXxs = '0.625rem'; // 10px

//color 정의
const colorWhite = '#ffffff';
const colorButterCap = '#F49D1A';
const colorCrusta = '#FF8533';
const colorPumpkin = '#FF6F0F';
const colorMercury = '#e5e5e5';
const colorShark = '#2B2D31';
const colorRangoonGreen = '#1B1A17';
const colorHarlequin = '#2ACC02';
const colorOrient = '#02607E';
const colorWildsand = '#F5F5F5';

export const GlobalStyle = css`
  :root {
    --font-size-lg: ${fontSizeLg};
    --font-size-md: ${fontSizeMd};
    --font-size-sm: ${fontSizeSm};
    --font-size-xs: ${fontSizeXs};
    --font-size-xxs: ${fontSizeXxs};

    --color-white: ${colorWhite};
    --color-buttercap: ${colorButterCap};
    --color-crusta: ${colorCrusta};
    --color-pumpkin: ${colorPumpkin};
    --color-mercury: ${colorMercury};
    --color-shark: ${colorShark};
    --color-rangoongreen: ${colorRangoonGreen};
    --color-harlequin: ${colorHarlequin};
    --color-orient: ${colorOrient};
    --color-wildsand: ${colorWildsand};
  }
`;
