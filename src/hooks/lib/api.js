import { racesActions } from '../../store/TheFountain';

const FIREBASE_DOMAIN = "https://xport-race-2-default-rtdb.firebaseio.com";
const RACES_EP = '/races.json'



export async function getAllRaces(dispatch) {
   const res = await fetch(`${FIREBASE_DOMAIN + RACES_EP}`);
   const data = await res.json();
   if (!res.ok) {
      throw new Error(data.message || "We could not get the races :(");
   }

   data.map((race) => {
      return dispatch(racesActions.addRaceToStore(race));
   });
}