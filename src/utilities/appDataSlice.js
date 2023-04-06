import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name:"appDataSlice",
    initialState:{
        apps:[],
        data:[],
        startDate:"2021-06-01",
        endDate:"2021-06-30",
    },
    reducers:{
        updateData(state, action){
            state.data = action.payload
        },
        updateAppData(state, action){
            state.apps = action.payload
        },
        updateStartDate(state, action){
            state.startDate = action.payload
        },
        updateEndDate(state, action){
            state.endDate = action.payload
        }
    }
});

export default appDataSlice.reducer;
export const {updateData, updateAppData, updateEndDate, updateStartDate} = appDataSlice.actions;