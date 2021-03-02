// import styles & other objects
import './Searchbar.css'

function Searchbar() {
	return (
		<form>
			<div>
				<label>
					Search Hacker News
				</label>
				<br />
				<input type="search" hint="Enter search query..." />
				<input type="submit" value="Search" />
			</div>
		</form>
	)
}

export default Searchbar
