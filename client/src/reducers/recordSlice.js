const initialState = []

export const addRecord = newRecordObj => {
    return {type:'records/add', payload:newRecordObj}
}

export const fetchRecords = () => {
    return function(dispatch){
        fetch('http://localhost:5555/records')
        .then(r => r.json())
        .then(recordsArray => {
            dispatch({type:'records/set', payload: recordsArray})
        })
    }
}

export const recordsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'records/set':
            /* assumes action.payload is an array of objects */
            return action.payload
        case 'records/add':
            /* assumes action.payload is an object */
            return [...state, action.payload]
        case 'records/remove':
            /* assumes action.payload is an integer of a doomed ID */
            return state.filter(rObj => rObj.id !== action.payload)
        default: return state
    }
}