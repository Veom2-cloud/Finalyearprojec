export const OtpReducer =(state={} , action) =>{


    switch(action.type)
    {
        case 'PLACE_OTP_REQUEST' : return{
            loading:true
        }
        case 'PLACE_OTP_SUCCESS' : return{
          loading:false,
          success:true
      }
      case 'PLACE_OTP_FAILED' : return{
          loading:false,
          error:action.payload
      }
      default : return state
    }

}




export const getAllOtpReducer=(state={otps : []} , action)=>{

    switch(action.type)
    {
        case 'GET_OTP_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_OTP_SUCCESS' : return{
            loading : false ,
            orders : action.payload
        }
        case 'GET_OTP_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}
