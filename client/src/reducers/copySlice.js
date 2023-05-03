const initialState = []

export const addCopy = copy => {
    return function(dispatch){
        fetch('/copies', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(copy) 
        })
        .then(r => {
            if(r.ok){
                r.json().then(copy => {
                    dispatch({type: 'copies/add', payload:copy})
                })
            }else{
                console.log('something went wrong')
            }
        })
    }
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

export const updateCopy = (values) => {
    return function(dispatch){
        fetch(`/copies/${values.id}`, {
            method:'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => {
            if(r.ok){
                r.json().then(copy => {
                    dispatch({type: 'copies/update', payload:copy})
                })
            }
        })
    }
}

export const deleteCopy = (id) => {
    return function(dispatch){
        fetch(`/copies/${id}`, {
            method: 'DELETE'
        })
        dispatch({type: 'copies/remove', payload: null})
    }
}

export const copyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'copies/set':
            return action.payload
        case 'copies/add':
            return [...state, action.payload]
        case "copies/update":
            return state.map(copy => {
                if (copy.id === action.payload.id) {
                    return action.payload
                }
                return copy
            })
        case 'copies/remove':
            return state.filter(rObj => rObj.id !== action.payload)
        default: return state
    }
}