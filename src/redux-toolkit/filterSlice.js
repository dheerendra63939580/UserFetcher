import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "dataForFilter",
    initialState: {country: "", gender: ""},
    reducers: {
        addCountryFilter: (state,action) => {
            state.country = action.payload;  
        },
        addGenderFilter: function (state,action) {
            state.gender = action.payload
        }
    }
})
export const {addCountryFilter,addGenderFilter} = filterSlice.actions;
export default filterSlice.reducer;