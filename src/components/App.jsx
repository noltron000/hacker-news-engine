// import styles & other objects
import {connect} from 'react-redux'
import './App.css'
// import components
import {Component} from 'react'
import Header from './Header'
import Searchbar from './Searchbar'

class App extends Component {
	constructor () {
		super()
		this.state = {'ok': null}
	}

	render () {return (
		<>
			<Header />
			<main>
				<Searchbar />
				<hr />

				<p>Search History:</p>
				<pre><code>{JSON.stringify(this.props.search.queries)}</code></pre>

				<p>JSON Results:</p>
				<pre><code>{JSON.stringify(this.props.search.results, null, "\t")}</code></pre>
			</main>
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

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
