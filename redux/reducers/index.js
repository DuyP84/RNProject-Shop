import { createStore, combineReducers } from "redux";
import { gameReducer } from "./gameReducers";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({
    
    games: gameReducer,
    profiles: profileReducer
})