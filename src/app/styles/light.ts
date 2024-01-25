import colors from './light.module.scss'
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

export const light = {
    palette: {
      taxi:  {
        main:  colors.taxi,
        light: alpha(colors.taxi, 0.5),
        dark:alpha(colors.taxi, 0.9),
        contrastText: getContrastRatio(colors.taxi, '#fff') > 4.5 ? '#fff' : '#111',
      },
      scifi:  {
        main:  colors.scifi,
        light: alpha(colors.scifi, 0.5),
        dark:alpha(colors.scifi, 0.9),
        contrastText: getContrastRatio(colors.scifi, '#fff') > 4.5 ? '#fff' : '#111',
      },
      crime:  {
        main:  colors.crime,
        light: alpha(colors.crime, 0.5),
        dark:alpha(colors.crime, 0.9),
        contrastText: getContrastRatio(colors.crime, '#fff') > 4.5 ? '#fff' : '#111',
      },
      drama:  {
        main:  colors.drama,
        light: alpha(colors.drama, 0.5),
        dark:alpha(colors.drama, 0.9),
        contrastText: getContrastRatio(colors.drama, '#fff') > 4.5 ? '#fff' : '#111',
      },
      comedy:  {
        main:  colors.comedy,
        light: alpha(colors.comedy, 0.5),
        dark:alpha(colors.comedy, 0.9),
        contrastText: getContrastRatio(colors.comedy, '#fff') > 4.5 ? '#fff' : '#111',
      },
      body: {
        main:  colors.background,
        light: alpha(colors.background, 0.5),
        dark:alpha(colors.background, 0.9),
        contrastText: getContrastRatio(colors.background, '#fff') > 4.5 ? '#fff' : '#111',
      },
      primary: {
        main: colors.primaryMain,
        contrastText: colors.white
      },
      secondary: {
        main: colors.secondaryMain
      },
    },
    components: {
      // Name of the component
      MuiTableHead: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: colors.secondaryMain,
          },
        },
      },
      SvgIconPropsColorOverrides:  {
        color: "taxi"
      },

    },
    typography:  {
      fontFamily: `"Lato", sans-serif`, 
      fontSize: 14,
      fontWeightLight: "300",
      fontWeightRegular: "400",
      fontWeightMedium: "700",
      fontWeightBold: "900",
      h6: {
        fontFamily: `"Lato", sans-serif`, 
        fontSize: 21,
        fontWeight: 400,
        lineHeight: "28.8px", 
        letterSpacing: "1.8px"
      }
    },
  };