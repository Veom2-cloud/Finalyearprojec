import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterorder } from "../../actions/orderActions";

export default function Filterorder() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    return (
        <div className='container justify-content-center'>
            <div className="row justify-content-center ms-auto">

                    <div className="">
                      <input
                      onChange={(e)=>{setsearchkey(e.target.value)}}
                      value={searchkey} type="number" className="" placeholder="search order by otp"/>
                    </div>
                    
                    <div className="">
                       <button className='mt-3' onClick={()=>{dispatch(filterorder(searchkey))}}>FILTER</button>
                    </div>

            </div>
        </div>
    )
}
