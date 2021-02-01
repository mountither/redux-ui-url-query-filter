// import { connect } from 'react-redux';
// import { addFilter,removePath, updateURL, clearFilters, clearAllQuery} from '../actions';
// import CheckboxFilter from '../filterViews/CheckboxFilter';


// //called when Items component is updated. Updating the redux state. 
// const mapStateToProps = (state) => ({
//   filters: state.filters,
//   updateURL: state.updateURL,
//   router: state.router
// }
// );
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   addFilter: (id, name) => dispatch(addFilter(id, name)),
//   updateURL: (id, field) => dispatch(updateURL(id, field)),
//   removePath: (id, field) => dispatch(removePath(id, field)),
//   clearFilters: () => dispatch(clearFilters()),
//   clearAllQuery: () => dispatch(clearAllQuery())

// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CheckboxFilter);