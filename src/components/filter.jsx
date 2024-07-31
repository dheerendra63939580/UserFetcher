import React from 'react'
import { useState } from 'react'
import './filter.css'
import { useDispatch } from 'react-redux'
import {addCountryFilter,addGenderFilter} from '../redux-toolkit/filterSlice'
const Filter = () => {
    const dispatch = useDispatch()
    function gender(e) {
        let x;
        if(e.target.value==="All") 
            x = ""
        else if(e.target.value === "Male")
            x = "M" // changing value according to Stored value in store because i have stored male as M
        else if(e.target.value === "Female")
            x = "F"
        dispatch(addGenderFilter(x))
    }
    
  return (
    <>
        <div className="filter-container">
            <span>Employess</span>
            <div className="filter">
                <span className="material-symbols-outlined">filter_alt</span>
                <form action="">
                    <div>
                    <label htmlFor="country">country: </label>
                    <select id="country" defaultValue="All" onChange={(e)=>dispatch(addCountryFilter(e.target.value==="All"?"": e.target.value))}> {/*changing value All to empty string */}
                        <option value="All">All</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                        <option value="Austrelia">Austrelia</option>
                    </select>
                    </div>
                    <div>
                    <label htmlFor="gender">gender: </label>
                    <select id="gender" defaultValue="All" onChange={gender}>
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Filter
