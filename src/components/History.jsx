// import styles & other objects
import {connect} from 'react-redux'
// import react components
import {Component} from 'react'

/* CREATE BASE CLASS */
class History extends Component {
	render () {return (
		<section>
			<h2>Search History</h2>
			<ul>
				{this.props.search.queries.map((query) => (
					<li key={query}>{query}</li>
				))}
			</ul>
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

const HistoryContainer = connect(
  mapStateToProps
)(History)

export default HistoryContainer
