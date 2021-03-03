// import styles & other objects
import {connect} from 'react-redux'
// import react components
import {Component} from 'react'

/* CREATE BASE CLASS */
class History extends Component {
	render () {return (
		<>
			<p>Search History:</p>
			<pre><code>{JSON.stringify(this.props.search.queries)}</code></pre>
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

const HistoryContainer = connect(
  mapStateToProps
)(History)

export default HistoryContainer
