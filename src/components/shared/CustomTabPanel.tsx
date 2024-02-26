import { Box } from '@mui/material';
import { TabPanelProps } from 'interfaces';

export const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        style={{height: "calc(100% - 48px)"}}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tab-panel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box component="form" sx={{ p: 0, height: "100%"}}>
            {children}
          </Box>
        )}
      </div>
    );
}

export const VerticalTabPanel = (props: TabPanelProps) =>{
  const { children, value, index, ...other } = props;

  return (
    <div
     style={{width: "100%"}}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tab-panel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ overflowY: "scroll", flexWrap: "wrap", p: 3, width: "100%", height: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          {children}
        </Box>
      )}
    </div>
  );
}