'use client';

import { createTheme, ThemeProvider} from "@mui/material/styles";
import { useState } from 'react'
import { light, dark } from '../app/styles'

declare module "@mui/material/styles" {
  export interface Palette {
    taxi: Palette["primary"];
    body: Palette["primary"];
    crime: Palette["primary"];
    drama: Palette["primary"];
    comedy: Palette["primary"];
    scifi: Palette["primary"];
  }

  // allow configuration using `createTheme`
  export interface PaletteOptions {
    taxi?: PaletteOptions["primary"];
    crime?: PaletteOptions["primary"];
    drama?: PaletteOptions["primary"];
    comedy?: PaletteOptions["primary"];
    scifi?: PaletteOptions["primary"];
    body?: PaletteOptions["primary"];

    

  }
}

declare module '@mui/material/SvgIcon' {
  export interface SvgIconPropsColorOverrides {
    taxi: true;
  }
}

export const getTheme = () => {
  const [theme, setTheme] = useState(true);
  const appliedTheme = createTheme(theme ? light : dark);
  return { theme, setTheme, appliedTheme}
}