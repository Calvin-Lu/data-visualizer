import React from 'react'
import Button from 'react-bootstrap/Button'
import Draggable from 'react-draggable'

const ControlBox = ( { showStep, currentAlgorithm } ) => {
    return (
        <div>
            {currentAlgorithm !== "none" ?
                <Draggable>
                    <div className="control-box">
                        <Button className="btn-warning control-box-button" onClick={() => showStep(false)}>
                            &larr; Prev Step
                        </Button>
                        <Button className="btn-warning control-box-button" onClick={() => showStep(true)}>
                            Next Step &rarr;
                        </Button>
                    </div>
                </Draggable>
            : null}
        </div>
    )
}

export default ControlBox
