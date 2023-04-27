const initialState = []

export const addDustHead = newDustHeadObj => {
    return {type:'dustheads/add', payload:newDustHeadObj}
}

export const fetchRecords = () => {
    return function(dispatch){
        fetch('/dustheads')
        .then(r => r.json())
        .then(dhArray => {
            dispatch({type:'dustheads/set', payload: dhArray})
        })
    }
}

export const dustheadReducer = (state = initialState, action) => {
    switch(action.type){
        case 'dustheads/set':
            /* assumes action.payload is an array of objects */
            return action.payload
        case 'dustheads/add':
            /* assumes action.payload is an object */
            return [...state, action.payload]
        case 'dustheads/remove':
            /* assumes action.payload is an integer of a doomed ID */
            return state.filter(dhObj => dhObj.id !== action.payload)
        default: return state
    }
}