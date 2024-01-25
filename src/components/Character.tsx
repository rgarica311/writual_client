import { DetailsOutlined } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Container, Divider, Drawer, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomTabPanel } from './CustomTabPanel';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useTheme from '@mui/system/useTheme';

interface DetailProps {
    label: string
    value: string
}

const Detail: React.FC<DetailProps> = ({label, value})  => {
    return (
        <>
            {
                label != "version" && (
                    <Container sx={{display: "flex",  justifyContent: "space-evenly"}}>
                        <Typography sx={{flex: 1}}>{label}</Typography>
                        <Typography sx={{flex: 1}}>{value}</Typography>
                    </Container>
                )
            }
        </>
       
        
    )
}
export const Character: React.FC<any> = ({name, details}) => {
    const [version, setVersion] = useState(1)
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();


    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setValue(newValue);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
      };

      const handleDrawerClose = () => {
        setOpen(false);
      };
    
    const detail = details.find((detail: any) => detail.version === version)
    detail.url  = "https://www.broadwayworld.com/ezoimgfmt/cloudimages.broadwayworld.com/headshots/452956sm.jpg?dt=42352886&ezimgfmt=ng%3Awebp%2Fngcb36%2Frs%3Adevice%2Frscb37-2"
    
    return (
            <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "196px", minHeight: "246px"}}>

                <Box  sx={{ display: "flex", flexDirection: "column", justifyContent:"space-between", borderRadius: "10px", backgroundColor: theme.palette.secondary.main, padding: 2, height: "100%", width: "100%"}}>
                    {
                        detail.url   
                            ?  <Box sx={{borderRadius: 2, backgroundSize:  "cover", backgroundRepeat: "no-repeat", minWidth: "150px", minHeight: "150px", backgroundImage: `url(${detail.url})`}}/>
                            :  <PersonIcon sx={{minWidth: "150px", minHeight: "150px"}} />
                    }
                    <Container disableGutters maxWidth={false} sx={{ display: "flex"}}>
                        <Container disableGutters maxWidth={false} sx={{flexDirection: "column", display: "flex"}}>
                            <Typography sx={{color: theme.palette.secondary.contrastText}}>{name}</Typography>

                            <Container disableGutters maxWidth={false}  sx={{display: "flex"}}>
                                <Typography sx={{color: theme.palette.secondary.contrastText, marginRight: "4px"}}>{detail.gender}</Typography>
                                <Typography sx={{color: theme.palette.secondary.contrastText}}>{detail.age}</Typography>
                            </Container>
                            
                        </Container>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                            ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                    </Container>
                </Box>
               

                <Box sx={{ maxWidth: "300px", height: "100%"}}>
                    <Tabs sx={{width: "100%"}} value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{width: "100px"}} label="Bio" {...a11yProps(0)} />
                        <Tab sx={{width: "100px"}} label="Want" {...a11yProps(1)} />
                        <Tab sx={{width: "100px"}} label="Need" {...a11yProps(2)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        {detail.bio}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {detail.want}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        {detail.need}
                    </CustomTabPanel>
                    
                </Box>
                
                     
            </Paper>

    )
}