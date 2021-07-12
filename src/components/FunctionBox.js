import React from 'react'
import Button from 'react-bootstrap/Button'
import Draggable from 'react-draggable'

const FunctionBox = ({ addElement, deleteSelectedElements, elements, quickSort, clearCanvas, showRecord, displayRecord }) => {
    return (
        <Draggable bounds="body">
            <div className="function-box">
                <h3>Data Structures</h3>
                <Button className="btn-dark function-box-button">Array</Button>
                <Button className="btn-dark function-box-button">Graph</Button>
                <h3>Functions</h3>
                <Button className="function-box-button" onClick={addElement}>+ Add Element</Button>
                <Button className="btn-danger function-box-button" onClick={deleteSelectedElements}>- Delete Selected Elements</Button>
                <Button className="btn-danger function-box-button" onClick={clearCanvas}>Clear Canvas and Record</Button>
                <Button className="btn-info function-box-button" onClick={showRecord}>{displayRecord ? "Hide Record" : "Show Record"}</Button>
                <h3>Algorithms</h3>
                <Button className="btn-warning function-box-button" onClick={() => quickSort(0, elements.length - 1)}>Apply Quick Sort</Button>
            </div>
        </Draggable>
    )
}

export default FunctionBox
