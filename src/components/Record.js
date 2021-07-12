import React from 'react'
import RecordEntry from './RecordEntry'

const Record = ({displayRecord, record, selectRecord}) => {
    return (
        <div> 
            { displayRecord ?
            <div className="record">
                <h1 className="record-header">Record</h1>
                {record.map((entry) => (
                    <RecordEntry key={entry.id} id={entry.id} text={entry.text} selected={entry.selected} selectRecord={selectRecord}/>
                ))}
            </div>
            : null}
        </div>
    )
}

export default Record
