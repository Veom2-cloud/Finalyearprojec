import { editItem } from "./itemActions";

export const addToCart=(item , quantity )=>(dispatch , getState)=>{

    // if(Number(quantity)>Number(item.qty))
    // {
    //     alert("" + " " + item.qty+ " " +" of these items.")
    //     return;
    // }
    
    if(Number(quantity)>10 || Number(quantity) > Number(item.qty))
    {
        alert("You cannot add more than "+ Math.min(10,item.qty)+ " of same items.")
        return;
    }

    var cartItem = {
        name : item.name ,
        _id : item._id,
        image : item.image ,
        quantity : Number(quantity) ,
        qty: Number(item.qty),
        price: item.price,
        prices : item.price * quantity
    }
    
    dispatch({type:'ADD_TO_CART' , payload : cartItem})
    
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
    
    const editeditem = {
    _id: item._id,
    qty: item.qty - quantity,
    name : item.name,
    image: item.image,
    description: item.description,
    category: item.category,
    price: item.price,
    };
    dispatch(editItem(editeditem));

    alert("item added to cart")

}

export const deleteFromCart=(item)=>(dispatch , getState)=>{


     dispatch({type:'DELETE_FROM_CART' , payload:item})      
     const cartItems = getState().cartReducer.cartItems
     localStorage.setItem('cartItems' , JSON.stringify(cartItems))

     const editedcanteenitem = {
        _id: item._id,
        qty: item.qty,
        name : item.name,
        image: item.image,
        description: item.description,
        category: item.category,
        price: item.price,
      };
      dispatch(editItem(editedcanteenitem));

      alert("item deleted from cart")
  

}