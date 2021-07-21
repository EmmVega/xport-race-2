import './App.css';
import Races from './components/Races';
import {Redirect, Route, Switch} from 'react-router-dom';
import AccessPage from './pages/AccessPage';
import Layout from './UI/Layout';
import Register from './components/Register';
import React, { Suspense } from 'react';
// import Runners from './components/Runners';

const Runners = React.lazy(() => import ('./components/Runners'));

function App() {
  return (
    <Switch>
    <Layout>
    <Suspense fallback={<p>Loading...</p>}>
    <Route path='/' exact component={Races}/>
    <Route path='/login' component={AccessPage}/>
    <Route path='/register' component={Register} exact/>
    {/* <Route path='/register/:id' >
      <Runners/>
    </Route> */}
        <Route path='/register/:id' component={Runners} />

    <Route path='*'>
      <Redirect to='/'/>
    </Route>
    </Suspense>
    </Layout>
    </Switch>
  );
}

export default App;
