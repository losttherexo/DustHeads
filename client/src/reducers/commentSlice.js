const initialState = []

export const fetchComments = () => {
    return function(dispatch){
        fetch('/comments')
        .then(r => r.json())
        .then(comments => {
            dispatch({type:'comments/set', payload: comments})
        })
    }
}

export const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'comments/set':
            return action.payload
        default:
            return state
    }
}