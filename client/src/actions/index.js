export const addFilter = (id, name) => ({
    type: 'TOGGLE_FILTER',
    payload: {id: id, field:name}
  });

export const updateURL = (id, field) => ({
    type: 'UPDATE_URL',
    payload: {id: id, field: field}
  });


export const removePath = (id, name) => ({
    type: 'REMOVE_PATH',
    payload: {id: id, field:name}
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
});


export const clearAllQuery = () => ({
  type: 'REMOVE_ALL_QUERY'
});