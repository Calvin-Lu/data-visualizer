import React from 'react'

const Element = ({ id, value, selectElement }) => {
    return (
        <div className="element" onClick={() => selectElement(id)}>
            {value}
        </div>
    )
}

export default Element
