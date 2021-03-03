// import styles & other objects
import {connect} from 'react-redux'
// import react components
import {Component} from 'react'

/* CREATE BASE CLASS */
class Results extends Component {
	render () {return (
		<>
			<p>JSON Results:</p>
			<pre><code>{JSON.stringify(this.props.search.results, null, "\t")}</code></pre>
		</>
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
