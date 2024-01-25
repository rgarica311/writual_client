export const columnStateReducer = (state: any, action: any): any => {
    console.log('reducer debug columnStateReducer running STATE: ', state)
    console.log('reducer debug columnStateReducer running ACTION: ', action)
    console.log('reducer debug columnStateReducer state.action[type]', state[action.type])
    console.log('reducer debug columnStateReducer !state.action[type]', !state[action.type])
    const {columnVisibility, filteruser } = state
  

    switch (action.type) {
      case 'SHOW_ALL':
        console.log('reducer debug in HIDE_ALL action case')
  
        return {
          ...state,
          columnVisibility: {
            title: true,
            logline: true,
            genre: true,
            type: true,
            progress: true,
            user: true,
            outline: true,
            actions: true,
          }
        }
        break;
  
      case 'HIDE_ALL':
        console.log('hide all')
        const newState = {
          ...state,
          columnVisibility: {
            title: false,
            logline: false,
            genre: false,
            type: false,
            progress: false,
            user: false,
            outline: false,
            actions: false
          }
        }
        console.log('hide all state: ', newState)
        return {
          ...state,
          columnVisibility: {
            title: false,
            logline: false,
            genre: false,
            type: false,
            progress: false,
            user: false,
            outline: false,
            actions: false
          }
        }
      
        
      case 'RESET':
        return {
          ...state,
          columnVisibility: {
            title: true,
            logline: false,
            genre: true,
            type: true,
            progress: true,
            user: true,
            outline: true,
            actions: true
          }
         
        }
  
      case 'user_FILTER':
        console.log('columnState user filter case in reducer') 
        return {
          ...state, 
          filteruser: {
            ...filteruser,
            [action.filter]: {
              ...filteruser[action.filter], 
              selected: !state.filteruser[action.filter].selected}
          }
        }
  
      case 'TOGGLE_COLUMN':
        console.log('columnState user base else') 
        return {
          ...state,
        columnVisibility: {
          ...columnVisibility,
          [action.dataIndex]: !state.columnVisibility[action.dataIndex]
        }
        }
  
    }
  
  }