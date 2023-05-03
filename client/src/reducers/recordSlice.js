const initialState = []

export const addRecord = newRecordObj => {
    console.log(newRecordObj)
    return function(dispatch){
        fetch('/records', {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newRecordObj)
        })
        .then(r=> {
            if(r.ok){
                r.json().then(r => {
                    dispatch({type:'records/add', payload: r})
                })
            }
        })
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