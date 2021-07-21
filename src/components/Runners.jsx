import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runnersActions } from '../store/TheFountain';
import RunnerItem from './RunnerItem';
import classes from './Runners.module.css';

const Runners = () => {
    const RUNNERS = 'https://xport-race-2-default-rtdb.firebaseio.com/runners.json';
    const dispatch = useDispatch();
    const localRunners = useSelector(state => state.runnersStore.runnersList);

       useEffect(() => {
          dispatch(runnersActions.cleanRunnerStore());
          const fetchingRunners = async () => {
             const res = await fetch(RUNNERS);
             const data = await res.json();

             for (const runnerId in data) {
                dispatch(
                   runnersActions.addRunnerToStore({
                      id: runnerId,
                      nickname: data[runnerId].nickname,
                      city: data[runnerId].city,
                      number: data[runnerId].number,
                      address: data[runnerId].number,
                   })
                );
             }
          };
          fetchingRunners();
          console.log('ejectuda')
       }, []);

       const renderedRunners = localRunners.map((runner) => (
          <RunnerItem
             key={runner.id}
             nickname={runner.nickname}
             city={runner.city}
          />
       ));
    
    return (
        <div>
            <header className={classes.header}>Congratulations! We'll send your kit ASAP</header>
            <main className={classes.main}>Meanwhile, take a look at other participants on the same race:</main>
            {renderedRunners}
        </div>
    )
}

export default Runners;
