import { configureStore, createSlice } from '@reduxjs/toolkit';

const RACESinitialState = {
    isRender: false,
    racesList: [] 
};
const RUNNERSinitialState = {
    isRender: false,
    runnersList: []    
};
const AuthInitialState = {
    isLoggedIn: false,
    token: '',
    username: 'user',
    email: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthInitialState,
    reducers: {
        login (state, userInfo){
            state.token = userInfo.payload.token;
            state.email = userInfo.payload.email;
            state.isLoggedIn = true;
        },
        logout (state){
            state.isLoggedIn = false;
            state.token = '';
        }
    }
})

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
    reducer: {racesStore: racesSlice.reducer, runnersStore: runnersSlice.reducer, authStore: AuthSlice.reducer}
})

export default fountain;
export const racesActions = racesSlice.actions;
export const runnersActions = runnersSlice.actions;
export const authActions = AuthSlice.actions
