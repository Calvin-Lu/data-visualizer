import React from 'react'

const Element = ({ id, value, selected, selectElement }) => {
    return (
        <div className={`element ${selected ? "selected-element":""} `} onClick={() => selectElement(id)}>
            <div className="element-text">{value}</div>
        </div>
    )
}

export default Element
