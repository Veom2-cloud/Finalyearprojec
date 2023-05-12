import { editcanteenItem } from "./Canteenitemactions";

export const addToCart=(canteenitem , quantity )=>(dispatch , getState)=>{

    if(Number(quantity)>10 || Number(quantity) > Number(canteenitem.qty))
    {
        alert("You cannot add more than "+ Math.min(10,canteenitem.qty)+ " of same items.")
        return;
    }

    var cartCanteenItem = {
        name : canteenitem.name ,
        _id : canteenitem._id,
        image : canteenitem.image ,
        quantity : Number(quantity) ,
        qty: Number(canteenitem.qty),
        price: canteenitem.price,
        prices : canteenitem.price * quantity
    }

    dispatch({type:'ADD_TO_CANTEENCART' , payload : cartCanteenItem})

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
    
    const editedcanteenitem = {
        _id: canteenitem._id,
        qty: canteenitem.qty - quantity,
        name : canteenitem.name,
        image: canteenitem.image,
        description: canteenitem.description,
        category: canteenitem.category,
        price: canteenitem.price,
      };
      dispatch(editcanteenItem(editedcanteenitem))

      alert("item added to cart")

}

export const deleteFromCart=(item)=>(dispatch , getState)=>{


     dispatch({type:'DELETE_FROM_CANTEENCART' , payload:item})      
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
      dispatch(editcanteenItem(editedcanteenitem))
  
      alert("item deleted from cart")

}