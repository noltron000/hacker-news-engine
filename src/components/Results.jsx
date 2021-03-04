// import styles & other objects
import {connect} from 'react-redux'
import {activateSearch} from '../redux.js'
// import react components
import {Component} from 'react'
import Result from './Result'

/* CREATE BASE CLASS */
class Results extends Component {
	render () {return (
		<section>
			<h2>
				Search Results
			</h2>
			<p>
				{'Found '}
				{this.props.search.results.exhaustiveNbHits ? 'exactly ' : 'more than '}
				{this.props.search.results.nbHits ?? NaN}
				{' results in '}
				{this.props.search.results.processingTimeMS / 1000}
				{' seconds.'}
			</p>

			{(this.props.search.results.hits ?? [ ]).map((hit) => (
				<Result props={hit}/>
			))}

			<p>
				Page {this.props.search.results.page} of {this.props.search.results.nbPages}
				<br />
				<input
					type="button"
					value="Previous Page"
					disabled={this.props.search.results.page <= 0}
					onClick={async () => {
						// determine variables
						const page = this.props.search.results.page - 1
						const query = this.props.search.queries.slice(-1).pop()
						const queries = this.props.search.queries

						// fetch some stuff from the API using the proper page number.
						// its going to be a promise, so we'll await them.
						const promise = fetch(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`)
						const response = await promise
						const results = await response.json()

						// tell redux that we have new search data.
						this.props.activateSearch({
							// 'results' is fetched data for this query.
							'results': results,
							'queries': queries,
						})
					}}
				/>
				{" | "}
				<input
					type="button"
					value="Next Page"
					disabled={this.props.search.results.page >= this.props.search.results.nbPages}
					onClick={async () => {
						// determine variables
						const page = this.props.search.results.page + 1
						const query = this.props.search.queries.slice(-1).pop()
						const queries = this.props.search.queries

						// fetch some stuff from the API using the proper page number.
						// its going to be a promise, so we'll await them.
						const promise = fetch(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`)
						const response = await promise
						const results = await response.json()

						// tell redux that we have new search data.
						this.props.activateSearch({
							// 'results' is fetched data for this query.
							'results': results,
							'queries': queries,
						})
					}}
				/>
			</p>
		</section>
	)}
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

const ResultsContainer = connect(
  mapStateToProps,
	mapDispatchToProps,
)(Results)

export default ResultsContainer
