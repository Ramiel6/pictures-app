import { combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const imgs =  [
    {
        picUrl: 'https://i.pinimg.com/originals/31/c6/21/31c621f2c0f439057942328c2dfad9db.jpg',
        linkers: [],
        description: 'aaaaaaaa',
        tags:['tag1','tag2','tag3'],
        categorie: '',
        thumbnail: '',
        owner: 'Ramy',
        likes: ['tag1','tag2','tag3'],
    },
    {
        picUrl: 'https://i.pinimg.com/originals/31/c6/21/31c621f2c0f439057942328c2dfad9db.jpg',
        linkers: [],
        description: 'aaaaaaaa',
        tags:[],
        categorie: '',
        thumbnail: '',
        owner: 'Ramy',
        likes: [],
    },
    {
        picUrl: 'https://i.pinimg.com/originals/31/c6/21/31c621f2c0f439057942328c2dfad9db.jpg',
        linkers: [],
        description: 'aaaaaaaa',
        tags:[],
        categorie: '',
        thumbnail: '',
        owner: 'Ramy',
        likes: [],
    }
    
]


function PictureReducer (state = { 
                        tags:[],
                        // picUrlError: false,
                        pictures: imgs
                         } , action) {
  switch (action.type){
    case 'Get_Pictures':
        return Object.assign({}, state,  
         { picturesArray: action.pictures}
        );
    case 'Set_Pictures':
        return Object.assign({}, state,  
         { picturesSetArray: action.pictures}
        );
    case 'Set_View_Value':
        return Object.assign({}, state,  
         { viewValue: action.view}
        );
    case 'Sort_By_Value':
        return Object.assign({}, state,  
         { sortByValue: action.sortBy}
        );
    case 'Search_Value':
        return Object.assign({}, state,  
         { searchValue: action.value}
        );
    case 'Add_Tags':
        return { 
        ...state,
        tags: [...state.tags, action.tagItem]
        };
    case 'Reset_Tags':
        return { 
        ...state,
        tags: []
        };
    case 'Remove_Tags':
        return { 
        ...state,
        tags: state.tags.filter(item => item !== action.tagItem),
        };
    case 'Pic_Has_Error':
        return Object.assign({}, state,  
         { picUrlError: action.error}
        );
    case 'Is_Loading':
        return Object.assign({}, state,  
         { isLoading: action.value}
        );
    default:
          return state;
  }
}


function viewHandlerReducer (state = {
                mainModelShow:false,
                isWorking:false,
                activeMenu: 'home'
                } , action) {
  switch (action.type){
    case 'Drawer_Toggle':
        return Object.assign({}, state,  
         { drawer: action.open}
        );
        
    case 'Main_Selected_Pic':
        return Object.assign({}, state,  
         { mainSelectedPic: action.picture}
        );
    case 'Main_Model_Show':
        return Object.assign({}, state,  
         { mainModelShow: action.active}
        );
    case 'Snackbar_Show':
        return Object.assign({}, state,  
         { 
             snackbarShow: action.show,
             snackbarMsg: action.message,
            //  snackbarDuration: action.autoHideDuration
         }
        );
        case 'Working_Toggle':
        return Object.assign({}, state,  
         { 
            isWorking: action.open,
         }
        );
        case 'Activate_Nav':
            return Object.assign({}, state, { 
             activeMenu: action.activeMenu
        });
    default:
          return state;
  }
}
function paginationReducer (state = {pager: {} , pageOfItems: []} , action) {
  switch (action.type){
    case 'Pagination_Action':
        return Object.assign({}, state,  
          action.pager
        );
    case 'Page_Items_Action':
        return Object.assign({}, state,  
          action.pageOfItems
        );
    default:
          return state;
  }
}
function authReducer (state = {isLogedin: false} , action) {
  switch (action.type){
        case 'Sing_Up_Success':
            return Object.assign({}, state, { 
              
              user: action.user
          
        });
        case 'Login_Success':
            return Object.assign({}, state, { 
              
              user: action.user,
              isLogedin: true
          
        });
        case 'logout_Success':
            return Object.assign({}, state, { 
              user:null,
              isLogedin:false
          
        });
        case 'get_Status_Success':
            return Object.assign({}, state, { 
              user: action.user,
              isLogedin: action.isLogedin
        });
        case 'Is_Loaded':
            return Object.assign({}, state, { 
             isLoaded: action.isLoaded
        });
        case 'Profile_Picture_Error':
            return Object.assign({}, state, { 
             profilePicError: action.error
        });
    default:
          return state;
  }
}

const rootReducer = combineReducers({
  picture: PictureReducer,
  viewHandler:  viewHandlerReducer,
  router: routerReducer,
  form: formReducer,
  authorization: authReducer,
  pagination: paginationReducer,
  // More reducers if there are
  // can go here
});
export default rootReducer;
