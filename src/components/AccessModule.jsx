import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import classes from './AccessModule.module.css';

const AccessModule = () => {
    const [haveAccount, setHaveAccount] = useState(true);
    const history = useHistory();

    const changeModuleHandler = () => {
        setHaveAccount(!haveAccount);
    }

    const loginHandler = evt => {
        evt.preventDefault();
        
        //validation
        history.push('/register')
    }

    return (
       <div className={classes.general}>
          <header className={classes.title}>
             {haveAccount
                ? "Please, enter your credentials"
                : "Please, create an account first"}
          </header>
          <form className={classes.form} onSubmit={loginHandler}>
             <label htmlFor="email">Email:</label>
             <input type="email" placeholder="email" required name='email' />
             <label htmlFor="password">Password:</label>
             <input type="password" placeholder="password" name='password' required />
             <button>{haveAccount ? "Login" : "Create Account"}</button>
          </form>
          <p className={classes.options} onClick={changeModuleHandler}>
             {haveAccount ? "Don't have an account?" : "I have an account!"}
          </p>
       </div>
    );
}

export default AccessModule;
