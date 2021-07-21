import React from 'react'

const RunnerItem = (props) => {
    return (
        <div key={props.key}>
            RUNNER: {props.nickname} from {props.city}
        </div>
    )
}

export default RunnerItem;
