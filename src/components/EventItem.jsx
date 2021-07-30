import React from 'react'
import classes from './EventItem.module.css';

const EventItem = (props) => {

    return (
        <div className={classes.component}>
            <p>{props.race}</p>
            <img src={`${props.img}`} alt="raceImage"  className={classes.image}/>
            Register as {props.nickname}
        </div>
    )
}

export default EventItem;
