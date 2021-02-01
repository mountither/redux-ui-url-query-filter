
const updateURL = (state = [], action) => {
    switch(action.type){
        case 'UPDATE_URL':
            return [
            ...state,
            action.payload
            ]
        case 'REMOVE_PATH':
            return state.filter(urlQueryFilt =>
                (urlQueryFilt.id !== action.payload.id ||
                urlQueryFilt.field !== action.payload.field));
        case 'REMOVE_ALL_QUERY':
            return []
        default:
            return state
    }

}

export default updateURL;