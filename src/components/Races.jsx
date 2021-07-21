import React, { useEffect } from 'react'
import RaceItem from './RaceItem';
import classes from './RaceItem.module.css';
import { useSelector, useDispatch} from 'react-redux'
import { racesActions } from '../store/TheFountain';


const Races = () => {
    const RACES = "https://xport-race-2-default-rtdb.firebaseio.com/races.json";
    // const [wasFetched, setWasFetched] = useState(false); no longer needed, we're using Redux
    const dispatch = useDispatch();
    const localData = useSelector(state => state.racesStore.racesList);
    const isRender = useSelector(state => state.racesStore.isRender)

    useEffect(() => {
        const fetchingData = async () => {
            const res = await fetch(RACES);
            const data =  await res.json();
            // setFetchedRaces(data); updating state with fetched data is no longer needed, we're updating Redux(Thefountain)
            data.map(race => {
                dispatch(racesActions.addRaceToStore(race));
            })
        }
        if (!isRender){
            fetchingData();
            dispatch(racesActions.setIsRender());
        }
    },[])
    
    const listedRaces = localData.map((race) => {
            return (
                <RaceItem
                key={race.id}
                name={race.name}
                distance={race.distance}
                price={race.price}
                img={race.img}
                />
                );
    });

    return (
        <>
        <div className={classes.subtitle}>
            Races near to you this month:
        </div>
        {listedRaces}
        </>
    )
}

export default Races;
