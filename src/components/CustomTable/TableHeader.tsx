'use client';

import React, { useEffect } from 'react'
import {
  
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
  
    Checkbox,
   
    Box,
    Button,
    Container,
    Divider,
    FormControlLabel,
    Menu,
    MenuItem,
    Typography,
  
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EnhancedTableProps } from '@props/tableProps'
import { useUserStore } from '@/state/userGeneration'

export const CustomTableHead: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
    const { 
      order, 
      orderBy, 
      numSelected, 
      rowCount, 
      onRequestSort, 
      headerCells, 
      label, 
      handleInternalSelectAll,
      handleOpenFilter, 
      handleCloseFilter, 
      filterId,
      openFilter,
      filterAnchorEl,
      showAll,
   
      hoverLabel, 
      setHoverLabel } = props;

    const columnVisibility = useUserStore((state) => state.columnVisibility)
    const setColumnVisibility = useUserStore((state) => state.setColumnVisibility)
    
    const filterStatus = useUserStore((state) => state.filterStatus)

    headerCells.forEach((cell: any) => {
      columnVisibility[cell.dataIndex] = true
    })

    console.log('columnVisibility: ', columnVisibility)

    setColumnVisibility(columnVisibility)

    const createSortHandler =
      (property: any) => (event: any) => {
        console.log(`test e createSortHandler propert ${property} e }`, event.target.checked)
        if(event.target.checked !== true && event.target.checked !== false) {
          onRequestSort(event, property);

        }
      };
      const headerCellsLength = headerCells.length
      const widthPercentage = 100 / headerCellsLength

      const tableLabel: any = ['incoming-responses', 'outgoing-transmission', 'status-history', 'adjudication-documents']


      const tableHeadCellStyle = {
        backgroundColor: tableLabel.includes(label) ? 'common.black' : 'background.default',
        height: "56px",
        //minWidth: `${widthPercentage}%`,
        /*paddingTop: "23px",
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,*/
        top: 0,
        zIndex: 2
    }

    console.log('orderby: ', orderBy)

    const handleSort = (e, cell) => {
      //console.log('test e', e.target.checked)
      createSortHandler(cell)
    }

    const handleFilterChange = () => {

    }

    const handleHideAll = () => {

    }
    const handleShowAll = () => {
      
    }
    const handleReset = () => {
      
    }

    const tableSortLabelStyle = {  width: "100%", fontSize: '0.875rem', pl: '1rem', '&.MuiTableSortLabel-root': { display: "flex", justifyContent: "space-between", paddingLeft: 0} }
  
    return (
      <TableHead>
        <TableRow>
          {headerCells.map((cell: any) => (
            columnVisibility[cell.dataIndex] && (
                <TableCell
                    sx={ cell.dataIndex === 'actions' ? {width: '3%'} : tableHeadCellStyle  }
                    key={cell.id}
                    align={'left'}
                    padding={cell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === cell.id ? order : false}
                    >
                    <TableSortLabel
                        hideSortIcon={cell.dataIndex === hoverLabel ? false : true} onMouseEnter={() => setHoverLabel(cell.dataIndex)} onMouseLeave={() => setHoverLabel("")}
                        sx={tableSortLabelStyle}
                        active={orderBy === cell.dataIndex}
                        direction={orderBy === cell.dataIndex ? order : 'asc'}
                        onClick={createSortHandler(cell.dataIndex)}
                        IconComponent={() => (
                            cell.dataIndex !== 'type' && cell.dataIndex  !== 'genre'
                              ? (order === 'asc' && orderBy === cell.dataIndex) 
                                  ? <ArrowUpwardIcon sx={{ marginRight: 2, height: "20px", width: "20px", color: 'text.secondary' }} /> 
                                  : <ArrowDownwardIcon sx={{ marginRight: 2, height: "20px", width: "20px", color: 'text.secondary' }} />  
                              : <>
                                      <FilterListIcon onClick={(e) => {
                                                              e.stopPropagation()
                                                              handleOpenFilter(e)
                                                              }}
                                          sx={{ marginRight: 2, height: "20px", width: "20px", color: 'text.secondary' }} />
                                      
                                          <Menu 
                                              onClose={(e) => handleCloseFilter(e)} 
                                              slotProps={{root: { sx:  { top: "280px",  left: "953px"}}, paper: {sx: { backgroundColor: "white", border: "none", display: 'flex', flexDirection: "column"}}}}  
                                              id={filterId} 
                                              open={openFilter} 
                                              anchorEl={filterAnchorEl} 
                                              MenuListProps={{'aria-labelledby': 'basic-button'}}>

                                              <MenuItem>
                                                  <Typography sx={{flex: 5}}>Filter Status</Typography>
                                                  </MenuItem>

                                              <Divider/>
                                                                                                      
                                              {
                                                  Object.keys(filterStatus).map((status: any) => {
                                                      console.log('status: ', status)
                                                      return (
                                                          <MenuItem key={filterStatus[status].label}>
                                                          <FormControlLabel 
                                                              control={<Checkbox
                                                                  checked={filterStatus[status].selected}
                                                                  onChange={handleFilterChange}
                                                                  defaultChecked/>}
                                                              label={filterStatus[status].label}/>
                                                          </MenuItem>
                                                      )
                                                  })
                                                      
                                                  
                                              }
                                              <MenuItem>
                                                  <Container disableGutters sx={{width: "100%", justifyContent: "space-between", display: "flex"}}>
                                                      {
                                                          showAll
                                                              ?  <Button onClick={handleHideAll} variant='text'>HIDE ALL</Button>

                                                              :  <Button onClick={handleShowAll} variant='text'>SHOW ALL</Button>
                                                      }

                                                      <Button onClick={handleReset} variant='text'>RESET</Button>
                                                      
                                                  </Container>
                                              </MenuItem>
                                              
                                                  
                                          </Menu>
                                          
                                      </> 
                                
                      )}
                    >
                        
                        {orderBy === cell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                        ) : null}
                        <Box>
                            {
                            // select all button 
                            label === 'batch-printing' && cell.label === "First Name"
                                ? <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={(e) => {e.preventDefault(); e.stopPropagation(); handleInternalSelectAll(e)}}
                                inputProps={{
                                    'aria-label': 'select all',
                                }}
                              />
                                : null
                            }

                            {cell.label}
                        </Box>

                    </TableSortLabel>
                </TableCell>
            )
            
          ))}
        </TableRow>
      </TableHead>
    );
  }