import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Layout = (props) => {
    return (
       <div>
          <header className="App-header">
             <Link to='/' className='App-header'>X P O R T - R U N N I N G</Link>
          </header>
          {props.children}
       </div>
    );
}

export default Layout;
