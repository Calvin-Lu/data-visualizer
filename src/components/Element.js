import React from 'react'

const Element = ({ id, value, selected, selectElement }) => {
    return (
        <div className={`element ${selected ? "selected-element":""} `} onClick={() => selectElement(id)}>
            {value}
        </div>
    )
}

export default Element
