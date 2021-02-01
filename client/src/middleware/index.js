import {  push } from "connected-react-router";
import {removeFilterInPath,  getFilterPath} from "../utils/url-utils";

const middleware = store => next => action => {
    
    if (action.type === "UPDATE_URL"){

        const state = store.getState();

        store.dispatch(push(`${state.router.location.pathname}?${getFilterPath([...state.updateUrl,action.payload])}`))

    }
    if (action.type==="REMOVE_PATH"){
        const state = store.getState();
        console.log('state in inactive: ',state);
        store.dispatch(push(`${state.router.location.pathname}?${removeFilterInPath(action.payload)}`))
    }
    if (action.type === "CLEAR_FILTERS"){
        const state = store.getState();
        store.dispatch(push(`${state.router.location.pathname}`))
    }    
    next(action);
    
}

export default middleware;