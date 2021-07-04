import React, {useState, useRef} from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import Record from './components/Record'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import cloneDeep from 'lodash/cloneDeep'
import { v4 as uuidv4 } from 'uuid';

function App() {
  // const [currentStructure, setCurrentStructure]=useState('') //keeps track of selected data structure
  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])
  const [record, setRecord] = useState([])
  const tempRecord = useRef([]) //tempRecord is actively updated during algorithm execution, and then is used to update the record state

  const addElement = () => {
    const elementValue = prompt("Please input a numerical value for the new element:")
    if (isNaN(elementValue)) {
      alert("Invalid: input must be a number.")
      return;
    }
    const newElement = {
      value: Number(elementValue),
      id: uuidv4(),
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
    if ((end-start) < 1) { //subarray of length 1
      return
    }
    const pivot = elements[end]
    const pivotIndex = end
    let lp = start
    let rp = end - 1
    updateTempRecord(`The pivot is the last element: ${pivot.value}`)
    while (lp <= rp) {
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
        updateTempRecord(`The leftmost element greater than the pivot is: ${elements[lp].value}
         \nThe rightmost element less than the pivot is: ${elements[rp].value}`); //semicolon necessary
        [elements[lp], elements[rp]] = [elements[rp], elements[lp]]
        setElements([...elements]) //Need to spread the array to trigger re-render
        lp++
        rp--
      }
    }
    if (lp > pivotIndex) {
      updateTempRecord(`Value at pivot is largest in passed subarray. The pivot element will remain at its current index`)
      setElements([...elements])
      quickSort(start, end - 1)
    } else if (rp < 0) {
      updateTempRecord(`Value at pivot is smallest in passed subarray. The pivot element will be 
      swapped with the leftmost element in the passed subarray ${elements[start]}`)
      const newPivotIndex = start;
      [elements[start], elements[pivotIndex]] = [elements[pivotIndex], elements[start]]
      setElements([...elements])
      quickSort(newPivotIndex + 1, end)
    } else {
      updateTempRecord(`Swapping pivot ${elements[pivotIndex].value} with element at left pointer ${elements[lp].value}`)
      const newPivotIndex = lp;
      [elements[lp], elements[pivotIndex]] = [elements[pivotIndex],elements[lp]]
      setElements([...elements])
      quickSort(0, newPivotIndex - 1)
      quickSort(newPivotIndex + 1, end)
    }
    console.log(tempRecord)
  }


  const clearCanvas = () => {
    if (window.confirm("This will delete all elements in the canvas. \n\nContinue?")) {
      setElements([])
    }
  }

  const updateTempRecord = (text) => {
    tempRecord.current = [...tempRecord.current, text]
  }

  const showRecord = () => {
    console.log("showRecord called")
    console.log(tempRecord)
    console.log(record)
    const newRecordArray = []
    for (let i = 0; i < tempRecord.current.length; i++) {
      console.log("loop iteration " + i)
      const newRecord = {
        id: uuidv4(),
        text: tempRecord.current[i]
      }
      newRecordArray.push(newRecord)
    }
    setRecord(newRecordArray)
  }


  // const clearRecord = () => {
  //   tempRecord = []
  //   setRecord([])
  // }

  return (
    <div className="App">
      <Sidebar 
      addElement={addElement} 
      deleteSelectedElements={deleteSelectedElements} 
      elements={elements} 
      quickSort={quickSort}
      clearCanvas={clearCanvas}
      showRecord={showRecord}
      />
      <Canvas elements={elements} selectElement={selectElement}></Canvas>
      <Record record={record}/>
    </div>
  );
}

export default App;
