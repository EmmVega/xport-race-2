import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = (props) => {
   const isAuth = useSelector(state => state.authStore.isLoggedIn)

    return (
       <div>
          <header className="App-header">
             <Link to='/' className='App-header'>X P O R T - R U N N I N G</Link>
          </header>

             {isAuth && (<nav className='nav'>
                <ul className='ulItem'>
                   <li className='liItem'>
                      <Link to='/home' className='link'>
                      HOME
                      </Link>
                      </li>
                </ul>
             </nav>)}
          {props.children}
       </div>
    );
}

export default Layout;
