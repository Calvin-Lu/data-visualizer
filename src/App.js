import React, {useState} from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  // const [currentStructure, setCurrentStructure]=useState('') //keeps track of selected data structure
  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])

  const addElement = () => {
    const elementValue = prompt("Please input a numerical value for the new element:")
    if (isNaN(elementValue)) {
      alert("Invalid: input must be a number.")
      return;
    }
    const newElement = {
      value: elementValue,
      id: new Date().getTime(),
      selected: false
    }
    setElements([...elements, newElement])
  }

  const selectElement = (id) => {
    if (!selectedElements.includes(id)) {
      elements.find((element) => element.id === id).selected = true
      setSelectedElements([...selectedElements, id])
    } else {
      elements.find((element) => element.id === id).selected = false
      setSelectedElements(selectedElements.filter((element) => element !== id))
    }
  }

  const deleteSelectedElements = () => {
    setElements(elements.filter((element) => !selectedElements.includes(element.id)))
    setSelectedElements([])
  }

  return (
    <div className="App">
      <Sidebar addElement={addElement} deleteSelectedElements={deleteSelectedElements}/>
      <Canvas elements={elements} selectElement={selectElement}></Canvas>
    </div>
  );
}

export default App;
