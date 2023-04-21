import { combineReducers } from "@reduxjs/toolkit"
import airbnbData from "./airbnbData"

const reducers = combineReducers({airbnbData})

export default reducers

//le fichier permettera d'ajouter d'autres reducers si besoin