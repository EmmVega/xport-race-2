import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import EventItem from './EventItem';
import classes from './Home.module.css';

const Home = () => {
   const RUNNERS =
      "https://xport-race-2-default-rtdb.firebaseio.com/runners.json";
   const userEmail = useSelector((state) => state.authStore.email);
   const listOfRaces = useSelector((state) => state.racesStore.racesList);
   const [racesInfo, setRacesInfo] = useState([]);

   let fetchedRaces = [];

   const fetchingRunners = async () => {
      const res = await fetch(RUNNERS);
      const data = await res.json();

      for (const runner in data) {
         if (userEmail === data[runner].email) {
            fetchedRaces.push({
               race: data[runner].raceSelected,
               nickname: data[runner].nickname,
            });
         }
      }
      setRacesInfo(fetchedRaces);
   };

   useEffect(() => {
      fetchingRunners();
   }, []);

   const listedInfo = racesInfo.map((race) => {
      console.log(listOfRaces[race.race].id);
      return (
         <>
            <EventItem
               img={listOfRaces[race.race].img}
               race={listOfRaces[race.race].name}
               nickname={race.nickname}
               key={listOfRaces[race.race].id}
               id={listOfRaces[race.race].id}
            />
         </>
      );
   });

   return (
      <>
         <div>Welcome</div>
         <section>These are your events:</section>
         <div className={classes.items}>
            {listedInfo.length === 0 ? "You have no races yet" : listedInfo}
         </div>
      </>
   );
}

export default Home;
