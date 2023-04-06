import { createSlice } from "@reduxjs/toolkit";

const SettingSlice = createSlice({
    name: "settingSlice",
    initialState:{
        isSettingVisible:false
    },

    reducers:{
        toggleSetingVisible(state){
            state.isSettingVisible = !state.isSettingVisible;
        }
    }
});

export default SettingSlice.reducer;
export const {toggleSetingVisible} = SettingSlice.actions;
