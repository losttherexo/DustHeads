
function DustHead() {
    const [newRecord, setNewRecord] = useState('')

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