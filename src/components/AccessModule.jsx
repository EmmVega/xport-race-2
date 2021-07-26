import React, { useState } from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { authActions } from '../store/TheFountain';
import classes from './AccessModule.module.css';

const AccessModule = () => {
    const [haveAccount, setHaveAccount] = useState(true);
    const history = useHistory();
    const passwordRef = useRef();
    const emailRef = useRef();
    const [passIsValid, setPassIsValid] = useState(false);
    const [passWasTouched, setPassWasTouched] = useState(false);
    const params = useParams();
    const KEY = 'AIzaSyDt5ukiOoY3qnM-BTGpsEk8jDu5YS-F9fU'
    const signUpEP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`
    const signInEP = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`
    const dispatch = useDispatch();

    const changeModuleHandler = () => {
        setHaveAccount(!haveAccount);
    }

    const signUpHandler = (evt) => {
      evt.preventDefault();
      if (!passIsValid || !passWasTouched) return;

      const enteredEmail = emailRef.current.value;
      const enteredPass = passwordRef.current.value;

      fetch (signUpEP, {
         method: 'POST',
         body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass, 
            returnSecureToken: true
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      }).then (res => {
         if (!res.ok){
            return res.json().then(data => {
               console.log(data);
            })
         } else {
            setHaveAccount(true);
            alert('Welcome to Xport!');
         }
      })
    }

    const loginHandler = evt => {
       evt.preventDefault();

       if (!passIsValid || !passWasTouched) return;

       const enteredEmail = emailRef.current.value;
       const enteredPass = passwordRef.current.value;

       fetch(signInEP, {
          method: "POST",
          body: JSON.stringify({
             email: enteredEmail,
             password: enteredPass,
             returnSecureToken: true,
          }),
          headers: {
             "Content-Type": "application/json",
          },
       })
          .then((res) => {
             if (res.ok) {
                return res.json().then(data => {
                   dispatch(authActions.login({token: data.idToken, email: data.email}))
                   history.push(`/register/${params.race}`);
                })
             } else {
                return res.json().then(data => {
                   throw new Error(data.error.message);
                })
             }
          })
          .catch((Error) => {
             console.log(Error)
             alert(Error);
          });
    }

    const passValidHandler = () => { // to check if after the first try user got it right
       const enteredPass = passwordRef.current.value;
       if (enteredPass.length <= 7 && enteredPass.length > 0){
          setPassIsValid(false);
       } else {
          setPassIsValid(true);
       }
       setPassWasTouched(true);
    }

    const validatingHandler = () => { // to check if the pass is already correct with each type
       const passEntered = passwordRef.current.value;
       if (!passIsValid && passEntered.length > 7){
          setPassIsValid(true);
       } else {
          setPassIsValid(false);
       }
    }

    return (
       <div className={classes.general}>
          <header className={classes.title}>
             {haveAccount
                ? "Please, enter your credentials"
                : "Please, create an account first"}
          </header>
          <form
             className={classes.form}
             onSubmit={haveAccount ? loginHandler : signUpHandler}
          >
             <label htmlFor="email">Email:</label>
             <input
                type="email"
                placeholder="email"
                required
                name="email"
                ref={emailRef}
             />
             <label htmlFor="password">Password:</label>
             <input
                type="password"
                placeholder="password"
                name="password"
                required
                ref={passwordRef}
                onBlur={passValidHandler}
                onChange={validatingHandler}
             />
             {!passIsValid && passWasTouched && (
                <p className={classes.validation}>
                   Pass must be longer than 7 characters
                </p>
             )}
             <button disabled={!passIsValid && passWasTouched}>
                {haveAccount ? "Login" : "Create Account"}
             </button>
          </form>
          <p className={classes.options} onClick={changeModuleHandler}>
             {haveAccount ? "Don't have an account?" : "I have an account!"}
          </p>
       </div>
    );
}

export default AccessModule;
