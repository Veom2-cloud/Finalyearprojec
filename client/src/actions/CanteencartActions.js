export const addToCart=(canteenitem , quantity )=>(dispatch , getState)=>{

    var cartCanteenItem = {
        name : canteenitem.name ,
        _id : canteenitem._id,
        image : canteenitem.image ,
        quantity : Number(quantity) ,
        qty: Number(canteenitem.qty),
        price: canteenitem.price,
        prices : canteenitem.price * quantity

    }

    if(cartCanteenItem.quantity>cartCanteenItem.qty)
    {
        alert("You cannot add more than" + " " + cartCanteenItem.qty+ " " +"quantities")
    }
    
    else{
        if(cartCanteenItem.quantity<1)
        {
            dispatch({type:'DELETE_FROM_CANTEENCART' , payload:canteenitem}) 
        }
        else{
            dispatch({type:'ADD_TO_CANTEENCART' , payload : cartCanteenItem})
        }
       
    }
    

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
      


}

export const deleteFromCart=(item)=>(dispatch , getState)=>{


     dispatch({type:'DELETE_FROM_CANTEENCART' , payload:item})      
     const cartItems = getState().cartReducer.cartItems
     localStorage.setItem('cartItems' , JSON.stringify(cartItems))


  

}