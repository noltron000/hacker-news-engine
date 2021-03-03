import {
	combineReducers,
	createStore,
} from 'redux'


/* ACTIONS */
// check this out when the search bar is clicked.
const activateSearch = (queries) => {
	// create action object with a type label and its content.
	const actionObject = {
		'type': 'ACTIVATE_SEARCH',
		'queries': queries,
	}

	// that's all we need.
	return actionObject
}


/* REDUCERS */
// bindle all possible actions for the search.
const search = (state = {'queries': [ ]}, action) => {
	// there's only one possible action type for queries.
	if (action?.type === 'ACTIVATE_SEARCH') {
		return action.queries
	}

	// if there's no matching labels, do nothing extra.
	else {
		return state
	}
}

// bundle together all reducers.
const reducers = combineReducers({search})


/* STORE */
// we're required to use a verbose f(x) behind the scenes.
// verbose meaning, we use the 'function' keyword.
function configureStore(initialState = {}) {
	const store = createStore(reducers, initialState)
	return store
}

// bundle up together the store
const store = configureStore()


/* EXPORT */
export {
	activateSearch,
	search,
	reducers,
	configureStore,
	store
}
