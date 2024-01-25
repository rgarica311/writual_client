"use client"

import * as React from 'react';
import type { AppProps } from 'next/app'
import { NavBar } from '../components';
import { Button, Container } from '@mui/material';
import { getTheme } from '../themes/themes'
import { ThemeProvider} from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Resizable } from 're-resizable';
import './styles/global.scss'
import '@fontsource/lato/100.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'
const client = new QueryClient();

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    const { theme, setTheme, appliedTheme } = getTheme()

    return (
      <html lang="en">
        <body>
          <QueryClientProvider client={client}>
              <ThemeProvider theme={appliedTheme}>
                 <NavBar/>
                  <Container maxWidth={false} disableGutters sx={{ resize:"vertical", margin:"0px", width: "100%"}}>
                      {children}
                  </Container>
               
              </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
       
       
    )
  }