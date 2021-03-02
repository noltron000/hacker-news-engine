// import styles & other objects
import logo from '../logo.svg'
import './Header.css'

function Header() {
	return (
		<header>
			<img
				src={logo}
				className="logo"
				alt="logo"
			/>

			<div className="title">
				<h1 className="center">
					Hacker News Engine
				</h1>
				<p>
					Built with React, Redux, and the Algolia API.
					<br />
					For more details,
					{" "}
					<a
						href="https://github.com/noltron000/hacker-news-engine"
						target="_blank"
						rel="noopener noreferrer"
					>
						view this project on Github
					</a>
					{"."}
				</p>
				<p>
				</p>
			</div>
		</header>
	)
}

export default Header
