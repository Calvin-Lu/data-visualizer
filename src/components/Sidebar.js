import React from 'react'
import SidebarLabel from './SidebarLabel'
import '../index.css'
import Button from 'react-bootstrap/Button'

const Sidebar = ({addElement}) => {
    return (
        <div className="sidebar">
            <h1 className="sidebar-header">Data Visualizer</h1>
            <h2> Data Structures</h2>
            <SidebarLabel text="Array"/>
            <SidebarLabel text="Tree" />
            <SidebarLabel text="Graph" />
            <h3>Functions</h3>
            <Button onClick={addElement}>+ Add Element</Button>
        </div>
    )
}

export default Sidebar
