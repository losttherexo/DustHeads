const initialState = []

export const addDustHead = newDustHeadObj => {
    return {type:'dustheads/add', payload:newDustHeadObj}
}

export const fetchDustHeads = () => {
    return function(dispatch){
        fetch('/dustheads')
        .then(r => r.json())
        .then(dhArray => {
            dispatch({type:'dustheads/set', payload: dhArray})
        })
    }
}

export const deleteDustHead = doomedDustHead => {
    return {type:'dustheads/remove', payload: doomedDustHead}
}

export const dustheadReducer = (state = initialState, action) => {
    switch(action.type){
        case 'dustheads/set':
            return action.payload
        case 'dustheads/add':
            return [...state, action.payload]
        case 'dustheads/remove':
            return state.filter(dhObj => dhObj !== action.payload)
        default: return state
    }
}