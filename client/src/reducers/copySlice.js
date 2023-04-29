const initialState = []

export const addCopy = copy => {
    return {type:'copies/add', payload:copy}
}

export const fetchCopies = () => {
    return function(dispatch){
        fetch('/copies')
        .then(r => r.json())
        .then(copies => {
            dispatch({type:'copies/set', payload: copies})
        })
    }
}

export const copyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'copies/set':
            /* assumes action.payload is an array of objects */
            return action.payload
        case 'copies/add':
            /* assumes action.payload is an object */
            return [...state, action.payload]
        case 'copies/remove':
            /* assumes action.payload is an integer of a doomed ID */
            return state.filter(rObj => rObj.id !== action.payload)
        default: return state
    }
}