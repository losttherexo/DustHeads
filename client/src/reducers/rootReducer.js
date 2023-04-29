import { combineReducers } from "redux"
import { dustheadReducer } from "./dustheadSlice"
import { recordsReducer } from "./recordSlice"
import { userReducer } from "./userSlice"


const rootReducer = combineReducers({
    dustheads: dustheadReducer,
    records: recordsReducer,
    user: userReducer,
})

export default rootReducer