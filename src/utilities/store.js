import { configureStore } from "@reduxjs/toolkit";
import columnSlice from "./columnSlice";
import settingsSlice from "./settingsSlice";
import appDataSlice from "./appDataSlice";

const store = configureStore({
    reducer:{
        columns: columnSlice,
        settings:settingsSlice,
        data:appDataSlice
    }
});

export default store