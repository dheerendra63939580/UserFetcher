import React from 'react'
import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushData,sortById,sortByName,sortByAge } from '../redux-toolkit/slice'


import './Home.css'
import { addCountryFilter } from '../redux-toolkit/filterSlice'

const Home = () => {
    const [loader, setLoader] = useState(false)
    const filteredData = useSelector((state)=>state.apiData);
    const filter = useSelector((state)=>state.filter)
    const dispatch = useDispatch()
    const [skip,setSkip] = useState(0)
    async function getData() {
        try {
          setLoader(true)
            const result = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`)
            const data = await result.json();
            const arrObj = data.users.map((value)=>({
                id: value.id,
                image: value.image,
                fullName: `${value.firstName} ${value.maidenName} ${value.lastName}`,
                gender:value.gender === "male"?"M":"F",// storing male as M and female as F
                age: value.age,
                designation: value.company.title,
                state: value.address.state,
                country: value.company.address.country,
            }))
           
            for(let x of arrObj) {
                dispatch(pushData(x)) // pushing data to store
            }
            setLoader(false)
            
        }
        catch(err){console.log(err.message)}
    }
    function scrollHandler() {
        let totalHeight = document.documentElement.scrollHeight;
        let innerHeight = window.innerHeight;
        let topScroll = document.documentElement.scrollTop; // when to fetch data again
        if(totalHeight <= innerHeight + topScroll + 1)
            setSkip((pre)=>pre + 10)// increasing skip count by 10
        
    }
    
    useEffect(()=>{getData(); },[skip]) // first time fetching data and when the value of skip changes we  will fetch data
    useEffect(()=>{window.addEventListener('scroll',scrollHandler)
        return ()=>window.removeEventListener('scroll',scrollHandler)// clean up function
    },[])// adding scroll event
    
  return (
    <>
      <table className="table">
      <thead>
      <tr>
        <th className="arrow-container">
          ID 
          <span  onClick={()=>{dispatch(sortById("increasingOrder"))}} title="sort in ascending order">&uarr;</span>
          <span  onClick={()=>{dispatch(sortById(""))}}title="sort in descending order">&darr;</span>
        </th>
        <th>Image</th>
        <th className="arrow-container">
          Full Name
          <span  onClick={()=>{dispatch(sortByName("increasingOrder"))}}title="sort albhabatically">&uarr;</span>
          <span  onClick={()=>{dispatch(sortByName(""))}} title="sort reverse alphabatically">&darr;</span>
          </th>
        <th className="arrow-container">
          Demography
          <span  onClick={()=>{dispatch(sortByAge("increasingOrder"))}}title="sort by age in ascending order">&uarr;</span>
          <span  onClick={()=>{dispatch(sortByAge(""))}} title="sort by age in descending order">&darr;</span>
        </th>
        <th>Designation</th>
        <th>Location</th>
      </tr>
      </thead>
      <tbody>
        {filteredData.map(value=>{
          {if(value.gender === filter.gender && value.country === filter.country || value.gender === filter.gender && filter.country==="" || filter.gender === "" && value.country === filter.country){
            return <tr key={value.id}>{/* filter applied for various possibilites */}
            <td>{value.id}</td>
            <td><img src={value.image} alt="" /></td>
            <td>{value.fullName}</td>
            <td>{value.gender}/{value.age}</td>
            <td>{value.designation}</td>
            <td>{value.state}, {value.country}</td>
          </tr>
          } else if(filter.gender === "" && filter.country === "") { {/*for all users */}
            return <tr key={value.id}>
            <td>{value.id}</td>
            <td><img src={value.image} alt="" /></td>
            <td>{value.fullName}</td>
            <td>{value.gender}/{value.age}</td>
            <td>{value.designation}</td>
            <td>{value.state}, {value.country}</td>
          </tr>
          }
        }
        })}
       </tbody>
    </table>
    {loader&&<div className="loader">loading...</div>} {/* showing loading */}
    </>
  )
}

export default Home
