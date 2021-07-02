import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  // const [currentStructure, setCurrentStructure]=useState('') //keeps track of selected data structure
  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])

  useEffect(() => {
    setElements(elements)
    console.log("Effect re-render")
  },[elements])
 
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

  const quickSort = (start, end) => {
    console.log(elements)
    console.log(start + " " + end)
    if ((end-start) < 2) {
      return
    }
    const pivot = elements[end]
    const pivotIndex = end
    let lp = start
    let rp = end - 1
    alert("The pivot is the last element: " + pivot.value)
    while (lp < rp) {
      while (elements[lp].value <= pivot.value && lp <= pivotIndex) {
        lp++
        if (lp > pivotIndex) { //prevent invalid reference
          break
        }
      }
      while (elements[rp].value > pivot.value && rp >= start && rp >= lp) {
        rp--
        if (rp < 0) { //prevent invalid reference
          break
        }
      }
      if (!(lp > pivotIndex || rp < 0 || lp > rp)) {
        alert("The leftmost element greater than the pivot is: " + elements[lp].value
        + "\nThe rightmost element less than the pivot is: " + elements[rp].value); //semicolon necessary
        [elements[lp], elements[rp]] = [elements[rp], elements[lp]]
        setElements([...elements]) //Need to spread the array to trigger re-render
        lp++
        rp--
      }
    }
    if (lp > pivotIndex) {
      setElements([...elements])
      alert("value at pivot is largest")
      quickSort(start, end - 1)
    } else if (rp < 0) {
      alert("value at pivot is smallest")
      const newPivotIndex = start;
      [elements[start], elements[pivotIndex]] = [elements[pivotIndex], elements[start]]
      setElements([...elements])
      quickSort(newPivotIndex + 1, end)
    } else {
      alert("Swapping pivot and element at left pointer.")
      const newPivotIndex = lp;
      [elements[lp], elements[pivotIndex]] = [elements[pivotIndex],elements[lp]]
      setElements([...elements])
      quickSort(0, newPivotIndex - 1)
      quickSort(newPivotIndex + 1, end)
    }
  }

  return (
    <div className="App">
      <Sidebar addElement={addElement} deleteSelectedElements={deleteSelectedElements} elements={elements} quickSort={quickSort}/>
      <Canvas elements={elements} selectElement={selectElement}></Canvas>
    </div>
  );
}

export default App;
