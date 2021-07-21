import { configureStore, createSlice } from '@reduxjs/toolkit';

const RACESinitialState = {
    isRender: false,
    racesList: [] 
};
const RUNNERSinitialState = {
    isRender: false,
    runnersList: []    
};

// const renderInitialState = {status: false};

// const isRenderSlice = createSlice({
//     name: 'isRender',
//     initialState: renderInitialState,
//     reducers: {
//         setIsRender(state){
//             state.status = !state.status;
//         }
//     }
// })

const runnersSlice = createSlice({
    name: 'runners',
    initialState: RUNNERSinitialState,
    reducers: {
        addRunnerToStore (state, runner){
            state.runnersList.push(runner.payload)
        },
        setIsRender(state){
            state.isRender = !state.isRender;
        },
        cleanRunnerStore(state){
            state.runnersList = [];
        }
    }
})

const racesSlice = createSlice({
    name: 'races',
    initialState: RACESinitialState,
    reducers: {
        addRaceToStore(state, race){
            state.racesList.push(race.payload);
        },
        setIsRender(state){
            state.isRender = !state.isRender;
        }
    }
})

const fountain = configureStore ({
    reducer: {racesStore: racesSlice.reducer, runnersStore: runnersSlice.reducer}
})

export default fountain;
export const racesActions = racesSlice.actions;
export const runnersActions = runnersSlice.actions;
