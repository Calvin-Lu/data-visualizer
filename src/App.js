import React, {useState, useRef} from 'react'
import Canvas from './components/Canvas'
import Record from './components/Record'
import Navigation from './components/Navigation'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [currentStructure, setCurrentStructure] = useState('none') //keeps track of selected data structure
  const [currentAlgorithm, setCurrentAlgorithm] = useState('none') //keeps track of selected algorithm
  const [elements, setElements] = useState([])
  const [tempElements, setTempElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])
  const [record, setRecord] = useState([])
  const [displayRecord, setDisplayRecord] = useState(false) //tracks whether record interface is visible
  const [selectedRecord, setSelectedRecord] = useState("") //only one record can be selected at a time
  const [graphEdges, setGraphEdges] = useState([])
  const tempRecord = useRef([]) //tempRecord is actively updated during algorithm execution, and then is used to update the record state
  const algoState = useRef({
    states: [],
    relevantElements: [],
    currentState: -1
  })

  /**
   *  Adds a new element to the 'elements' state, and a near identical copy of
   *  the element to the 'tempElements' state.
   */
  const addElement = () => {
    if (currentStructure === "none") {
      alert("Please select a data structure before attempting to add an element.")
      return
    }
    const userInput = prompt("Multiple values must be separated by commas. \n\nPlease input one or more numerical values for the new element(s):")
    const inputtedValues = userInput.split(",")
    const tempArray = [] //stores new elements
    const tempArray2 = [] //stores new temp elements
    for (let i = 0; i < inputtedValues.length; i++) {

      if (isNaN(inputtedValues[i])) {
        alert("Invalid input: Input can only contain numbers and commas")
        return
      }
      const originalId = uuidv4()
      const tempElementId = uuidv4()
      const newElement = {
        value: Number(inputtedValues[i]),
        id: originalId,
        selected:false,
        highlighted:false
      }
      const newTempElement = { // copy of newElement, whose data is first modified by user selected algorithms
        value: Number(inputtedValues[i]),
        originalId: originalId,
        id: tempElementId,
        selected:false,
        highlighted:false
      }
      tempArray.push(newElement)   //calling setElements inside the for loop would result in only the last element being appended
      tempArray2.push(newTempElement)
    }
    setElements([...elements, ...tempArray])
    setTempElements([...tempElements, ...tempArray2])
  }

  /**
   * Toggles the 'selected' property of the element with id property equal to 
   * 'id' parameter, and appends or removes 'id' from the 'selectedElements' 
   * state.
   * @param {String} id 
   */
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
    const pivot = tempElements[end]
    const pivotIndex = end
    let lp = start
    let rp = end - 1
    updateTempRecord(`NEW PROCESSING SUBARRAY: The current subarray is [${tempElements.slice(start, end + 1).map((element) => element.value)}]`)
    saveAlgoState(tempElements.slice(start, end + 1).map((element) => element.originalId))
    updateTempRecord(`NEW PIVOT: The pivot is the last element in the subarray: ${pivot.value}`)
    saveAlgoState([pivot.originalId])
    while (lp <= rp) {
      while (tempElements[lp].value <= pivot.value && lp <= pivotIndex) {
        lp++
        if (lp > pivotIndex) { //prevent invalid reference
          break
        }
      }
      while (tempElements[rp].value > pivot.value && rp >= start && rp >= lp) {
        rp--
        if (rp < 0) { //prevent invalid reference
          break
        }
      }
      if (!(lp > pivotIndex || rp < 0 || lp > rp)) {
        updateTempRecord(`SWAPPING THESE ELEMENTS:
        \nThe leftmost element greater than the pivot is: ${tempElements[lp].value}.
        \nThe rightmost element less than the pivot is: ${tempElements[rp].value}.`); 
        saveAlgoState([tempElements[lp].originalId, tempElements[rp].originalId]); //semicolon necessary
        [tempElements[lp], tempElements[rp]] = [tempElements[rp], tempElements[lp]]
        setTempElements([...tempElements]) //Need to spread the array to trigger re-render
        lp++
        rp--
      }
    }
    if (lp > pivotIndex) {
      updateTempRecord(`PIVOT IS ALREADY AT CORRECT INDEX: Value at pivot is largest in passed subarray. The pivot element will remain at its current index`)
      saveAlgoState([pivot.originalId])
      setTempElements([...tempElements])       
      quickSort(start, end - 1)
    } else if (rp < 0) {
      updateTempRecord(`SWAPPING PIVOT AND LEFTMOST ELEMENT: Value at pivot is smallest in passed subarray. The pivot element will be 
      swapped with the leftmost element in the passed subarray ${tempElements[start].value}`)
      saveAlgoState([pivot.originalId, tempElements[start].originalId])
      const newPivotIndex = start;
      [tempElements[start], tempElements[pivotIndex]] = [tempElements[pivotIndex], tempElements[start]]
      setTempElements([...tempElements])
      quickSort(newPivotIndex + 1, end)
    } else {
      updateTempRecord(`SWAPPING PIVOT TO CORRECT INDEX: Swapping pivot ${tempElements[pivotIndex].value} with element at left pointer ${tempElements[lp].value}`)
      saveAlgoState([pivot.originalId, tempElements[lp].originalId])
      const newPivotIndex = lp;
      [tempElements[lp], tempElements[pivotIndex]] = [tempElements[pivotIndex],tempElements[lp]]
      setTempElements([...tempElements])
      quickSort(0, newPivotIndex - 1)
      quickSort(newPivotIndex + 1, end)
    }
  }

  const depthFirstSearch = () => {
    if (selectedElements.length !== 1) {
      alert("You must select exactly one element as the starting node.")
      return
    }
    const start = elements.find(element => element.id === selectedElements[0])
    let stack = []
    let visited = new Set()
    const graphEdgesCopy = deepCopy2DArray(graphEdges)
    stack.push(start)
    visited.add(start.id)
    while (stack.length > 0) {
      let currentNode = stack.pop()
      const edgesContainingNode = graphEdgesCopy.filter(n => n.indexOf(currentNode.id) !== -1)
      const adjacentNodes = edgesContainingNode.map(edge => {
        edge.splice(edge.indexOf(currentNode.id), 1)
        return edge
      })
      const unvisitedAdjacentNodes = []
      for (let i = 0; i < adjacentNodes.length; i++) {
        if (!visited.has(adjacentNodes[i][0])) {
          unvisitedAdjacentNodes.push(adjacentNodes[i][0])
        }
      }
      for (let i = 0; i < unvisitedAdjacentNodes.length; i++) {
        for (let j = 0; j < elements.length; j++) {
          if (unvisitedAdjacentNodes[i] === elements[j].id) {
            if (stack.indexOf(elements[j]) === -1) {
              stack.push(elements[j])
            }
          }
        }
      }
      updateTempRecord(`CURRENT NODE: ${currentNode.value}, STACK: ${stack.map((element) => element.value)}`)
      saveAlgoState(currentNode.id)
    }

  }

  const deepCopy2DArray = (data) => {
    const result = []
    for (let i = 0; i < data.length; i++) {
      result.push([...data[i]])
    }
    return result
  }

  const deepCopyArrayOfObjects = (data) => {
    return data.map(elem => ({...elem}))
  }

  const saveAlgoState = (affectedElements) => {
    const data = deepCopyArrayOfObjects(tempElements)
    algoState.current = {
      states:[...algoState.current.states, data],
      relevantElements:[...algoState.current.relevantElements, affectedElements],
      currentState: -1
    }
  }

  const resetAlgoState = () => {
    algoState.current = {
      states:[],
      relevantElements:[],
      currentState:-1
    }
  }

  const showStep = (goNext) => {
    const temp = []
    let tempCurrentState = algoState.current.currentState
    if (goNext) {
      if (tempCurrentState >= (algoState.current.states.length - 1)) { //- 1 ensures currentState isn't incremented out of index range
        alert("Algorithm is already complete.")
        return
      } else {
        algoState.current.currentState++
        tempCurrentState = algoState.current.currentState
      }
    } else {
      if (tempCurrentState < 1) {
        alert("Currently at the beginning of the algorithm.")
        return
      } else {
        algoState.current.currentState--
        tempCurrentState = algoState.current.currentState
      }
    }
    const currentStateElements = algoState.current.states[tempCurrentState]
    for (let i = 0; i < algoState.current.states[tempCurrentState].length; i++) {
      const newElement = {
        value: currentStateElements[i].value,
        id: currentStateElements[i].originalId,
        selected: currentStateElements[i].selected,
        highlighted: currentStateElements[i].highlighted
      }
      if (algoState.current.relevantElements[tempCurrentState].indexOf(newElement.id) !== -1) {
        newElement.highlighted = true
      } else {
        newElement.highlighted = false
      }
      temp.push(newElement)
    }
    setElements(temp)
    selectRecord(record[tempCurrentState].id) //highlights the record corresponding to the current algorithm step
  }


  const clearCanvas = () => {
    if (window.confirm("This will delete all data in the canvas and record. \n\nContinue?")) {
      setElements([])
      setRecord([])
      setGraphEdges([])
      resetAlgoState()
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
    if (!(currentStructure === "none")) {
      if (window.confirm("This will delete all existing records and elements. \n\nContinue?")) {
        resetAllStates()
        setCurrentStructure(dataStructure)
      } else {return}
    }
    setCurrentStructure(dataStructure)
  }

  const resetAllStates = () => {
    tempRecord.current = []
    setRecord([])
    setGraphEdges([])
    resetAlgoState()
    setElements([])
    setTempElements([])
    setCurrentStructure("none")
    setCurrentAlgorithm("none")
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
      currentAlgorithm={currentAlgorithm}
      setCurrentAlgorithm={setCurrentAlgorithm}
      showStep={showStep}
      resetAlgoState={resetAlgoState}
      depthFirstSearch={depthFirstSearch}
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
