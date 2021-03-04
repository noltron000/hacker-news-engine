// import styles & other objects
import {connect} from 'react-redux'
import {activateSearch} from '../redux.js'
// import react components
import {Component} from 'react'

/* CREATE BASE CLASS */
class Searchbar extends Component {
	constructor () {
		super()
		this.state = {'query': ''}
	}

	render () { return (<>
		<form
			onSubmit={async (event) => {
				// fetch some stuff from the API.
				// its going to be a promise, so we'll await it later.
				const promise = fetch(`https://hn.algolia.com/api/v1/search?query=${this.state.query}`)

				// don't allow the site to reload after submitting.
				event.preventDefault()

				// re-visit promises and await completion.
				const response = await promise
				const results = await response.json()

				// add current query to redux history.
				const queries = [...this.props.search.queries, this.state.query]

				// tell redux that we have new search data.
				this.props.activateSearch({
					// 'queries' is historic array of query entries.
					// the most recent query is listed at the end.
					'queries': queries,
					// 'results' is fetched data for this query.
					'results': results,
				})
			}}
		>

			{/* Here is the searchbar's HTML. */}
			<div>
				<label>
					Search Hacker News
				</label>

				<br />

				<input
					name="searchbar"
					type="search"
					value={this.state.query}

					onChange={(event) => {
						this.setState({
							'query': event.target.value
						})
					}}
				/>

				<input
					name="searchButton"
					type="submit"
					value="Search"
				/>
			</div>
		</form>
	</>)}
}

/* EXTEND OBJECT INTO REDUX CONTAINER */
const mapStateToProps = (state) => {
	// create props from state
	const props = {
  	search: state.search,
	}

	// return props
	return props
}

const mapDispatchToProps = {
	// "dispatch" bundled functions to incoming class context.
  activateSearch,
}

const SearchbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Searchbar)

// new redux container replaces the base class.
// it has all the base class functionality and more.
export default SearchbarContainer
