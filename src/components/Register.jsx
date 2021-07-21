import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classes from './Register.module.css';

const Register = () => {
    const nicknameRef = useRef();
    const formRef = useRef();
    const [nickname, setNickname] = useState('Nickname');
    const history = useHistory();
    const RUNNERS = 'https://xport-race-2-default-rtdb.firebaseio.com/runners.json';

    const renderNicknameHandler = () => {
        const enteredNickname = nicknameRef.current.value;
        setNickname(enteredNickname);
    }

    const registerHandler = evt => {
        evt.preventDefault();
        const registerForm = new FormData (formRef.current);
        const runner = {
            nickname: registerForm.get('nickname'),
            city: registerForm.get('city'),
            number: registerForm.get('number'),
            address: registerForm.get('address'),
        }
        fetch (RUNNERS, {
            method: 'POST',
            body: JSON.stringify(runner)
        });
        history.push(`/register/id?fetch=true`)
    }
    
    return (
        <div className={classes.general}>
            <form className={classes.form} ref={formRef} onSubmit={registerHandler}>
                <label htmlFor="nickname">Nickname</label>
                <input type="text" name='nickname' ref={nicknameRef} onChange={renderNicknameHandler}/>
                <label htmlFor="city">City</label>
                <input type="text" name='city'/>
                <label htmlFor="number">Phone Number</label>
                <input type="number" name='number' className={classes.number}/>
                <label htmlFor="address">Where should we send your kit?</label>
                <input type="text" name='address' placeholder='Address'/>
                <button>Register!</button>
            </form>
            <img src="https://imgur.com/ABpIPjF.jpg" alt="diploma" className={classes.image} />
            <div className={classes.diploma}>{nickname}</div>
        </div>
    )
}

export default Register;