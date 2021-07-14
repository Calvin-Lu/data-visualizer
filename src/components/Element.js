import React from 'react'
import Draggable from 'react-draggable'

const Element = ({ id, value, selected, selectElement, currentStructure }) => {
    const nodeRef = React.useRef(null)
    return (
        <div className="element-container">
            { currentStructure === "graph" ?
                <Draggable bounds="body" nodeRef={nodeRef}>
                    <div className={`element ${selected ? "selected-element":""} ${id}`} onClick={() => selectElement(id)} ref={nodeRef}>
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
