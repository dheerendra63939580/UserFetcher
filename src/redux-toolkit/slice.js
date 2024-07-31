import {createSlice} from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {
        pushData: function (state,action) {
            state.push(action.payload)
        },
        sortById: (state,action)=>{
            if(action.payload === 'increasingOrder') {// i am receiving data in increasing order, in case i will receive in random order using compare function
                state.sort((a,b)=>a.id - b.id);
            }
            else {
                state.sort((a,b)=>b.id - a.id) // for sorting in descending order using compare function
            }
            
        },
        sortByName: (state,action) => {
            if(action.payload === 'increasingOrder') {
                state.sort((a,b)=> a.fullName.localeCompare(b.fullName))
            }// localeCompare compares two strings
            else {
                state.sort((a,b)=>b.fullName.localeCompare(a.fullName))
            }
        },
        sortByAge: (state,action) =>{
            if(action.payload === "increasingOrder") {
                state.sort((a,b)=>a.age - b.age)
            }
            else {
                state.sort((a,b)=>b.age - a.age)
            }
        }
        
    }
})
export const {pushData,sortById,sortByName, sortByAge} = dataSlice.actions;
export default dataSlice.reducer;