'use client';

import React, { useReducer, useState } from 'react';
import {
    Button,
    TableContainer,
    Table,
    TableFooter,
    TablePagination,
    Paper,
    Container,
    IconButton, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation'
import { CustomTableHead, CustomTableBody } from './';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TableProps, Data } from 'interfaces';
import { tableBodyStyle } from 'styles';
import InboxIcon from '@mui/icons-material/Inbox';
import { Order } from '@/types/types'

export const CustomTable: React.FC<TableProps> = ({ 
    label, 
    headerCells, 
    rows, 
    defaultSortColumn, 
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
    const [edit, setEditProject]  =  React.useState(false)
    const [currentProject, setCurrentProject] = React.useState("") 
    const [hoverLabel, setHoverLabel] = React.useState("")
    const [mcAnchorEl, setMCAnchorEl] = React.useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = React.useState(null)
    const [showAll, setShowAll] = useState(true)

    const router = useRouter()

    console.log('theme:', theme)

    const openManageColumns = Boolean(mcAnchorEl);
    const manageColumnsId = openManageColumns ? 'manage-columns-popover' : undefined;
    const openFilter = Boolean(filterAnchorEl);
    const filterId = openFilter ? 'filter-status-popover' : undefined;

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
        return stabilizedThis?.map((el: any) => el[0]);
      }

    const visibleRows: any = React.useMemo(() => 
        stableSort(rows, getComparator(order, orderBy)).slice(
            currentPage * currentPageSize,
            currentPage * currentPageSize + currentPageSize,
        )
    ,
    [order, orderBy, currentPage, currentPageSize, rows],
    );

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

    const handleRecordClick  = (e: any, id: string) => {
        console.log(`handleRecordClick e: ${e} id: ${id}`)
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

    const handleOpenFilter = (e: any) => {
        e.stopPropagation()
        setFilterAnchorEl(e.currentTarget)
    }

    const handleCloseFilter = (e: any) => {
        e.stopPropagation()
        setFilterAnchorEl(null)
    }

    return (
        <Paper elevation={0} sx={{ ...tableBodyStyle.paper, backgroundColor: theme.palette.body.main }}>
            <Container disableGutters maxWidth={false} sx={{...tableBodyStyle.tableTopButtons, backgroundColor: theme.palette.body.main}}>
                <Container disableGutters sx={tableBodyStyle.topContainer}>
                    <Typography variant="h6">PROJECTS</Typography>
                    <Button 
                        onClick={() => setAddProject(true)} 
                        color="primary" 
                        variant='text' 
                        sx={tableBodyStyle.buttonStyle} 
                        startIcon={<AddCircleOutlineIcon />}>
                        Create Project
                    </Button>
                </Container>
                
                <Container disableGutters maxWidth={false}  sx={{width: "max-content", margin: 0}}>
                   
                    <IconButton sx={tableBodyStyle.iconContainer}>
                        <SettingsIcon aria-label="Settings" />
                    </IconButton>
                </Container>
               

            </Container>
        
            <TableContainer sx={tableBodyStyle.containerStyle} component={Paper}>
                <Table sx={{tableLayout:  "fixed"}} stickyHeader aria-label={label}>
                    <CustomTableHead
                        hoverLabel={hoverLabel}
                        setHoverLabel={setHoverLabel}
                        handleOpenFilter={handleOpenFilter}
                        handleCloseFilter={handleCloseFilter}
                        filterId={filterId}
                        openFilter={openFilter}
                        filterAnchorEl={filterAnchorEl}
                        showAll={showAll}
                    
                        label={label}
                        headerCells={headerCells}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        handleInternalSelectAll={handleSelectAll}
                        //handleSelectAll={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={visibleRows?.length} />

                    {
                        <CustomTableBody
                                visibleRows={visibleRows}
                                headerCells={headerCells}
                                edit={edit}
                                currentProject={currentProject}
                                isSelected={isSelected}
                                handleRecordClick={handleRecordClick}
                                setCurrentProject={setCurrentProject}
                                //handleEditProject={handleEditProject}
                                
        
                            />
                           
                    }
                    
                    </Table>
                    {
                        visibleRows.length < 1 && (
                            <Container disableGutters sx={tableBodyStyle.emptyTableContainer} >
                                <InboxIcon sx={{fontSize: "64px"}}/>
                                <Typography sx={{fontSize: "30px"}}>No Data</Typography>
                            </Container>
                        )
                        
                    }
            </TableContainer>
                    <TableFooter sx={tableBodyStyle.tableFooter}>
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
