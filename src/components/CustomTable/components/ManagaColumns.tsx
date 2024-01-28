import { Paper, FormGroup, FormControlLabel, Switch, Button } from "@mui/material"
import { Container } from "@mui/system"

const ManageColumns: React.FC<any> = ({headerCells}) => {
    return (
        <Paper sx={{position: "relative", bottom: "538px", left: "1292px", gap: "3px", maxWidth: "242px", maxHeight:"440px", paddingTop: 0, paddingRight: 2, paddingBottom: 0, paddingLeft: 2}}>
            <FormGroup>
                {
                   headerCells.map((cell: any) => {
                    return (
                        <FormControlLabel control={<Switch defaultChecked/>} label={cell.label}/>
                    )
                   })
                }
            </FormGroup>
            <Container disableGutters sx={{display: "flex", justifyContent: "space-evenly"}}>
                <Button>HIDE ALL</Button>
                <Button>SHOW ALL</Button>
            </Container>
        </Paper>
    )
}