import React from 'react'
import RaceItem from './RaceItem';
import classes from './RaceItem.module.css';
import { useSelector } from 'react-redux'
import LoadingSpinner from '../UI/LoadingSpinner';
// import { getAllRaces } from '../hooks/lib/api';
// import useHttp from '../hooks/use-fetch';

const Races = () => {
    // const [wasFetched, setWasFetched] = useState(false); no longer needed, we're using Redux
    const localData = useSelector(state => state.racesStore.racesList);

    
    const listedRaces = localData.map((race) => {
            return (
                <RaceItem
                key={race.id}
                name={race.name}
                distance={race.distance}
                price={race.price}
                img={race.img}
                id={race.id}
                />
                );
    });



    return (
        <>
        <div className={classes.subtitle}>
            Races near to you this month:
        </div>
        {listedRaces.length == 0 ? <LoadingSpinner/> : listedRaces}        
        </>
    )
}

export default Races;
