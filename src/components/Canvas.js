import React from 'react'
import Element from './Element'
import '../index.css'
import FunctionBox from './FunctionBox'
import LineTo from 'react-lineto'

const Canvas = ({elements, selectElement,  addElement, deleteSelectedElements, quickSort, clearCanvas, showRecord, displayRecord, currentStructure, selectStructure, graphEdges, addGraphEdge, currentAlgorithm, setCurrentAlgorithm, showStep, resetAlgoState, depthFirstSearch } ) => {
    return (
        <div className={displayRecord ? "canvas" : "canvas canvas-record-hidden"}>
            <h1>
                {`Current Structure: ${currentStructure},
                    Current Algorithm: ${currentAlgorithm}`}
            </h1>
            {elements.map((element) => (
                <Element key={element.id} id={element.id} value={element.value} selected={element.selected} highlighted={element.highlighted} selectElement={selectElement} currentStructure={currentStructure}/>
            ))}
            {graphEdges.map((edge) => (
                <LineTo from={edge[0]} to={edge[1]} borderWidth={2} borderColor="black" zIndex={1} delay={100}/>
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
            currentStructure={currentStructure}
            selectStructure={selectStructure}
            addGraphEdge={addGraphEdge}
            setCurrentAlgorithm={setCurrentAlgorithm}
            showStep={showStep}
            resetAlgoState={resetAlgoState}
            depthFirstSearch={depthFirstSearch}
            />
        </div>
    )
}

export default Canvas
