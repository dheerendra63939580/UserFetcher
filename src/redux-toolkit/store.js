import { configureStore } from "@reduxjs/toolkit";
import dataSlice from './slice'
import filterSlice from "./filterSlice";
const store = configureStore({
    reducer: {
        apiData: dataSlice, // storing data manipulated by dataSlice
        filter: filterSlice  // storing data manipulated by filterSlice
    }
});
export {store}