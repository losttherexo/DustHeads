const initialState = null

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'user/login':
            /* assumes action.payload is an array of objects */
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