export const registerUserReducer =(state={} , action) =>{


      switch(action.type)
      {
          case 'USER_REGISTER_REQUEST' : return{
              loading:true
          }
          case 'USER_REGISTER_SUCCESS' : return{
            loading:false,
            success:true
        }
        case 'USER_REGISTER_FAILED' : return{
            loading:false,
            error:action.payload
        }
        default : return state
      }

}

export const getuserByIdReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'GET_USERBYID_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_USERBYID_SUCCESS' : return{
            loading : false ,
            user : action.payload
        }
        case 'GET_USERBYID_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}

export const loginUserReducer =(state={} , action) =>{


    switch(action.type)
    {
        case 'USER_LOGIN_REQUEST' : return{
            loading:true
        }
        case 'USER_LOGIN_SUCCESS' : return{
          loading:false,
          success:true,
          user : action.payload,
          
      }
      case 'USER_LOGIN_FAILED' : return{
          loading:false,
          error:action.payload
      }
      default : return state
    }

}

export const getAllUsersReducer=(state={users : [] } , action)=>{

    switch(action.type)
    {
        case 'GET_USERS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_USERS_SUCCESS' : return{
            loading : false ,
            users : action.payload
        }
        case 'GET_USERS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}


export const edituserReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'EDIT_USER_REQUEST' : return{
            editloading : true,
            ...state
        }
        case 'EDIT_USER_SUCCESS' : return{
            editloading : false ,
            editsuccess : true,
        }
        case 'EDIT_USER_FAILED' : return{
            editerror : action.payload ,
            editloading : false
        }
        default : return state
    }

}