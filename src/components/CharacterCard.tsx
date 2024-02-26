import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Container, Tab, Tabs, useTheme } from '@mui/material';
import { CustomTabPanel } from './CustomTabPanel';
import { OnDeviceTrainingOutlined } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const CharacterCard: React.FC<any> = ({name, details, id}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [version, setVersion] = React.useState(1)
  const [ currentId,  setCurrentId ] =  React.useState<number  | undefined>()

  useEffect(() => {
    if(!expanded)  {
      setCurrentId(undefined)
    }
  }, [expanded])

  const handleExpandClick = () => {
      setExpanded(!expanded);
  }

  const detail = details.find((detail: any) => detail.version === version)
  console.log('detail: ', detail)
  detail.url  = "https://www.broadwayworld.com/ezoimgfmt/cloudimages.broadwayworld.com/headshots/452956sm.jpg?dt=42352886&ezimgfmt=ng%3Awebp%2Fngcb36%2Frs%3Adevice%2Frscb37-2"

  React.useEffect(() => {
    console.log(`${currentId} === ${id}: ${currentId === id}`)
  }, [currentId])

  return (
  
      <Card sx={{ maxWidth: 345, maxHeight: currentId === id ? "max-content" : "375px"  }}>
        <CardMedia
          component="img"
          height="300"
          image={detail.url}
          alt="Paella dish"
        />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <>
                <ExpandMore
                  expand={expanded}
                  onClick={() => { setCurrentId(id); handleExpandClick()}}
                  aria-expanded={expanded}
                  aria-label="show more">
                  <ExpandMoreIcon />
                </ExpandMore>
               
              </>
              
            }
            title={name + " " +  detail.age  + " "  + detail.gender }
            subheader={`Version:  ${detail.version}`}
          />

        {
          currentId === id && (
            <CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph>Character Details:</Typography>
                <Box sx={{ maxWidth: "300px"}}>
                  <Typography paragraph>{detail.bio}</Typography>
                  <Typography>Want: {detail.want}</Typography>
                  <Typography>Need: {detail.need}</Typography>
                </Box>
            </Collapse>
            </CardContent>
            
          )

        }

      </Card>

  );
}
