import React from 'react'
import classes from './RaceItem.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RaceItem = (props) => {
   const isAuth = useSelector(state => state.authStore.isLoggedIn);

    return (
       <div className={classes.item}>
           <Link to ={isAuth ? `/register/${props.id}` : `/login/${props.id}`}><img src={props.img} className={classes.image} alt='race example'/></Link>
          <div className={classes.description}>
             <p>{props.name}</p>
             <p>{props.distance}</p>
             <p>${props.price}</p>
          </div>

       </div>
    );
}

export default RaceItem;
