const initialState = null

export const updateUser = (user) => {
    return {type: 'user/set', payload: user}}

export const fetchUser = () => {
    return function (dispatch){
        fetch('/session')
        .then(r => {
          if(r.ok){
            r.json().then(user => {
              dispatch({type: 'user/set', payload: user})})
          }else {
            dispatch({type: 'user/set', payload: null})
          }
        })
    }
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'user/set':
            return action.payload
        // case 'user/signup':
        //     /* assumes action.payload is an object */
        //     return [...state, action.payload]
        case 'user/logout':
            /* assumes action.payload is an integer of a doomed ID */
            return state.filter(rObj => rObj.id !== action.payload)
        default: return state
    }
}