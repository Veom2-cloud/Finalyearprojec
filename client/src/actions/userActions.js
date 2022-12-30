import axios from 'axios';
import * as UserApi from "../api/users"

export const getAllUsers=()=>async dispatch=>{

    dispatch({type:'GET_USERS_REQUEST'})

    try {
        const response = await axios.get('/api/users/getallusers')
        console.log(response);
        dispatch({type:'GET_USERS_SUCCESS' , payload : response.data})
       
    } catch (error) {
        dispatch({type:'GET_USERS_FAILED' , payload : error})
    }

}

export const deleteUser=(userId)=>async dispatch=>{

    try {
        await axios.post('http://localhost:4000/api/users/delete', {userId})
        alert('User deleted successfully')
        window.location.reload()
    } catch (error) {
        alert('Something went wrong')
        console.log(error);
    }

}

