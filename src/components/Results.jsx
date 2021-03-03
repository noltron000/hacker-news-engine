// import styles & other objects
import {connect} from 'react-redux'
// import react components
import {Component} from 'react'
import Result from './Result'

/* CREATE BASE CLASS */
class Results extends Component {

	// [x] "nbHits": 246802,
	// [x] "page": 0,
	// [x] "nbPages": 50,
	// [x] "hitsPerPage": 20,
	// [x] "exhaustiveNbHits": false,
	// [ ] "query": "cool",
	// [x] "params": "advancedSyntax=true&analytics=true&analyticsTags=backend&query=cool",
	// [x] "processingTimeMS": 3

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
					disabled={this.props.search.results.page < this.props.search.results.nbPages}
				/>
				{" | "}
				<input
					type="button"
					value="Next Page"
					disabled={this.props.search.results.page > 0}
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

const ResultsContainer = connect(
  mapStateToProps
)(Results)

export default ResultsContainer
