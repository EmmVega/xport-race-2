import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import classes from './Register.module.css';

const Register = () => {
    const nicknameRef = useRef();
    const formRef = useRef();
    const [nickname, setNickname] = useState('Nickname');
    const history = useHistory();
    const RUNNERS = 'https://xport-race-2-default-rtdb.firebaseio.com/runners.json';
    const RACES = 'https://xport-race-2-default-rtdb.firebaseio.com/races.json'
    const params = useParams();
    const userEmail = useSelector(state => state.authStore.email);
    const [myRaces, setMyRaces] = useState([]);

    const renderNicknameHandler = () => {
        const enteredNickname = nicknameRef.current.value;
        setNickname(enteredNickname);
    }

    const registFetcher = () => {
        const registerForm = new FormData (formRef.current);
        const runner = {
            nickname: registerForm.get('nickname'),
            city: registerForm.get('city'),
            number: registerForm.get('number'),
            address: registerForm.get('address'),
            raceSelected: params.race,
            email: userEmail
        }
        fetch (RUNNERS, {
            method: 'POST',
            body: JSON.stringify(runner)
        });
    }

    useEffect(() => {
        const getMyRaces = async () => {
            const res = await fetch(RUNNERS);
            const data = await res.json();
            let fetchedRaces = [];
    
            for (const runner in data){
                if(userEmail === data[runner].email){
                    fetchedRaces.push({
                        race: data[runner].raceSelected,
                        nickname: data[runner].nickname
                    })
                }
            }
            setMyRaces(fetchedRaces)
        }
        getMyRaces();
    },[])

    const registerHandler = async evt => {
        evt.preventDefault();

        for (const race in myRaces){
            if (params.race == myRaces[race].race){
                alert(`YOU ARE ALREADY PRE-REGISTER IN THIS RACE AS ${myRaces[race].nickname}`)
                return
            }
        }                                //first, let's find out if we are already register in that race

        let wasSuccessful = undefined;
                                        //Let's find out if there're available places     
        const res = await fetch (RACES);
        const data = await res.json();
        for (const race in data){
            if (data[race].id == params.race){
                console.log(`LA CARRERA ELEGIDA ES ${data[race].name}`)
                console.log(`Y TENÍA ${data[race].avPlaces} LUGARES`)
                
                const avPlaces = data[race].avPlaces 
                if (avPlaces > 0){                              // let's overwrite the race resting 1 place 
                    fetch (`https://xport-race-2-default-rtdb.firebaseio.com/races/${params.race}.json`, { 
                        method: 'PUT',
                        body: JSON.stringify({
                            id: data[race].id,
                            name: data[race].name,
                            distance: data[race].distance,
                            price: data[race].price,
                            img: data[race].img,
                            avPlaces: data[race].avPlaces-1,
                        })
                    }) // last step, overwrite
                registFetcher(); // ...and then, register the runner
                wasSuccessful = 'true';
                console.log(`AHORA TIENE ${data[race].avPlaces} LUGARES`)
                } else {
                console.log(`YA NO QUEDAN LUGARES EN ${data[race].name}`);
                wasSuccessful = 'false';
                }
                break;
            }
        }
        history.push(`/runners/${params.race}/${wasSuccessful}`) // whatever happens, we're going here
    }
    
    return (
       <div className={classes.general}>

          <div className={classes.diploma}>
             <img
                src="https://imgur.com/ABpIPjF.jpg"
                alt="diploma"
                className={classes.image}
                />
             <div className={classes.diplomaText}>{nickname}</div>
          </div>

          <form
             className={classes.form}
             ref={formRef}
             onSubmit={registerHandler}
          >
             <label htmlFor="nickname">Nickname</label>
             <input
                type="text"
                name="nickname"
                ref={nicknameRef}
                onChange={renderNicknameHandler}
                required
             />
             <label htmlFor="city">City</label>
             <input type="text" name="city" required />
             <label htmlFor="number">Phone Number</label>
             <input
                type="number"
                name="number"
                className={classes.number}
                required
             />
             <label htmlFor="address">Where should we send your kit?</label>
             <input type="text" name="address" placeholder="Address" required />
             <button>Pre-Register!</button>
          </form>
       </div>
    );
}

export default Register;