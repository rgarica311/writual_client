export const projectStyles = {
    tableTopButtons: {
        display: "flex",
        flexDirection: "row",
        height: "56px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        margin:   0
        //backgroundColor: theme.palette.background.paper
    },

    sceneContainer: {
        margin:  0,
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        //sjustifyContent: "space-between",
        flexWrap:  "wrap",
        padding: 0,
    
    },
    tabs: { 
        "&.MuiTabs-flexContainerVertical": {
            minHeight: "30px",
            display: "flex", 
            flexDirection:"row", 
            flexWrap: "wrap",
            justifyContent: "space-evenly" 
        },
       
    },

    tab: {
        maxHeight: "30px",
        padding: 0,
        "&.MuiTab-root": {
            minHeight: "30px"
        }
    }
}