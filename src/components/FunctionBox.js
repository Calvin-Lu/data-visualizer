import React from 'react'
import Button from 'react-bootstrap/Button'
import Draggable from 'react-draggable'

const FunctionBox = ({ addElement, deleteSelectedElements, elements, quickSort, clearCanvas, toggleRecord, displayRecord, currentStructure, selectStructure, addGraphEdge, setCurrentAlgorithm, showStep, resetAlgoState, depthFirstSearch }) => {
    const nodeRef = React.useRef(null)
    return (
        <Draggable bounds="body" nodeRef={nodeRef}>
            <div className="function-box" ref={nodeRef}>
                <h3>Data Structures</h3>
                <Button className="btn-dark function-box-button" onClick={() => selectStructure('array')}>Array</Button>
                <Button className="btn-dark function-box-button" onClick={() => selectStructure('graph')}>Graph</Button>
                <h3>Functions</h3>
                <Button className="function-box-button" onClick={addElement}>+ Add Element</Button>
                <Button className="btn-danger function-box-button" onClick={deleteSelectedElements}>- Delete Selected Elements</Button>
                <Button className="btn-danger function-box-button" onClick={clearCanvas}>Clear Canvas and Record</Button>
                <Button className="btn-info function-box-button" onClick={toggleRecord}>{displayRecord ? "Hide Record" : "Show Record"}</Button>
                {currentStructure === "graph" ? 
                <Button className="btn-warning function-box-button" onClick={addGraphEdge}>Create Graph Edge</Button>  
                : null}                
                <h3>Algorithms</h3>
                {currentStructure ==="array" ?
                <Button className="btn-success function-box-button" 
                    onClick={() => {
                        resetAlgoState()
                        quickSort(0, elements.length - 1)
                        if (!displayRecord) {toggleRecord()}
                        setCurrentAlgorithm('quicksort')}}>
                    Apply Quick Sort
                </Button>
                : null}
                {currentStructure ==="graph" ?
                <Button className="btn-success function-box-button"
                    onClick={() => {
                        resetAlgoState()
                        depthFirstSearch()
                        if (!displayRecord) {toggleRecord()}
                        setCurrentAlgorithm('DFS')

                    }}>
                    Depth First Search
                </Button>
                : null}
                <Button className="btn-warning function-box-button" onClick={() => showStep(true)}> Next Step</Button>
                <Button className="btn-warning function-box-button" onClick={() => showStep(false)}> Previous Step</Button>
            </div>
        </Draggable>
    )
}

export default FunctionBox
