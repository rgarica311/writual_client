import React from "react"
import { Paper } from '@mui/material';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import { useTheme } from '@mui/material/styles';

export const Progress: React.FC<any> =  ({characters, scenes, treatment}) => {
    console.log(`progress characters: ${characters} scenes: ${scenes} treatment: ${treatment}`)
    const theme = useTheme()

    return (
      <Paper sx={{boxShadow: "none", display: "flex", width: "100%", justifyContent: "space-between"}}>
        <PeopleAltTwoToneIcon color="taxi"/>
        <TheatersTwoToneIcon  sx={{ color: theme.palette.scifi.main}}/>
        <ArticleTwoToneIcon sx={{ color: theme.palette.drama.light}}/>
      </Paper>
    )
  }