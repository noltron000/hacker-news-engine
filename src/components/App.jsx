// import styles & other objects
import './App.css'
// import react components
import {Component} from 'react'
import Header from './Header'
import Searchbar from './Searchbar'
import History from './History'
import Results from './Results'

class App extends Component {
	render () {return (
		<>
			<main>
				<Header />
			</main>
			<div className = 'content'>
				<Searchbar />
				<hr />
				<History />
				<hr />
				<Results />
			</div>
		</>
	)}
}

export default App
