import React from 'react'
import classes from './RaceItem.module.css';
import { Link } from 'react-router-dom';

const RaceItem = (props) => {
    return (
       <div className={classes.item}>
           <Link to ={`/login/${props.id}`}><img src={props.img} className={classes.image} alt='race example'/></Link>
          <div className={classes.description}>
             <p>{props.name}</p>
             <p>{props.distance}</p>
             <p>${props.price}</p>
          </div>

       </div>
    );
}

export default RaceItem;
