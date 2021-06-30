import React from 'react'
import Element from './Element'
import '../index.css'

const Canvas = ({elements, addElement}) => {
    return (
        <div className="canvas">
            {elements.map((element) => (
                <Element key={element.id} value={element.value}/>
            ))}
        </div>
    )
}

export default Canvas
