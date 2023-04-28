import { useState } from "react"
import { useDispatch } from "react-redux"
import { addRecord } from "../reducers/recordSlice"

function DustHead() {
    const [newRecord, setNewRecord] = useState('')
    const dispatch = useDispatch()

    const handleAddRecord = ()  => {
        dispatch(addRecord({title: newRecord}))
      }

    return(
        <div>
            <h1>
                this is ur crate
            </h1>
        </div>
    )
}

export default DustHead