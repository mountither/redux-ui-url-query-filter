import { combineReducers } from 'redux';
import productFilter from './productsReducer';
import updateUrl from './updateUrl'
import { connectRouter } from 'connected-react-router';

export default history => combineReducers({ router: connectRouter(history), productFilter, updateUrl });