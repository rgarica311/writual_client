import React from 'react' 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { sceneCardStyle } from 'styles';
import { CardActions, Container, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TagIcon from '@mui/icons-material/Tag';

const SceneElementWrapper: React.FC<any> = ({children}) => {
    return (
        <Container disableGutters sx={{ padding: 1, height: "calc(100% - 64px)", display: "flex", flexDirection: "column", justifyContent:"space-around", width: "100%"}}>
            {children}
        </Container>
    )
}

export const SceneCard: React.FC<any> = ({number, versions}) =>  {

    const [version, setVersion] = React.useState("0");

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    
    return (
        <Card  sx={sceneCardStyle.card}>
            <CardHeader
                title={
                    <Typography>INT. HOUSE - DAY</Typography>
                }
            action={
                <Stack direction="row">

                    <Container sx={{width: "auto", display: "flex", alignItems: "center"}}>
                        <TagIcon sx={{fontSize: "20px"}}/>
                        <Typography sx={{fontSize: "20px"}}>{number}</Typography>
                    </Container>
                   
                    <FormControl size='small' fullWidth sx={{width: "120px"}}>
                        <InputLabel id="demo-simple-select-label">Version</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={version}
                        label="Version"
                        onChange={handleChange}
                        >
                            {
                                versions.map((el: any, index: number) => {
                                    return (
                                        <MenuItem value={index.toString()}>{"Version " + el.version}</MenuItem>

                                    )
                                })
                            }
                          
                        </Select>
                    </FormControl>
                </Stack>
                
            }
            />
            <CardContent sx={{height: "100%", padding: 0}}>
                <SceneElementWrapper>
                    <Typography>Thesis: {versions[parseInt(version)].thesis}</Typography>
                    <Typography>Antithesis: {versions[parseInt(version)].antithesis}</Typography>
                    <Typography>Synthesis: {versions[parseInt(version)].synthesis}</Typography>
                </SceneElementWrapper>
                
            </CardContent>
            <CardActions>
                <Tooltip title="Edit Scene">
                <IconButton  sx={{marginLeft: "auto"}}>
                    <EditIcon  />
                </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}