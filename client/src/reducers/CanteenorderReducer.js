
export const placeCanteenOrderReducer =(state={} , action) =>{


    switch(action.type)
    {
        case 'PLACE_CANTEENORDER_REQUEST' : return{
            loading:true
        }
        case 'PLACE_CANTEENORDER_SUCCESS' : return{
          loading:false,
          success:true
      }
      case 'PLACE_CANTEENORDER_FAILED' : return{
          loading:false,
          error:action.payload
      }
      default : return state
    }

}


export const getUserCanteenOrdersReducer=(state={canteenorders : []} , action)=>{

    switch(action.type)
    {
        case 'GET_USER_CANTEENORDERS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_USER_CANTEENORDERS_SUCCESS' : return{
            loading : false ,
            canteenorders : action.payload
        }
        case 'GET_USER_CANTEENORDERS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}


export const getAllCanteenOrdersReducer=(state={canteenorders : []} , action)=>{

    switch(action.type)
    {
        case 'GET_ALLCANTEENORDERS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_ALLCANTEENORDERS_SUCCESS' : return{
            loading : false ,
            canteenorders : action.payload
        }
        case 'GET_ALLCANTEENORDERS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}