export const payment =(state={} , action) =>{


    switch(action.type)
    {
        case 'PLACE_PAYMENT_REQUEST' : return{
            loading:true
        }
        case 'PLACE_PAYMENT_SUCCESS' : return{
          loading:false,
          success:true
      }
      case 'PLACE_PAYMENT_FAILED' : return{
          loading:false,
          error:action.payload
      }
      default : return state
    }

}


export const getUserpaymentReducer=(state={payments : []} , action)=>{

    switch(action.type)
    {
        case 'GET_USER_PAYMENTS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_USER_PAYMENTS_SUCCESS' : return{
            loading : false ,
            payments : action.payload
        }
        case 'GET_USER_PAYMENTS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}


export const getAllpaymentReducer=(state={payments : []} , action)=>{

    switch(action.type)
    {
        case 'GET_ALLPAYMENTS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_ALLPAYMENTS_SUCCESS' : return{
            loading : false ,
            payments : action.payload
        }
        case 'GET_ALLPAYMENTS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}