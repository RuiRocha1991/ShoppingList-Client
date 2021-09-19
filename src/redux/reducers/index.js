import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user.reducer';
import ui from './ui.reducer';


const rootReducer = (history) =>
  combineReducers({
    user,
    ui,
    router : connectRouter(history)
  })

export default rootReducer;
