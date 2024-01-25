import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    Button,
    TableContainer,
    Table,
    TableFooter,
    TablePagination,
    Paper,
    Container,
    IconButton, Typography, FormGroup, FormControlLabel, Switch, FormLabel, Box, Chip, FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent, Autocomplete, Modal, Popover, Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation'

import { request, gql, GraphQLClient } from "graphql-request";
import { CustomTableHead, CustomTableBody } from './';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { identifierToKeywordKind } from 'typescript';

interface CustomTableProps {
    label: string
    columnState: any
    columnStateUpdate: Function
    handleHideAll: Function
    handleShowAll: Function
    handleReset: Function
    defaultSortColumn: string
    setAddProject: Function
    headerCells?: any
    rows?: any
    mappedData?: any
    outgoingTransmission?: Boolean
    incomingResponse?: Boolean
    headerButtonHandler?: Function
    headerButtonText?: string
    headerButtonIcon?: any
    headerButtonAriaLabel?: string
    handleTableItemSelect?: Function
    children?: any
}

const buttonStyle = { 
    paddingLeft: "8px", 
    paddingTop: "11px", 
    paddingRight: "8px", 
    paddingBottom: "11px",
    minWidth: "189px", 
    height: "42px" 
}

const searchStyle = {
    height: "56px",
    width: "400px"
}

const tableTopStyle = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    height: "88px",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 2
}

const iconContainer = {
    height: "40px",
    width: "40px",
    padding: "8px"
}

const tableTopButtons = {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
}

const printButtonStyle = {
    width: "80%",
    height: "80%"
}

type Order = 'asc' | 'desc';

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

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


const projectReducer = (state, action) => {
    if(action.type === "UPDATE_TITLE")  {
        return {
            ...state, 
            title: action.value
        }
    }
}

const endpoint = `http://localhost:4000`

