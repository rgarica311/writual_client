import { Order } from '@/types/types'

export interface TableProps {
    label: string
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

export interface TableBodyProps {
    visibleRows: any
    headerCells: any
    edit: any
    currentProject: any
    isSelected: any
    handleRecordClick: Function
    setCurrentProject: Function
    //handleEditProject: Function
}

export interface Data {
    title: string
    type: string
    logline: string
    budget: number
    genre: string
    outline: string
    user: string
}

export interface EnhancedTableProps {
    headerCells: any;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    //onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    label: string;
    handleInternalSelectAll: any
    handleOpenFilter: any
    handleCloseFilter: any
    filterId: any
    openFilter: any
    filterAnchorEl: any
    showAll: any
   
    hoverLabel: any
    setHoverLabel: any
}