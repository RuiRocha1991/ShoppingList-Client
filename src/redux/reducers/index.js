import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user.reducer';
import ui from './ui.reducer';
import category from './category.reducer'
import item from './item.reducer'


const rootReducer = (history) =>
  combineReducers({
    user,
    ui,
    category,
    item,
    router : connectRouter(history)
  })

export default rootReducer;
