export const tableBodyStyle = {
    cell: {
        paddingTop: "16px",
        paddingRight: "10px",
        paddingBottom: "16px",
        paddingLeft: "10px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        //display: "flex",
        //justifyContSent: "center",
        
    }, 
    row: { 
        cursor: "pointer", '&:last-child td, &:last-child th': { 
            border: 0 
        }
    },
    container: { 
        minHeight: "70px", 
        maxWidth: "100%", 
        display: "flex", 
        alignItems: "center" 
    },
    genreChip: {
        borderRadius: 5, 
        //xwidth: "max-content", 
        height:  "max-content", 
        paddingLeft: "12px", 
        paddingRight: "12px", 
        paddingTop: "1px", 
        paddingBottom: "1px"
    },
    text: {
        overflow: "hidden",
        whiteSace: "nowrap",
        textOverflow: "ellipsis",
        cursor: "pointer"
    }
}