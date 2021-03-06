import './App.css';
// import Races from './components/Races';
import {Redirect, Route, Switch} from 'react-router-dom';
// import AccessPage from './pages/AccessPage';
import Layout from './UI/Layout';
// import Register from './components/Register';
import React, { Suspense } from 'react';
// import Home from './components/Home';
import { useSelector } from 'react-redux';
import LoadingSpinner from './UI/LoadingSpinner';
// import Runners from './components/Runners';

const Runners = React.lazy(() => import ('./components/Runners'));
const Home = React.lazy(() => import ('./components/Home'));
const Register = React.lazy(() => import ('./components/Register'));
const AccessPage = React.lazy(() => import ('./pages/AccessPage'));
const Races = React.lazy(() => import ('./components/Races'));

function App() {

  const isAuth = useSelector(state => state.authStore.isLoggedIn)

  return (
     <Switch>
        <Layout>
           <Suspense fallback={<LoadingSpinner/>}>
              <Route path="/" exact component={Races} />
              <Route path="/login/:race" component={AccessPage} />
              <Route path="/register/:race/" component={Register} exact />
              <Route path="/runners/:race/:successful" component={Runners} />
              {isAuth && <Route path="/home" component={Home} />}

              {/* <Route path="*">
                 <Redirect to="/" />
              </Route> */}
           </Suspense>
        </Layout>
     </Switch>
  );
}

export default App;
