import React, {useState} from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import Button from 'react-bootstrap/Button'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [currentStructure, setCurrentStructure]=useState('') //keeps track of selected data structure
  const [elements, setElements] = useState([])

  const addElement = () => {
    const elementValue = prompt("Please input a numerical value for the new element:")
    if (isNaN(elementValue)) {
      alert("Invalid, input must be a number.")
      return;
    }
    const newElement = {
      value: elementValue,
      id: new Date().getTime() 
    }
    setElements([...elements, newElement])
  }

  return (
    <div className="App">
      <Sidebar addElement={addElement}/>
      <Canvas elements={elements}></Canvas>
    </div>
  );
}

export default App;
