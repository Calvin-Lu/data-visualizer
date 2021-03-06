import React from 'react'
import Element from './Element'
import '../index.css'
import FunctionBox from './FunctionBox'
import LineTo from 'react-lineto'
import ControlBox from './ControlBox'

const Canvas = ({elements, selectElement,  addElement, deleteSelectedElements, quickSort, clearCanvas, toggleRecord, displayRecord, updateRecord, currentStructure, selectStructure, graphEdges, addGraphEdge, currentAlgorithm, setCurrentAlgorithm, showStep, resetAlgoState, depthFirstSearch, updateAlgoStateEnd } ) => {
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
                toggleRecord={toggleRecord}
                displayRecord={displayRecord}
                updateRecord={updateRecord}
                currentStructure={currentStructure}
                selectStructure={selectStructure}
                addGraphEdge={addGraphEdge}
                setCurrentAlgorithm={setCurrentAlgorithm}
                showStep={showStep}
                resetAlgoState={resetAlgoState}
                depthFirstSearch={depthFirstSearch}
                updateAlgoStateEnd={updateAlgoStateEnd}
            />
            <ControlBox
                showStep={showStep}
                currentAlgorithm={currentAlgorithm}
            />
        </div>
    )
}

export default Canvas
