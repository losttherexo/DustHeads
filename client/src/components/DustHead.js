import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRecord } from "../reducers/recordSlice"
import NavBar from "./NavBar"
import RecordCard from "./RecordCard"

function DustHead({id}) {


    return(
        <div>
            <NavBar/>
            <div>
                profile info
            </div>
            <div>
                crate
            </div>
        </div>
    )
}

export default DustHead