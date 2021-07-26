import React from 'react'
import { useEffect } from 'react'

const Home = () => {
    const name = '' 
    const RUNNERS = 'https://xport-race-2-default-rtdb.firebaseio.com/runners.json';


    // useEffect(() => {

    //     fetch (RUNNERS)
    //     .then(res => {

    //     })

    // },[])

    return (
        <>
        <div>
            Welcome {name}
        </div>
        <section>These are your events:</section>
        </>
    )
}

export default Home;
