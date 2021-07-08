import React from 'react'
import RecordEntry from './RecordEntry'

const Record = ({record, selectRecord}) => {
    return (
        <div className="record">
            {record.map((entry) => (
                <RecordEntry key={entry.id} id={entry.id} text={entry.text} selected={entry.selected} selectRecord={selectRecord}/>
            ))}
        </div>
    )
}

export default Record
