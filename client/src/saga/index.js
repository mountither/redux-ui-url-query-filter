import { takeEvery, put, select, all } from 'redux-saga/effects';

// this solves the issue of taking query direct from the window location, 
// rather than the redux router state.
// when the init_app dispatch is used, the router values will be present,
// we can alter and add the necessary values with this method.
function* initApp(action) {
    // url location is extracted (select) from the state.router 
    const location = yield select(state => state.router.location);
    console.log('location saga: ', location);
    const params = new URLSearchParams(location.search);
    console.log(params.toString());
    // create an array of the items found in url. 
    const filters = Array.from(params.entries()).map((filter) => { return {id: parseInt(filter[1]), field:filter[0]}});
    // store the state router location retrieved from the url. 
    yield all(filters.map((filter) =>  {return put({ type: 'TOGGLE_FILTER', payload: filter})}));
    yield all(filters.map((filter) =>  {return put({ type: 'UPDATE_URL', payload: filter})}));
    return;
}


//this the watcher in middleware. 
// focuses on action "INIT_APP".
function* mySaga() {
    yield takeEvery("INIT_PRODUCTS", initApp);
}

export default mySaga;