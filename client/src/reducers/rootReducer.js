import { combineReducers } from "redux"
import { dustheadReducer } from "./dustheadSlice"
import { recordsReducer } from "./recordSlice"

const rootReducer = combineReducers({
    dusthead: dustheadReducer,
    records: recordsReducer
})

export default rootReducer