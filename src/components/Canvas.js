import React from 'react'
import Element from './Element'
import '../index.css'
import FunctionBox from './FunctionBox'

const Canvas = ({elements, selectElement,  addElement, deleteSelectedElements, quickSort, clearCanvas, showRecord, displayRecord, currentStructure, selectStructure} ) => {
    return (
        <div className={displayRecord ? "canvas" : "canvas canvas-record-hidden"}>
            <h1>{currentStructure === "" ? 
            "No currently selected data structure" : `The currently selected data structure is: ${currentStructure}`}
            </h1>
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
            selectStructure={selectStructure}
            />
        </div>
    )
}

export default Canvas
