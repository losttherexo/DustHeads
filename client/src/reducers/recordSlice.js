const initialState = []

export const addRecord = newRecordObj => {
    return function(dispatch){
        dispatch({type:'records/add', payload: newRecordObj})
    }
}

export const fetchRecords = () => {
    return function(dispatch){
        fetch('/records')
        .then(r => r.json())
        .then(recordsArray => {
            dispatch({type:'records/set', payload: recordsArray})
        })
    }
}

export const recordsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'records/set':
            return action.payload
        case 'records/add':
            return [...state, action.payload]
        case 'records/addCopy':
            return state.map(r => {
                if(r.id === action.payload.record_id) {
                    return {...r, copies: [...r.copies, action.payload]}
                } else return r
            })
        case 'records/remove':
            return state.filter(rObj => rObj.id !== action.payload)
        default: return state
    }
}