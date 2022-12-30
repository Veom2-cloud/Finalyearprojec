export const addToCart=(item , quantity )=>(dispatch , getState)=>{

    var cartItem = {
        name : item.name ,
        _id : item._id,
        image : item.image ,
        quantity : Number(quantity) ,
        qty: Number(item.qty),
        price: item.price,
        prices : item.price * quantity

    }

    if(cartItem.quantity>cartItem.qty)
    {
        alert("You cannot add more than" + " " + cartItem.qty+ " " +"quantities")
    }
    
    else{
        if(cartItem.quantity<1)
        {
            dispatch({type:'DELETE_FROM_CART' , payload:item}) 
        }
        else{
            dispatch({type:'ADD_TO_CART' , payload : cartItem})
        }
       
    }
    

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
      


}

export const deleteFromCart=(item)=>(dispatch , getState)=>{


     dispatch({type:'DELETE_FROM_CART' , payload:item})      
     const cartItems = getState().cartReducer.cartItems
     localStorage.setItem('cartItems' , JSON.stringify(cartItems))


  

}