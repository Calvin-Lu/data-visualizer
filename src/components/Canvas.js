import React from 'react'
import Element from './Element'
import '../index.css'

const Canvas = ({elements, selectElement}) => {
    return (
        <div className="canvas">
            {elements.map((element) => (
                <Element id={element.id} value={element.value} selected={element.selected} selectElement={selectElement}/>
            ))}
        </div>
    )
}

export default Canvas
