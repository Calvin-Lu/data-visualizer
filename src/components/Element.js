import React from 'react'
import Draggable from 'react-draggable'

const Element = ({ id, value, selected, selectElement, currentStructure }) => {
    return (
        <div className="element-container">
            { currentStructure === "graph" ?
                <Draggable bounds="body">
                    <div className={`element ${selected ? "selected-element":""} ${id}`} onClick={() => selectElement(id)}>
                        <div className="element-text">{value}</div>
                    </div>
                </Draggable>
            : null}
            { currentStructure === "array" ?
                <div className={`element ${selected ? "selected-element":""} ${id}`} onClick={() => selectElement(id)}>
                    <div className="element-text">{value}</div>
                </div>
            : null}
        </div>
    )
}

export default Element
