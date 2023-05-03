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
        console.log('this works?')
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
                    dispatch({type: 'copies/set', payload:copy})
                })
            }
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