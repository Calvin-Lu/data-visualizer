import React from 'react'
import Button from 'react-bootstrap/Button'
import Draggable from 'react-draggable'

const FunctionBox = ({ addElement, deleteSelectedElements, elements, quickSort, clearCanvas, toggleRecord, displayRecord, currentStructure, selectStructure, addGraphEdge, setCurrentAlgorithm, showStep, resetAlgoState, depthFirstSearch,updateAlgoStateEnd }) => {
    const nodeRef = React.useRef(null)
    return (
        <Draggable bounds="body" nodeRef={nodeRef}>
            <div className="function-box" ref={nodeRef}>
                <h3>Data Structures</h3>
                <Button className="btn-dark function-box-button" onClick={() => selectStructure('array')}>
                    Array
                </Button>
                <Button className="btn-dark function-box-button" onClick={() => selectStructure('graph')}>
                    Graph
                </Button>
                <h3>Functions</h3>
                <Button className="function-box-button" onClick={addElement}>
                    + Add Element(s)
                </Button>
                <Button className="btn-danger function-box-button" onClick={deleteSelectedElements}>
                    - Delete Selected Element(s)
                </Button>
                <Button className="btn-danger function-box-button" onClick={clearCanvas}>
                    Clear All
                </Button>
                <Button className="btn-info function-box-button" onClick={toggleRecord}>
                    {displayRecord ? "Hide Record" : "Show Record"}
                </Button>
                {currentStructure === "graph" ? 
                    <Button className="btn-warning function-box-button" onClick={addGraphEdge}>
                        <div className="function-box-button-header">Create Graph Edge</div>
                        <div className="function-box-button-subtitle">(Between 2 selected nodes)</div>
                    </Button>  
                : null}                
                <h3>Algorithms</h3>
                {currentStructure ==="array" ?
                    <Button className="btn-success function-box-button" 
                        onClick={() => {
                            resetAlgoState()
                            quickSort(0, elements.length - 1)
                            updateAlgoStateEnd()
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
                            updateAlgoStateEnd()
                            if (!displayRecord) {toggleRecord()}
                            setCurrentAlgorithm('DFS')

                        }}>
                        <div className="function-box-button-header">Depth First Search</div>
                        <div className="function-box-button-subtitle">(Selected node is starting node)</div>
                    </Button>
                : null}
            </div>
        </Draggable>
    )
}

export default FunctionBox
