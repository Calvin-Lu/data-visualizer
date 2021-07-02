import React from 'react'
import SidebarLabel from './SidebarLabel'
import '../index.css'
import Button from 'react-bootstrap/Button'

const Sidebar = ({ addElement, deleteSelectedElements, elements, quickSort, clearCanvas }) => {
    return (
        <div className="sidebar">
            <h1 className="sidebar-header">Data Visualizer</h1>
            <h2> Data Structures</h2>
            <SidebarLabel text="Array"/>
            <SidebarLabel text="Tree" />
            <SidebarLabel text="Graph" />
            <h3>Functions</h3>
            <Button onClick={addElement}>+ Add Element</Button>
            <Button className="btn-danger" onClick={deleteSelectedElements}>Delete Selected Elements</Button>
            <Button className="btn-warning" onClick={() => quickSort(0, elements.length - 1)}>Apply Quick Sort</Button>
            <Button className="btn-dark" onClick={clearCanvas}>Clear Canvas</Button>
        </div>
    )
}

export default Sidebar
