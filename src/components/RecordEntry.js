import React from 'react'

const RecordEntry = ({ text, id, selected, selectRecord }) => {
    return (
        <div className={`record-entry ${selected ? "selected-record-entry" : ""}`} onClick={() => selectRecord(id)}>
            {text}
        </div>
    )
}

export default RecordEntry
