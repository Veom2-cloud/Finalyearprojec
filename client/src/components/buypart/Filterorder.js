import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterorder } from "../../actions/orderActions";
import "../css/Filterorder.css"

export default function Filterorder({searchkey,setsearchkey}) {
    const dispatch = useDispatch()
    return (
            <div className="filter">
                <div className="filterbox">    
                    <div className="searchbox">
                      <input id = "searchinput"
                      onChange={(e)=>{setsearchkey(e.target.value)}}
                      value={searchkey} type="text" className="" placeholder="search order by name"/>
                    </div>
                    
                    {/* <div className="search">
                       <button className='mt-3' onClick={ setsearchkey(msg)}>FILTER</button>
                    </div>  */}
                </div>
            </div>
    )
}
