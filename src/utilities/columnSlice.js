import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit'

const columnSlice = createSlice({
    name:"columnSlice",
    initialState:{
        columns:[
            {order:1, Displayname:"Date", isVisible:true, name:"date"},
            {order:2, Displayname:"App Name", isVisible:true , name:"app_id"},
            {order:3, Displayname:"AD Request", isVisible:true, name:"requests"},
            {order:4, Displayname:"AD Response", isVisible:true, name:"responses"},
            {order:5, Displayname:"Impression", isVisible:true, name:"impressions"},
            {order:6, Displayname:"Clicks", isVisible:true, name:"clicks"},
            {order:7, Displayname:"Revenue", isVisible:true, name:"revenue"},
            {order:8, Displayname:"Fill Rate", isVisible:true, name:"fill_rate"},
            {order:9, Displayname:"CTR", isVisible:true, name:"CTR"},
        ]
    },

    reducers:{
        changeVisible(state, action){
            const obj = state.columns.find((col) => col.order === action.payload);
            if(obj){
                obj.isVisible = !(obj.isVisible)
            }
        },
        updateColList(state, action){
            state.columns = action.payload;
        }
    }
});

export default columnSlice.reducer;
export const {changeVisible,updateColList} = columnSlice.actions;