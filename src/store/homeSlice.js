import { createSlice } from "@reduxjs/toolkit";

const homeSlice=createSlice({
    name:"home",
    initialState:{
        url:{},
        genres:{}, 
    },
    reducers:{
        getApiconfiguration:(state,action)=>{
            state.url=action.payload
        },
        getGenres:(state,action)=>{
            state.genres=action.payload;
        }
    }
}) 

export const homeAction=homeSlice.actions;
export default homeSlice;