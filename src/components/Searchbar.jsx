// import styles & other objects
import {connect} from 'react-redux'
import {activateSearch} from '../redux.js'
import {Component} from 'react'
import './Searchbar.css'

/* CREATE BASE CLASS */
class Searchbar extends Component {
	constructor () {
		super()
		this.state = {
			'query': '',
			'results': ''
		}
	}
	render () { return (<>
		<form
			onSubmit={async (event) => {
				// don't allow the site to reload.
				event.preventDefault()

				// add current query to redux history.
				console.log(this.props.search)
				const queries = [...this.props.search.queries, this.state.query]
				this.props.activateSearch({'queries': queries})

				// fetch some stuff from the API.
				// its going to be a promise, so we'll await it later.
				const promise = fetch(`https://hn.algolia.com/api/v1/search?query=${this.state.query}`)
				const response = await promise
				const data = await response.json()

				// check out this cool api fetch json
				this.setState({
					'results': JSON.stringify(data, null, "\t")
				})
			}}
		>
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

		<p>JSON Results:</p>
		<pre><code>{this.state.results}</code></pre>

		<p>Search History:</p>
		<pre><code>{JSON.stringify(this.props.search.queries)}</code></pre>
	</>)}
}

/* EXTEND INTO REDUX CONTAINER */
const mapStateToProps = (state) => ({
  search: state.search,
})

const mapDispatchToProps = {
  activateSearch,
}

const SearchbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchbar)

export default SearchbarContainer
