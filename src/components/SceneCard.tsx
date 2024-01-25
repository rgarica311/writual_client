import React from 'react' 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { sceneCardStyle } from 'styles';
import { CardActionArea, CardActions, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const SceneCard: React.FC<any> = () =>  {

    const [version, setVersion] = React.useState('V1');

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value as string);
    };

    
    return (
        <Card  sx={sceneCardStyle.card}>
            <CardHeader
                title={
                <Typography>INT. HOUSE - DAY</Typography>
            }
            action={
                <Stack direction="row">

                
                    <FormControl size='small' fullWidth sx={{width: "120px"}}>
                        <InputLabel id="demo-simple-select-label">Version</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={version}
                        label="Version"
                        onChange={handleChange}
                        >
                            <MenuItem value="V1">Version 1</MenuItem>
                            <MenuItem value="V2">Version 2</MenuItem>
                            <MenuItem value="V3">Version 3</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                
            }
            />
            <CardContent sx={{height: "155px"}}>
                <Typography>Scene</Typography>
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