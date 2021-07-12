import React from 'react'
import Element from './Element'
import '../index.css'
import FunctionBox from './FunctionBox'

const Canvas = ({elements, selectElement,  addElement, deleteSelectedElements, quickSort, clearCanvas, showRecord} ) => {
    return (
        <div className="canvas">
            {elements.map((element) => (
                <Element key={element.id} id={element.id} value={element.value} selected={element.selected} selectElement={selectElement}/>
            ))}
            <FunctionBox 
            elements={elements} 
            selectElement={selectElement}
            addElement={addElement}
            deleteSelectedElements={deleteSelectedElements}
            quickSort={quickSort}
            clearCanvas={clearCanvas}
            showRecord={showRecord}
            />
        </div>
    )
}

export default Canvas
