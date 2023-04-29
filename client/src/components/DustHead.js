import { useState } from "react"
import { useDispatch } from "react-redux"
import { addRecord } from "../reducers/recordSlice"
import NavBar from "./NavBar"

function DustHead() {
    const [newRecord, setNewRecord] = useState('')
    const dispatch = useDispatch()

    const handleAddRecord = ()  => {
        dispatch(addRecord({title: newRecord}))
      }

    return(
        <div>
            <NavBar/>
            <h1>
                this is ur crate
            </h1>
        </div>
    )
}

export default DustHead