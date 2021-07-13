import React from 'react'
import Draggable from 'react-draggable'

const Element = ({ id, value, selected, selectElement }) => {
    return (
        <Draggable bounds="body">
            <div className={`element ${selected ? "selected-element":""} ${id}`} onClick={() => selectElement(id)}>
                <div className="element-text">{value}</div>
            </div>
        </Draggable>
    )
}

export default Element
