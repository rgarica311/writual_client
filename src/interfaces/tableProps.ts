export interface TableProps {
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

export interface Data {
    title: string
    type: string
    logline: string
    budget: number
    genre: string
    outline: string
    user: string
}