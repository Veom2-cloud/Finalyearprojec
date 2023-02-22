import axios from "axios";
export const getAllCanteenItems=()=>async dispatch=>{

    dispatch({type:'GET_CANTEENITEMS_REQUEST'})

    try {
        const response = await axios.get('/api/canteenitems/getallcanteenitems')
        console.log(response);
        dispatch({type:'GET_CANTEENITEMS_SUCCESS' , payload : response.data})
       
    } catch (error) {
        dispatch({type:'GET_CANTEENITEMS_FAILED' , payload : error})
    }

}

export const getCanteenItemById=(canteenitemid)=>async dispatch=>{

    dispatch({type:'GET_CANTEENITEMBYID_REQUEST'})

    try {
        const response = await axios.post('/api/canteenitems/getcanteenitembyid' , {canteenitemid})
        console.log(response);
        dispatch({type:'GET_CANTEENITEMBYID_SUCCESS' , payload : response.data})
    } catch (error) {
        dispatch({type:'GET_CANTEENITEMBYID_FAILED' , payload : error})
    }

}

export const filterItems=(searchkey , category)=>async dispatch=>{

  
    dispatch({type:'GET_ITEMS_REQUEST'})

    try {
        var filteredItems ;
        const response = await axios.get('/api/canteenitems/getallitems')
        filteredItems = response.data.filter(item=>item.name.includes(searchkey))
         
        if(category!='all')
        {
            filteredItems = response.data.filter(item=>item.category.toLowerCase()==category)

        }
        dispatch({type:'GET_ITEMS_SUCCESS' , payload : filteredItems})
    } catch (error) {
        dispatch({type:'GET_ITEMS_FAILED' , payload : error})
    }

}

export const addCanteenItem=(canteenitem)=>async dispatch=>{
    dispatch({type:'ADD_CANTEENITEM_REQUEST'})
    try {
        const response= await axios.post('/api/canteenitems/addcanteenitem' , {canteenitem})
        console.log(response);
        dispatch({type:'ADD_CANTEENITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'ADD_CANTEENITEM_FAILED' , payload : error})
    }
}

export const editcanteenItem=(editedcanteenitem)=>async dispatch=>{
    dispatch({type:'EDIT_CANTEENITEM_REQUEST'})
    try {
        const response= await axios.post('/api/canteenitems/editcanteenitem' , {editedcanteenitem})
        console.log(response);
        dispatch({type:'EDIT_CANTEENITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'EDIT_CANTEENITEM_FAILED' , payload : error})
    }
}

export const deletecanteenItem=(canteenitemid)=>async dispatch=>{

try {
    const response =await axios.post('/api/canteenitems/deletecanteenitem' , {canteenitemid})
    alert('CANTEEN ITEM Deleted Successfully')
    console.log(response);
    window.location.reload()
} catch (error) {
    alert('Something went wrong')
    console.log(error);
}
       

}
