// import styles & other objects
import {connect} from 'react-redux'
import {activateSearch} from '../redux.js'
// import react components
import {Component} from 'react'
import Result from './Result'


/* CREATE BASE CLASS */
class Results extends Component {
	turnPage = async (page) => {
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
	}

	render () {return (
		<section>
			<h2>
				Search Results
			</h2>
			<p>
				{/*
					This paragraph string results in something like this:
					"Found (exactly/more than) (####) result(s) in (####) seconds."
				*/}
				{'Found '}
				{this.props.search.results.exhaustiveNbHits ? 'exactly ' : 'more than '}
				{this.props.search.results.nbHits ?? NaN}
				{' result'}
				{/* make result(s) singular or plural */}
				{this.props.search.results.nbHits + 1 === 1 ? 's' : ''}
				{' in '}
				{this.props.search.results.processingTimeMS / 1000}
				{' seconds.'}
			</p>


			{/* For each search result, create a component. */}
			{(this.props.search.results.hits ?? [ ]).map((hit) => (
				<Result props={hit}/>
			))}


			{/* Create a navigator tool after the list of results. */}
			<p>
				Page {this.props.search.results.page + 1} of {this.props.search.results.nbPages}
				<br />
				<input
					type="button"
					value="Previous Page"
					disabled={this.props.search.results.page + 1 <= 1}
					onClick={async () => {
						await this.turnPage(this.props.search.results.page - 1)
					}}
				/>
				{" | "}
				<input
					type="button"
					value="Next Page"
					disabled={this.props.search.results.page + 1 >= this.props.search.results.nbPages}
					onClick={async () => {
						await this.turnPage(this.props.search.results.page + 1)
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
