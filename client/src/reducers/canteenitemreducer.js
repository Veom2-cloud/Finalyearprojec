export const getAllCanteenitemsReducer=(state={canteenitems : [] } , action)=>{

    switch(action.type)
    {
        case 'GET_CANTEENITEMS_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_CANTEENITEMS_SUCCESS' : return{
            loading : false ,
            canteenitems : action.payload
        }
        case 'GET_CANTEENITEMS_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}

export const getCanteenItemByIdReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'GET_CANTEENITEMBYID_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'GET_CANTEENITEMBYID_SUCCESS' : return{
            loading : false ,
            canteenitem : action.payload
        }
        case 'GET_CANTEENITEMBYID_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}

export const addCanteenItemReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'ADD_CANTEENITEM_REQUEST' : return{
            loading : true,
            ...state
        }
        case 'ADD_CANTEENITEM_SUCCESS' : return{
            loading : false,
            successes : true,
        }
        case 'ADD_CANTEENITEM_FAILED' : return{
            error : action.payload ,
            loading : false
        }
        default : return state
    }

}

export const editCanteenItemReducer=(state={ } , action)=>{

    switch(action.type)
    {
        case 'EDIT_CANTEENITEM_REQUEST' : return{
            editloading : true,
            ...state
        }
        case 'EDIT_CANTEENITEM_SUCCESS' : return{
            editloading : false ,
            editsuccess : true,
        }
        case 'EDIT_CANTEENITEM_FAILED' : return{
            editerror : action.payload ,
            editloading : false
        }
        default : return state
    }

}