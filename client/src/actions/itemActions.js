import axios from "axios";
export const getAllItems=()=>async dispatch=>{

    dispatch({type:'GET_ITEMS_REQUEST'})

    try {
        const response = await axios.get('/api/items/getallitems')
        console.log(response);
        dispatch({type:'GET_ITEMS_SUCCESS' , payload : response.data})
       
    } catch (error) {
        dispatch({type:'GET_ITEMS_FAILED' , payload : error})
    }

}

export const getItemById=(itemid)=>async dispatch=>{

    dispatch({type:'GET_ITEMBYID_REQUEST'})

    try {
        const response = await axios.post('/api/items/getitembyid' , {itemid})
        console.log(response);
        dispatch({type:'GET_ITEMBYID_SUCCESS' , payload : response.data})
    } catch (error) {
        dispatch({type:'GET_ITEMBYID_FAILED' , payload : error})
    }

}

export const filterItems=(searchkey , category)=>async dispatch=>{

  
    dispatch({type:'GET_ITEMS_REQUEST'})

    try {
        var filteredItems ;
        const response = await axios.get('/api/items/getallitems')
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

export const addItem=(item)=>async dispatch=>{
    dispatch({type:'ADD_ITEM_REQUEST'})
    try {
        const response= await axios.post('/api/items/additem' , {item})
        console.log(response);
        dispatch({type:'ADD_ITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'ADD_ITEM_FAILED' , payload : error})
    }
}

export const editItem=(editeditem)=>async dispatch=>{
    dispatch({type:'EDIT_ITEM_REQUEST'})
    try {
        const response= await axios.post('/api/items/edititem' , {editeditem})
        console.log(response);
        dispatch({type:'EDIT_ITEM_SUCCESS'})
        window.location.href='/admin/itemlist'
    } catch (error) {
        dispatch({type:'EDIT_ITEM_FAILED' , payload : error})
    }
}

export const deleteItem=(itemid)=>async dispatch=>{

try {
    const response =await axios.post('/api/items/deleteitem' , {itemid})
    alert('ITEM Deleted Successfully')
    console.log(response);
    window.location.reload()
} catch (error) {
    alert('Something went wrong')
    console.log(error);
}
       

}
