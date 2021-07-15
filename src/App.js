import React, {useState, useRef} from 'react'
import Canvas from './components/Canvas'
import Record from './components/Record'
import Navigation from './components/Navigation'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [currentStructure, setCurrentStructure]=useState('') //keeps track of selected data structure
  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])
  const [record, setRecord] = useState([])
  const [displayRecord, setDisplayRecord] = useState(false) //tracks whether record interface is visible
  const [selectedRecord, setSelectedRecord] = useState("") //only one record can be selected at a time
  const [graphEdges, setGraphEdges] = useState([])
  const tempRecord = useRef([]) //tempRecord is actively updated during algorithm execution, and then is used to update the record state
  const algoState = useRef({
    states: [],
    currentIndex: 0
  })

  const addElement = () => {
    if (currentStructure === "") {
      alert("Please select a data structure before attempting to add an element.")
      return
    }
    const userInput = prompt("Multiple values must be separated by commas. \n\nPlease input one or more numerical values for the new element(s):")
    const inputtedValues = userInput.split(",")
    const temp = []
    for (let i = 0; i < inputtedValues.length; i++) {

      if (isNaN(inputtedValues[i])) {
        alert("Invalid input: Input can only contain numbers and commas")
        return
      }
      const newElement = {
        value: Number(inputtedValues[i]),
        id: uuidv4(),
        selected:false
      }
      temp.push(newElement)   //calling setElements inside the for loop would result in only the last element being appended
    }
    setElements([...elements, ...temp])
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
    updateTempRecord(`The current subarray is [${elements.slice(start, end + 1).map((element) => element.value)}]`)
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
        saveAlgoState()
        setElements([...elements]) //Need to spread the array to trigger re-render
        lp++
        rp--
      }
    }
    if (lp > pivotIndex) {
      updateTempRecord(`Value at pivot is largest in passed subarray. The pivot element will remain at its current index`)
      saveAlgoState()
      setElements([...elements])       
      quickSort(start, end - 1)
    } else if (rp < 0) {
      updateTempRecord(`Value at pivot is smallest in passed subarray. The pivot element will be 
      swapped with the leftmost element in the passed subarray ${elements[start].value}`)
      const newPivotIndex = start;
      [elements[start], elements[pivotIndex]] = [elements[pivotIndex], elements[start]]
      saveAlgoState()
      setElements([...elements])
      quickSort(newPivotIndex + 1, end)
    } else {
      updateTempRecord(`Swapping pivot ${elements[pivotIndex].value} with element at left pointer ${elements[lp].value}`)
      const newPivotIndex = lp;
      [elements[lp], elements[pivotIndex]] = [elements[pivotIndex],elements[lp]]
      saveAlgoState()
      setElements([...elements])
      quickSort(0, newPivotIndex - 1)
      quickSort(newPivotIndex + 1, end)
    }
  }

  const deepCopyElements = () => {
    return elements.map(elem => ({...elem}))
  }

  const saveAlgoState = () => {
    const data = deepCopyElements()
    algoState.current = {
      states:[...algoState.current.states, data],
      currentIndex: 0
    }
  }

  const clearCanvas = () => {
    if (window.confirm("This will delete all elements in the canvas and the record. \n\nContinue?")) {
      setElements([])
      setRecord([])
      setGraphEdges([])
    }
  }

  const updateTempRecord = (text) => {
    tempRecord.current = [...tempRecord.current, text]
  }

  const showRecord = () => {
    setDisplayRecord(!displayRecord)
    const newRecordArray = []
    for (let i = 0; i < tempRecord.current.length; i++) {
      const newRecord = {
        id: uuidv4(),
        text: tempRecord.current[i],
        selected: false
      }
      newRecordArray.push(newRecord)
    }
    setRecord(newRecordArray)
  }

  const selectRecord = (id) => {
    if (!(selectedRecord === id)) {
      // first step is to deselect currently selected record (if there is such a record)
      if (selectedRecord !== "") { 
        record.find((entry) => entry.id === selectedRecord).selected = false 
      }
      record.find((entry) => entry.id === id).selected = true
      setSelectedRecord(id)
    } else {
      record.find((entry) => entry.id === id).selected = false
      setSelectedRecord("")
    }
  }

  const selectStructure = (dataStructure) => {
    if (currentStructure === "graph") {
      if (window.confirm("This will delete all existing records and graph edges. \n\nContinue?")) {
        tempRecord.current = []
        setRecord([])
        setGraphEdges([])
      } else {return}
    } else if (currentStructure === "array") {
      if (window.confirm("This will delete all existing records. \n\nContinue?")) {
        tempRecord.current = []
        setRecord([])
      } else {return}
    }
    setCurrentStructure(dataStructure)
  }

  const addGraphEdge = () => {
    if (selectedElements.length > 2) {
      alert("You cannot select more than 2 elements when creating a graph edge.")
      return
    } else if (selectedElements.length < 2) {
      alert("You must select 2 elements when creating a graph edge.")
      return
    }
    const newEdge = [selectedElements[0], selectedElements[1]]
    for (let i = 0; i <graphEdges.length; i++) {
      if (equalArrays(graphEdges[i], newEdge)) {
        alert("There already exists an edge between these two vertices.")
        return
      }
    }
    selectElement(newEdge[0])  //Deselects the currently selected elements
    selectElement(newEdge[1])
    setSelectedElements([])
    setGraphEdges([...graphEdges, newEdge])
  }

  const equalArrays = (a, b) => {
    return (a.length === b.length) && a.every((v, i) => v === b[i])
  }

  const showDetailedExe = () => {

  }

  return (
    <div className="App">
      <Navigation/>
      <Canvas 
      elements={elements} 
      selectElement={selectElement}
      addElement={addElement}
      deleteSelectedElements={deleteSelectedElements}
      quickSort={quickSort}
      clearCanvas={clearCanvas}
      showRecord={showRecord}
      displayRecord={displayRecord}
      currentStructure={currentStructure}
      selectStructure={selectStructure}
      graphEdges={graphEdges}
      addGraphEdge={addGraphEdge}
      showDetailedExe={showDetailedExe}
      />
      <Record
      displayRecord={displayRecord} 
      record={record} 
      selectRecord={selectRecord}
      />
    </div>
  );
}

export default App;
