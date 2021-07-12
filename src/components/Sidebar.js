import React from 'react'
import SidebarLabel from './SidebarLabel'
import '../index.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className="sidebar-header">Data Visualizer</h1>
            <h2> Data Structures</h2>
            <SidebarLabel text="Array"/>
            <SidebarLabel text="Tree" />
            <SidebarLabel text="Graph" />
        </div>
    )
}

export default Sidebar
