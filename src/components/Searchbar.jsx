// import styles & other objects
import {Component} from 'react'
import './Searchbar.css'

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
				// don't allow the site to reload
				event.preventDefault()
				// fetch some stuff from the API.
				// its going to be a promise, so we'll await it later.
				const promise = fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.query}`)
				const response = await promise
				const data = await response.json()
				console.log(data)

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
		<pre><code>{this.state.results}</code></pre>
		</>
	)}
}

export default Searchbar