export const CustomTable: React.FC<CustomTableProps> = ({ 
    label, 
    headerCells, 
    rows, 
    defaultSortColumn, 
    handleHideAll,
    handleShowAll,
    handleReset,
    columnStateUpdate,
    columnState,
    setAddProject,
     }) => {
    const theme = useTheme()
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState(defaultSortColumn);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [currentPage, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [sortOrder, setSortOrder] = React.useState<any>('desc');
    const [currentSortedColumn, setCurrentSortedColumn] = React.useState(defaultSortColumn);
    const [currentPageSize, setRowsPerPage] = React.useState(10);
    const [openSort, setOpenSort] = React.useState(false)
    const [manageColumns, setOpenManageColumns] = React.useState(false)
    const [currentCell, setCurrentCell] = React.useState("")
    const [disablePrint, setDisablePrint] = React.useState(true)
    const [ currentRow, setCurrentRow ] = React.useState()
    const [searchValue, setSearchValue] = React.useState<string[]>([]);
    const searchCategories = headerCells.map((cell: any) => {return cell.label})
    const [edit, setEditProject]  =  React.useState(false)
    const [currentProject, setCurrentProject] = React.useState("") 
    const [state, dispatch] = useReducer(projectReducer, rows)
    const [project, setProject] = React.useState<any>({})
    const [hoverLabel, setHoverLabel] = React.useState("")
    const [mcAnchorEl, setMCAnchorEl] = React.useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = React.useState(null)
    const [showAll, setShowAll] = useState(true)

    const PROJECT_TITLE_MUTAION = gql`
    {
        mutation UpdateProject(project: any) {
            updateProject(project: {input: $project})
            id
            title
        }
    }`;

const graphQLClient = new GraphQLClient(endpoint, {
   
  })

    /*useEffect(()  => {
        const variables = {
            project
        }

        const updateProject = async ()  => {
            const data = await graphQLClient.request(PROJECT_TITLE_MUTAION, variables);
            console.log('update data: ', data)
        }

        updateProject()

    }, [project])*/

    const router = useRouter()

    console.log('theme:', theme)

    const openManageColumns = Boolean(mcAnchorEl);
    const manageColumnsId = openManageColumns ? 'manage-columns-popover' : undefined;
    const openFilter = Boolean(filterAnchorEl);
    const filterId = openFilter ? 'filter-status-popover' : undefined;

    const tableTopButtons = {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        backgroundColor: theme.palette.body.main,
        marginBottom: "2px"
    }

    const searchOperators: any = [
        "Contains", 
        "Equals", 
        "Starts with", 
        "Ends with", 
        "Is Empty", 
        "Is any of", 
        "And / Or"
    ]

    const descendingComparator = (a: any, b: any, orderBy: any) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    const getComparator = ( order: any, orderBy: any ) => {
        return order === 'desc'
          ? (a: any, b: any) => descendingComparator(a, b, orderBy)
          : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array: any, comparator: (a: any, b: any) => number) => {
        //console.log('edit stableSort array: ', array)
        const stabilizedThis = array?.map((el: any, index: any) => [el, index] as [any, number]);
        stabilizedThis?.sort((a: any, b: any) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        //console.log('edit stabilizedThis?.map((el: any) => el[0]): ', stabilizedThis?.map((el: any) => el[0]))
        return stabilizedThis?.map((el: any) => el[0]);
      }

    const visibleRows: any = React.useMemo(() => 
        //console.log('edit visibleRows rows: ', rows)
        stableSort(rows, getComparator(order, orderBy)).slice(
            currentPage * currentPageSize,
            currentPage * currentPageSize + currentPageSize,
        )
    ,
    [state, order, orderBy, currentPage, currentPageSize, rows],
    );

    //console.log('edit visible rows: ', visibleRows)

    
    const tableHeadCellStyle = {
        padding: 2,
        maxHeight: "56px",
        width: "223px",
        backgroundColor: `${theme.palette.secondary.main}`,
        color: `${theme.palette.secondary.contrastText}`
        //flex: 1, 
    }


    const sortOptionsIconsStyle = {
        width: "40px",
        height: "24px",
        paddingRight: "16px"
    }

    const containerStyle = { borderRadius: "10px", minHeight:"calc(100vh - 200px)", boxShadow: "none", gap: 2}
    
    const tableHeadStyle = { 
        paddingLeft: 1, 
        //backgroundColor: 'white', 
        height: "56px" 
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('debug currentPage handlePage change setting newPage to: ', newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('debug currentPage handeChangeRowsPerPage setting 0')
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && rows) {
            const newSelected = rows.map((row: any) => row.transactionNumber);
            setSelected(newSelected);
            return;
        }
        setSelected([]);         
    }

    const isSelected = (tcn: string) => selected.indexOf(tcn) !== -1;

    const handleOpenSort = (e: any, dataIndex: string) => {
        console.log(`custom table ${label} handleOpenSort currentCell: `, currentCell)
        setOpenSort(!openSort)
        setCurrentCell(dataIndex)
    }

    const handleOpenManageColumns = () => {
        setOpenManageColumns(true)
    }

    const handleResponseType = (type:string) => {
        switch(type.toLowerCase()){
          case 'y':
            return 'Hit';
          case 'n':
            return 'No hit';
          case 'errt':
            return 'ERRT-Error';
        }
      }
    const handleRecordClick  = (e: any, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/project/${id}`)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
      ) => {
        console.log(`custom table ${label} orderBy ${orderBy} order ${order}`)
        const isAsc = orderBy === property && order === 'asc';
        console.log(`custom table ${label} isAsc ${isAsc}`)
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
    const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        console.log(`custom table createSortHandler property ${property} e: `, event)
        handleRequestSort(event, property);
    };

    const handleSearchValue = (e: any) => {
        console.log(`custom table ${label} handleSearchValue: `, e.target.value)
        //setValue(e.target.value)
    }

    const handleUpdateProject = (e, project)  =>  {
        console.log('handleUpdateProject: ', project)
        e.preventDefault()
        e.stopPropagation()
        console.log('update project: ', project)
        setProject(project)
    };

    const handleEditProject =  (e: any, id: string) =>  {
        console.log('handleEditProject id: ', id)
        setEditProject(true)
        //handleCloseActions(e)
        setCurrentProject(currentProject)
    }

    const handleOpenFilter = (e: any) => {
        e.stopPropagation()
        setFilterAnchorEl(e.currentTarget)
    }

    const handleCloseFilter = (e: any) => {
        e.stopPropagation()
        setFilterAnchorEl(null)
    }

    //console.log('debug theme: ', mode)
    //console.log(`debug edit visibleRows ${JSON.stringify(visibleRows, null, 2)}`)
    return (
        <Paper elevation={0} sx={{ backgroundColor: theme.palette.body.main, boxShadow: "none", padding: 1, maxHeight: "calc(100% - 40px)", display: "flex", flexDirection: "column", width: '100%'}}>
    
            <Container disableGutters maxWidth={false} sx={tableTopButtons}>
                <Container disableGutters sx={{display: "flex", flexDirection: "row", alignItems: "center", margin: 0}}>
                <Typography variant="h6">PROJECTS</Typography>
                <Button onClick={() => setAddProject(true)} 
                            color="primary" 
                            variant='text' 
                            sx={buttonStyle} 
                            startIcon={<AddCircleOutlineIcon />}>
                            Create Project
                        </Button>
                </Container>
                
                <Container disableGutters maxWidth={false}  sx={{width: "max-content", margin: 0}}>
                   
                    <IconButton sx={iconContainer}>
                        <SettingsIcon aria-label="Settings" />
                    </IconButton>
                </Container>
               

            </Container>
        
            <TableContainer sx={containerStyle} component={Paper}>
                <Table sx={{tableLayout:  "fixed"}} stickyHeader aria-label={label}>
                    <CustomTableHead
                        hoverLabel={hoverLabel}
                        setHoverLabel={setHoverLabel}
                        handleOpenFilter={handleOpenFilter}
                        handleCloseFilter={handleCloseFilter}
                        filterId={filterId}
                        openFilter={openFilter}
                        filterAnchorEl={filterAnchorEl}
                        columnStateUpdate={columnStateUpdate}
                        showAll={showAll}
                        handleHideAll={handleHideAll}
                        handleShowAll={handleShowAll}
                        handleReset={handleReset}
                        columnState={columnState}
                        label={label}
                        headerCells={headerCells}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        handleInternalSelectAll={handleSelectAll}
                        //handleSelectAll={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={visibleRows?.length} />

                    <CustomTableBody
                        visibleRows={visibleRows}
                        headerCells={headerCells}
                        edit={edit}
                        currentProject={currentProject}
                        project={project}
                        isSelected={isSelected}
                        handleUpdateProject={handleUpdateProject}
                        handleRecordClick={handleRecordClick}
                        setCurrentProject={setCurrentProject}
                        //handleEditProject={handleEditProject}
                        

                    />
                        

                    
                    </Table>
            </TableContainer>
                    <TableFooter sx={{backgroundColor:"white", display: "flex", justifyContent: "flex-end"}}>
                            <TablePagination
                                                sx={{minHeight: "60px"}}

                                rowsPerPageOptions={[5, 10, 25]}
                                count={rows?.length}
                                rowsPerPage={currentPageSize}
                                page={currentPage}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'mappedData per currentPage',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                    </TableFooter>
                
        </Paper>

    )
}
