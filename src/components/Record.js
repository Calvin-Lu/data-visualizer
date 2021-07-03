import React from 'react'
import RecordEntry from './RecordEntry'

const Record = ({record}) => {
    return (
        <div className="record">
            {record.map((entry) => (
                <RecordEntry key={entry.id} text={entry.text}/>
            ))}
        </div>
    )
}

export default Record
