import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user.reducer';
import ui from './ui.reducer';
import category from './category.reducer'
import shoppingList from './shoppingList.reducer'


const rootReducer = (history) =>
  combineReducers({
    user,
    ui,
    category,
    shoppingList,
    router : connectRouter(history)
  })

export default rootReducer;
