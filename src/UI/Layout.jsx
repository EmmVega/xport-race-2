import React, {useState, useEffect} from 'react';
import '../App.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, racesActions } from '../store/TheFountain';


const Layout = (props) => {
   const isAuth = useSelector(state => state.authStore.isLoggedIn)
   const dispatch = useDispatch();
   const initialToken = localStorage.getItem('token');
   const [tokenStorage, setToken] = useState(initialToken);
   const history = useHistory();
   const USERDATAKEY = 'AIzaSyDt5ukiOoY3qnM-BTGpsEk8jDu5YS-F9fU';
   const getDataUserEP = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${USERDATAKEY}`;
   const RACES = "https://xport-race-2-default-rtdb.firebaseio.com/races.json";
   const isRender = useSelector(state => state.racesStore.isRender);
   


   if (tokenStorage !== null) {
      fetch (getDataUserEP, {
         method: 'POST',
         body: JSON.stringify({
            idToken: tokenStorage
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      }).then(res => {
         return res.json().then ( data => {
            // console.log('hola')
            // console.log(data)
            // console.log(tokenStorage)
            if (data.users == undefined) return;
            const userEmail = data.users[0].email
            dispatch(authActions.login({token: tokenStorage, email: userEmail}))
         })
      })
  }

  useEffect(() => {
   const fetchingData = async () => {
       const res = await fetch(RACES);
       const data =  await res.json();
       // setFetchedRaces(data); updating state with fetched data is no longer needed, we're updating Redux(Thefountain)
       data.map(race => {
           return dispatch(racesActions.addRaceToStore(race));
       })
   }
   if (!isRender){
       fetchingData();
       dispatch(racesActions.setIsRender());
   }
},[dispatch, isRender])

   const logoutHandler = () => {
      localStorage.removeItem('token');
      setToken(null)
      dispatch(authActions.logout());
      history.push('/');
   }

    return (
       <div>
          <header className="App-header">
             <Link to="/" className="App-header">
                X P O R T - R U N N I N G
             </Link>
          </header>

          {isAuth && (
             <nav className="nav">
                <ul className="ulItem">
                   <li className="liItem">
                      <Link to="/home" className="link">
                         HOME
                      </Link>
                   </li>
                   <li className='liItem' to='/' onClick={logoutHandler}>
                        <Link className='link' to={''}>
                        Logout 
                        </Link>
                   </li>
                </ul>
             </nav>
          )}
          {props.children}
       </div>
    );
}

export default Layout;
