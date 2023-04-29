import { combineReducers } from "redux"
import { dustheadReducer } from "./dustheadSlice"
import { recordsReducer } from "./recordSlice"
import { userReducer } from "./userSlice"
import { copyReducer } from "./copySlice"


const rootReducer = combineReducers({
    dustheads: dustheadReducer,
    records: recordsReducer,
    user: userReducer,
    copies: copyReducer
})

export default rootReducer