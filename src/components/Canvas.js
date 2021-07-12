import React from 'react'
import Element from './Element'
import '../index.css'
import FunctionBox from './FunctionBox'

const Canvas = ({elements, selectElement,  addElement, deleteSelectedElements, quickSort, clearCanvas, showRecord, displayRecord} ) => {
    return (
        <div className={displayRecord ? "canvas" : "canvas canvas-record-hidden"}>
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
            displayRecord={displayRecord}
            />
        </div>
    )
}

export default Canvas
